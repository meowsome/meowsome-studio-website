const axios = require("axios");
const Discogs = require("disconnect").Client;
require('dotenv').config();

var discogs = new Discogs({
    userToken: process.env.DISCOGS_TOKEN
}).database();

module.exports = function() {
    // Get song from Last FM first
    return axios.get("https://ws.audioscrobbler.com/2.0", {
        params: {
            method: "user.gettoptracks",
            user: "meowsom3",
            period: "7day",
            limit: 1,
            api_key: process.env.LASTFM,
            format: "json"
        }
    }).then(function(response) {
        if (response.data.toptracks.track.length == 0) {
            console.log("No result from last fm");
            return;
        }

        var track = response.data.toptracks.track[0];
        var params = {
            method: "track.getinfo",
            api_key: process.env.LASTFM,
            format: "json"
        };

        if (track.mbid) {
            params['mbid'] = track.mbid;
        } else {
            params['track'] = track.name;
            params['artist'] = track.artist.name;
        }

        // Attempt to find album art from last fm
        return axios.get("https://ws.audioscrobbler.com/2.0", {
            params: params
        }).then(function(response) {
            var song = response.data.track;

            // Remove artist name from title and truncate if too long
            if (song.name.length > 20) song.name = song.name.replace(/^(.{20}[^\s]*).*/, "$1") + "...";
            
            var responseData = {
                song: song.name,
                url: song.url
            };

            if ('album' in song) {
                responseData['artwork'] = song.album.image[song.album.image.length - 1]['#text'];
                return responseData;
            } else {
                // Attempt to find album art from Discogs if not found from last fm
                discogs.search({
                    query: track.name.replace(/["'()]/g,"") + " " + track.artist.name, // Search with song name with no parantheses
                    type: 'release'
                }).then(function(response) {
                    if (response.results.length > 0) {
                        responseData['artwork'] = response.results[0].cover_image;
                    } else {
                        console.log("No artwork found from Discogs")
                    }

                    return responseData;
                }).catch(function(err) {
                    console.log(err);
                    console.log("Discogs error");
                });
            }
        }, function(err) {
            console.log(err);
            console.log("Last fm track.getinfo error");
        });
    }).catch(function(err) {
        console.log(err);
        console.log("Last fm user.gettoptracks error");
        return;
    });
}
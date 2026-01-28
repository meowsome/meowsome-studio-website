const axios = require("axios");
require('dotenv').config();

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

            // Fetch artist picture if no album available
            if ('album' in song) {
                responseData['artwork'] = song.album.image[song.album.image.length - 1]['#text'];
                return responseData;
            } else {
                return axios.get("https://ws.audioscrobbler.com/2.0", {
                    params: {
                        method: "artist.getinfo",
                        api_key: process.env.LASTFM,
                        format: "json",
                        mbid: song.artist.mbid
                    }
                }).then(function(response) {
                    responseData['artwork'] = response.data.artist.image[response.data.artist.image.length - 1]['#text'];
                    return responseData;
                }).catch(function(err) {
                    console.log(err);
                    console.log("Last fm artist.getinfo error");
                    return;
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
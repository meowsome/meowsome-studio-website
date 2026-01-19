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

        return axios.get("https://ws.audioscrobbler.com/2.0", {
            params: {
                method: "track.getinfo",
                mbid: response.data.toptracks.track[0].mbid,
                api_key: process.env.LASTFM,
                format: "json"
            }
        }).then(function(response) {
            var song = response.data.track;
            
            // Remove artist name from title and truncate if too long
            if (song.name.length > 20) song.name = song.name.replace(/^(.{20}[^\s]*).*/, "$1") + "...";

            return {
                song: song.name,
                artwork: song.album.image[song.album.image.length - 1]['#text'],
                url: song.url
            };
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
const axios = require("axios");
require('dotenv').config();
const Genius = require('genius-lyrics');
const genius = new Genius.Client(process.env.GENIUS);

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

        var track = response.data.toptracks.track[0]; // Get the track result from last fm

        // Search Genius for the song that was found
        return genius.songs.search(track.name + " " + track.artist.name).then(function(songs) {
            if (songs.length == 0) return console.log("No result from genius");
            
            var song = songs[0];

            // Remove artist name from title and truncate if too long
            if (song.title.length > 20) song.title = song.title.replace(/^(.{20}[^\s]*).*/, "$1") + "...";

            return {
                song: song.title,
                artwork: song.raw.header_image_thumbnail_url,
                url: song.raw.url
            };
        }).catch(function (err) {
            console.log(err);
            console.log("Genius error");
            return;
        });
    }).catch(function(err) {
        console.log(err);
        console.log("Last fm error");
        return;
    });
}
const axios = require("axios");
require('dotenv').config();
const spotify = require("@ksolo/spotify-search");
spotify.setCredentials(process.env.SPOTIFY_CLIENT_ID, process.env.SPOTIFY_CLIENT_SECRET);

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

        // Search Spotify for the song that was found
        return spotify.search(track.name + " " + track.artist.name).then(function(songs) {
            if (songs.tracks.items.length == 0) return console.log("No result from spotify");
            
            var song = songs.tracks.items[0];

            // Remove artist name from title and truncate if too long
            if (song.name.length > 20) song.name = song.name.replace(/^(.{20}[^\s]*).*/, "$1") + "...";

            return {
                song: song.name,
                artwork: song.album.images[1].url,
                url: song.external_urls.spotify
            };
        }, function(err) {
            console.log(err);
            console.log("Spotify error");
        });
    }).catch(function(err) {
        console.log(err);
        console.log("Last fm error");
        return;
    });
}
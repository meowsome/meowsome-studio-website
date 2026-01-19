const axios = require("axios");
require('dotenv').config();

module.exports = function() {
    // Get all commits from GitHub
    return axios.get("https://api.github.com/users/meowsome/events").then(function(response) {
        var activity = response.data.filter(activity => activity.type == "PushEvent")[0]; // Get the latest commit that I've made

        var repo = activity.repo.name.replace(/^(.*[\\\/])/, '').replace(/_/g," ").replace(/-/g," "); // Remove username from repo, everything before slash, remove dashes and underscores

        var url = "https://github.com/" + activity.repo.name; // Create url for github repo

        // Return commit message, repo name, and url to commit
        return {
            repo: repo,
            url: url
        };
    }).catch(function(err) {
        console.log(err);
        return console.log("GitHub error");
    });
}
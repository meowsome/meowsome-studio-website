const { TwitterApi } = require('twitter-api-v2');
require('dotenv').config();

module.exports = function() {
    // Get Tweets from timeline
    return new Promise(async function(res, reject) {
        const userClient = new TwitterApi({
            appKey: process.env.TWITTER_CONSUMER_KEY,
            appSecret: process.env.TWITTER_CONSUMER_SECRET,
            accessToken: process.env.TWITTER_ACCESS_TOKEN,
            accessSecret: process.env.TWITTER_ACCESS_SECRET,
        });

        var latestTweet = (await userClient.currentUser()).status;

        // Get and fix up Tweet content
        var content = latestTweet['full_text'];
        content = content.replace(/\s?https?:\/\/.*[\r\n]*\s?/g, ""); // Remove URLs
        if (content.length > 200) content = content.replace(/^(.{200}[^\s]*).*/, "$1") + "..."; // Smart-truncate
        if (content.length == 0) content = "media with no caption"; // If no text, say so

        // Return Tweet content, image if exists, and url
        res({
            content: content,
            image: (latestTweet['entities']['media']) ? latestTweet['entities']['media'][0]['media_url_https'] : "",
            url: "https://twitter.com/meowsom3/status/" + latestTweet['id_str']
        });
    });
}
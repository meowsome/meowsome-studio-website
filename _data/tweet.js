const Twitter = require('twitter');
const twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET
})
require('dotenv').config();

module.exports = function() {
    // Get Tweets from timeline
    return new Promise(function(resolve, reject) {
        twitterClient.get('statuses/user_timeline', function(err, tweets, res) {
            if (err) {
                console.log("Twitter client error");
                reject(err);
            }

            var tweet = tweets.filter(tweet => tweet.in_reply_to_status_id == null && tweet.retweeted == false)[0]; // Get latest Tweet that was not in reply to anyone

            // Get and fix up Tweet content
            var content = tweet.text;
            content = content.replace(/\s?https?:\/\/.*[\r\n]*\s?/g, ""); // Remove URLs
            if (content.length > 25) content = content.replace(/^(.{25}[^\s]*).*/, "$1") + "..."; // Smart-truncate
            if (content.length == 0) content = "media with no caption"; // If no text, say so

            // Return Tweet content, image if exists, and url
            resolve({
                content: content,
                image: (tweet.entities.media) ? tweet.entities.media[0].media_url_https : "",
                url: "https://twitter.com/meowsom3/status/" + tweet.id_str
            })
        });
    });
}
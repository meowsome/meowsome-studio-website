const {Builder, By, Key, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const {resolve} = require("path");
require('dotenv').config();

module.exports = function() {
    // Get Tweets from timeline
    return new Promise(async function(res, reject) {
        const screen = {
            width: 640,
            height: 480
        };

        var driver = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(new chrome.Options().headless().windowSize(screen))
            .build();

        try {
            var localFile = resolve("twitter_embed.html").replaceAll("\\", "/").split("/"); // Replace all backslashes with forwardslashes and split
            localFile = localFile.slice(0,-1).join("/") + "/_data/" + localFile.slice(-1)[0]; // Construct new url by adding /_data/ right before filename
            await driver.get('file:///' + localFile); // Start selenium

            var user = await driver.wait(until.elementLocated(By.css('#twitter-widget-0')), 5000);

            const iframe = driver.findElement(By.css('#twitter-widget-0'));
            await driver.switchTo().frame(iframe); // Go to iframe

            var tweetRaw = await driver.wait(until.elementLocated(By.css('#__NEXT_DATA__')), 5000).getAttribute('textContent'); // Get all tweets from iframe
            var tweetJson = JSON.parse(tweetRaw);
            var latestTweet = tweetJson['props']['pageProps']['timeline']['entries'].find(tweet => tweet['content']['tweet']['user']['screen_name'] == 'meowsom3')['content']['tweet'] // Get latest tweet that was posted by me

            // Get and fix up Tweet content
            var content = latestTweet['full_text'];
            content = content.replace(/\s?https?:\/\/.*[\r\n]*\s?/g, ""); // Remove URLs
            if (content.length > 25) content = content.replace(/^(.{25}[^\s]*).*/, "$1") + "..."; // Smart-truncate
            if (content.length == 0) content = "media with no caption"; // If no text, say so

            // Return Tweet content, image if exists, and url
            res({
                content: content,
                image: (latestTweet['entities']['media']) ? latestTweet['entities']['media'][0]['media_url_https'] : "",
                url: "https://twitter.com" + latestTweet['permalink']
            });
        } finally {
            await driver.quit();
        }
    });
}
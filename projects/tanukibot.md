---
title: Daily Tanuki Bot
link: tanukibot
short_description: A Twitter & Bluesky bot that posts random images of Tanukis daily
description: The Daily Tanuki Bot is a Twitter and Bluesky bot that posts random real-life images and videos of Tanukis, otherwise known as Japanese raccoon dogs, daily.<br><br>To retrieve the media, APIs are used to scrape images and videos using keyword searches from both various sources. After all of the media is retrieved, a pre-trained TensorFlow VGG model is used to filter only media that is of a real-life animal. All other media is discarded. After this machine learning is done, the Twitter or Bluesky bot will then have a collection of media to randomly post each day.<br><br>All actions are set up on a scheduler. The media retrieval is run monthly, and the media posting is run daily. With this setup, the bot could potentially run indefinitely and always have new, fresh media to post.
dates: {
    updated: Jul 2025,
    released: Mar 2022
}
technologies: [Python, TensorFlow, Amazon Web Services]
links: [
    {
        title: Twitter bot,
        link: https://twitter.com/DailyTanuki
    },
    {
        title: Bluesky bot,
        link: https://bsky.app/profile/dailytanuki.bsky.social
    },
    {
        title: GitHub Repository,
        link: https://github.com/meowsome/TanukiBot
    }
]
headerImage: tanukibot1.png
images: [tanukibot2.png, tanukibot3.png, tanukibot4.png]
color: ["rgb(148,124,108)", "rgb(92,80,75)"]
---
---
title: Barq Statistics
link: barq-statistics
short_description: Statistics on furries around the world from scraping Barq profiles
description: Barq is an app for furries to connect with one another based on location. For this project, profile information was collected for a subset of all Barq users. This information was used to perform analytics and statistics. No individual user was singled out in this project. The report included geographical maps, bar charts, pie charts, and more.<br><br>How the statistics were compiled:<ol><li>Android Studio was used used to run the Barq app on a desktop environment</li><li>Charles was used to sniff packets sent to the Barq API from the Barq app</li><li>The Barq API URLs were analyzed to determine their inputs and outputs</li><li>A set of popular locations in the U.S. and other regions around the world were created</li><li>For each location, IDs of 10,000 users in the surrounding area were saved</li><li>A Raspberry Pi was set up with a fresh Barq account to send GET requests using the algorithm described above</li><li>All data was combined and cleaned, and duplicate users were removed</li></ol><br><p>Barq accounts contain information for real furs around the world. By performing statistics on this data, unique geographical and other patterns can be observed for real furs.All data was collected legally and user profiles are stored anonymously by removing usernames and user IDs after all data was collected. Statistics are kept broad. No particular user was singled out in these statistics. All data collected was publicly accessible data.</p>
dates: {
    updated: Oct 2025,
    released: Jun 2022
}
technologies: [Python, Plotly, Pandas, Numpy, Android Studio, Charles]
links: [
    {
        title: Report,
        link: https://barq.meowso.me
    }, {
        title: GitHub Repository,
        link: https://github.com/meowsome/Barq-Statistics
    }
]
headerImage: barq-statistics1.png
images: [barq-statistics2.png, barq-statistics3.png, barq-statistics4.png]
color: ["#fc5c04", "#e42416"]
---
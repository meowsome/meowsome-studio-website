---
title: Barq Statistics
link: barq-statistics
short_description: Statistics on furries around the world from scraping Barq profiles
description: Barq is an app for furries to connect with one another based on location. For this project, profile information was collected for a subset of all Barq users. This information was used to perform analytics and statistics. No individual user was singled out in this project.<br><ol><li>Android Studio was used used to run the Barq app on a desktop environment</li><li>HTTP Toolkit was used to sniff packets sent to the Barq API from the Barq app</li><li>The Barq API URLs were analyzed to determine their inputs and outputs</li><li>A set of popular locations in the U.S. and other regions around the world were created</li><li>For each location, Barq profiles were visited and had their data collected starting with the first one until no more could be loaded</li><li>A mini PC was set up with a fresh Barq account to send GET requests using the algorithm described above</li><li>All data was combined and cleaned</li></ol><br><p>Barq accounts contain information for real furries around the world. Since Barq uses users locations on their mobile devices, generally the data can be considered as accurate. By performing generalized statistics on a subset of this data, unique geographical and other patterns can be observed for real furries.</p><br><p>All data was collected legally and user profiles are stored anonymously by removing all identifying information after data was collected. No particular user was singled out in these statistics. All data collected is publicly accessible by anyone with the Barq app installed on their device. No private data was compromised. Data was not shared with any other party. No users were solicited in this process. Scraping was performed slowly as to not negatively impact site performance.</p><br><p>The data contains a subset of roughly 30% of all Barq users. This is because the data scraped only included users that were active within the past 3 months. There are also areas of the world where scraping was not able to be performed due to limitations. Apologies if your area was not scraped.</p>
dates: {
    updated: Aug 2026,
    released: Jun 2022
}
technologies: [Android Studio, HTTP Toolkit, Plotly, Pandas, Numpy, Leaflet, Express, React]
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
#### Evaluation Project Requirements

This project cover the following tasks:

**Smart Search:** :fa-search: Search service base on different type of files, with implementation the some filters in any** stored list of files**, these filters include:

- **Image:** Orientation, colors and text in image :fa-picture-o:
- **Music:** Lenght :fa-headphones:
- **Video:** Lenght :fa-film:

in order to do this we need to create some functions that analysis and extract the the above informations from the media files and store it in database like **mysql** and apply the filters in the stored infromation in database.

The media files are featched from an api. :fa-download:

**Real time Notification:** :fa-bell: Web base notification system allow the user to get his notification without refreshing the page, basically an API for that create a notification, push it into **single page application (SPA)** real-time, and save the notification in a database **without using any external service**.

in order to do this we use **angular** as frontend (single page application) and since we are using c# we use **signalr library**.

**Click-house getaway:** :fa-cubes: a service that take data from all service (web and mobile) and sent it to yandex clickhouse.

in order to make an efficacy input to the clickhouse db we store all the data that coming from user web or mobile in Redis cache and when the data become like 1000+ we take this data and then make a bulks insert into the clickhouse db

**bulks:** Collects many small insterts to ClickHouse and send in big inserts


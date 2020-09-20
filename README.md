# album-artist-app
Displaying album list and artist details

App is using custom JSON Server to collect data on albums and artists which is running locally on port 3004.

All albums display album cover and other info: title, artist, year of release (not visible on smaller screens) and price. Every album can be un/marked as favorite by clicking the corresponding button which updates data in JSON Server.

Clicking on the title displays all albums from the server.

Search bar filters all items by album title and artist name when user clicks on the search button or when user presses enter button while search input bar is in focus.
To display all unfiltered items clear the search bar or click on the title.

Clicking on the artist name below the album title displays all albums by the selected artist and changes the route to /artist/:id where :id is the artist ID from the database. App will automatically filter all albums by the selected user when the ID in the URL is changed.

/?q=:searchParam
- route to search from the URL where :searchParam is the parameter to search by

/?limit=:int 
- route to display only selected number of albums, where :int is integer smaller then 10

Combining two routes is not yet implemented (can't search through URL and display only limited number of items)

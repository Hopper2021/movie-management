# Movie Manager!

An app to keep track of any movie information entered!

## SETUP

`npm install`
`npm run server`
`npm run client`

## Description

This is an app meant to house the movie information you'd like to keep track of. The home page automatically displays the movie information stored in the database. 

You can click on any photo or title of the movies listed to bring you to a details page that displays that movie's description.The `Back` button on the details page will return you to the movie list. 

The `Add New Movie` button takes you to a page where `Title`, `Poster`, `Genre` and `Description` can be entered into a form to be stored in the database. When you click `Save` it will take you back to the home page. Alternatively, if you wish you cancel, the `Cancel` button will return you to the homepage without adding anything to the database.

### TO DO LIST

- [x] Create Details Page
    - [x] Display all movie details including ALL genres for selected movie. Store this data in redux!
    - [x] Create Back to List button, link to home "/" 
- [x] Create Add Movie Page
    - [x] Add input fields:
        - [x] Add an input field (for movie title)
        - [x] Add input field (for movie poster image URL)
        - [x] Add Text area (for movie description)
        - [x] Add a dropdown (for genres)
    - [x] Add 2 buttons:
        - [x] Cancel button, that brings the user to the MovieList Page ( Home / "/" )
        - [x] Save button, which should save these input in the database and bring the user to the home/List Page (Which now has the new movie)
- [ ] Style it up!
    - [ ] Cards for movie posters are always a good choice
    - [ ] Research grids for movie posters on the movie list page
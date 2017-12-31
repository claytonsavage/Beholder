# BEHOLDER

Beholder is a smart, auto-categorizing todo list application. Users simply have to add their todo and automatically the todo gets categorized into one of the following categories: Movies (to watch), Restaurants (to eat), Books (to read) & Products (to buy). 
          
Beholder then queries various APIs (Walmart, Yelp & MovieDB) to provide the user with further information about their todo! Users are able to cross off todos once complete or simply delete them. If a todo is incorrectly categorised users simply click on the correct category from a list on the right of their todo.

## Project Setup

1. Create your own empty repo on GitHub
2. Clone this repository (do not fork)
  - Suggestion: When cloning, specify a different folder name that is relevant to your project
3. Remove the git remote: `git remote rm origin`
4. Add a remote for your origin: `git remote add origin <your github repo URL>`
5. Push to the new origin: `git push -u origin master`
6. Verify that the skeleton code now shows up in your repo on GitHub

## Getting Started

1. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
2. Update the .env file with your correct local information
3. Install dependencies: `npm i`
4. Fix to binaries for sass: `npm rebuild node-sass`
5. Run migrations: `npm run knex migrate:latest`
  - Check the migrations folder to see what gets created in the DB
6. Run the seed: `npm run knex seed:run`
  - Check the seeds file to see what gets seeded in the DB
7. Run the server: `npm run local`
8. Visit `http://localhost:8080/`

## Screenshots

![Alt text](https://github.com/claytonsavage/Beholder/blob/master/Beholder%20Screenshots/index.png "Beholder Homepage")
![Alt text](https://github.com/claytonsavage/Beholder/blob/master/Beholder%20Screenshots/Register.png "Registration Page")
![Alt text](https://github.com/claytonsavage/Beholder/blob/master/Beholder%20Screenshots/Todolist.png "Todo List")
![Alt text](https://github.com/claytonsavage/Beholder/blob/master/Beholder%20Screenshots/API%20Restuarant.png "Yelp -Restuarant query")
![Alt text](https://github.com/claytonsavage/Beholder/blob/master/Beholder%20Screenshots/API%20Movie%20query.png "Movie API query")


## Dependencies

* Node 5.10.x or above
* NPM 3.8.x or above
* bcrypt: ^1.0.3,
* body-parser": ^1.15.2,
* connect-flash": ^0.1.1,
* cookie-parser": ^1.4.3,
* cookie-session": ^2.0.0-beta.3,
* dotenv": ^2.0.0,
* ejs": ^2.4.1,
* express": ^4.13.4,
* goodreads": ^0.1.0,
* google-books-search": ^0.3.1,
* googleplaces": ^0.6.1,
* jquery": ^3.2.1,
* knex": ^0.11.7,
* knex-logger": ^0.1.0,
* morgan": ^1.7.0,
* moviedb": ^0.2.10,
* node-sass-middleware": ^0.9.8,
* pg": ^6.0.2,
* walmart": 0.0.4,
* yelp-fusion": ^2.0.3

## dev Dependencies
    
* nodemon: ^1.9.2,
* sqlite3: ^3.1.4

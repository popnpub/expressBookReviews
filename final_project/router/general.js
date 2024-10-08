const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
let doesExist = require("./auth_users.js").doesExist;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!doesExist(username)) {
            console.log('existe pas!')
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  // Sync code
  // return res.status(300).json(books);

  // Async
  new Promise((resolve, reject) => {
                resolve(books)
  }).then((result) => {res.status(300).json(result)});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  // Sync code
  // return res.status(300).json(books[parseInt(req.params.isbn)]);

  // Async code
  new Promise((resolve, reject) => {
    resolve(books)
  }).then((result) => {res.status(300).json(books[parseInt(req.params.isbn)]) });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  function getByAuthor(author) {
    let results = {};
        for (isbn in books) {
        if (books[isbn].author == author) {
          results[isbn] = books[isbn];
        }
    }
    return results;
  }

  // Sync
  // return res.status(300).json(getByAuthor(req.params.author));

  // Async code
  new Promise((resolve, reject) => {
    resolve(books)
  }).then((result) => {res.status(300).json(getByAuthor(req.params.author))});

 });

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  function getByTitle(title) {
    let results = {};
    for (isbn in books) {
        if (books[isbn].title == title) {
            results[isbn] = books[isbn];
        }
    }
    return results;
  }

  // Sync
  //return res.status(300).json(getByTitle(req.params.title));

  // Async
  new Promise((resolve, reject) => {
    resolve(books)
  }).then((result) => {res.status(300).json(getByTitle(req.params.title))});

});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json(books[req.params.isbn]);
});

module.exports.general = public_users;


/*********************************************************************************
WEB322 – Assignment 02
I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
No part * of this assignment has been copied manually or electronically from any other 
source (including 3rd party web sites) or distributed to other students.
Name: Rishi Bhatia
Student ID: 168046217
Date: 4-6-2023
Cyclic Web App URL: https://long-teal-turtle-veil.cyclic.app/about
GitHub Repository URL: 
********************************************************************************/

const storeService = require('./store-service');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Express http server listening on port ${port}`);
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/about');
});
  
app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/views/about.html');
});

app.get('/shop', (req, res) => {
    storeService.getPublishedItems()
      .then((items) => {
        res.json(items);
      })
      .catch((err) => {
        res.json({ message: err });
      });
  });
  

// Set up a route for /items
app.get('/items', (req, res) => {
  storeService.getAllItems()
    .then((items) => {
      res.json(items);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

// Set up a route for /categories
app.get('/categories', (req, res) => {
  storeService.getCategories()
    .then((categories) => {
      res.json(categories);
    })
    .catch((error) => {
      res.json({ message: error });
    });
});

// Route handlers for other routes

storeService.initialize()
  .catch((error) => {
    console.error('Error initializing store service:', error);
  });
  
  
  app.get('*', (req, res) => {
    res.status(404).send('Page Not Found');
  });
  
  app.get('*', (req, res) => {
    res.status(404).json({ message: 'Page Not Found' });
  });



  
  
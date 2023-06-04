const fs = require('fs');
let items = [];
let categories = [];

function initialize() {
    return new Promise((resolve, reject) => {
      fs.readFile('./data/items.json', 'utf8', (err, itemData) => {
        if (err) {
          reject('Unable to read items.json');
          return;
        }
        items = JSON.parse(itemData);
  
        fs.readFile('./data/categories.json', 'utf8', (err, categoryData) => {
          if (err) {
            reject('Unable to read categories.json');
            return;
          }
          categories = JSON.parse(categoryData);
          resolve();
        });
      });
    });
  }

  function getAllItems() {
    return new Promise((resolve, reject) => {
      if (items.length === 0) {
        reject('No results returned');
        return;
      }
      resolve(items);
    });
  }

  
  function getPublishedItems() {
    return new Promise((resolve, reject) => {
      const publishedItems = items.filter(item => item.published);
      if (publishedItems.length === 0) {
        reject('No results returned');
        return;
      }
      resolve(publishedItems);
    });
  }

  function getCategories() {
    return new Promise((resolve, reject) => {
      if (categories.length === 0) {
        reject('No results returned');
        return;
      }
      resolve(categories);
    });
  }

  module.exports = {
    initialize,
    getAllItems,
    getPublishedItems,
    getCategories
  };
  
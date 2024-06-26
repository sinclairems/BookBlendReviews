const fs = require('fs');
const path = require('path');

const ratingForm = fs.readFileSync(path.join(__dirname, '../public/Images/rating-form.svg'), 'utf8');
const ratingBackground = fs.readFileSync(path.join(__dirname, '../public/Images/star-background.svg'), 'utf8');

const getRandom = (max) => {
  return Math.floor(Math.random() * max);
}

const rate = (rating) => {
  const userInput  = document.querySelector('#rating').value;
  const stars = document.querySelectorAll('.stars');

  stars.forEach(star => {
    star.style.width = 0;
  });

  switch (userInput) {
    case '1':
      rating = '1';
      break;
    case '2':
      rating = '2';
      break;
    case '3':
      rating = '3';
      break;
    case '4':
      rating = '4';
      break;
    case '5':
      rating = '5';
      break;
    default:
      rating = '1';
      break;
  }

  return rating;
}

const toLowerCase = (str) => {
  return str.toLowerCase();
}

const replace = (str, find, replaceWith) => {
  return str.replace(new RegExp(find, 'g'), replaceWith);
}

module.exports = { getRandom, rate, ratingForm, ratingBackground, toLowerCase, replace};
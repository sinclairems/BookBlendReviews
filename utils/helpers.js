const fs = require('fs');
const path = require('path');

const ratingForm = fs.readFileSync(path.join(__dirname, '../public/images/rating-form.svg'), 'utf8');
const ratingBackground = fs.readFileSync(path.join(__dirname, '../public/images/star-background.svg'), 'utf8');

const getRandom = (max) => {
  return Math.floor(Math.random() * max);
}

const rate = (rating) => {
  const userInput  = document.querySelector('#rating').value;
  const stars = document.querySelectorAll('.stars');

  stars.style.width = 0;
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
  
}

module.exports = { getRandom, rate, ratingForm, ratingBackground };
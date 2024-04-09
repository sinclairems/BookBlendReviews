// Render Stars
const rate = (stars, rating) => {
    switch (rating) {
      case '1':
        stars.style.width = '20%';
        break;
      case '2':
        stars.style.width = '40%';
        break;
      case '3':
        stars.style.width = '60%';
        break;
      case '4':
        stars.style.width = '80%';
        break;
      case '5':
        stars.style.width = '100%';
        break;
      default:
        stars.style.width = '20%';
        break;
    }
  }
  
  const starsElements = document.querySelectorAll('.stars');
  starsElements.forEach(stars => {
    const rating = stars.getAttribute('data-rating');
    rate(stars, rating);
  });
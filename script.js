// Handle star rating selection with visual feedback

function setupStarRating(ratingGroupId) {
  const stars = document.querySelectorAll(`#${ratingGroupId} label`);
  const radios = document.querySelectorAll(`#${ratingGroupId} input[type="radio"]`);

  stars.forEach((starLabel, idx) => {
    starLabel.addEventListener('click', () => {
      // Mark clicked star and all stars after (because direction rtl)
      radios.forEach((radio, i) => {
        radio.checked = i === (radios.length - 1 - idx);
      });
    });

    starLabel.addEventListener('mouseenter', () => {
      stars.forEach((star, i) => {
        star.style.color = i >= idx ? '#ffc107' : '#ddd';
        star.style.transform = i >= idx ? 'scale(1.15)' : 'scale(1)';
      });
    });

    starLabel.addEventListener('mouseleave', () => {
      // Reset stars colors based on checked radio
      let checkedIndex = [...radios].findIndex(radio => radio.checked);
      stars.forEach((star, i) => {
        star.style.color = i >= (radios.length - 1 - checkedIndex) ? '#ffc107' : '#ddd';
        star.style.transform = 'scale(1)';
      });
    });
  });
}

setupStarRating('dessert-stars');
setupStarRating('server-stars');

// Optional: add form validation feedback here if you want to expand

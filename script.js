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

// Existing star rating code above here...

// Modal elements
const modal = document.getElementById('confirmationModal');
const closeModalBtn = document.getElementById('closeModalBtn');
const feedbackForm = document.getElementById('feedbackForm');

// Show modal function
function showModal() {
  modal.classList.add('show');
  modal.setAttribute('aria-hidden', 'false');
  closeModalBtn.focus();
}

// Hide modal function
function hideModal() {
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden', 'true');
  feedbackForm.querySelector('button[type="submit"]').focus();
}

// Close modal button event
closeModalBtn.addEventListener('click', hideModal);

// Close modal on outside click
modal.addEventListener('click', e => {
  if (e.target === modal) hideModal();
});

// Handle form submission
feedbackForm.addEventListener('submit', e => {
  e.preventDefault();

  // Disable submit button to prevent multiple submits
  feedbackForm.querySelector('button[type="submit"]').disabled = true;

  const formData = new FormData(feedbackForm);

  fetch(feedbackForm.action, {
    method: 'POST',
    body: formData,
    headers: { 'Accept': 'application/json' }
  })
    .then(response => {
      if (response.ok) {
        feedbackForm.reset();
        showModal();
      } else {
        alert('Oops! There was a problem submitting your feedback. Please try again.');
      }
    })
    .catch(() => {
      alert('Oops! There was a problem submitting your feedback. Please try again.');
    })
    .finally(() => {
      feedbackForm.querySelector('button[type="submit"]').disabled = false;
    });
});

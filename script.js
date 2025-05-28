// VARIABLES
const form = document.querySelector('.contact-form');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const messageInput = document.querySelector('textarea[name="message"]');
const submitBtn = document.querySelector('.submit-btn');

// FUNCTION TO VALIDATE FORM
function validateForm(event) {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    alert("Please enter a valid email address.");
    return;
  }

  alert(`Thank you, ${name}! Your message has been sent.`);
  form.reset();

  // Update button state
  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  // Redirect after 5 seconds
  setTimeout(() => {
    window.location.href = "index.html";
  }, 5000);
}

// EVENT LISTENER
form.addEventListener('submit', validateForm);

// Hover effects
submitBtn.addEventListener('mouseover', () => {
  submitBtn.style.backgroundColor = '#F25D07';
});
submitBtn.addEventListener('mouseout', () => {
  submitBtn.style.backgroundColor = '#011a24';
});

// Share link function
function copyLink() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    alert("🔗 Page link copied to clipboard!");
  }).catch(() => {
    alert("Failed to copy the link. Please try manually.");
  });
}

// Share link function
function toggleMenu() {
  document.getElementById('menu').classList.toggle('active');
}

document.querySelector('#contact-form').addEventListener('submit', (e) => {
  e.preventDefault();

  // Clear form fields
  e.target.elements.name.value = '';
  e.target.elements.email.value = '';
  e.target.elements.message.value = '';

  // Optional: show success message
  alert('Message sent successfully!');
});

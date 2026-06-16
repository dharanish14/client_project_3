// EmailJS Configuration (Fill this out to enable real emails & PDF attachments)
window.EMAILJS_CONFIG = {
  PUBLIC_KEY: '',        // e.g. 'user_xxxxxxxxxxxxxxxx'
  SERVICE_ID: '',        // e.g. 'service_xxxxxxx'
  TEMPLATE_ID_OTP: '',   // e.g. 'template_otp'
  TEMPLATE_ID_WELCOME: '',// e.g. 'template_welcome'
};

// NUNP site form endpoints. Replace placeholders with real Google Sheets Apps Script Web App URLs or webhooks.
window.NUNP_FORM_ENDPOINTS = {
  // Replace this with your Google Apps Script Web App URL for Join the Movement
  'join': '',
  
  // Replace this with your Google Apps Script Web App URL for Become a Volunteer
  'volunteer': 'https://script.google.com/macros/s/AKfycbwwbXsvTwIM8cUc9ICf6PzLKM1IoZ0HXDZrFWLIoA8rY9QbYoHT6E74-bYSTr9uIKim5w/exec',
  
  // Example contact form
  'contact': 'https://formspree.io/f/your-form-id',
};

// Optionally, set a global default endpoint used when forms lack a specific endpoint.
window.NUNP_FORM_ENDPOINTS['default'] = '';


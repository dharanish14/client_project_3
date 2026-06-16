// NUNP site form endpoints. Replace placeholders with real Google Sheets Apps Script Web App URLs or webhooks.
window.NUNP_FORM_ENDPOINTS = {
  // Replace this with your Google Apps Script Web App URL for Join the Movement
  'join': '',
  
  // Replace this with your Google Apps Script Web App URL for Become a Volunteer
  'volunteer': '',
  
  // Example contact form
  'contact': 'https://formspree.io/f/your-form-id',
};

// Optionally, set a global default endpoint used when forms lack a specific endpoint.
window.NUNP_FORM_ENDPOINTS['default'] = '';

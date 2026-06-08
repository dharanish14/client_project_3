// NUNP site form endpoints. Replace placeholders with real endpoints (Formspree or EmailJS webhook URL).
window.NUNP_FORM_ENDPOINTS = {
  // Example: 'join' form => 'https://formspree.io/f/your-form-id'
  'join': 'https://formspree.io/f/your-form-id',
  // Example contact form
  'contact': 'https://formspree.io/f/your-form-id',
};

// Optionally, set a global default endpoint used when forms lack a specific endpoint.
window.NUNP_FORM_ENDPOINTS['default'] = '';

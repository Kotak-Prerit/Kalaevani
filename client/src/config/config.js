const config = {
  API_URL: window.location.hostname === 'localhost' 
    ? 'http://localhost:4000'
    : 'https://' + window.location.hostname.replace('www.', 'api.'),
  IS_PRODUCTION: window.location.hostname !== 'localhost'
};

export default config; 
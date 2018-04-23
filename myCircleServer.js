var axios = require('axios');
var config = require('./config');

var axiosInstance = axios.create({
  baseURL: config.baseUrl,
  /* other custom settings */
});

module.exports = axiosInstance;
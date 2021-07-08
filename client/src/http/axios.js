import axios from 'axios';
require('dotenv').config();

const $authHost = axios.create({
   baseURL: process.env.REACT_APP_API_URL,
});

const $host = axios.create({
   baseURL: process.env.REACT_APP_API_URL,
});

export { $host, $authHost };

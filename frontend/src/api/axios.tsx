import axios from 'axios';
let token = null;
if (typeof window !== 'undefined') {
  // Perform localStorage action
  token = localStorage.getItem('access_token');
}

const api = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your API's base URL
  withCredentials: true,
  headers: {
    Authorization: 'Bearer ' + token,
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Headers':
      'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
  },
});

export default api;

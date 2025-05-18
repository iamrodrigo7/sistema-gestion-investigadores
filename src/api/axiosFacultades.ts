import axios from 'axios';

const apiFacultades = axios.create({
  baseURL: 'http://192.168.88.252:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiFacultades;

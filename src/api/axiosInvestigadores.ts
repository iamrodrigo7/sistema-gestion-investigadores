import axios from 'axios';

const apiInvestigadores = axios.create({
  baseURL: 'http://192.168.88.252:5001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiInvestigadores;

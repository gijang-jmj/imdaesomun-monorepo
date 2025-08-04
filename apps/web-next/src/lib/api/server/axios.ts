import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'x-imdaesomun-api-key': process.env.X_IMDAESOMUN_API_KEY,
  },
});

export default axiosInstance;

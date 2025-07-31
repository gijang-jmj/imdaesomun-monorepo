import axios from 'axios';
import { getToken } from 'firebase/app-check';
import { appCheck } from '@/firebase';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// firebase app check token interceptor
axiosInstance.interceptors.request.use(async (config) => {
  try {
    const tokenResult = await getToken(appCheck);
    if (tokenResult?.token) {
      config.headers['X-Firebase-AppCheck'] = tokenResult.token;
    }
  } catch (e) {
    console.warn('App Check token failed to attach:', e);
  }

  return config;
});

export default axiosInstance;

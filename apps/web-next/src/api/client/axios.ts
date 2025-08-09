import axios from 'axios';
import { getToken } from 'firebase/app-check';
import { appCheckInstance } from '../../../firebase';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// firebase app check token interceptor
axiosInstance.interceptors.request.use(async (config) => {
  if (!appCheckInstance) {
    console.warn('App Check instance is not initialized.');
    return config;
  }

  try {
    const tokenResult = await getToken(appCheckInstance);
    if (tokenResult?.token) {
      config.headers['X-Firebase-AppCheck'] = tokenResult.token;
    }
  } catch (e) {
    console.warn('App Check token failed to attach:', e);
  }

  return config;
});

export { axiosInstance };

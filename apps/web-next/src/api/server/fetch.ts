export const fetchOptions = {
  headers: {
    'x-imdaesomun-api-key': process.env.X_IMDAESOMUN_API_KEY,
  },
  next: { revalidate: 300 },
};

export const fetchInstance = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  options: fetchOptions,
};

const { logger } = require('firebase-functions');

const axios = require('axios');

const revalidateHomePage = async () => {
  try {
    const response = await axios.get(
      'https://imdaesomun.vercel.app/api/revalidate',
      {
        headers: {
          'x-imdaesomun-api-key': process.env.IMDAESOMUN_API_KEY,
        },
      }
    );

    logger.log('[revalidateHomePage] Revalidation successful:', response.data);
  } catch (error) {
    logger.error('[revalidateHomePage] Error revalidating:', error);
  }
};

module.exports = {
  revalidateHomePage,
};

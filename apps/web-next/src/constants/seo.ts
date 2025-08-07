import type { Metadata } from 'next';

export const baseOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: '임대소문',
  title: '임대소문',
  description: '공공임대 정보 한눈에 보기',
  url: 'https://imdaesomun.web.app',
  images: [
    {
      url: 'https://imdaesomun.web.app/og.png',
      width: 1200,
      height: 630,
    },
  ],
};

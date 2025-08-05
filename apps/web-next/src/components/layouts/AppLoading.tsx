'use client';

import Lottie from 'lottie-react';
import animationData from '@imdaesomun/assets/lottie/loading.json';
import { useLoadingStore } from '@/stores/loading.store';

export const AppLoading = () => {
  const isLoading = useLoadingStore((state) => state.isLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center`}>
      <div className="absolute inset-0 bg-black opacity-50" />
      <div className="max-w-xs">
        <Lottie animationData={animationData} loop={true} autoplay={true} />
      </div>
    </div>
  );
};

'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface AppModalLayoutProps {
  children: React.ReactNode;
}

export const AppModalLayout = ({ children }: AppModalLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add('no-scroll');
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, []);

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={() => router.back()}
      />
      <div className="z-1 mx-4 w-full max-w-sm rounded-xl bg-gray-50 p-4 shadow-xl">
        {children}
      </div>
    </div>
  );
};

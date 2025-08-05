'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IconProfile } from '../icons/IconProfile';

interface AppAvatarProps {
  photoURL?: string | null;
  isLogin: boolean;
  className?: string | null;
}

export const AppAvatar = ({ photoURL, isLogin, className }: AppAvatarProps) => {
  const [hasError, setHasError] = useState(false);

  const onImageError = () => {
    setHasError(true);
  };

  const containerClass = isLogin ? 'bg-teal-500-10' : 'bg-gray-500-10';

  const avatarClass = isLogin ? 'text-teal-500' : 'text-gray-400';

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-full ${containerClass} ${className}`}
    >
      {photoURL && !hasError ? (
        <Image fill src={photoURL} alt="User Avatar" onError={onImageError} />
      ) : (
        <IconProfile className={`w-4/5 ${avatarClass}`} />
      )}
    </div>
  );
};

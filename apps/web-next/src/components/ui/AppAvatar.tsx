'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import IconProfile from '../icons/IconProfile';

type AppAvatarProps = {
  photoURL?: string | null;
  isLogin: boolean;
  className?: string | null;
};

const AppAvatar: React.FC<AppAvatarProps> = ({
  photoURL,
  isLogin,
  className,
}) => {
  const [hasError, setHasError] = useState(false);

  const onImageError = () => {
    setHasError(true);
  };

  const containerClass = isLogin ? 'bg-teal-500-10' : 'bg-gray-500-10';

  const avatarClass = isLogin ? 'text-teal-500' : 'text-gray-400';

  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full ${containerClass} ${className}`}
    >
      {photoURL && !hasError ? (
        <Image
          src={photoURL}
          alt="User Avatar"
          onError={onImageError}
          width={24}
          height={24}
        />
      ) : (
        <IconProfile className={`w-4/5 ${avatarClass}`} />
      )}
    </div>
  );
};

export default AppAvatar;

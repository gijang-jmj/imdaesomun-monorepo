'use client';

import { IconBookmarkCheck } from '@/components/icons/IconBookmarkCheck';
import { IconHome } from '@/components/icons/IconHome';
import { IconProfile } from '@/components/icons/IconProfile';
import { AppRoute } from '@imdaesomun/shared/constants/app-route';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AppNav = () => {
  const pathname = usePathname();

  const user = {
    isLoggedIn: false, // Replace with actual user state
    photoURL: '', // Replace with actual user photo URL
  };

  const onAvatarClick = () => {
    if (user.isLoggedIn) {
      // Open Profile Modal
      console.log('Open Profile Modal');
    } else {
      // Open Login Modal
      console.log('Open Login Modal');
    }
  };

  return (
    <nav className="sticky bottom-0 md:hidden">
      <div className="flex items-center justify-around border-t border-gray-100 bg-white">
        <Link
          href="/"
          className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-gray-400 transition-colors hover:text-teal-500 ${pathname === '/' || pathname === AppRoute.HOME ? 'text-teal-500' : 'text-gray-400'}`}
        >
          <IconHome className="h-5" />
          <span className="text-caption-bold">임대소문</span>
        </Link>
        <Link
          href="/saved"
          className={`flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-gray-400 transition-colors hover:text-teal-500 ${pathname === AppRoute.SAVED ? 'text-teal-500' : 'text-gray-400'}`}
        >
          <IconBookmarkCheck className="h-5" />
          <span className="text-caption-bold">저장됨</span>
        </Link>
        <div
          onClick={onAvatarClick}
          className="flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.5 py-2 text-gray-400 transition-colors hover:text-teal-500"
        >
          <IconProfile className="h-5" />
          <span className="text-caption-bold">내정보</span>
        </div>
      </div>
    </nav>
  );
};

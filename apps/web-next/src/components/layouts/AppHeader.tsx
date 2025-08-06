'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { IconHomeFill } from '@/components/icons/IconHomeFill';
import { AppRoute } from '@imdaesomun/shared/constants/app-route';
import { useUserStore } from '@/stores/user.store';
import { AppAvatar } from '../ui/AppAvatar';
import { Modal } from '@/lib/constants/modal';

export const AppHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const onAvatarClick = () => {
    if (isLoggedIn) {
      router.push(Modal.PROFILE, { scroll: false });
    } else {
      router.push(Modal.LOGIN, { scroll: false });
    }
  };

  return (
    <header className="border-b border-gray-100 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-2 md:py-4">
        <div className="flex items-end gap-10">
          <Link href={AppRoute.HOME} className="flex items-center gap-2">
            <IconHomeFill className="h-6 text-teal-500 md:h-8" />
            <span className="text-subtitle-bold md:text-title-bold text-teal-500">
              임대소문
            </span>
          </Link>
          <nav className="hidden items-center gap-4 md:flex">
            <Link
              href={AppRoute.HOME}
              className={`text-subtitle rounded-lg px-3 py-1 transition-colors hover:text-teal-500 ${
                pathname === '/' || pathname === AppRoute.HOME
                  ? 'text-teal-500'
                  : 'text-gray-400'
              }`}
            >
              홈
            </Link>
            <Link
              href={AppRoute.SAVED}
              className={`text-subtitle rounded-lg px-3 py-1 transition-colors hover:text-teal-500 ${
                pathname === AppRoute.SAVED ? 'text-teal-500' : 'text-gray-400'
              }`}
            >
              내 공고
            </Link>
          </nav>
        </div>
        <div className="cursor-pointer px-3 py-1" onClick={onAvatarClick}>
          <AppAvatar
            className="h-7 w-7"
            photoURL={user?.photoURL}
            isLogin={isLoggedIn}
          />
        </div>
      </div>
    </header>
  );
};

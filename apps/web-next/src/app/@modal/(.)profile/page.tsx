'use client';

import { AppModalLayout } from '@/components/layouts/AppModalLayout';
import { InfoCard } from '@/components/shared/InfoCard';
import { AppAvatar } from '@/components/ui/AppAvatar';
import { Modal } from '@/constants/modal';
import { useUserStore } from '@/stores/user.store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfileModal() {
  const router = useRouter();

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace(Modal.LOGIN, { scroll: false });
    }
  }, []);

  return (
    <AppModalLayout>
      <div className="flex flex-col items-center gap-4">
        <InfoCard
          className="w-full"
          content="프로필 정보를 확인하고 로그아웃할 수 있어요"
        />
        <AppAvatar
          className="h-16 w-16"
          photoURL={user?.photoURL}
          isLogin={isLoggedIn}
        />
        <div className="text-center">
          <p className="text-subtitle-bold">{user?.displayName}</p>
          <p className="text-body text-gray-500">{user?.email}</p>
        </div>
        <div className="mt-4 flex w-full flex-col gap-2">
          <button
            onClick={() => logout(() => router.back())}
            className="text-body w-full cursor-pointer rounded-lg bg-red-100 px-4 py-2 text-red-500 transition-colors hover:bg-red-200"
          >
            로그아웃
          </button>
          <button
            onClick={() => router.back()}
            className="bg-gray-500-10 text-body w-full cursor-pointer rounded-lg px-4 py-2 text-gray-500 transition-colors hover:bg-gray-300"
          >
            닫기
          </button>
        </div>
      </div>
    </AppModalLayout>
  );
}

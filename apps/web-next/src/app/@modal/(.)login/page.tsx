'use client';

import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/user.store';
import { InfoCard } from '@/components/shared/InfoCard';
import { IconHomeFill } from '@/components/icons/IconHomeFill';
import { GoogleButton } from '@/components/shared/GoogleButton';
import { AppModalLayout } from '@/components/layouts/AppModalLayout';
import { useEffect } from 'react';
import { Modal } from '@/lib/constants/modal';

export default function LoginModal() {
  const router = useRouter();

  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const login = useUserStore((state) => state.login);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(Modal.PROFILE, { scroll: false });
    }
  }, []);

  return (
    <AppModalLayout>
      <div className="flex flex-col gap-4">
        <InfoCard content="서비스 이용을 위해 로그인이 필요해요" />
        <div className="flex flex-col items-center">
          <IconHomeFill className="h-10 flex-shrink-0 text-teal-500" />
          <span className="text-title-bold text-teal-500">임대소문</span>
        </div>
        <div className="mt-4 flex w-full flex-col gap-2">
          <GoogleButton onClick={() => login(() => router.back())} />
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

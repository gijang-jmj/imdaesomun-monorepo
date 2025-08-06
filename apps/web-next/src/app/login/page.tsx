'use client';

import { IconHomeFill } from '@/components/icons/IconHomeFill';
import { GoogleButton } from '@/components/shared/GoogleButton';
import { InfoCard } from '@/components/shared/InfoCard';
import { useUserStore } from '@/stores/user.store';
import { AppRoute } from '@imdaesomun/shared/constants/app-route';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();

  const login = useUserStore((state) => state.login);

  return (
    <>
      <div className="mx-4 my-2 flex flex-col items-stretch justify-start gap-2">
        <InfoCard content="관심 있는 공고를 언제든지 저장할 수 있어요" />
      </div>
      <div className="m-4 flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm rounded-xl bg-white p-4 shadow-sm">
          <div className="flex flex-col items-center">
            <IconHomeFill className="h-10 flex-shrink-0 text-teal-500" />
            <span className="text-title-bold text-teal-500">임대소문</span>
          </div>
          <div className="mt-4 flex w-full flex-col gap-2">
            <GoogleButton
              onClick={() =>
                login(() => {
                  router.replace(AppRoute.SAVED);
                })
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

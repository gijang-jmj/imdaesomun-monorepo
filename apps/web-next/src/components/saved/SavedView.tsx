'use client';

import { useUserStore } from '@/stores/user.store';
import { SavedLogin } from './SavedLogin';
import { InfoCard } from '../shared/InfoCard';

export const SavedView = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <SavedLogin />;
  }

  return (
    <>
      <div className="mx-4 my-2 flex flex-col items-stretch justify-start gap-2">
        <InfoCard content="최근에 저장된 공고순으로 저장되어 있어요" />
      </div>
    </>
  );
};

'use client';

import { useUserStore } from '@/stores/user.store';
import { SavedLogin } from './SavedLogin';
import { InfoCard } from '../shared/InfoCard';
import { useSavedNoticeList } from '@/queries/useSavedNoticeList';
import { SavedFilter } from './SavedFilter';
import { IconHomeFill } from '../icons/IconHomeFill';
import { SavedContent } from './SavedContent';

export const SavedView = () => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const {
    savedNotices,
    totalCount,
    shCount,
    ghCount,
    ihCount,
    bmcCount,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
  } = useSavedNoticeList();

  if (!isLoggedIn) {
    return <SavedLogin />;
  }

  return (
    <>
      <div className="mx-4 my-2 flex flex-col items-stretch justify-start gap-2">
        <InfoCard content="최근에 저장된 공고순으로 저장되어 있어요" />
      </div>
      <SavedFilter
        totalCount={totalCount}
        shCount={shCount}
        ghCount={ghCount}
        ihCount={ihCount}
        bmcCount={bmcCount}
      />
      {savedNotices.length <= 0 && !isLoading ? (
        <div className="m-4 flex flex-1 items-center justify-center">
          <IconHomeFill className="text-gray-500-10 h-20 flex-shrink-0 md:h-30" />
        </div>
      ) : (
        <SavedContent
          savedNotices={savedNotices}
          isError={isError}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      )}
    </>
  );
};

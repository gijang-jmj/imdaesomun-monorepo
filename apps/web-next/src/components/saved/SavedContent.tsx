import { Notice } from '@imdaesomun/shared/types/notice';
import { ErrorCard } from '../shared/ErrorCard';
import { SavedCard } from './SavedCard';
import { SavedCardSkeleton } from './SavedCardSkeleton';
import { useEffect, useRef } from 'react';

interface SavedContentProps {
  savedNotices: Notice[];
  isError: boolean;
  isLoading: boolean;
  fetchNextPage: () => void;
}

export const SavedContent = ({
  savedNotices,
  isError,
  isLoading,
  fetchNextPage,
}: SavedContentProps) => {
  const bottomContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        threshold: 0,
      }
    );

    const currentRef = bottomContainerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNextPage]);

  return (
    <>
      <div className="mb-24 grid grid-cols-1 gap-x-4 gap-y-2 px-4 py-2 md:grid-cols-2">
        {/* 저장된 공고 불러오기 오류 */}
        {isError ? (
          <ErrorCard content="'저장된 공고를 불러오는 중 오류가 발생했어요\n잠시 후 다시 시도해주세요'" />
        ) : null}
        {/* 저장된 공고 목록 */}
        {savedNotices.length > 0
          ? savedNotices.map((notice) => (
              <SavedCard
                key={notice.id}
                id={notice.id}
                title={notice.title}
                date={notice.regDate}
                department={notice.department}
                corporation={notice.corporation}
              />
            ))
          : null}
        {/* 저장된 공고 로딩 */}
        {isLoading
          ? Array.from({ length: 10 }).map((_, i) => (
              <SavedCardSkeleton key={i} />
            ))
          : null}
      </div>
      <div ref={bottomContainerRef} />
    </>
  );
};

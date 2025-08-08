import { getSavedNotices } from '@/api/client/notice.api';
import { useSavedFilterStore } from '@/stores/filter.store';
import { useUserStore } from '@/stores/user.store';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useSavedNoticeList = () => {
  const user = useUserStore((state) => state.user);
  const filter = useSavedFilterStore((state) => state.savedFilter);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['savedNotices', user?.uid, filter],
    queryFn: ({ pageParam = 0 }) => {
      if (!user?.uid) {
        return Promise.reject(new Error('User not logged in'));
      }
      return getSavedNotices({
        userId: user.uid,
        offset: pageParam,
        limit: 15,
        corporation: filter || undefined,
      });
    },
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.nextOffset : undefined;
    },
    enabled: !!user?.uid,
    initialPageParam: 0,
  });

  const savedNotices = data?.pages.flatMap((page) => page.notices) || [];
  const firstPage = data?.pages[0];

  return {
    savedNotices,
    totalCount: firstPage?.totalCount ?? 0,
    shCount: firstPage?.shCount ?? 0,
    ghCount: firstPage?.ghCount ?? 0,
    ihCount: firstPage?.ihCount ?? 0,
    bmcCount: firstPage?.bmcCount ?? 0,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
    refetch,
  };
};

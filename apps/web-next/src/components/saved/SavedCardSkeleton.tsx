export const SavedCardSkeleton = () => {
  return (
    <div className="flex flex-col items-start gap-2 rounded-xl bg-white p-4 shadow-sm">
      <div className="bg-gray-500-10 h-5 w-full animate-pulse rounded" />
      <div className="flex flex-wrap gap-x-3">
        <div className="flex items-center gap-1">
          <div className="bg-gray-500-10 h-4 w-4 animate-pulse rounded-full" />
          <div className="bg-gray-500-10 h-4 w-12 animate-pulse rounded" />
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-gray-500-10 h-4 w-4 animate-pulse rounded-full" />
          <div className="bg-gray-500-10 h-4 w-12 animate-pulse rounded" />
        </div>
        <div className="flex items-center gap-1">
          <div className="bg-gray-500-10 h-4 w-4 animate-pulse rounded-full" />
          <div className="bg-gray-500-10 h-4 w-12 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
};

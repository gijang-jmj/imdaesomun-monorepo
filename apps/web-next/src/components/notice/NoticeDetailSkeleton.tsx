export const NoticeDetailSkeleton = () => {
  return (
    <div className="mx-4 mt-2 mb-56 rounded-xl bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex animate-pulse flex-col gap-2 border-b border-gray-100 pb-4">
        <div className="flex flex-col gap-2">
          <div className="bg-gray-500-10 h-5 w-1/4 rounded"></div>
          <div className="bg-gray-500-10 h-6 w-3/4 rounded"></div>
        </div>
        <div className="flex flex-wrap gap-x-3">
          <div className="bg-gray-500-10 h-5 w-1/3 rounded"></div>
          <div className="bg-gray-500-10 h-5 w-1/4 rounded"></div>
        </div>
      </div>
      <div className="mb-4 flex animate-pulse flex-col items-start gap-2 border-b border-gray-100 pb-4">
        <div className="bg-gray-500-10 h-5 w-1/5 rounded"></div>
        <div className="bg-gray-500-10 h-5 w-full rounded"></div>
        <div className="bg-gray-500-10 h-5 w-2/3 rounded"></div>
      </div>
      <div className="flex animate-pulse flex-col gap-4">
        <div className="bg-gray-500-10 h-5 w-full rounded"></div>
        <div className="bg-gray-500-10 h-5 w-full rounded"></div>
        <div className="bg-gray-500-10 h-5 w-5/6 rounded"></div>
      </div>
    </div>
  );
};

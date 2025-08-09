import { NoticeBanner } from '@/components/home/NoticeBanner';
import { NoticeCardSkeleton } from '@/components/home/NoticeCardSkeleton';
import { IconBmc } from '@/components/icons/IconBmc';
import { IconGh } from '@/components/icons/IconGh';
import { IconIh } from '@/components/icons/IconIh';
import { IconSh } from '@/components/icons/IconSh';
import { InfoCard } from '@/components/shared/InfoCard';
import { NoticeCorporationTypeKor } from '@imdaesomun/shared/constants/notice';

export default function Loading() {
  const corporationData = [
    { title: NoticeCorporationTypeKor.sh, Icon: IconSh },
    { title: NoticeCorporationTypeKor.gh, Icon: IconGh },
    { title: NoticeCorporationTypeKor.ih, Icon: IconIh },
    { title: NoticeCorporationTypeKor.bmc, Icon: IconBmc },
  ];

  return (
    <>
      <div className="mx-4 my-2 flex flex-col items-stretch justify-start gap-2">
        <InfoCard content="최근 10개 공고만 제공되며, 과거 공고 및 검색·정렬 기능은 각 공사의 공식 홈페이지를 이용해주세요" />
      </div>
      <div className="mb-24 grid grid-cols-1 gap-x-4 gap-y-8 p-4 md:grid-cols-2">
        {corporationData.map(({ title, Icon }, idx) => (
          <div key={idx} className="flex flex-col items-stretch gap-2">
            <NoticeBanner title={title}>
              <Icon className="w-7 md:w-8" />
            </NoticeBanner>
            {Array.from({ length: 10 }).map((_, index) => (
              <NoticeCardSkeleton key={index} />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

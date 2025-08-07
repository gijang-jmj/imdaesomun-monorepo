import { NoticeBanner } from '@/components/home/NoticeBanner';
import { NoticeCard } from '@/components/home/NoticeCard';
import { InfoCard } from '@/components/shared/InfoCard';
import { ErrorCard } from '@/components/shared/ErrorCard';
import { NoticeCorporationTypeKor } from '@imdaesomun/shared/constants/notice';
import { Notice } from '@imdaesomun/shared/types/notice';
import { IconSh } from '@/components/icons/IconSh';
import {
  getBmcNoticeList,
  getGhNoticeList,
  getIhNotice,
  getShNoticeList,
} from '@/api/server/notice.api';
import { IconGh } from '@/components/icons/IconGh';
import { IconIh } from '@/components/icons/IconIh';
import { IconBmc } from '@/components/icons/IconBmc';

export default async function Home() {
  const results = await Promise.allSettled([
    getShNoticeList(),
    getGhNoticeList(),
    getIhNotice(),
    getBmcNoticeList(),
  ]);

  const [shResult, ghResult, ihResult, bmcResult] = results;

  const corporationData = [
    { result: shResult, title: NoticeCorporationTypeKor.sh, Icon: IconSh },
    { result: ghResult, title: NoticeCorporationTypeKor.gh, Icon: IconGh },
    { result: ihResult, title: NoticeCorporationTypeKor.ih, Icon: IconIh },
    { result: bmcResult, title: NoticeCorporationTypeKor.bmc, Icon: IconBmc },
  ];

  return (
    <>
      <div className="mx-4 my-2 flex flex-col items-stretch justify-start gap-2">
        <InfoCard content="최근 10개 공고만 제공되며, 과거 공고 및 검색·정렬 기능은 각 공사의 공식 홈페이지를 이용해주세요" />
      </div>
      <div className="mb-24 grid grid-cols-1 gap-x-4 gap-y-8 p-4 md:grid-cols-2">
        {corporationData.map(({ result, title, Icon }, idx) => (
          <div key={idx} className="flex flex-col items-stretch gap-2">
            <NoticeBanner title={title}>
              <Icon className="w-7 md:w-8" />
            </NoticeBanner>
            {result.status === 'rejected' ? (
              <ErrorCard
                content={
                  '공고를 불러오는 중 오류가 발생했어요\n잠시 후 다시 시도해주세요'
                }
              />
            ) : (
              result.value.map((notice: Notice) => (
                <NoticeCard
                  key={notice.id}
                  id={notice.id}
                  title={notice.title}
                  date={notice.regDate}
                  views={notice.hits}
                  department={notice.department}
                />
              ))
            )}
          </div>
        ))}
      </div>
    </>
  );
}

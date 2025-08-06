import { NoticeDetail } from '@/components/notice/NoticeDetail';
import { ErrorCard } from '@/components/shared/ErrorCard';
import { getNoticeById } from '@/lib/api/server/notice.api';
import { baseOpenGraph } from '@/lib/constants/seo';
import { getNoticeCorporationTypeKor } from '@imdaesomun/shared/helpers/notice-helper';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ noticeId: string }>;
}): Promise<Metadata> {
  const { noticeId } = await params;

  try {
    const notice = await getNoticeById(noticeId);

    return {
      title: `임대소문 - ${notice.corporation.toUpperCase()} 공고상세`,
      description:
        '서울, 경기, 인천, 부산 등 SH·GH·IH·BMC 공사의 공공임대주택 정보를 한곳에 모았습니다. 임대소문에서 주택청약과 임대 공고를 빠르게 확인하세요.',
      openGraph: {
        ...baseOpenGraph,
        type: 'article',
        title: `임대소문 - ${getNoticeCorporationTypeKor(notice.corporation)}`,
        description: notice.title,
      },
    };
  } catch {
    return {
      title: '임대소문 - 공고상세',
      description:
        '서울, 경기, 인천, 부산 등 SH·GH·IH·BMC 공사의 공공임대주택 정보를 한곳에 모았습니다. 임대소문에서 주택청약과 임대 공고를 빠르게 확인하세요.',
    };
  }
}

export default async function Notice({
  params,
}: {
  params: Promise<{ noticeId: string }>;
}) {
  const { noticeId } = await params;

  try {
    const notice = await getNoticeById(noticeId);

    return <NoticeDetail id={noticeId} notice={notice} />;
  } catch (error) {
    console.error('Failed to fetch notice:', error);

    return (
      <ErrorCard
        className="mx-4 my-2"
        content={
          '공고 상세를 불러오는 중 오류가 발생했어요\n잠시 후 다시 시도해주세요'
        }
      />
    );
  }
}

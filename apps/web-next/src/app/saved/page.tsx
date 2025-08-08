import { SavedView } from '@/components/saved/SavedView';
import { baseOpenGraph } from '@/constants/seo';
import { ReactQueryProvider } from '@/queries/ReactQueryProvider';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '임대소문 - 저장된 공고',
  description:
    '서울, 경기, 인천, 부산 등 SH·GH·IH·BMC 공사의 공공임대주택 정보를 한곳에 모았습니다. 임대소문에서 주택청약과 임대 공고를 빠르게 확인하세요.',
  openGraph: baseOpenGraph,
};

export default function Saved() {
  return (
    <ReactQueryProvider>
      <SavedView />
    </ReactQueryProvider>
  );
}

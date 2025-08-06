import type { Metadata } from 'next';
import './globals.css';
import { AppHeader } from '@/components/layouts/AppHeader';
import { AppNav } from '@/components/layouts/AppNav';
import { AppFooter } from '@/components/layouts/AppFooter';
import { AppLoading } from '@/components/layouts/AppLoading';
import { baseOpenGraph } from '@/lib/constants/seo';

export const metadata: Metadata = {
  title: '임대소문 - 공공임대 정보 한눈에 보기',
  description:
    '서울, 경기, 인천, 부산 등 SH·GH·IH·BMC 공사의 공공임대주택 정보를 한곳에 모았습니다. 임대소문에서 주택청약과 임대 공고를 빠르게 확인하세요.',
  openGraph: baseOpenGraph,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="kr">
      <body>
        <div className="flex min-h-screen flex-col">
          <AppLoading />
          <AppHeader />
          <main className="flex flex-1 flex-col">
            <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col">
              {children}
            </div>
          </main>
          <AppNav />
          <AppFooter />
        </div>
      </body>
    </html>
  );
}

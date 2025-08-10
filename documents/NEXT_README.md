# 🏠 임대소문 - 임대주택 공고 모아보기

Legacy(Vue 3) 버전을 Next.js(App Router)으로 재구현한 **SSR 웹 애플리케이션**입니다.

## 🚀 프로덕션 URL

**https://imdaesomun.vercel.app/**

## 🔍 주요 기능

- 임대 공고 통합 조회 (SH / GH / IH / BMC)
- 공고 상세 + 원문 첨부/바로가기
- Google 인증 로그인 및 공고 저장 / 저장 목록 관리
- 저장된 공고 필터(기관/조건) + 정렬

## 🔁 Legacy 대비 주요 개선 포인트

- App Router(Server Components) 기반 → **초기 페인트 & SEO 메타 개선**
- URL Intercepted Route(`app/@modal/(.)login` 등) → **실제 라우트로 모달 상태를 히스토리에 반영**
- 클라이언트 / 서버 API 래퍼 분리 (`api/client`, `api/server`) → **환경별 fetch 전략 최적화**
- React Query + 서버 fetch 하이브리드 → **중복 요청 감소 & 캐싱 일관성**

## ⏱️ 개발 기간

| 단계 | 기간               | 비고                       |
| ---- | ------------------ | -------------------------- |
| 설계 | 2025.07.26 ~ 08.02 | Legacy 분석/폴더 구조 수립 |
| 구현 | 2025.08.03 ~ 08.08 | 마이그레이션 + 개선        |
| QA   | 2025.08.09 ~ 08.10 | 기능 및 메타 확인          |
| 오픈 | 2025.08.10 ~       | -                          |

> 실제 일정 확정 뒤 위 표 업데이트 권장.

## 🛠️ 기술 스택

| 항목        | 내용                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| 프레임워크  | Next.js 15 (App Router, RSC)                                           |
| 언어        | TypeScript                                                             |
| 데이터 패칭 | fetch(서버) + Axios(클라이언트)                                        |
| 상태/캐싱   | React Query + Zustand                                                  |
| 스타일      | Tailwind CSS v4 (프로젝트 공통 스타일 @imdaesomun/assets)              |
| 애니메이션  | lottie-react                                                           |
| 인증        | Firebase Auth (Google)                                                 |
| 보안        | Firebase App Check + CORS 제한                                         |
| 배포        | Vercel                                                                 |
| 번들        | SWC(프로덕션) + Turbopack(dev)                                         |
| 내부 패키지 | @imdaesomun/assets(아이콘/스타일) · @imdaesomun/shared(공통 타입/유틸) |

## 📂 디렉토리 구조

`apps/web-next/src` 기준 주요 구조입니다.

### Tree

```bash
src/
├─ api/
│  ├─ client/
│  │  ├─ axios.ts          # Axios 기본 인스턴스/인터셉터
│  │  └─ notice.api.ts     # 브라우저 전용 공고 API 호출
│  └─ server/
│     ├─ fetch.ts          # 서버 전용 fetch 유틸
│     └─ notice.api.ts     # 서버(RSC/route) 공고 API
├─ app/
│  ├─ layout.tsx           # 루트 레이아웃 (폰트/메타/Provider 래핑)
│  ├─ page.tsx             # 홈 리다이렉트 or 초기 뷰
│  ├─ home/                # 홈(공고 리스트) 세그먼트
│  │  ├─ page.tsx
│  │  └─ loading.tsx       # 스트리밍 로딩
│  ├─ notice/[noticeId]/   # 공고 상세 동적 라우트
│  │  ├─ page.tsx
│  │  └─ loading.tsx
│  ├─ saved/page.tsx       # 저장한 공고 페이지
│  ├─ @modal/              # 인터셉트 모달 세그먼트
│  │  ├─ default.tsx
│  │  ├─ (.)login/page.tsx   # 모달 로그인
│  │  └─ (.)profile/page.tsx # 모달 프로필
│  ├─ favicon/             # 앱 아이콘 자산
│  ├─ manifest.ts          # PWA Manifest 정의
│  ├─ not-found.tsx        # 404 핸들링
│  └─ globals.css          # 전역 스타일 (Tailwind)
├─ components/
│  ├─ home/                # 홈 전용 카드/배너
│  ├─ notice/              # 상세 관련
│  ├─ saved/               # 저장 페이지 구성요소
│  ├─ shared/              # 공용 (에러/인포/버튼 등)
│  ├─ layouts/             # Header/Footer/Nav/ModalLayout
│  ├─ icons/               # 아이콘 TSX (Tree-shaking)
│  └─ ui/                  # 원자 단위 (Avatar/Radio 등)
├─ constants/
│  ├─ modal.ts             # 모달 키/식별자
│  └─ seo.ts               # SEO/메타 태그 정의
├─ hooks/
│  ├─ useNoticeSaved.ts    # 저장 상태/동기화
│  └─ useRedirect.ts       # 인증 후 리다이렉션 처리
├─ queries/
│  ├─ ReactQueryProvider.tsx # QueryClient Provider
│  └─ useSavedNoticeList.ts  # 저장 공고 목록 쿼리 훅
├─ stores/
│  ├─ filter.store.ts      # 필터 조건
│  ├─ loading.store.ts     # 전역 로딩 플래그
│  └─ user.store.ts        # 사용자 인증/프로필
```

### 폴더 책임 요약

- api: 서버/클라이언트 분리 호출 레이어. RSC 친화 fetch와 브라우저 Axios 동시 지원.
- app: Next.js App Router 라우트/레이아웃/모달/페이지 엔트리.
- components: View-특화(홈/상세/저장) + 공유(layouts/shared/ui/icons) 구조.
- constants: 전역 상수 (SEO, 모달 키 등) 단일 소스.
- hooks: 클라이언트 전용 상태/동작 캡슐화 (React Query 훅 제외 일반 로직).
- queries: React Query Provider 및 도메인 쿼리 훅.
- stores: 전역 경량 상태 (필터/유저/로딩) — 최소화 지향.

## 🔐 인증 & 보안

- Firebase Auth (Google) 팝업 로그인
- App Check(reCAPTCHA) 활성화로 Functions 남용 방지
- CORS 화이트리스트 기반 제한 (서버 측 설정)

## 📬 문의

개선 제안이나 문의는 **Issues** 또는 **Pull Request**로 남겨주세요.

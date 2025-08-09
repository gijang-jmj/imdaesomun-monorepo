# 🏠 임대소문 Monorepo

공공임대주택 공고를 한곳에서 모아보고, 저장할 수 있는 서비스입니다. 이 저장소는 Turborepo 기반 모노레포로 Next.js 15(Apps)와 Vue 3(Apps), Firebase Functions(Backend), 공유 패키지(Packages)로 구성됩니다.

> Next.js (SSR): -
> Vue (CSR): https://imdaesomun.web.app (Firebase Hosting)

## 📌 핵심 기능

- 기관별 공고 모아보기: SH(서울), GH(경기), IH(인천), BMC(부산)
- 무한 스크롤, 로딩/에러 스테이트, 반응형 UI
- 공고 저장(즐겨찾기) 및 저장 목록 필터링/페이징
- Google 로그인(Firebase Auth)
- 신규 공고 도착 시 푸시 알림(FCM)
- 주기적 크롤링(Cloud Scheduler) → Firebase Functions로 저장 및 알림 발송

## 🧱 모노레포 구성

```
apps/
	web-next/   # Next.js 15 (App Router) + React 19
	web-vue/    # Vue 3 (Composition) + Vite
functions/      # Firebase Functions v2 (HTTPS API + Scraper + FCM)
packages/
	assets/     # 공유 아이콘/스타일/애니메이션(lottie)
	shared/     # 타입/유틸/상수 등 공유 코드
	configs/    # Prettier/tsconfig 등 공통 설정
```

## 🔧 기술 스택

- 프론트엔드(Web - Next)
  - Next.js 15(App Router), React 19, TypeScript
  - @tanstack/react-query v5, Zustand
  - Tailwind CSS 4, SVGR(@svgr/webpack)
  - Firebase(Web SDK), Lottie

- 프론트엔드(Web - Vue)
  - Vue 3(Composition API), Vite 7, TypeScript
  - Pinia, vue-router, Axios
  - Tailwind CSS 4 + prettier-plugin-tailwindcss
  - Lottie-web, vue3-lottie, vite-svg-loader

- 백엔드 & 인프라
  - Firebase Functions v2 (https.onRequest, region: asia-northeast1)
  - Firebase Admin, Firestore(데이터 저장), CORS, App Check(reCAPTCHA)
  - Cloud Scheduler(크롤링 트리거), Firebase Hosting(배포)

- 모노레포 빌드/도구
  - Turborepo, pnpm, TypeScript
  - 공통 Config: packages/configs의 tsconfig.base.json, prettier.config.base.cjs

## 🗺️ 아키텍처 개요

- Web(Next/Vue) → Firebase Functions(HTTPS API) → Firestore
- Cloud Scheduler → Functions(scrapeNotices) → 각 기관 사이트 크롤링 → 데이터 저장 → FCM 발송
- 사용자는 웹에서 로그인/저장/필터/무한스크롤로 공고 탐색, 신규 공고 도착 시 푸시 수신

## 📡 API 개요 (Firebase Functions, HTTPS)

- https://github.com/gijang-jmj/imdaesomun/blob/main/docment/api_spec.md 문서 참고.

- 보안: CORS 허용 도메인 제한(`imdaesomun.web.app`), API Key 헤더 검증, App Check 이용.

## ⚙️ Turborepo 개발 환경

사전 요구사항

- Node.js >= 18
- pnpm 9 (루트 packageManager 지정)

설치

```bash
pnpm install -w
```

개발 서버

```bash
# 전체(병렬)
pnpm dev-all

# 개별
pnpm dev-next       # Next.js
pnpm dev-vue        # Vue
pnpm dev-functions  # Firebase 에뮬레이터
```

빌드

```bash
pnpm build          # 전부
pnpm build --filter=web-next
pnpm build --filter=web-vue
```

린트/타입체크

```bash
pnpm lint
pnpm check-types
```

## 🔐 환경변수

Web(Next) – `apps/web-next/.env`

```env
X_IMDAESOMUN_API_KEY=__server_api_key__
NEXT_PUBLIC_API_BASE_URL=https://<cloud-functions-host>

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# reCAPTCHA(App Check)
NEXT_PUBLIC_RECAPTCHA_V3_KEY=
NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN=
```

Web(Vue) – `apps/web-vue/.env`

```env
VITE_API_BASE_URL=https://<cloud-functions-host>

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# 개발용 App Check 디버그 토큰(필요 시)
VITE_FIREBASE_APPCHECK_DEBUG_TOKEN=
VITE_RECAPTCHA_V3_KEY=
```

Functions – Firebase Secret/Config

- Functions는 `IMDAESOMUN_API_KEY`를 Secret으로 사용합니다.
- 로컬 에뮬레이터는 Firebase CLI 설정을 참고하세요.

## 📦 패키지 설명

- `packages/shared`: 타입, constants, helpers, api 등 앱 간 공유 코드(빌드 아티팩트: dist)
- `packages/assets`: 아이콘/스타일/lottie 등 정적 자산
- `packages/configs`: Prettier, tsconfig 등 공통 구성 공유

## 🧪 품질/규칙

- Prettier 3 + Tailwind 플러그인, ESLint(각 앱 설정)
- 타입 체크: `pnpm check-types`

## 📄 PRD/문서

- 상세 기능 정의/히스토리: Notion 링크 참고
  - https://enormous-drip-eee.notion.site/235e0a7f4fc0808192a4d9f568f5da45
- `apps/web-vue/PRD.md`에도 구조/요구사항 요약이 포함되어 있습니다.

## 📬 문의 & 기여

이슈/개선 제안은 PR 또는 Issues로 남겨주세요.

---

부가 메모

- Next 앱: Turbopack dev, SVG 처리(SVGR) 커스텀 Webpack 설정, 원격 이미지 허용 도메인(lh3.googleusercontent.com)
- Functions: region `asia-northeast1`, CORS 도메인 `imdaesomun.web.app`

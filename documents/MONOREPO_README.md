# 🏠 임대소문 Monorepo

각 공사에서 제공하는 임대주택 공고를 한곳에서 모아보고, 저장할 수 있는 서비스입니다.

이 저장소는 Turborepo 기반 모노레포로 Next.js 15(Apps)와 Vue 3(Apps), Firebase Functions(Backend), 공유 패키지(Packages)로 구성됩니다.

## 📌 핵심 기능

- 기관별 공고 모아보기: SH(서울), GH(경기), IH(인천), BMC(부산)
- 무한 스크롤, 로딩/에러 스테이트, 반응형 UI
- 공고 저장(즐겨찾기) 및 저장 목록 필터링/페이징
- Google 로그인(Firebase Auth)
- 서버리스 API(Firebase Functions + Firestore)
- 주기적 공고 크롤링(Cloud Scheduler)

## 🔧 기술 스택 요약

| 영역              | 기술                                              | 비고                           |
| ----------------- | ------------------------------------------------- | ------------------------------ |
| Next 웹           | Next.js 15, React 19                              | App Router / RSC 활용          |
| Vue 웹            | Vue 3, Vite                                       | Composition API 활용           |
| 스타일            | Tailwind CSS v4                                   | 공통 base CSS 자산 패키지 제공 |
| 배포              | Vercel, Firebase Hosting                          | Next.js / Veu 3 배포           |
| 백엔드            | Firebase Functions v2, Firestore, Cloud Scheduler | 크롤링 & API 노출              |
| 공통 로직         | @imdaesomun/shared                                | 타입/유틸/API 래퍼             |
| 정적 자산         | @imdaesomun/assets                                | SVG / Lottie / Base CSS        |
| 설정 공유         | @imdaesomun/configs                               | tsconfig / prettier            |
| 빌드/워크스페이스 | Turborepo 2.x, pnpm                               | 멀티 패키지 태스크 캐싱        |

## 🧱 모노레포 구성

```bash
imdaesomun-monorepo
├─ apps
│  ├─ web-next                 # Next.js 15 (App Router) + React 19 프론트엔드
│  └─ web-vue                  # Vue 3 + Vite 프론트엔드
├─ functions                   # Firebase Functions 백엔드 (HTTPS / 크론 / 크롤러)
├─ packages
│  ├─ assets                   # 공통 정적 자산 패키지
│  │  └─ src
│  │     ├─ icons              # SVG/PNG (currentColor 기반 권장)
│  │     ├─ lottie             # Lottie JSON (loading 등)
│  │     └─ styles
│  │        └─ tailwind.base.css   # 공통 base layer (preflight, 변수)
│  ├─ shared                   # 타입/비즈니스 로직/유틸 (tsc 빌드 → dist)
│  │  └─ src
│  │     ├─ api                # fetch 래퍼 & 도메인 API (notice-api 등)
│  │     ├─ constants          # 라우트/링크/코드 상수
│  │     ├─ helpers            # Notice 등 도메인 가공/파생 로직
│  │     ├─ types              # 공통 타입 정의
│  │     └─ utils              # 범용 유틸 (포맷/링크/쿼리스트링)
│  └─ configs                  # 공통 TS/Prettier 설정
│     ├─ tsconfig.base.json
│     ├─ prettier.config.base.cjs
│     └─ package.json
```

- packages/shared 는 웹(Next, Vue)에서 import 되는 순수 로직/타입 모듈입니다.
- packages/assets 는 번들 타겟 별 로더(SVGR, vite-svg-loader)에 의해 컴포넌트화되며 별도 빌드 단계가 없습니다.
- packages/configs 는 tsconfig / prettier 설정만 제공하고 런타임 코드는 포함하지 않습니다.
- functions/ 의 크롤링 로직은 Cloud Scheduler 스케줄러를 통해 실행됩니다.

## 📦 패키지 설명

| 패키지              | 설명                                  |
| ------------------- | ------------------------------------- |
| @imdaesomun/shared  | 타입/비즈니스 로직/API 래퍼/포맷 유틸 |
| @imdaesomun/assets  | SVG/PNG/Lottie/CSS 베이스 스타일      |
| @imdaesomun/configs | tsconfig / prettier 구성 공유         |

## 📡 API 개요 (Firebase Functions, HTTPS)

- https://github.com/gijang-jmj/imdaesomun/blob/main/docment/api_spec.md 문서 참고.

- 보안: CORS 허용 도메인 제한(`imdaesomun.web.app`), API Key 헤더 검증, App Check 이용.

## ⚙️ Turborepo 개발 환경

### 사전 요구사항

- Node.js >= 20 (.nvmrc 참고)
- pnpm

### 설치

```bash
pnpm install
```

### 개발 서버

```bash
# 전체(병렬)
pnpm dev-all

# 개별
pnpm dev-next      # Next.js
pnpm dev-vue       # Vue
pnpm dev-functions # Firebase 에뮬레이터
```

### 빌드

```bash
# 전체
pnpm build
pnpm build-next # Next.js
pnpm build-vue  # Vue
```

## 📬 문의 & 기여

이슈/개선 제안은 PR 또는 Issues로 남겨주세요.

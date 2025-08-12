# 🏠 임대소문 - 임대주택 공고 모아보기 (Legacy)

각 공사에서 제공하는 임대주택 공고 정보를 간편하게 확인하고, 저장 및 알림 기능을 제공하는 **웹 애플리케이션**입니다.

## 🚀 프로덕션 URL

**https://imdaesomun.web.app/**

## 🔍 주요 기능

- 임대 공고 통합 조회 (SH / GH / IH / BMC)
- 공고 상세 + 원문 첨부/바로가기
- Google 인증 로그인 및 공고 저장 / 저장 목록 관리
- 저장된 공고 필터(기관/조건) + 정렬

## ⏱️ 개발 기간

| 단계 | 기간               |
| ---- | ------------------ |
| 설계 | 2025.07.10 ~ 07.11 |
| 구현 | 2025.07.12 ~ 07.16 |
| QA   | 2025.07.17 ~ 07.18 |
| 오픈 | 2025.07.18 ~       |

## 🛠️ 기술 스택

| 항목        | 내용                                                                   |
| ----------- | ---------------------------------------------------------------------- |
| 프레임워크  | Vue 3 (Composition API) + Vite                                         |
| 언어        | TypeScript                                                             |
| 상태 관리   | Pinia                                                                  |
| 라우팅      | vue-router                                                             |
| 스타일      | Tailwind CSS v4 (프로젝트 공통 스타일 @imdaesomun/assets)              |
| 애니메이션  | lottie-web + vue3-lottie                                               |
| 네트워크    | Axios (기본 인스턴스 + 인터셉터)                                       |
| 인증/보안   | Firebase Auth, Firebase App Check(reCAPTCHA)                           |
| 배포        | Firebase Hosting (단일 SPA 배포)                                       |
| 번들        | Vite + vite-svg-loader(SVG → 컴포넌트)                                 |
| 내부 패키지 | @imdaesomun/assets(아이콘/스타일) · @imdaesomun/shared(공통 타입/유틸) |

## 📂 디렉토리 구조

`apps/web-vue/src` 기준 주요 구조입니다.

### Tree

```bash
src/
├─ App.vue                # 루트 컴포넌트
├─ main.ts                # 앱 진입 (createApp, 라우터/스토어 마운트)
├─ main.css               # 전역 스타일 (Tailwind 포함)
├─ firebase.ts            # Firebase 초기화 (Auth/App Check 등)
├─ env.d.ts               # 타입 선언 (환경변수 등)
├─ api/
│   └─ notice-api.ts      # 공고 조회 관련 API 래퍼
├─ components/
│   ├─ icons/             # SVG 아이콘 컴포넌트
│   ├─ shared/            # 페이지 간 재사용 UI (모달, 버튼 등)
│   └─ ui/                # 아주 작은 단위(원자/분자) UI
├─ composables/
│   ├─ useLoading.ts      # 로딩 상태 훅
│   ├─ useModal.ts        # 모달 오픈/닫기 상태 훅
│   └─ useNotice.ts       # 공고 관련 비즈니스 로직 훅
├─ layouts/
│   ├─ AppHeader.vue
│   ├─ AppFooter.vue
│   ├─ AppNav.vue
│   ├─ AppMainLayout.vue  # 메인 레이아웃
│   └─ AppModalLayout.vue # 모달 전용 레이아웃
├─ pages/
│   ├─ home/              # 홈(공고 리스트)
│   │   ├─ HomeView.vue
│   │   └─ components/    # 홈 전용 컴포넌트(배너, 카드 등)
│   ├─ notice/            # 공고 상세
│   │   └─ NoticeView.vue
│   └─ saved/             # 저장한 공고 리스트
│       └─ SavedView.vue
├─ router/
│   └─ index.ts           # 라우터 설정
├─ services/
│   └─ axios.ts           # Axios 인스턴스 및 인터셉터
├─ stores/
│   ├─ notice-store.ts    # 공고 리스트/상세 상태
│   ├─ saved-store.ts     # 저장 공고 상태
│   └─ user-store.ts      # 사용자 인증 상태
```

### 폴더 책임 요약

- api: 백엔드/Functions 호출 추상화. 네트워크 세부를 컴포넌트에서 분리.
- components: 페이지 독립 재사용 UI (icons/shared/ui 3계층으로 가독성/검색성 유지).
- composables: 비즈니스 로직 + 상태 캡슐화(Composition API).
- layouts: 공통 레이아웃 및 골격. 헤더/푸터/내비 포함.
- pages: 라우트 단위 View + 해당 View에 한정된 하위 components.
- router: 페이지 경로 정의.
- services: 외부 서비스/클라이언트(axios, firebase 초기화 제외) 설정.
- stores: Pinia 전역 상태.

## 🔐 인증 & 보안

- Firebase Auth (Google) 팝업 로그인
- App Check(reCAPTCHA) 활성화로 Functions 남용 방지
- CORS 화이트리스트 기반 제한 (서버 측 설정)

## 📬 문의

이슈/개선 제안은 PR 또는 Issues로 남겨주세요.

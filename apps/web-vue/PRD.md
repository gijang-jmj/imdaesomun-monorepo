# 📄 제품 요구사항 명세서 (PRD) - 임대소문 웹

## 1. 📌 제품 개요

### 1.1 개요

- 여러 공사의 임대주택 공고 정보를 간편하게 확인하고, 공고 저장 및 푸시 알림 기능을 제공하는 **웹 기반 서비스**

- 지원 목록:

  - 서울주택공사(SH)
  - 경기주택공사(GH)
  - 인천도시공사(IH)
  - 부산도시공사(BMC)

### 1.2 플랫폼

- 웹 브라우저 (PC 및 모바일 대응)

### 1.3 주요 사용자

- 청년/신혼부부 등 임대주택 관심자
- 임대주택 입주 대기자

## 2. 📦 기술 스택

| 구성 요소  | 기술                                                  |
| ---------- | ----------------------------------------------------- |
| 프론트엔드 | Vue 3 (with. Composition API) + TypeScript + Vite + Pinia                     |
| 라우팅     | vue-router                                            |
| 상태 관리  | Pinia                                                 |
| 스타일링   | Tailwind CSS + Prettier + Prettier-plugin-tailwindcss |
| 애니메이션 | Lottie-web + vue3-lottie                              |
| API 호출   | Axios + Firebase Functions                            |
| 인증       | Firebase Auth (Google 로그인)                         |
| 보안       | Firebase App Check (with. reCAPTCHA) + API Key 인증   |
| 배포       | Firebase Hosting                                      |

## 3. 🛠️ 기능 명세

### 3.1 임대공고 조회

- SH, GH, BMC, IH의 최신 임대 공고를 조회
- 메인 홈에서 무한 스크롤 방식으로 표시
- API: `/getShNotices`, `/getGhNotices`, `/getBmcNotices`, `/getIhNotices`

### 3.2 공고 상세 보기

- 공고 클릭 시 상세 페이지로 이동
- 제목, 부서, 등록일, 조회수, 첨부파일, 본문 내용 출력
- API: `/getNoticeById?noticeId=...`

### 3.3 공고 저장 및 조회

- 로그인 사용자만 공고 저장 가능
- 저장된 공고 리스트 제공 (필터 및 무한스크롤 포함)
- API: `/saveNotice`, `/getSavedNotices`, `/deleteNotice`, `/getNoticeSaved`

### 3.4 로그인 및 사용자 관리

- Firebase Auth 기반 Google 소셜 로그인
- 로그인 후 저장, 알림 등 사용자 기능 가능

## 4. 🔗 API 명세

- API 목록은 [api_spec.md](https://github.com/gijang-jmj/imdaesomun/blob/main/docment/api_spec.md) 참조

## 5. 🧱 프론트엔드 구조

```bash
src/
├── api
├── assets
│   ├── icons
│   ├── lottie
│   └── styles
├── components
│   ├── icons
│   ├── shared
│   └── ui
├── composables            # useModal 모달 관리
├── constants
├── helpers
├── layouts                # AppHeader, AppFooter, AppNav, AppModalLayout, AppLoading 포함
├── pages
│   ├── home
│   │   └── components
│   ├── notice
│   │   └── components
│   └── saved
│       └── components
├── router
├── services               # Axios 인스턴스 및 Firebase App Check 토큰 인터셉터 포함
├── stores                 # notice 상태 관리
├── types
└── utils
```

- `useModal` 컴포저블은 쿼리 문자열(`modal`)을 사용해 모달 상태를 동기화하며, `router.back()`을 통해 닫힘 처리

## 6. 📅 일정 계획

| 단계         | 기간         |
| ------------ | ------------ |
| PRD 및 설계  | 7/10 \~ 7/11 |
| 개발         | 7/12 \~ 7/16 |
| 테스트 및 QA | 7/17 \~ 7/18 |
| 오픈         | 7/18 \~      |

## 7. 🧪 보안 및 인증 흐름

- Firebase App Check (with. reCAPTCHA)을 통한 웹 인증 강화
- 인증된 도메인 외 차단 (CORS)

## ✅ 우선순위 정리 (웹 버전)

1. 공고 조회 / 상세 기능 완성
2. 로그인 및 저장 기능 연동
3. UI/UX 디자인 정리 및 반응형 대응
4. API 보안 점검 및 테스트
5. 배포 및 사용자 피드백 수렴

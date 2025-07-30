# 🏠 임대소문 - 임대주택 공고 모아보기

공공기관의 임대주택 공고 정보를 간편하게 확인하고, 저장 및 알림 기능을 제공하는 **비영리 웹 애플리케이션**입니다.

사이트 바로가기 <a href="https://imdaesomun.web.app/" target="_blank" rel="noopener noreferrer">
👉 <strong>임대소문 - 공공임대 정보 한눈에 보기</strong>
</a>

## 📌 개요

임대소문은 서울주택공사(SH), 경기주택공사(GH), 인천도시공사(IH), 부산도시공사(BMC)에서 제공하는 임대주택 공고 정보를 모아 제공합니다.  
[모바일 앱](https://github.com/gijang-jmj/imdaesomun)에 이어, 이제는 웹에서도 공고를 확인하고 저장할 수 있습니다.

## 🔍 주요 기능

- 임대 공고 조회
  - 서울주택공사(SH)
  - 경기주택공사(GH)
  - 인천도시공사(IH) **`new`**
  - 부산도시공사(BMC) **`new`**
- 공고 상세 보기 및 첨부파일 바로가기 제공
- 로그인 후 공고 저장 및 저장 목록 확인

## ⏱ 개발 기간 및 인원

- 개발 인원: 1인

| 단계         | 기간               |
| ------------ | ------------------ |
| PRD 및 설계  | 2025.07.10 ~ 07.11 |
| 개발         | 2025.07.12 ~ 07.16 |
| 테스트 및 QA | 2025.07.17 ~ 07.18 |
| 오픈         | 2025.07.18 ~       |

## 🛠️ 기술 스택 (Web)

| 항목       | 내용                                                  |
| ---------- | ----------------------------------------------------- |
| 프레임워크 | Vue 3 (with. Composition API) + Vite                                          |
| 언어       | TypeScript                                            |
| 상태 관리  | Pinia                                                 |
| 라우팅     | vue-router                                            |
| 스타일링   | Tailwind CSS + Prettier + prettier-plugin-tailwindcss |
| 애니메이션 | Lottie-web + vue3-lottie                              |
| 네트워크   | Axios                                                 |
| 인증       | Firebase Auth (Google 로그인)                         |
| 보안       | Firebase App Check (with. reCAPTCHA) + CORS           |
| 배포       | Firebase Hosting                                      |
| 유틸       | date-fns, vite-svg-loader                             |

## 📦 백엔드 및 인프라

- Firebase Cloud Functions (API)
- Google Cloud Scheduler (주기적 공고 크롤링)
- Firebase Hosting (배포)
- Firebase App Check (with. reCAPTCHA) + CORS

## 📄 PRD

[**제품 요구사항 명세서 (PRD) - 임대소문 웹**](https://github.com/gijang-jmj/imdaesomun-vue/blob/main/PRD.md)

## 📬 문의

이 프로젝트에 대한 개선 제안이나 문의는 **Issues** 또는 **Pull Request**로 자유롭게 남겨주세요.

## 📱 임대소문 모바일 앱

<p align="left">
  <a href="https://apps.apple.com/kr/app/%EC%9E%84%EB%8C%80%EC%86%8C%EB%AC%B8/id6747034249" target="_blank">
    <img src="https://img.shields.io/badge/App%20Store-000000?style=for-the-badge&logo=apple&logoColor=white" alt="Download on the App Store"/>
  </a>
  &nbsp;
  <a href="https://play.google.com/store/apps/details?id=com.jmj.imdaesomun" target="_blank">
    <img src="https://img.shields.io/badge/Google%20Play-414141?style=for-the-badge&logo=google-play&logoColor=white" alt="Get it on Google Play"/>
  </a>
  <br/>
</p>

# 📄 API 명세서 – 임대소문

본 문서는 Firebase Cloud Functions (`asia-northeast1`) 로 제공되는 임대소문 API 명세입니다.

## CORS 허용 도메인

- https://imdaesomun.web.app
- https://imdaesomun.vercel.app

## 공통 인증 / 보안

두 가지 방식 중 하나를 만족해야 요청이 허용됩니다 (AND 아님 OR 조건):

1. HTTP Header `x-imdaesomun-api-key: <SERVER_SECRET>` 가 올바른 값일 것
2. HTTP Header `x-firebase-appcheck: <App Check Token>` 이 유효할 것

API Key 헤더가 존재하나 값이 틀리면 401 반환. 둘 다 없거나 App Check 검증 실패 시 403 반환.

권장: 웹은 Firebase App Check 사용. 앱, 서버 사이드 관리 작업(크론, 배치)은 API Key 사용.

## 공통 헤더

| Header                 | Required     | 설명                                         |
| ---------------------- | ------------ | -------------------------------------------- |
| `x-imdaesomun-api-key` | 조건부       | 서버 사이드 호출 시 사용. App Check 를 대체. |
| `x-firebase-appcheck`  | 조건부       | 클라이언트 호출 시 App Check 토큰.           |
| `Content-Type`         | POST 시 권장 | `application/json`                           |

## 엔드포인트 개요

| 분류   | 메소드 | 경로                     | 요약                                      |
| ------ | ------ | ------------------------ | ----------------------------------------- |
| Scrape | POST   | /scrapeNotices           | 4개 기관 최신 공고 크롤링 + 신규 FCM 발송 |
| Notice | GET    | /getShNotices            | SH 최근 10개                              |
| Notice | GET    | /getGhNotices            | GH 최근 10개                              |
| Notice | GET    | /getBmcNotices           | BMC 최근 10개                             |
| Notice | GET    | /getIhNotices            | IH 최근 10개                              |
| Notice | GET    | /getNoticeById?noticeId= | 공고 상세 (4 컬렉션 통합 조회)            |
| Notice | GET    | /getLatestScrapeTs       | 기관별 마지막 성공 스크랩 타임스탬프      |
| FCM    | POST   | /registerFcmToken        | FCM 토큰 등록/갱신                        |
| FCM    | POST   | /sendFcmToAll            | 허용된 모든 토큰 대상 FCM 브로드캐스트    |
| FCM    | POST   | /getPushAllowed          | 토큰의 푸시 허용 여부 조회                |
| FCM    | POST   | /setPushAllowed          | 토큰의 푸시 허용 여부 설정                |
| Save   | POST   | /saveNotice              | 사용자 공고 저장                          |
| Save   | POST   | /deleteNotice            | 사용자 공고 저장 해제                     |
| Save   | GET    | /getNoticeSaved          | 특정 공고 저장 여부                       |
| Save   | GET    | /getSavedNotices         | 저장한 공고 목록 (paging/filter)          |

베이스 URL 예시: `https://asia-northeast1-<project-id>.cloudfunctions.net`

## 데이터 모델 (Firestore 컬렉션)

### 공고 (컬렉션: `sh` / `gh` / `bmc` / `ih`)

| 필드        | 타입      | 설명                                           |
| ----------- | --------- | ---------------------------------------------- |
| id (doc id) | string    | `{corp}{seq}` 형식 (예: `sh287910`)            |
| seq         | string    | 기관 고유 원본 식별자                          |
| no          | number    | 사이트 표기 번호 (일부는 seq 동일)             |
| title       | string    | 제목                                           |
| department  | string    | 담당부서                                       |
| regDate     | number    | 게시일 (epoch millis)                          |
| hits        | number    | 조회수                                         |
| corporation | string    | `sh                                            |
| files       | array     | 첨부파일 객체 `{fileName, fileLink[, fileId]}` |
| contents    | array     | 본문 텍스트 블록 리스트                        |
| link        | string    | 원문 상세 URL                                  |
| createdAt   | Timestamp | 저장 시 서버 타임                              |

### 로그 (컬렉션: `log`, 문서 id: `sh|gh|bmc|ih`)

| 필드      | 타입      | 설명                    |
| --------- | --------- | ----------------------- |
| timestamp | Timestamp | 마지막 성공 스크랩 시간 |
| message   | string    | 상태 메시지             |

### FCM (컬렉션: `fcm` 문서 id = 토큰)

| 필드           | 타입      | 설명                        | 참고                 |
| -------------- | --------- | --------------------------- | -------------------- |
| token (doc id) | string    | FCM 토큰                    | -                    |
| userId         | string    | null                        | 사용자 식별자 (선택) |
| device         | string    | null                        | 디바이스 정보 (선택) |
| allowed        | boolean   | 푸시 허용 여부 (최초 false) | -                    |
| createdAt      | Timestamp | 최초 등록 시각              | -                    |

### 저장 (컬렉션: `save`, 문서 id = `${userId}_${noticeId}`)

| 필드        | 타입      | 설명           |
| ----------- | --------- | -------------- |
| userId      | string    | 사용자 ID      |
| noticeId    | string    | 공고 문서 id   |
| corporation | string    | 공고 소속 기관 |
| createdAt   | Timestamp | 저장 시각      |

## 엔드포인트 상세

### 1. POST /scrapeNotices

4개 기관(SH, GH, BMC, IH) 최신 공고를 크롤링하여 Firestore 저장. 신규 항목(기존에 없던 문서)에 한해 SH/GH는 FCM 즉시 발송.(TODO: BMC/IH)

Request Body: (없음)

Response 200 예:

```json
{
  "message": "Notices scraped and saved successfully.",
  "newShNotices": 1,
  "newGhNotices": 0,
  "newBmcNotices": 2,
  "newIhNotices": 0
}
```

에러: 500 `{ "error": "Failed to scrape notices." }`

권장 사용: Cloud Scheduler + API Key

### 2. GET /getShNotices (동일 패턴: `/getGhNotices`, `/getBmcNotices`, `/getIhNotices`)

최근 10개 공고 반환 (createdAt desc).

Response 200 예:

```json
[
  {
    "id": "sh287910",
    "seq": "287910",
    "no": 1444,
    "title": "[골드타워] ...",
    "department": "관악주거안심종합센터",
    "regDate": 1746576000000,
    "hits": 1224,
    "corporation": "sh",
    "files": [{ "fileName": "안내.pdf", "fileLink": "https://..." }],
    "contents": ["본문1", "본문2"],
    "link": "https://...",
    "createdAt": { "_seconds": 1746600000, "_nanoseconds": 0 }
  }
]
```

### 3. GET /getNoticeById?noticeId=sh287910

4개 컬렉션을 순차 체크하여 첫 매칭 공고 반환.

Response 200 예:

```json
{
  "collection": "sh",
  "id": "sh287910",
  "title": "[골드타워] ...",
  "seq": "287910",
  "no": 1444,
  "department": "관악주거안심종합센터",
  "regDate": 1746576000000,
  "hits": 1224,
  "corporation": "sh",
  "files": [],
  "contents": [],
  "link": "https://...",
  "createdAt": { "_seconds": 1746600000, "_nanoseconds": 0 }
}
```

404: `{ "error": "Notice not found." }`

### 4. GET /getLatestScrapeTs

기관별 마지막 성공 스크랩 Firestore 타임스탬프 (없으면 404).

Response 200 예:

```json
{
  "sh": { "_seconds": 1746600000, "_nanoseconds": 0 },
  "gh": null,
  "bmc": null,
  "ih": null
}
```

### 5. POST /registerFcmToken

FCM 토큰 저장/갱신. 최초 allowed 기본 false.

Request Body:

```json
{
  "token": "fcm_token",
  "userId": "user123",
  "device": "iOS 17",
  "allowed": true
}
```

`allowed` 가 true인 경우만 즉시 허용. (false / 누락 시 기존 값 유지 또는 최초 false)

Response 200:

```json
{ "message": "Token registered/updated." }
```

### 6. POST /sendFcmToAll

허용(`allowed == true`) 모든 토큰 대상 멀티캐스트 배치 전송 (500개 단위). 영구 오류 토큰은 삭제.

Request Body:

```json
{
  "title": "공지",
  "body": "새 공고",
  "data": { "noticeId": "sh287910" }
}
```

Response 200:

```json
{
  "message": "FCM sent to all tokens.",
  "successCount": 120,
  "failureCount": 3,
  "deletedTokens": 3
}
```

### 7. POST /getPushAllowed

특정 토큰 푸시 허용 여부 조회.

Request Body:

```json
{ "token": "fcm_token" }
```

Response:

```json
{ "allowed": true }
```

### 8. POST /setPushAllowed

허용 여부 갱신 (토큰 문서 없으면 새로 생성 후 allowed 적용).

Request Body:

```json
{
  "token": "fcm_token",
  "allowed": true,
  "userId": "user123",
  "device": "Android 15"
}
```

Response:

```json
{ "message": "Push allowed updated." }
```

### 9. POST /saveNotice

사용자 공고 저장. 공고 존재하지 않으면 404.

Request Body:

```json
{ "noticeId": "sh287910", "userId": "user123" }
```

Response:

```json
{ "message": "Notice saved." }
```

### 10. POST /deleteNotice

저장 해제.

Request Body:

```json
{ "noticeId": "sh287910", "userId": "user123" }
```

Response:

```json
{ "message": "Notice deleted." }
```

### 11. GET /getNoticeSaved?noticeId=sh287910&userId=user123

저장 여부 확인.
Response:

```json
{ "saved": true }
```

### 12. GET /getSavedNotices?userId=user123&corporation=sh&limit=10&offset=0

사용자가 저장한 공고 목록 + 메타 정보. `corporation` (sh|gh|bmc|ih) 필터 선택. `limit` 최대 50.

Response 200 예:

```json
{
  "notices": [
    {
      "collection": "sh",
      "id": "sh287910",
      "title": "...",
      "regDate": 1746576000000,
      "corporation": "sh"
    }
  ],
  "hasMore": true,
  "nextOffset": 10,
  "totalFetched": 10,
  "totalCount": 32,
  "shCount": 20,
  "ghCount": 5,
  "bmcCount": 4,
  "ihCount": 3
}
```

---

## 상태/에러 코드 요약

| 코드 | 의미                              | 발생 상황                                    |
| ---- | --------------------------------- | -------------------------------------------- |
| 200  | OK                                | 성공                                         |
| 400  | Missing parameter                 | 필수 쿼리/바디 누락                          |
| 401  | Unauthorized                      | 잘못된 API Key (틀린 값)                     |
| 403  | Missing / Invalid App Check token | 인증 헤더 미제공 또는 App Check 검증 실패    |
| 404  | Not Found                         | 자원 없음 (공고 미존재 / 잘못된 메소드 접근) |
| 500  | Internal Error                    | 서버 내부 오류                               |

메소드 검증 실패 (GET/POST 오용)는 404 반환 패턴을 따릅니다.

## 모범 사용 시나리오

1. 백엔드 크론: Cloud Scheduler -> `POST /scrapeNotices` (API Key 포함)
2. 프런트: App Check 활성화 -> 공고 조회/저장/FCM 허용 설정
3. 신규 공고 알림: `scrapeNotices` 내부 SH/GH 신규만 실시간 FCM
4. 전체 긴급 공지: 운영툴에서 `POST /sendFcmToAll`

## 향후 확장 고려

- 페이지네이션: 공고 목록 API limit/offset 파라미터화
- 검색 기능: 제목/부서 키워드 필터
- notice 상세 API: contents HTML/raw 저장 분리
- Webhook: 신규 공고 Third-party 연동

최종 수정: 2025-08-10

/**
 * POST 요청을 위한 폼 생성 및 전송
 * @param url 요청 URL
 * @param params 전송할 파라미터
 */
export const postToUrl = (url: string, params: Record<string, string>) => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = url;
  form.target = '_blank';
  form.style.display = 'none';

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = params[key];
      form.appendChild(input);
    }
  }

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form); // cleanup
};

/**
 * 인앱 브라우저 체크
 * @returns 인앱 브라우저 여부
 */
export const checkInAppBrowser = (): boolean => {
  const ua = navigator.userAgent.toLowerCase();

  return (
    ua.includes('kakaotalk') ||
    ua.includes('fbav') || // Facebook
    ua.includes('instagram') ||
    ua.includes('line') ||
    (ua.includes('naver') && ua.includes('inapp'))
  );
};

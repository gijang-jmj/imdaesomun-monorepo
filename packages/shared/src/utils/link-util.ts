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

export const openInExternalBrowser = (): void => {
  const a = document.createElement('a');
  a.href = 'https://imdaesomun.web.app';
  a.target = '_blank';
  a.rel = 'noopener noreferrer';

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

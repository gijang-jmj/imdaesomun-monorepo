declare namespace NodeJS {
  interface ProcessEnv {
    readonly X_IMDAESOMUN_API_KEY: string;
    readonly NEXT_PUBLIC_API_BASE_URL: string;
    readonly NEXT_PUBLIC_FIREBASE_API_KEY: string;
    readonly NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
    readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    readonly NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    readonly NEXT_PUBLIC_FIREBASE_APP_ID: string;
    readonly NEXT_PUBLIC_RECAPTCHA_V3_KEY: string;
    readonly NEXT_PUBLIC_FIREBASE_APPCHECK_DEBUG_TOKEN: string;
  }
}

interface Window {
  FIREBASE_APPCHECK_DEBUG_TOKEN: string;
}

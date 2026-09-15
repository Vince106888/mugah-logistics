/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_DEMO_FEATURES?: string;
  readonly VITE_MPESA_STK_ENDPOINT?: string;
  readonly VITE_CARD_SESSION_ENDPOINT?: string;
  readonly VITE_BANK_NAME?: string;
  readonly VITE_BANK_ACCOUNT_NAME?: string;
  readonly VITE_BANK_ACCOUNT_NUMBER?: string;
  readonly VITE_BANK_BRANCH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

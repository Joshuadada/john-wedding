/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RSVP_WEBHOOK_URL: string;
  readonly VITE_WISHES_WEBHOOK_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

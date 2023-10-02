/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly STRAPI_API: string
  readonly USER_TOKEN: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
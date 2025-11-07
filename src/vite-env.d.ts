/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MARKER_IO_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}


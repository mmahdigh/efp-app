interface EnvironmentVariables {
  readonly NODE_ENV: 'development' | 'production' | 'test'
  /** `git rev-parse HEAD`. Generated in next.config.mjs */
  readonly APP_VERSION: string
  readonly EFP_API_URL: string
  readonly NEXT_PUBLIC_SITE_URL: string
  readonly NEXT_PUBLIC_BASE_URL: string
  readonly NEXT_PUBLIC_EFP_API_URL: string
  readonly NEXT_PUBLIC_ENS_SUBGRAPH_API_KEY: string
  readonly NEXT_PUBLIC_AIRSTACK_API_KEY: string
  readonly NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA: string
  readonly NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: string
  readonly NEXT_PUBLIC_MAINNET_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_SEPOLIA_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_BASE_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_BASE_SEPOLIA_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_OPTIMISM_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_OP_SEPOLIA_ALCHEMY_ID: string
  readonly NEXT_PUBLIC_EFP_ACCOUNT_METADATA: string
  readonly NEXT_PUBLIC_EFP_LIST_REGISTRY: string
  readonly NEXT_PUBLIC_EFP_LIST_RECORDS: string
  readonly NEXT_PUBLIC_EFP_LIST_MINTER: string
  readonly NEXT_PUBLIC_EFP_LIST_RECORDS_OP: string
  readonly NEXT_PUBLIC_EFP_LIST_RECORDS_MAINNET: string
  readonly NEXT_PUBLIC_EFP_LIST_RECORDS_OP_SEPOLIA: string
  readonly NEXT_PUBLIC_EFP_LIST_RECORDS_SEPOLIA: string
  readonly NEXT_PUBLIC_MAINNET_LIMIT: string
  readonly NEXT_PUBLIC_OPTIMISM_LIMIT: string
  readonly NEXT_PUBLIC_BASE_LIMIT: string
  readonly NEXT_PUBLIC_SEPOLIA_LIMIT: string
  readonly NEXT_PUBLIC_OPTIMISM_SEPOLIA_LIMIT: string
  readonly NEXT_PUBLIC_BASE_SEPOLIA_LIMIT: string
  readonly NEXT_PUBLIC_THIRDWEB_CLIENT_ID: string
  readonly NEXT_PUBLIC_UNICORN_FACTORY_ADDRESS: string
  /* automatically added by Vercel */
  readonly VERCEL_URL?: string
  readonly NEXT_PUBLIC_VERCEL_URL?: string
  /* Sentry */
  readonly SENTRY_DSN: string
  readonly NEXT_PUBLIC_SENTRY_DSN: string
  readonly SENTRY_AUTH_TOKEN: string
  readonly SENTRY_DISABLED: 'true' | 'false'
  readonly NEXT_PUBLIC_REPORT_WEB_VITALS: 'true' | 'false'
}

declare namespace NodeJS {
  interface ProcessEnv extends EnvironmentVariables {}
}

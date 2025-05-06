export type Env = 'production' | 'development' | 'testing';
export type Locale = 'en' | 'ar';

export const env = {
  production: 'production',
  development: 'development',
  testing: 'testing',
};
export const locale = {
  en: 'en',
  ar: 'ar',
};

export interface LibraryConfig {
  env: Env;
  apiKey: string;
  organizationId: string;
  locale: Locale;
  appName: string;
}

const baseUrl = {
  production: 'https://sdk-41o.pages.dev',
  development: 'https://sdk-41o.pages.dev',
  testing: 'https://sdk-41o.pages.dev',
};

interface _LibraryConfig extends LibraryConfig {
  baseUrl?: string;
}

let config: _LibraryConfig | null = null;

export const setConfig = (conf: Partial<LibraryConfig>) => {
  const requiredFields: (keyof LibraryConfig)[] = [
    'env',
    'apiKey',
    'organizationId',
    'locale',
    'appName',
  ];

  for (const field of requiredFields) {
    if (!conf[field]) {
      throw new Error(`Missing required config field: ${field}`);
    }
  }

  const validEnvs: Env[] = ['production', 'development', 'testing'];
  if (!validEnvs.includes(conf.env as Env)) {
    throw new Error(`Invalid value for env: ${conf.env}`);
  }

  const validLocales: Locale[] = ['en', 'ar'];
  if (!validLocales.includes(conf.locale as Locale)) {
    throw new Error(`Invalid value for locale: ${conf.locale}`);
  }

  config = { ...conf, baseUrl: baseUrl[conf.env as Env] } as _LibraryConfig;
};

export const getConfig = (): _LibraryConfig => {
  if (!config) {
    throw new Error('Library config has not been set. Call setConfig() first.');
  }
  return config;
};
export const isConfigSet = (): boolean => {
  return !!config;
};

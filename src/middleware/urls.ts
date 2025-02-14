import { getEnvironment } from '@src/utils/server/urls.ts';

const REDIRECT_URI = {
  local: 'http://localhost:4321/',
  development: 'https://sokos-utbetalingsportalen-astro.ansatt.dev.nav.no/',
  production: 'https://sokos-utbetalingsportalen-astro.ansatt.nav.no/',
};

export const redirectUri = REDIRECT_URI[getEnvironment()];
export const loginUrl = `/oauth2/login?redirect=${redirectUri}`;

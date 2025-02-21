import { getServerSideEnvironment } from './environment.ts';

export function mikrofrontendUrlServer(appName: string) {
  if (getServerSideEnvironment() === 'local') {
    return '/bundle.js';
  }
  return 'https://' + process.env.APP_INGRESS + '/' + appName + '/bundle.js';
}

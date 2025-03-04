import { getServerSideEnvironment } from './environment';

type AdGroup = {
  adGroupDevelopment: string;
  adGroupProduction: string;
};

export function fetchMicrofrontendBundle(appName: string) {
  if (getServerSideEnvironment() === 'local') {
    return '/bundle.js';
  }
  return 'https://' + process.env.APP_INGRESS + '/' + appName + '/bundle.js';
}

export function fetchMicrofrontendAdGroup({
  adGroupDevelopment,
  adGroupProduction,
}: AdGroup) {
  return getServerSideEnvironment() === 'production'
    ? adGroupProduction
    : adGroupDevelopment;
}

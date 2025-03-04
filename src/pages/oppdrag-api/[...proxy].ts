import type { APIRoute } from 'astro';
import { routeProxyWithOboToken } from 'src/utils/server/proxy';

export const ALL: APIRoute = routeProxyWithOboToken(
  {
    apiProxy: '/oppdrag-api',
    apiUrl: 'https://sokos-oppdrag.dev-fss-pub.nais.io',
  },
  {
    cluster: 'dev-fss',
    namespace: 'okonomi',
    application: 'sokos-oppdrag',
  },
);

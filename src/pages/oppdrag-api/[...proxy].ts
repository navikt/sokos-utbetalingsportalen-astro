import type { APIContext, APIRoute } from 'astro';
import { getOboToken } from 'src/utils/server/token';

// Hente url
// Hente oboToken
// Rewrite url til ny backend (fra config)
// Returnere svar fra et api

const getProxyUrl = (request: Request) => {
  const url = request.url.replace('/oppdrag-api/*', '/api/v1/attestasjon');
  console.log('url', url);
  return new URL(
    'https://sokos-oppdrag.dev-fss-pub.nais.io/api/v1/attestasjon',
  ); // url fra config
};

export const ALL: APIRoute = async (context: APIContext) => {
  const audience = 'api://dev.fss.okonomi.sokos-oppdrag/.default';
  const token = getOboToken(context.locals.token, audience); // audience fra config
  const proxyUrl = getProxyUrl(context.request);
  console.info('Proxying request to', proxyUrl.href);

  const response = await fetch(proxyUrl.href, {
    method: context.request.method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: context.request.body,
  });
  return new Response(response.body);
};

//https://sokos-utbetalingsportalen-astro.intern.dev.nav.no/api/[akjsdfkjansdf]

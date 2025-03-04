import type { APIContext, APIRoute } from 'astro';
import { getOboToken } from 'src/utils/server/token';

type ProxyUrl = {
  apiProxy: string;
  apiUrl: string;
};

type ProxyAudience = {
  cluster: string;
  namespace: string;
  application: string;
};

function getProxyUrl(request: Request, proxyUrl: ProxyUrl): URL {
  const url = request.url.replace(
    `https://${process.env.UTBETALINGSPORTALEN_URL}${proxyUrl.apiProxy}`,
    proxyUrl.apiUrl,
  );
  return new URL(url);
}

function getProxyAudience(audience: ProxyAudience): string {
  return `api://${audience.cluster}.${audience.namespace}.${audience.application}/.default`;
}

export const routeProxyWithOboToken = (
  proxyUrl: ProxyUrl,
  audienceConfig: ProxyAudience,
): APIRoute => {
  return async (context: APIContext) => {
    const audience = getProxyAudience(audienceConfig);
    const token = await getOboToken(context.locals.token, audience);
    const url = getProxyUrl(context.request, proxyUrl);

    const response = await fetch(url.href, {
      method: context.request.method,
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: context.request.body,
      // @ts-expect-error
      duplex: 'half',
    });

    return new Response(response.body);
  };
};

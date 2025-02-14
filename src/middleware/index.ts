import { getToken, validateToken } from '@navikt/oasis';
import { defineMiddleware } from 'astro/middleware';
import { isLocal } from '../utils/server/urls.ts';
import { loginUrl } from './urls';
import { isInternal } from './utils';

export const onRequest = defineMiddleware(async (context, next) => {
  const token = getToken(context.request.headers);
  const params = encodeURIComponent(context.url.search);

  if (isLocal) {
    return next();
  }

  if (isInternal(context)) {
    return next();
  }

  if (!token) {
    console.info(
      'Could not find any bearer token on the request. Redirecting to login.',
    );
    return context.redirect(`${loginUrl}${params}`);
  }

  const validation = await validateToken(token);

  if (!validation.ok) {
    const error = new Error(
      `Invalid JWT token found (cause: ${validation.errorType} ${validation.error}, redirecting to login.`,
    );
    console.error(error);
    return context.redirect(`${loginUrl}${params}`);
  }

  context.locals.token = token;

  context.locals.userInfo = {
    navIdent: validation.payload.NAVident as string,
    name: validation.payload.name as string,
    adGroups: validation.payload.groups as [],
  }

  return next();
});

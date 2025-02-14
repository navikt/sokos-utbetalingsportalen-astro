import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorMessage from '../error/ErrorMessage.tsx';
import { NoAccess } from '../../pages/ErrorPage.tsx';
import ContentLoader from '../loader/ContentLoader.tsx';
import {
  checkRouteAccess,
  useAuthContext,
} from '../../utils/client/userAuth.ts';
import { AuthProvider } from '../../context/AuthProvider.tsx';

type MicrofrontendType = {
  url: string;
  adGroup: string;
};

function createMicrofrontendBundle(url: string) {
  return React.lazy(() => import(/* @vite-ignore */ url));
}

export default function Microfrontend(props: MicrofrontendType) {
  const authContext = useAuthContext();
  // TODO: find location  const location = useLocation();

  if (!checkRouteAccess(authContext.userData, props.adGroup)) {
    return <NoAccess />;
  }

  const MicrofrontendBundle = createMicrofrontendBundle(
    'http://localhost:3000/attestasjon/bundle.js',
  );

  return (
    <React.Suspense fallback={<ContentLoader />}>
      <ErrorBoundary FallbackComponent={ErrorMessage}>
        <main id="main-content">
          <MicrofrontendBundle />
        </main>
      </ErrorBoundary>
    </React.Suspense>
  );
}

import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorMessage from '../error/ErrorMessage.tsx';
import ContentLoader from '../loader/ContentLoader.tsx';
import type { UserData } from '../../types/UserData.ts';

type MicrofrontendType = {
  url: string;
  userData: UserData;
};

function createMicrofrontendBundle(url: string) {
  return React.lazy(() => import(/* @vite-ignore */ url));
}

export default function Microfrontend(props: MicrofrontendType) {
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

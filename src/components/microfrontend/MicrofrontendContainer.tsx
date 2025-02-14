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
import Microfrontend from './Microfrontend.tsx';

export default function MicrofrontendContainer() {
  return (
    <AuthProvider>
      <Microfrontend
        url="/attestasjon/bundle.js"
        adGroup={'0de8d01f-8ad0-4391-841c-55392956bc17'}
      />
    </AuthProvider>
  );
}

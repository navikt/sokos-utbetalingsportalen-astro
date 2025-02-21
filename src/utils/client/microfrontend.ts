import { getClientSideEnvironment } from './environment.ts';

function adGroup({
  adGroupDevelopment,
  adGroupProduction,
}: {
  adGroupDevelopment: string;
  adGroupProduction: string;
}) {
  return getClientSideEnvironment() === 'production'
    ? adGroupProduction
    : adGroupDevelopment;
}

/**
 * Forkortelser i URL er ikke en god idé. Det er bedre å bruke hele ord.
 * Bruk små bokstaver i URL.
 * Bruke bindestrek i URL for å skille på ord.
 * Ikke bruk Æ Ø Å. Skriv heller: Æ = AE, Ø = OE, Å = AA.
 **/

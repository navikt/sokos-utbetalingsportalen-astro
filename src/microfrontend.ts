type MicroFrontend = {
  app: string;
  title: string;
  description: string;
  adGroupDevelopment: string;
  adGroupProduction: string;
  route: string;
  naisAppName: string;
};

type MicrofrontendDictionary = Record<string, MicroFrontend>;

export const microfrontendConfigArray: MicroFrontend[] = [
  {
    app: 'ATTESTASJON',
    title: 'Attestasjon',
    description: 'Attestering av oppdrag',
    adGroupDevelopment: '0de8d01f-8ad0-4391-841c-55392956bc17',
    adGroupProduction: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    route: 'attestasjon',
    naisAppName: 'sokos-up-attestasjon',
  },
  {
    app: 'OPPDRAGSINFO',
    title: 'Oppdragsinfo',
    description: 'Søk etter oppdrag i Oppdragssystemet',
    adGroupDevelopment: 'e0023d91-26bc-4d5d-95ba-3148b6123afc',
    adGroupProduction: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    route: 'oppdragsinfo',
    naisAppName: 'sokos-up-oppdragsinfo',
  },
  {
    app: 'TEMPLATE',
    title: 'Template',
    description: 'Template for new apps',
    adGroupDevelopment: 'e0023d91-26bc-4d5d-95ba-3148b6123afa',
    adGroupProduction: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    route: 'template',
    naisAppName: 'sokos-up-template',
  },
];

/**
 * Creates a dictionary of page configurations indexed by lowercase app name
 * @param pages Array of page configurations
 * @returns Dictionary with page configs accessible by lowercase app name
 */
function createMicrofrontendConfig(
  pages: MicroFrontend[],
): MicrofrontendDictionary {
  return Object.fromEntries(
    pages.map((page) => [page.app.toLowerCase(), page]),
  ) as MicrofrontendDictionary;
}

/**
 * Dictionary of page configurations, accessible by lowercase app name
 * Example: pagesConfig.attestasjon
 */
const microfrontendConfig: MicrofrontendDictionary = createMicrofrontendConfig(
  microfrontendConfigArray,
);

/**
 * Gets a page configuration by app name (case insensitive)
 * @param appName The name of the app to get config for
 * @returns The page configuration
 */
export function getMicrofrontendConfig(appName: string): MicroFrontend {
  return microfrontendConfig[appName.toLowerCase()];
}

export function getAllApps() {
  return microfrontendConfigArray.map((page) => ({
    app: page.app,
    title: page.title,
    description: page.description,
    url: page.route,
    adGroupDevelopment: page.adGroupDevelopment,
    adGroupProduction: page.adGroupProduction,
    route: page.route,
    naisAppName: page.naisAppName,
  }));
}

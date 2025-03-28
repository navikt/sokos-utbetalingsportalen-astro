import { Heading, Switch } from '@navikt/ds-react';
import { useState } from 'react';
import { microfrontendConfigArray as allApps } from 'src/microfrontend';
import { hasAccessToAdGroup } from 'src/utils/common';
import AppCard from './AppCard';
import styles from './AppSwitcher.module.css';

type AppSwitcherProps = {
  adGroups: string[];
};

export default function AppSwitcher(props: AppSwitcherProps) {
  const authorizedApps = allApps.filter(
    (app) =>
      hasAccessToAdGroup(props.adGroups, app.adGroupDevelopment) ||
      hasAccessToAdGroup(props.adGroups, app.adGroupProduction),
  );

  const [showApps, setShowApps] = useState<string>('');

  function appCards() {
    return (showApps ? allApps : authorizedApps).map((app) => (
      <AppCard
        key={app.app}
        hasAccess={authorizedApps.includes(app)}
        route={app.route}
        title={app.title}
        description={app.description}
      />
    ));
  }

  return (
    <>
      <Heading level="3" size="medium" spacing>
        Apper
      </Heading>
      <Switch
        value="show"
        checked={showApps === 'show'}
        onChange={(e) => setShowApps((value) => (value ? '' : e.target.value))}
      >
        Vis alle
      </Switch>
      <div className={styles.homeApps}>{appCards()}</div>
    </>
  );
}

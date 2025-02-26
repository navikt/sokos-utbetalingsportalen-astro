import { Heading, Switch } from "@navikt/ds-react";
import { pagesConfig } from "src/config/pageconfig";
import { useState } from "react";
import AppCard from "./AppCard";
import styles from "./AppSwitcher.module.css";

type AppSwitcherProps = {
adGroups: string[];
}

export default function AppSwitcher(props: AppSwitcherProps) {

  function checkGroup(uuid: string) {
      return props.adGroups.includes(uuid);
    }

  const allApps = pagesConfig;
  const authorizedApps = allApps.filter(
    (app) =>
      checkGroup(app.adGroupDevelopment) || checkGroup(app.adGroupProduction),
  );

  const [showApps, setShowApps] = useState<string>('');

  function appCards() {
    return (showApps ? allApps : authorizedApps).map((app) => (
      <AppCard
        key={app.app}
        hasAccess={authorizedApps.includes(app)}
        url={app.url}
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
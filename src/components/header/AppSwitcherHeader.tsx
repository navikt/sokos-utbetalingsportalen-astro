import { MenuGridIcon } from '@navikt/aksel-icons';
import { Dropdown, InternalHeader } from '@navikt/ds-react';
import { pagesConfig } from '../../config/pageconfig.ts';
import { hasAccessToAdGroup } from 'src/utils/common.ts';

type AppSwitcherHeaderProps = {
  adGroups: string[];
};
export default function AppSwitcherHeader(props: AppSwitcherHeaderProps) {
  const authorizedApps = pagesConfig.filter(
    (app) =>
      hasAccessToAdGroup(props.adGroups, app.adGroupDevelopment) ||
      hasAccessToAdGroup(props.adGroups, app.adGroupProduction),
  );

  function getMicrofrontendLinks() {
    return authorizedApps.map((page) => (
      <Dropdown.Menu.GroupedList.Item
        as="a"
        target="_blank"
        href={page.url}
        key={page.title + 'dropdown'}
      >
        <div aria-hidden>{page.title}</div>
      </Dropdown.Menu.GroupedList.Item>
    ));
  }

  return (
    <Dropdown>
      <InternalHeader.Button as={Dropdown.Toggle}>
        <MenuGridIcon style={{ fontSize: '1.5rem' }} title="Arbeidsflater" />
      </InternalHeader.Button>
      <Dropdown.Menu>
        <Dropdown.Menu.GroupedList>
          <Dropdown.Menu.GroupedList.Heading>
            Arbeidsflater (Åpner&nbsp;i&nbsp;ny&nbsp;fane)
          </Dropdown.Menu.GroupedList.Heading>
          {getMicrofrontendLinks()}
        </Dropdown.Menu.GroupedList>
      </Dropdown.Menu>
    </Dropdown>
  );
}

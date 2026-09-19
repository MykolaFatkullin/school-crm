import { AppPageTitleBlock } from '../../shared/components/appPageTitleBlock';
import { Navigate } from 'react-router-dom';
import { useMeQuery } from '../../app/api/account/accountApi';
import { ROUTES } from '../../shared/config';
import { ContentCard } from '../../shared/components/contentCard';
import { SettingsSidebar } from './components/sidebar/SettingsSidebar';
import { useState } from 'react';
import { SettingsSection } from './model';
import styles from './SchoolSettingsPage.module.scss';
import { SettingsSections } from './model/SettingsSection';
import { SchoolSettings } from './components/SchoolSettings';
import { SMTPSettings } from './components/SMTPSettings';
import { PaymentSettings } from './components/PaymentSettings';

const getFormByActiveSection = (activeSection: SettingsSection) => {
  switch (activeSection) {
    case 'school-information':
      return <SchoolSettings />;
    case 'payment':
      return <PaymentSettings />;
    case 'smtp':
      return <SMTPSettings />;
    default:
      return null;
  }
};

export const SchoolSettingsPage = () => {
  const [activeSection, setActiveSection] =
    useState<SettingsSection>('school-information');
  const { data: me } = useMeQuery();

  if (!me) {
    return null;
  }

  const userRole = me.role;

  if (userRole !== 'ADMIN') {
    return <Navigate to={ROUTES.DASHBOARD} replace />;
  }

  return (
    <>
      <AppPageTitleBlock
        title={'School Settings'}
        subtitle={'Configure school information and preferences'}
      />
      <div className={styles.contentContainer}>
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <ContentCard>
          <p className={styles.sectionLabel}>
            {
              SettingsSections.find(section => section.id === activeSection)
                ?.label
            }
          </p>
          {getFormByActiveSection(activeSection)}
        </ContentCard>
      </div>
    </>
  );
};

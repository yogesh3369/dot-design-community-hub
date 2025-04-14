import React, { useEffect } from 'react';
import { initGA, trackPageView } from '../../services/analytics';
import { GA_TRACKING_ID } from '../../lib/gtag';

interface AnalyticsProviderProps {
  children: React.ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  useEffect(() => {
    if (GA_TRACKING_ID) {
      initGA();
      trackPageView(window.location.pathname);
    }
  }, []);

  return <>{children}</>;
};

import { GA_TRACKING_ID } from '../lib/gtag';
import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initGA = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

// Track page views
export const trackPageView = (path: string) => {
  ReactGA.send({
    hitType: 'pageview',
    page: path,
  });
};

// Track events
export const trackEvent = (category: string, action: string, label?: string, value?: number) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

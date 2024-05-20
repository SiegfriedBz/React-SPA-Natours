export type TLink = {
  to: string
  label: string
  as?: 'btn'
  icon?: string
  dataCy: string
}

/** auth links */
export const AUTH_NAV_LINKS = [
  {
    to: '/login',
    label: 'Login',
    as: 'btn' as const,
    dataCy: 'nav-item-login'
  }
]

/** other links */
const BASE_NAV_LINKS: TLink[] = [
  {
    to: '/',
    label: 'Home',
    icon: 'home',
    dataCy: 'nav-item-home'
  },
  {
    to: '/about',
    label: 'About',
    icon: 'info',
    dataCy: 'nav-item-about'
  }
]

export const NAV_LINKS_LOGGED_IN: TLink[] = [
  ...BASE_NAV_LINKS,
  {
    to: '/me',
    label: 'My Profile',
    icon: 'user-check',
    dataCy: 'nav-item-me'
  },
  {
    to: '/my-bookings',
    label: 'My Bookings',
    icon: 'calendar',
    dataCy: 'nav-item-my-bookings'
  },
  {
    to: '/tours/insights',
    label: 'Tours Insights',
    icon: 'bar-chart',
    dataCy: 'nav-item-insights'
  }
]

export const NAV_LINKS_ADMIN: TLink[] = [
  ...NAV_LINKS_LOGGED_IN,
  {
    to: '/tours/planning/2024',
    label: 'Tours Planning',
    icon: 'bar-chart-2',
    dataCy: 'nav-item-planning'
  },
  {
    to: '/tours/new',
    label: 'Create Tour',
    icon: 'save',
    dataCy: 'nav-item-new'
  }
]

export const NAV_LINKS_NOT_LOGGED_IN: TLink[] = [
  ...BASE_NAV_LINKS,
  {
    to: '/tours/insights',
    label: 'Tours Insights',
    icon: 'bar-chart',
    dataCy: 'nav-item-insights'
  }
]

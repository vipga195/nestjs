import { profile } from '@/profiles'
const { routeBase } = profile
export const routerLink = {
  entry: () => `${routeBase}entry/`,
  rule: () => `${routeBase}rule/`,
  guest: () => `${routeBase}guest/`,
  aboutOnline: () => `${routeBase}guest/`,
  qualifying: () => `${routeBase}guest/`,
  view: () => `${routeBase}guest/`,
  note: () => 'https://othellonia.com/event-campaign/JFY6KIyLfYvOzymxWTOW',
  top: () => routeBase,
  faq: () => 'https://othellonia.com/event-campaign/kgJr9QRjvPG20UgXiXSg',

  // entry form
  formEntry1: () => 'https://ext.othellonia.com/offlineevent?form=174_d96683f41827003797df5248417f1320',
  formEntry2: () => 'https://ext.othellonia.com/offlineevent?form=175_510d345f504275c3a26f35e5ecf54277',
  formEntry3: () => 'https://ext.othellonia.com/offlineevent?form=176_d96726dbe003824f47dec7cafe77183b',
  formEntry4: () => 'https://ext.othellonia.com/offlineevent?form=177_23a7b5cb3e84444aadbabed3039f9a50',
  formEntry5: () => 'https://ext.othellonia.com/offlineevent?form=178_ee6cd5b0b04d8976869ff51e83e363bc',
  formEntry6: () => 'https://ext.othellonia.com/offlineevent?form=179_02bffbf58208f9029080ac95d8e1cc0b',

  // ikusa old
  ikusa2019: () => 'https://community.othellonia.com/ikusa/2019/',
  ikusa2018: () => 'https://community.othellonia.com/ikusa/2018/',
  ikusa2017: () => 'https://community.othellonia.com/ikusa/2017summer/'
}

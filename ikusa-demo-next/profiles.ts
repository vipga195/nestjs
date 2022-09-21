export type Profile = {
  name: string
  routeBase: string
  devTools?: boolean
  assetPublicPath: string
  debugTime: boolean
  requireAuth: boolean
  auth: {
    user: string
    password: string
  }
}

const subPath = '/ikusa/2022/'
const assetPublicPath = '/ikusa/2022/_nuxt/'
const auth: Profile['auth'] = {
  user: 'events',
  password: 'LatvXcg2',
}

const Profiles: Record<string, Profile> = {
  local: {
    name: 'Local',
    routeBase: '/',
    devTools: true,
    assetPublicPath: '/_nuxt/',
    debugTime: true,
    requireAuth: process.env.NO_REQUIRE_AUTH !== 'yes',
    auth,
  },
  development: {
    name: 'Development',
    routeBase: subPath,
    devTools: true,
    assetPublicPath,
    debugTime: true,
    requireAuth: true,
    auth,
  },
  production: {
    name: 'Production',
    routeBase: subPath,
    devTools: false,
    assetPublicPath,
    debugTime: false,
    requireAuth: false,
    auth,
  },
}

export const profileName = process.env.PROFILE_NAME || 'production'

if (!(profileName in Profiles)) {
  throw new Error(`Profile not defined: ${profileName}`)
}

export const profile = Profiles[profileName]

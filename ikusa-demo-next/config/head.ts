import { profile } from '../profiles'
import config from './index'

const { title, description, version, shareUrl, locale } = config

const ogpImage = `${shareUrl}ogpv2.jpg`

function setupTouchIcon() {
  const touchIconSize = ['', '180']
  const touchIonList: { rel: string; href: string }[] = []

  touchIconSize.map((touch) => {
    const size = touch ? `-${touch}x${touch}` : ''
    const metaLink = [
      { rel: 'apple-touch-icon', href: profile.routeBase + `apple-touch-icon${size}.png` },
      { rel: 'apple-touch-icon-precomposed', href: profile.routeBase + `apple-touch-icon${size}.png` },
    ]
    return touchIonList.push(...metaLink)
  })

  return touchIonList
}
const touchIonList = setupTouchIcon()
export default {
  title,
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width,  user-scalable=no, maximum-scale=1, initial-scale=1.0' },
    { name: 'description', hid: 'description', content: description },
    { name: 'x-version', hid: 'x-version', content: version },
    // meta('description', description),
    // meta('x-version', version),

    // Facebook
    { name: 'og:title', hid: 'og:title', content: title },
    { name: 'og:description', hid: 'og:description', content: description },
    { name: 'og:type', hid: 'og:type', content: 'website' },
    { name: 'og:site_name', hid: 'og:site_name', content: '' },
    { name: 'og:locale', hid: 'og:locale', content: locale },
    { name: 'og:url', hid: 'og:url', content: shareUrl },
    { name: 'og:image', hid: 'og:image', content: ogpImage },

    // Twitter
    { name: 'twitter:title', hid: 'twitter:title', content: title },
    { name: 'twitter:description', hid: 'twitter:description', content: description },
    { name: 'twitter:card', hid: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:domain', hid: 'twitter:domain', content: shareUrl },
    { name: 'twitter:image', hid: 'twitter:image', content: ogpImage },
  ],
  htmlAttrs: {
    lang: 'ja',
  },
  link: [
    { rel: 'shortcut icon', type: 'image/x-icon', href: profile.routeBase + 'favicon.ico?v=1' },
    { rel: 'icon', type: 'image/x-icon', href: profile.routeBase + 'apple-touch-icon.png?v=1' },
    ...touchIonList,
  ],
  noscript: [
    {
      innerHTML: '',
      body: true,
    },
  ],
  __dangerouslyDisableSanitizers: ['script', 'noscript'],
}

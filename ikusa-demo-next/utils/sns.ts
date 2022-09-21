const FACEBOOK_SHARE_URL = 'https://www.facebook.com/sharer/sharer.php'
const TWITTER_SHARE_URL = 'http://twitter.com/share'
const LINE_SHARE_SP_URL = 'http://line.me/R/msg/text/'
const LINE_SHARE_PC_URL = 'https://social-plugins.line.me/lineit/share'

export default class SNS {
  static shareFacebook (message: string, url: string = '') {
    return `${FACEBOOK_SHARE_URL}?quote=${encodeURIComponent(message)}&u=${encodeURIComponent(url)}`
  }

  static shareTwitter (message: string, url: string = '', hashtags: string = '') {
    return `${TWITTER_SHARE_URL}?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}&hashtags=${encodeURIComponent(hashtags)}`
  }

  static shareLine (message: string, sp: boolean = false) {
    const encodeMsg = encodeURIComponent(message)

    if (sp) {
      return `${LINE_SHARE_SP_URL}?${encodeMsg}`
    } else {
      return `${LINE_SHARE_PC_URL}?text=${encodeMsg}`
    }
  }
}

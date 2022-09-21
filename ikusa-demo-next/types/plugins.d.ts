import { PlatformType } from '@/plugins/platform'
import { HelperType } from '@/plugins/helper'
import { RouterLink } from '@/plugins/router-link'
import { MobileTye } from '@/plugins/mobile'


// declear global window
declare global {
  interface Window {
    gtag: Function
  }
}

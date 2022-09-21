import { GtagEventOptions } from '~/models/gtag'

let old = 360

function shareOnTwitter (text: string, hashtags: string) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&hashtags=${encodeURIComponent(hashtags)}`
}

function getImg (text: string, type: string = 'png'): string {
  return `/images/${text}.${type}`
}
function onChangeResize (): void {
  // cập nhật lại heigth của chiều cao (để cho mobile)
  const ratio = window.innerWidth / window.innerHeight
  const doc = document.documentElement
  // console.log({ old, a: window.innerWidth })
  if (old !== window.innerWidth) {
    old = window.innerWidth
    if (ratio > 2) {
      doc.style.setProperty('--window-height', `${window.innerWidth / 2}px`)
    } else {
      doc.style.setProperty('--window-height', `${window.innerHeight}px`)
    }
  }
}

function disableScroll (scrollPosition: number): void {
  // document.body.style.overflow = 'hidden'
  document.body.style.position = 'fixed'
  document.body.style.top = `-${scrollPosition}px`
  document.body.style.width = '100%'
}

function enableScroll (scrollPosition: number): void {
  // document.body.style.removeProperty('overflow')
  document.body.style.removeProperty('position')
  document.body.style.removeProperty('top')
  document.body.style.removeProperty('width')
  window.scrollTo(0, scrollPosition)
}

function handleError (err: Error) {
  // eslint-disable-next-line no-console
  console.log(err)
}

function getDate (dateDetail: { date: any; month: any; year: any }) {
  const { date, month, year } = dateDetail

  return `${year}/${padZero(month)}/${padZero(date)}`
}

function padZero (n: string | number) {
  return n < 10 ? '0' + n : n
}

function meta (name: string = '', content: string = '', extend: object = {}): object {
  return {
    name,
    hid: name,
    content,
    ...extend
  }
}

function replaceLineBreakTag (text: string, replaceValue = ' '): string {
  // eslint-disable-next-line no-useless-escape
  return text.replace(/<br\s*[\/]?>/gi, replaceValue)
}

type GtagEvent = {
  action: string
  options?: GtagEventOptions
}
function gtagEvent (props: GtagEvent) {
  const { action, options } = props
  console.table({
    name: 'gtagEvent',
    action,
    event_category: options?.event_category || 'click',
    event_label: options?.event_label || '',
    value: options?.value
  })

  window.gtag('event', action, options)
}

function gtagConfig (page_path: string = '/', anonymize_ip: boolean = true, gtagId: string = '') {
  console.table({
    name: 'gtagConfig',
    page_path,
    anonymize_ip
  })

  window.gtag('config', gtagId, { anonymize_ip, page_path })
}

export {
  shareOnTwitter,
  onChangeResize,
  getImg,
  disableScroll,
  enableScroll,
  handleError,
  getDate,
  padZero,
  meta,
  replaceLineBreakTag,
  gtagEvent,
  gtagConfig
}

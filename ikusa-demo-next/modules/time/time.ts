import dayjs, { Dayjs, extend, locale } from 'dayjs'

import dayJsUtc from 'dayjs/plugin/utc'
import dayJsTimezone from 'dayjs/plugin/timezone'
import dayJsIsSameOrAfter from 'dayjs/plugin/isSameOrAfter'

import 'dayjs/locale/ja'

extend(dayJsUtc)
extend(dayJsTimezone)
extend(dayJsIsSameOrAfter)

locale('ja')

export { Dayjs }
export type CanBeTime = string | Date | Dayjs

export function getTime(time: CanBeTime): Dayjs {
  return dayjs(time).tz('Asia/Tokyo')
}

export function getCurrentTime(): Dayjs {
  return dayjs().tz('Asia/Tokyo')
}

export function format(time: CanBeTime, formatStr: string): string {
  return getTime(time).format(formatStr)
}

export function dayInWeek(time: CanBeTime): string {
  return getTime(time).format('ddd')
}
export function detail(time: CanBeTime) {
  const t = getTime(time)

  return {
    year: t.year(),
    month: t.month() + 1,
    date: t.date(),
    dayInWeek: t.day(),
    hour: t.hour(),
    minute: t.minute(),
    second: t.second(),
    format: {
      year: t.format('YYYY'),
      month: t.format('MM'),
      date: t.format('DD'),
      dayInWeek: t.format('ddd'),
      hour: t.format('HH'),
      minute: t.format('mm'),
      second: t.format('ss'),
      timezone: t.format('Z')
    }
  }
}

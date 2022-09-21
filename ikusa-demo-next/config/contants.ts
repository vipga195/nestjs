import loader from './loader.json'
import { DataEntryItemType, LoadingType, DataEntryOnlineItemType } from '~/models/top'
import { routerLink } from '~/routerLink'
import config from '@/config'

const { times } = config

export const MapEntry: DataEntryItemType[] = [
  { date: '10月9日(日)', text: '北海道地区予選', urlMap: 'https://goo.gl/maps/VXEN4EW9MKL7L67F6', txtMap: 'ACU-A ', urlEntry: routerLink.entry() + '#entry1', timeStart: times.entryItem1.start, timeShow: times.entryItem1.show, timeEnd: times.entryItem1.end, linkForm: routerLink.formEntry1(), },
  { date: '10月16日(日)', text: '九州地区予選', urlMap: 'https://goo.gl/maps/hcnCgMA8YeKg5T8f8', txtMap: '天神クリスタルビル ', urlEntry: routerLink.entry() + '#entry2', timeStart: times.entryItem2.start, timeShow: times.entryItem2.show, timeEnd: times.entryItem2.end, linkForm: routerLink.formEntry2(), },
  { date: '10月23日(日)', text: '東北地区予選', urlMap: 'https://goo.gl/maps/7neb4BsFe5KfR8zM9', txtMap: 'イベントホール松栄 ', urlEntry: routerLink.entry() + '#entry3', timeStart: times.entryItem3.start, timeShow: times.entryItem3.show, timeEnd: times.entryItem3.end, linkForm: routerLink.formEntry3(), },
  { date: '11月3日(木)', text: '関西地区予選', urlMap: 'https://goo.gl/maps/qa2wtn6AdZmA7yzV6', txtMap: 'OMMホール ', urlEntry: routerLink.entry() + '#entry4', timeStart: times.entryItem4.start, timeShow: times.entryItem4.show, timeEnd: times.entryItem4.end, linkForm: routerLink.formEntry4(), },
  { date: '11月6日(日)', text: '関東地区予選', urlMap: 'https://goo.gl/maps/swAo6rqMVxNWwQt18', txtMap: '有明セントラルタワーホール', urlEntry: routerLink.entry() + '#entry5', timeStart: times.entryItem5.start, timeShow: times.entryItem5.show, timeEnd: times.entryItem5.end, linkForm: routerLink.formEntry5(), },
  { date: '11月13日(日)', text: '中部地区予選', urlMap: 'https://goo.gl/maps/q3pBiFdRhj931D7v9', txtMap: '吹上ホール ', urlEntry: routerLink.entry() + '#entry6', timeStart: times.entryItem6.start, timeShow: times.entryItem6.show, timeEnd: times.entryItem6.end, linkForm: routerLink.formEntry6(), },
]

export const OnlineEntry: DataEntryOnlineItemType[] = [
  { date: '11月19日(土)', text: 'オンライン予選', urlMap: null, txtMap: null, urlEntry: routerLink.entry() + '#entry-online-1', timeStart: times.onlineItem1.start, timeEnd: times.onlineItem1.end, timeShow1: times.onlineItem1.show1, timeShow2: times.onlineItem1.show2, linkForm: routerLink.formEntry1(), quote: '※オンライン予選は、地区予選に参加していない方のみエントリー可能です。', typeButton: 'blue', },
  { date: '11月26日(土)', text: 'オンライン予選 リベンジ枠', urlMap: null, txtMap: null, urlEntry: routerLink.entry() + '#entry-online-2', timeStart: times.onlineItem2.start, timeEnd: times.onlineItem2.end, timeShow1: times.onlineItem2.show1, timeShow2: times.onlineItem2.show2, linkForm: routerLink.formEntry2(), quote: '※オンライン予選リベンジ枠は、地区予選、オンライン予選に<br/>参加した方のみエントリー可能です。<br/>※オンライン予選リベンジ枠へのご応募は、先着順ではなく抽選となります。', typeButton: 'blue', },
]

export const FinalEntry: DataEntryOnlineItemType[] = [
  { date: '12月17日(土)', text: '全国決勝観覧', urlMap: 'https://goo.gl/maps/BeaX5rtLUQ8MDeg77', txtMap: '品川インターシティホール', urlEntry: routerLink.entry() + '#entry-final-1', timeStart: times.finalItem1.start, timeEnd: times.finalItem1.end, timeShow1: times.finalItem1.show1, timeShow2: times.finalItem1.show2, linkForm: routerLink.formEntry1(), quote: '※オンライン予選は、地区予選に参加していない方のみエントリー可能です。', typeButton: 'green', },
]

export const dateJP = ['日', '月', '火', '水', '木', '金', '土'] // [cn,t2,...]

export const loaderData = loader as LoadingType

export const MOBILE_WIDTH = 768

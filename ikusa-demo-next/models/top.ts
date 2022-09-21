export type DataEntryItemType = {
  date:string
  text:string
  urlMap:string|null
  txtMap:string|null
  urlEntry:string|null
  timeEnd?: Date
  timeStart?: Date
  timeShow?: Date
  linkForm?:string
  typeButton?:string
}

export type DataEntryOnlineItemType = {
  date:string
  text:string
  urlMap:string|null
  txtMap:string|null
  urlEntry:string|null
  timeEnd?: Date
  timeStart?: Date
  timeShow1?: Date
  timeShow2?: Date
  timeShow3?: Date
  linkForm?:string
  quote?:string
  typeButton?:string
}

export interface LoadingItemType {
  'frame': {
    'x': number
    'y': number
    'w': number
    'h': number
  }
  'rotated': boolean
  'trimmed': boolean
  'spriteSourceSize': {
    'x': number
    'y': number
    'w': number
    'h': number
  }
  'sourceSize': {
    'w': number
    'h': number
  }
}

export interface LoadingType {
  frames:{
    [key: string]: LoadingItemType
  }
  meta:{
    app:string
    image:string
    format:string
    size:{
      'w': number
      'h':number
    }
    scale:number
  }
}

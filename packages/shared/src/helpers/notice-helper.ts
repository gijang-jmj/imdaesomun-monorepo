import { NoticeCorporationTypeKor } from "@imdaesomun/shared/constants/notice"
import { isToday } from "date-fns"

export const isNewNotice = (timestamp: number): boolean => {
  return isToday(new Date(timestamp))
}

export const getNoticeCorporationTypeKor = (type: string): string => {
  switch (type) {
    case 'sh':
      return NoticeCorporationTypeKor.sh
    case 'gh':
      return NoticeCorporationTypeKor.gh
    case 'ih':
      return NoticeCorporationTypeKor.ih
    case 'bmc':
      return NoticeCorporationTypeKor.bmc
    default:
      return '알 수 없는 기관'
  }
}

export const getNoticeCorporationBgColor = (type: string): string => {
  switch (type) {
    case 'sh':
      return 'bg-sh'
    case 'gh':
      return 'bg-gh'
    case 'ih':
      return 'bg-ih'
    case 'bmc':
      return 'bg-bmc'
    default:
      return 'bg-gray-500'
  }
}

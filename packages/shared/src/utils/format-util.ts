import { format } from "packages/shared/node_modules/date-fns/format"

export const formatDate = (timestamp: number): string => {
  return format(new Date(timestamp), 'yyyy.MM.dd')
}

export const formatNumberWithComma = (hits: number): string => {
  return hits.toLocaleString()
}

export const splitByNewline = (text: string): string[] => {
  return text.split('\n')
}

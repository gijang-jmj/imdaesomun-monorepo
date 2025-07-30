import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getBmcNoticeList, getGhNoticeList, getIhNotice, getShNoticeList } from '@/api/notice-api'
import type { Notice } from '@imdaesomun/shared/types/notice'

const createNoticeStore = (id: string, fetcher: () => Promise<Notice[]>) => {
  return defineStore(id, () => {
    const notices = ref<Notice[]>([])
    const isLoading = ref(false)
    const error = ref<Error | null>(null)

    const fetchNotices = async () => {
      if (notices.value.length > 0) {
        return notices.value
      }

      try {
        isLoading.value = true
        const fetchedData = await fetcher()
        notices.value = fetchedData
      } catch (e) {
        error.value = e as Error
        console.error('Error fetching notices:', e)
      } finally {
        isLoading.value = false
      }
    }

    return {
      notices,
      isLoading,
      error,
      fetchNotices,
    }
  })
}

export const useShNoticeListStore = createNoticeStore('shNoticeList', getShNoticeList)
export const useGhNoticeListStore = createNoticeStore('ghNoticeList', getGhNoticeList)
export const useIhNoticeListStore = createNoticeStore('ihNoticeList', getIhNotice)
export const useBmcNoticeListStore = createNoticeStore('bmcNoticeList', getBmcNoticeList)

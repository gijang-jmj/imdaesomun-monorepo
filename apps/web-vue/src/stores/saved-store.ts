import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getSavedNotices } from '@/api/notice-api'
import type { Notice } from '@imdaesomun/shared/types/notice'
import { useUserStore } from '@/stores/user-store'

export const useSavedStore = defineStore('saved', () => {
  const savedNotices = ref<Notice[]>([])
  const hasMore = ref(true)
  const nextOffset = ref(0)
  const totalFetched = ref(0)
  const totalCount = ref(0)
  const shCount = ref(0)
  const ghCount = ref(0)
  const ihCount = ref(0)
  const bmcCount = ref(0)
  const isLoading = ref(false)
  const error = ref<Error | null>(null)
  const currentFilter = ref<string | null>(null)

  const userStore = useUserStore()
  const limit = 15

  const fetchSavedNotices = async () => {
    if (!userStore.uid || isLoading.value || !hasMore.value) return

    isLoading.value = true
    error.value = null

    try {
      const response = await getSavedNotices({
        userId: userStore.uid,
        offset: nextOffset.value,
        limit: limit,
        corporation: currentFilter.value || undefined,
      })

      savedNotices.value = [...savedNotices.value, ...response.notices]
      hasMore.value = response.hasMore
      nextOffset.value = response.nextOffset
      totalFetched.value = response.totalFetched
      totalCount.value = response.totalCount
      shCount.value = response.shCount
      ghCount.value = response.ghCount
      ihCount.value = response.ihCount
      bmcCount.value = response.bmcCount
    } catch (e) {
      error.value = e as Error
      console.error('Error fetching saved notices:', e)
    } finally {
      isLoading.value = false
    }
  }

  const setFilter = (filter: string | null) => {
    currentFilter.value = filter
    resetParameters()
    fetchSavedNotices()
  }

  const resetParameters = () => {
    savedNotices.value = []
    hasMore.value = true
    nextOffset.value = 0
    totalFetched.value = 0
    error.value = null
  }

  const resetState = () => {
    resetParameters()
    totalCount.value = 0
    shCount.value = 0
    ghCount.value = 0
    ihCount.value = 0
    bmcCount.value = 0
    currentFilter.value = null
  }

  const updateSavedNotice = () => {
    resetState()
    fetchSavedNotices()
  }

  return {
    savedNotices,
    hasMore,
    nextOffset,
    totalFetched,
    totalCount,
    shCount,
    ghCount,
    ihCount,
    bmcCount,
    isLoading,
    error,
    currentFilter,
    fetchSavedNotices,
    setFilter,
    resetState,
    updateSavedNotice,
  }
})

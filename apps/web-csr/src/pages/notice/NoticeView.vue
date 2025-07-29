<script setup lang="ts">
import { useNotice } from '@/composables/useNotice'
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import NoticeDetail from './components/NoticeDetail.vue'
import ErrorCard from '@/components/shared/ErrorCard.vue'
import NoticeDetailSkeleton from './components/NoticeDetailSkeleton.vue'
import { useUserStore } from '@/stores/user-store'

const route = useRoute()
const {
  notice,
  isSaved,
  isLoading,
  error,
  fetchNoticeById,
  checkIfNoticeSaved,
  handleSaveNotice,
  handleDeleteNotice,
} = useNotice()
const userStore = useUserStore()

const handleSaveClick = (id: string, isSaved: boolean) => {
  if (isSaved) {
    handleDeleteNotice(id)
  } else {
    handleSaveNotice(id)
  }
}

onMounted(() => {
  const id = route.query.id
  if (typeof id === 'string') {
    fetchNoticeById(id)
  }
})

watch(
  () => userStore.isLoggedIn,
  () => {
    const id = route.query.id
    if (typeof id === 'string') {
      checkIfNoticeSaved(id)
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <template v-if="isLoading">
      <NoticeDetailSkeleton />
    </template>
    <template v-else-if="error">
      <ErrorCard
        class="mx-4 my-2"
        :content="'공고 상세를 불러오는 중 오류가 발생했어요\n잠시 후 다시 시도해주세요'"
      />
    </template>
    <template v-else-if="notice">
      <NoticeDetail :notice="notice" :is-saved="isSaved" @save-clicked="handleSaveClick" />
    </template>
    <template v-else>
      <ErrorCard
        class="mx-4 my-2"
        :content="'해당 공고를 찾을 수 없어요\n다른 공고를 확인해주세요'"
      />
    </template>
  </div>
</template>

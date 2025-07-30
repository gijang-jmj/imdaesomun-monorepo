<script setup lang="ts">
import IconGh from '@/components/icons/IconGh.vue'
import IconSh from '@/components/icons/IconSh.vue'
import NoticeBanner from './components/NoticeBanner.vue'
import NoticeCard from './components/NoticeCard.vue'
import IconIh from '@/components/icons/IconIh.vue'
import IconBmc from '@/components/icons/IconBmc.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import {
  useBmcNoticeListStore,
  useGhNoticeListStore,
  useIhNoticeListStore,
  useShNoticeListStore,
} from '@/stores/notice-store'
import NoticeCardSkeleton from './components/NoticeCardSkeleton.vue'
import InfoCard from '@/components/shared/InfoCard.vue'
import ErrorCard from '@/components/shared/ErrorCard.vue'
import { NoticeCorporationTypeKor } from '@imdaesomun/shared/constants/notice'

const shNoticeListStore = useShNoticeListStore()
const {
  notices: shNotices,
  isLoading: shIsLoading,
  error: shError,
} = storeToRefs(shNoticeListStore)

const ghNoticeListStore = useGhNoticeListStore()
const {
  notices: ghNotices,
  isLoading: ghIsLoading,
  error: ghError,
} = storeToRefs(ghNoticeListStore)

const ihNoticeListStore = useIhNoticeListStore()
const {
  notices: ihNotices,
  isLoading: ihIsLoading,
  error: ihError,
} = storeToRefs(ihNoticeListStore)

const bmcNoticeListStore = useBmcNoticeListStore()
const {
  notices: bmcNotices,
  isLoading: bmcIsLoading,
  error: bmcError,
} = storeToRefs(bmcNoticeListStore)

onMounted(() => {
  shNoticeListStore.fetchNotices()
  ghNoticeListStore.fetchNotices()
  ihNoticeListStore.fetchNotices()
  bmcNoticeListStore.fetchNotices()
})
</script>

<template>
  <div class="mx-4 my-2 flex flex-col items-stretch justify-start gap-2">
    <InfoCard
      content="최근 10개 공고만 제공되며, 과거 공고 및 검색·정렬 기능은 각 공사의 공식 홈페이지를 이용해주세요"
    />
  </div>
  <div class="mb-24 grid grid-cols-1 gap-x-4 gap-y-8 p-4 md:grid-cols-2">
    <div class="flex flex-col items-stretch gap-2">
      <NoticeBanner :title="NoticeCorporationTypeKor.sh">
        <IconSh class="w-7 md:w-8" />
      </NoticeBanner>
      <ErrorCard
        v-if="shError"
        :content="'공고를 불러오는 중 오류가 발생했어요\n잠시 후 다시 시도해주세요'"
      />
      <div v-else class="flex flex-col gap-2">
        <template v-if="shIsLoading">
          <NoticeCardSkeleton v-for="i in 10" :key="i" />
        </template>
        <template v-else>
          <NoticeCard
            v-for="notice in shNotices"
            :key="notice.id"
            :id="notice.id"
            :title="notice.title"
            :date="notice.regDate"
            :views="notice.hits"
            :department="notice.department"
          />
        </template>
      </div>
    </div>
    <div class="flex flex-col items-stretch gap-2">
      <NoticeBanner :title="NoticeCorporationTypeKor.gh">
        <IconGh class="w-7 md:w-8" />
      </NoticeBanner>
      <ErrorCard
        v-if="ghError"
        :content="'공고를 불러오는 중 오류가 발생했어요\n잠시 후 다시 시도해주세요'"
      />
      <div v-else class="flex flex-col gap-2">
        <template v-if="ghIsLoading">
          <NoticeCardSkeleton v-for="i in 10" :key="i" />
        </template>
        <template v-else>
          <NoticeCard
            v-for="notice in ghNotices"
            :key="notice.id"
            :id="notice.id"
            :title="notice.title"
            :date="notice.regDate"
            :views="notice.hits"
            :department="notice.department"
          />
        </template>
      </div>
    </div>
    <div class="flex flex-col items-stretch gap-2">
      <NoticeBanner :title="NoticeCorporationTypeKor.ih">
        <IconIh class="w-9 md:w-10" />
      </NoticeBanner>
      <ErrorCard
        v-if="ihError"
        :content="'공고를 불러오는 중 오류가 발생했어요\n잠시 후 다시 시도해주세요'"
      />
      <div v-else class="flex flex-col gap-2">
        <template v-if="ihIsLoading">
          <NoticeCardSkeleton v-for="i in 10" :key="i" />
        </template>
        <template v-else>
          <NoticeCard
            v-for="notice in ihNotices"
            :key="notice.id"
            :id="notice.id"
            :title="notice.title"
            :date="notice.regDate"
            :views="notice.hits"
            :department="notice.department"
          />
        </template>
      </div>
    </div>
    <div class="flex flex-col items-stretch gap-2">
      <NoticeBanner :title="NoticeCorporationTypeKor.bmc">
        <IconBmc class="w-9 md:w-10" />
      </NoticeBanner>
      <ErrorCard
        v-if="bmcError"
        :content="'공고를 불러오는 중 오류가 발생했어요\n잠시 후 다시 시도해주세요'"
      />
      <div v-else class="flex flex-col gap-2">
        <template v-if="bmcIsLoading">
          <NoticeCardSkeleton v-for="i in 10" :key="i" />
        </template>
        <template v-else>
          <NoticeCard
            v-for="notice in bmcNotices"
            :key="notice.id"
            :id="notice.id"
            :title="notice.title"
            :date="notice.regDate"
            :views="notice.hits"
            :department="notice.department"
          />
        </template>
      </div>
    </div>
  </div>
</template>

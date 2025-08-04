<script setup lang="ts">
import IconGh from '@/components/icons/IconGh.vue';
import IconSh from '@/components/icons/IconSh.vue';
import IconIh from '@/components/icons/IconIh.vue';
import IconBmc from '@/components/icons/IconBmc.vue';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import {
  useBmcNoticeListStore,
  useGhNoticeListStore,
  useIhNoticeListStore,
  useShNoticeListStore,
} from '@/stores/notice-store';
import InfoCard from '@/components/shared/InfoCard.vue';
import { NoticeCorporationTypeKor } from '@imdaesomun/shared/constants/notice';
import NoticeList from './components/NoticeList.vue';

const shNoticeListStore = useShNoticeListStore();
const {
  notices: shNotices,
  isLoading: shIsLoading,
  error: shError,
} = storeToRefs(shNoticeListStore);

const ghNoticeListStore = useGhNoticeListStore();
const {
  notices: ghNotices,
  isLoading: ghIsLoading,
  error: ghError,
} = storeToRefs(ghNoticeListStore);

const ihNoticeListStore = useIhNoticeListStore();
const {
  notices: ihNotices,
  isLoading: ihIsLoading,
  error: ihError,
} = storeToRefs(ihNoticeListStore);

const bmcNoticeListStore = useBmcNoticeListStore();
const {
  notices: bmcNotices,
  isLoading: bmcIsLoading,
  error: bmcError,
} = storeToRefs(bmcNoticeListStore);

onMounted(() => {
  shNoticeListStore.fetchNotices();
  ghNoticeListStore.fetchNotices();
  ihNoticeListStore.fetchNotices();
  bmcNoticeListStore.fetchNotices();
});
</script>

<template>
  <div class="mx-4 my-2 flex flex-col items-stretch justify-start gap-2">
    <InfoCard
      content="최근 10개 공고만 제공되며, 과거 공고 및 검색·정렬 기능은 각 공사의 공식 홈페이지를 이용해주세요"
    />
  </div>
  <div class="mb-24 grid grid-cols-1 gap-x-4 gap-y-8 p-4 md:grid-cols-2">
    <NoticeList
      :title="NoticeCorporationTypeKor.sh"
      :notices="shNotices"
      :is-loading="shIsLoading"
      :error="shError"
    >
      <template #icon>
        <IconSh class="w-7 md:w-8" />
      </template>
    </NoticeList>
    <NoticeList
      :title="NoticeCorporationTypeKor.gh"
      :notices="ghNotices"
      :is-loading="ghIsLoading"
      :error="ghError"
    >
      <template #icon>
        <IconGh class="w-7 md:w-8" />
      </template>
    </NoticeList>
    <NoticeList
      :title="NoticeCorporationTypeKor.ih"
      :notices="ihNotices"
      :is-loading="ihIsLoading"
      :error="ihError"
    >
      <template #icon>
        <IconIh class="w-9 md:w-10" />
      </template>
    </NoticeList>
    <NoticeList
      :title="NoticeCorporationTypeKor.bmc"
      :notices="bmcNotices"
      :is-loading="bmcIsLoading"
      :error="bmcError"
    >
      <template #icon>
        <IconBmc class="w-9 md:w-10" />
      </template>
    </NoticeList>
  </div>
</template>

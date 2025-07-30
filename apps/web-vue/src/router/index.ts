import { createRouter, createWebHistory } from 'vue-router'
import { AppRoute } from '@imdaesomun/shared/constants/app-route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/AppMainLayout.vue'),
      children: [
        {
          path: AppRoute.HOME,
          name: AppRoute.HOME,
          component: () => import('@/pages/home/HomeView.vue'),
          alias: '/',
          meta: {
            title: '임대공고 리스트',
          },
        },
        {
          path: AppRoute.NOTICE,
          name: AppRoute.NOTICE,
          component: () => import('@/pages/notice/NoticeView.vue'),
        },
        {
          path: AppRoute.SAVED,
          name: AppRoute.SAVED,
          component: () => import('@/pages/saved/SavedView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: AppRoute.HOME,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router

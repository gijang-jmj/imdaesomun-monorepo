import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth } from '@/firebase'
import {
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import { checkInAppBrowser } from '@imdaesomun/shared/utils/link-util'

export const useUserStore = defineStore('user', () => {
  const user = ref(auth.currentUser)

  const isLoggedIn = computed(() => !!user.value)
  const uid = computed(() => user.value?.uid ?? null)
  const displayName = computed(() => user.value?.displayName ?? null)
  const email = computed(() => user.value?.email ?? null)
  const photoURL = computed(() => user.value?.photoURL ?? null)

  // 로그인
  const login = async () => {
    const isInAppBrowser = checkInAppBrowser()

    if (isInAppBrowser) {
      alert('현재 환경에서는 로그인이 어려워요.\n외부 브라우저를 이용해주세요.')
      return
    }

    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    user.value = result.user
  }

  // 로그아웃
  const logout = async () => {
    await signOut(auth)
    user.value = null
  }

  // 회원 탈퇴
  const withdraw = async () => {
    if (!auth.currentUser) return
    await deleteUser(auth.currentUser)
    user.value = null
  }

  // 앱 시작 시 로그인 유지 확인
  onAuthStateChanged(auth, (u) => {
    user.value = u
  })

  return {
    user,
    isLoggedIn,
    uid,
    displayName,
    email,
    photoURL,
    login,
    logout,
    withdraw,
  }
})

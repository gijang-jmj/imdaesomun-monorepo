import { create } from 'zustand';
import { auth } from '@/lib/firebase/firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { checkInAppBrowser } from '@imdaesomun/shared/utils/link-util';

interface UseUserStore {
  user: User | null;
  isLoggedIn: () => boolean;
  uid: () => string | null;
  displayName: () => string | null;
  email: () => string | null;
  photoURL: () => string | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  withdraw: () => Promise<void>;
}

export const useUserStore = create<UseUserStore>((set, get) => {
  const updateUser = (user: User | null) => set({ user });

  // 앱 시작 시 로그인 유지 확인
  onAuthStateChanged(auth, (user) => {
    updateUser(user);
  });

  return {
    user: auth.currentUser,
    isLoggedIn: () => !!get().user,
    uid: () => get().user?.uid ?? null,
    displayName: () => get().user?.displayName ?? null,
    email: () => get().user?.email ?? null,
    photoURL: () => get().user?.photoURL ?? null,

    login: async () => {
      const isInAppBrowser = checkInAppBrowser();

      if (isInAppBrowser) {
        alert(
          '현재 환경에서는 로그인이 어려워요.\n외부 브라우저를 이용해주세요.'
        );
        return;
      }

      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      updateUser(result.user);
    },

    logout: async () => {
      await signOut(auth);
      updateUser(null);
    },

    withdraw: async () => {
      if (!auth.currentUser) return;
      await deleteUser(auth.currentUser);
      updateUser(null);
    },
  };
});

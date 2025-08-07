import { create } from 'zustand';
import { auth } from '../../firebase';
import {
  GoogleAuthProvider,
  signInWithPopup,
  deleteUser,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { checkInAppBrowser } from '@imdaesomun/shared/utils/link-util';

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

interface UserActions {
  login: (successCallback?: () => void) => Promise<void>;
  logout: (successCallback?: () => void) => Promise<void>;
  withdraw: () => Promise<void>;
}

interface UseUserStore extends UserState, UserActions {}

export const useUserStore = create<UseUserStore>((set) => {
  // 앱 시작 시 로그인 유지 확인
  onAuthStateChanged(auth, (user) => {
    set({ user, isLoggedIn: !!user });
  });

  return {
    user: auth.currentUser,
    isLoggedIn: !!auth.currentUser,

    login: async (successCallback?: () => void) => {
      const isInAppBrowser = checkInAppBrowser();

      if (isInAppBrowser) {
        alert(
          '현재 환경에서는 로그인이 어려워요.\n외부 브라우저를 이용해주세요.'
        );
        return;
      }

      try {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        set({ user: result.user, isLoggedIn: !!result.user });

        if (typeof successCallback === 'function' && result.user) {
          setTimeout(successCallback, 100);
        }
      } catch (error) {
        console.error('Login failed:', error);
      }
    },

    logout: async (successCallback?: () => void) => {
      await signOut(auth);
      set({ user: null, isLoggedIn: false });

      if (typeof successCallback === 'function') {
        setTimeout(successCallback, 100);
      }
    },

    withdraw: async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        await deleteUser(user);
        set({ user: null, isLoggedIn: false });
      } catch (error) {
        console.error('Withdraw failed:', error);
      }
    },
  };
});

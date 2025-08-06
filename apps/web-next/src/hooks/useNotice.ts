import { useEffect, useState } from 'react';
import {
  deleteNotice,
  getNoticeSaved,
  saveNotice,
} from '@/lib/api/client/notice.api';
import { useUserStore } from '@/stores/user.store';
import { useLoadingStore } from '@/stores/loading.store';
import { useRouter } from 'next/navigation';
import { Modal } from '@/lib/constants/modal';

interface UseNoticeSavedReturn {
  isSaved: boolean;
  handleSaveClick: (id: string, isSaved: boolean) => void;
}

export const useNoticeSaved = (id: string): UseNoticeSavedReturn => {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const { showLoading, hideLoading } = useLoadingStore();
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveNotice = async (id: string) => {
    if (isLoggedIn && user?.uid) {
      try {
        showLoading();
        await saveNotice(id, user.uid);
        setIsSaved(true);
      } catch (e) {
        console.error('Error saving notice:', e);
      } finally {
        hideLoading();
      }
    } else {
      router.push(Modal.LOGIN, { scroll: false });
    }
  };

  const handleDeleteNotice = async (id: string) => {
    if (isLoggedIn && user?.uid) {
      try {
        showLoading();
        await deleteNotice(id, user.uid);
        setIsSaved(false);
      } catch (e) {
        console.error('Error deleting notice:', e);
      } finally {
        hideLoading();
      }
    } else {
      router.push(Modal.LOGIN, { scroll: false });
    }
  };

  const handleSaveClick = (id: string, isSaved: boolean) => {
    if (isSaved) {
      handleDeleteNotice(id);
    } else {
      handleSaveNotice(id);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      if (isLoggedIn && user?.uid) {
        const result = await getNoticeSaved(id, user.uid);
        setIsSaved(result);
      } else {
        setIsSaved(false);
      }
    };
    fetch();
  }, [id, user?.uid, isLoggedIn]);

  return { isSaved, handleSaveClick };
};

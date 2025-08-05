import { useEffect, useState } from 'react';
import {
  deleteNotice,
  getNoticeSaved,
  saveNotice,
} from '@/lib/api/client/notice.api';
import { useUserStore } from '@/stores/user.store';
import { useLoadingStore } from '@/stores/loading.store';

interface UseNoticeSavedReturn {
  isSaved: boolean;
  handleSaveClick: (id: string, isSaved: boolean) => void;
}

export const useNoticeSaved = (id: string): UseNoticeSavedReturn => {
  const userStore = useUserStore();
  const { showLoading, hideLoading } = useLoadingStore();
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveNotice = async (id: string) => {
    const isLoggedIn = userStore.isLoggedIn();
    const uid = userStore.uid();

    if (isLoggedIn && uid) {
      try {
        showLoading();
        await saveNotice(id, uid);
        setIsSaved(true);
      } catch (e) {
        console.error('Error saving notice:', e);
      } finally {
        hideLoading();
      }
    }
  };

  const handleDeleteNotice = async (id: string) => {
    const isLoggedIn = userStore.isLoggedIn();
    const uid = userStore.uid();

    if (isLoggedIn && uid) {
      try {
        showLoading();
        await deleteNotice(id, uid);
        setIsSaved(false);
      } catch (e) {
        console.error('Error deleting notice:', e);
      } finally {
        hideLoading();
      }
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
      const isLoggedIn = userStore.isLoggedIn();
      const uid = userStore.uid();

      if (isLoggedIn && uid) {
        const result = await getNoticeSaved(id, uid);
        setIsSaved(result);
      } else {
        setIsSaved(false);
      }
    };
    fetch();
  }, [id, userStore]);

  return { isSaved, handleSaveClick };
};

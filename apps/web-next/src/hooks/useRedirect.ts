import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AppRouteValueType } from '@imdaesomun/shared/constants/app-route';

export function useRedirect(to: AppRouteValueType) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    router.replace(to);
  }, [pathname, router, to]);
}

import { AppRoute } from '@imdaesomun/shared/constants/app-route';
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect(AppRoute.HOME);
}

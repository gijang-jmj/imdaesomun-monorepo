import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { AppRoute } from '@imdaesomun/shared/constants/app-route';

export async function GET(request: Request) {
  const apiKey = request.headers.get('x-imdaesomun-api-key');

  if (apiKey !== process.env.X_IMDAESOMUN_API_KEY) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
  }

  revalidatePath(AppRoute.HOME);

  return NextResponse.json({ message: 'Revalidation triggered for /home' });
}

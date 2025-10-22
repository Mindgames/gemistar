'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function redirectToSignIn(path: string) {
  const cookieStore = await cookies();
  cookieStore.set('preferredReturnUrl', path);
  return redirect(path);
}

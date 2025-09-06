import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect root to Persian version
  redirect('/fa');
}
import AccountForm from './account-form';
import { createClient } from '@/utils/supabase/server';
import Sidebar from '@/components/sidebar';

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="relative min-h-screen">
      <Sidebar />
      <AccountForm user={user} />
    </div>
  );
}

import AccountForm from './account-form';
import Sidebar from '@/components/sidebar';

export default function Account() {
  return (
    <div className="relative min-h-screen">
      <Sidebar />
      <AccountForm />
    </div>
  );
}

import Sidebar from '@/components/sidebar';
import EventForm from './event-form';

export default function AddEvent() {
  return (
    <div className="relative min-h-screen">
      <Sidebar />
      <EventForm />
    </div>
  );
}

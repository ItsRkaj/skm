import Sidebar from '@/components/sidebar';
import EventForm from '@/app/add-event/event-form';

export default function AddEvent() {
  return (
    <div className="relative min-h-screen">
      <Sidebar />
      <EventForm />
    </div>
  );
}

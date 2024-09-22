import React from 'react';

// create  dummy event data
const dummyEvents = [
  { id: 1, month: 'Sep', day: '19', title: 'EVENT 1', time: '17:00' },
  { id: 2, month: 'Sep', day: '26', title: 'EVENT 2', time: '17:00' },
  { id: 3, month: 'Okt', day: '03', title: 'EVENT 3', time: '17:00' },
  { id: 4, month: 'Okt', day: '10', title: 'EVENT 4', time: '17:00' },
  { id: 5, month: 'Okt', day: '17', title: 'EVENT 5', time: '17:00' },
  { id: 6, month: 'Okt', day: '24', title: 'EVENT 6', time: '17:00' },
  { id: 7, month: 'Okt', day: '31', title: 'EVENT 7', time: '17:00' },
  { id: 8, month: 'Nov', day: '07', title: 'EVENT 8', time: '17:00' },
  { id: 9, month: 'Nov', day: '14', title: 'EVENT 9', time: '17:00' },
];

const EventsSection: React.FC = () => {
  return (
    <div className="events-section py-8">
      <h2 className="text-2xl font-serif mb-6">KOMMANDE EVENEMANG</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dummyEvents.slice(0, 6).map((event) => (
          <div
            key={event.id}
            className="event-card p-4 rounded-lg flex items-center gap-4 border-2 border-[hsl(var(--secondary))]">
            <div className="overflow-y-auto date-box text-center p-2 rounded-md bg-[hsl(var(--primary))]">
              <p className="text-sm">{event.month}</p>
              <p className="text-2xl font-bold">{event.day}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">
                {event.title}
              </h3>
              <p className="text-sm text-[hsl(var(--primary))] flex items-center gap-1">
                <span>Tid</span> {event.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsSection;

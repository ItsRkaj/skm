// src/app/landingPage/EventsSection.tsx
import React from 'react';

// Define a type for the event data
interface Event {
  month: string;
  day: string;
  title: string;
  time: string;
}

// Generate dummy event data (replace this with real data fetching from your database)
const generateDummyEvents = (): Event[] => {
  return [
    { month: 'Sep', day: '19', title: 'EVENT 1', time: '17:00' },
    { month: 'Sep', day: '26', title: 'EVENT 2', time: '17:00' },
    { month: 'Okt', day: '03', title: 'EVENT 3', time: '17:00' },
    { month: 'Okt', day: '10', title: 'EVENT 4', time: '17:00' },
    { month: 'Okt', day: '17', title: 'EVENT 5', time: '17:00' },
    { month: 'Okt', day: '24', title: 'EVENT 6', time: '17:00' },
    { month: 'Okt', day: '31', title: 'EVENT 7', time: '17:00' },
    { month: 'Nov', day: '07', title: 'EVENT 8', time: '17:00' },
    { month: 'Nov', day: '14', title: 'EVENT 9', time: '17:00' },
  ];
};

const EventsSection: React.FC = () => {
    const events = generateDummyEvents().slice(0, 6); // Display only the first 6 events
  
    return (
      <section className="events-section py-8">
        <h2 className="text-2xl font-serif mb-6">KOMMANDE EVENEMANG</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {events.map((event, index) => (
            <div
            
              style = {{backgroundColor: 'hsl(var(--background))',
              border: '2px solid hsl(var(--secondary))'

              }}
              key={index}
              className=" event-card p-4 rounded-lg flex items-center gap-4"
            >
              <div 
                style = {{backgroundColor: 'hsl(var(--primary))'}}
                className="overflow-y-auto date-box text-center p-2 rounded-md">
                <p className="text-sm">{event.month}</p>
                <p className="text-2xl font-bold">{event.day}</p>
              </div>
              <div>
                <h3 
                    style = {{color: 'hsl(var(--foreground))'}}
                    className="text-lg font-semibold">{event.title}</h3>
                <p 
                style = {{color: 'hsl(var(--primary))'}}
                className="text-sm text-gray-600 flex items-center gap-1">
                  <span
                   className="material-icons">Tid</span> {event.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };
  
export default EventsSection;

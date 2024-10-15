'use client';
import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@radix-ui/react-dropdown-menu';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
interface EventFormData {
  title: string;
  description: string;
  location: string;
  organizer: string;
  start_time: string;
  end_time: string;
  price: string;
  registration_deadline: string;
  registration_link: string;
  invitation_type: 'Everyone' | 'Aktiva' | 'Gamlingar';
}
export default function EventForm() {
  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    location: '',
    organizer: '',
    start_time: '',
    end_time: '',
    price: '',
    registration_deadline: '',
    registration_link: '',
    invitation_type: 'Everyone',
  });
  const router = useRouter();
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null>(null);
  // Fetch the current user when the component mounts
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
        return;
      }

      if (user) {
        setUserId(user.id);
      } else {
        console.error('No user found');
      }
    };

    getUser().catch((error) => console.error('Error in getUser:', error));
  }, [supabase]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSelectChange = (value: 'Everyone' | 'Aktiva' | 'Gamlingar') => {
    setFormData((prevState) => ({ ...prevState, invitation_type: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId) {
      console.error('User is not logged in, cannot insert event');
      return;
    }
    const formDataToSubmit = {
      ...formData,
      price: parseInt(formData.price),
      publisher: userId,
    };

    const { error } = await supabase.from('events').insert(formDataToSubmit);

    if (error) {
      console.error('Error inserting event:', error, error.details);
    } else {
      console.log('Event created successfully');
      router.push('/events'); // Redirect to events page
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        void handleSubmit(e);
      }}
      className="max-w-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-semibold">Skapa nytt evenemang</h2>

      <Input
        name="title"
        placeholder="Händelsens titel"
        value={formData.title}
        onChange={handleChange}
        required
        className="w-full"
      />

      <Input
        name="description"
        placeholder="Beskrivning"
        value={formData.description}
        onChange={handleChange}
        required
        className="w-full"
      />

      <Input
        name="location"
        placeholder="Plats"
        value={formData.location}
        onChange={handleChange}
        required
        className="w-full"
      />

      <Input
        name="organizer"
        placeholder="Arrangör"
        value={formData.organizer}
        onChange={handleChange}
        required
        className="w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Label className="text-center">Start tid</Label>
        <Label className="text-center">Slut tid</Label>
        <Input
          type="datetime-local"
          name="start_time"
          value={formData.start_time}
          onChange={handleChange}
          required
          className="w-full"
        />

        <Input
          type="datetime-local"
          name="end_time"
          value={formData.end_time}
          onChange={handleChange}
          required
          className="w-full"
        />
      </div>

      <Input
        name="price"
        type="number"
        placeholder="Pris"
        value={formData.price}
        onChange={handleChange}
        required
        className="w-full"
      />
      <Label className="text-center">Sista ansökningsdatum</Label>
      <Input
        type="datetime-local"
        name="registration_deadline"
        value={formData.registration_deadline}
        onChange={handleChange}
        required
        className="w-full"
      />

      <Input
        name="registration_link"
        placeholder="Länk"
        value={formData.registration_link}
        onChange={handleChange}
        required
        className="w-full"
      />
      <Select
        onValueChange={handleSelectChange}
        value={formData.invitation_type}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Välj händelsetyp" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Everyone">Everyone</SelectItem>
          <SelectItem value="Aktiva">Aktiva</SelectItem>
          <SelectItem value="Gamlingar">Gamlingar</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" className="w-full">
        Skapa händelsen
      </Button>
    </form>
  );
}

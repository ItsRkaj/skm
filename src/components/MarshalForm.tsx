'use client';
import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Phone } from 'lucide-react';

function MarshalForm({
  addMarshal,
}: {
  addMarshal: (name:string, phone:string, email:string, location:string) => Promise<boolean>;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const success = await addMarshal(name,
      phone,
      email,
      location);

    if (success) {
     setEmail("")
     setLocation("")
     setName("")
     setPhone("")
      toast({
        description: 'Marshal tillagt!',
      });
      setLoading(false);
    } else {
      toast({
        
        description: 'Något gick fel.',
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* eslint-disable-next-line */}
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-1 p-5">
          <Label className="p-1" htmlFor="name">
            Namn
          </Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full"
            placeholder="Text"
          />
        </div>
        <div className="flex flex-col gap-1 p-5">
          <Label className="p-1" htmlFor="phone">
            Phone number
          </Label>
          <Input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full"
            placeholder="Namn"
          />
        </div>

        <div className="flex flex-col gap-1 p-5">
          <Label className="p-1" htmlFor="email">
            Email address
          </Label>
          <Input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
            placeholder="Namn"
          />
        </div>

        <div className="flex flex-col gap-1 p-5">
          <Label className="p-1" htmlFor="location">
            Location / address
          </Label>
          <Input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="w-full"
            placeholder="Namn"
          />
        </div>
        <div className="flex flex-col gap-1 p-5">
          <Label className="p-1" htmlFor="add_quote">
            Lägg till marshal
          </Label>
          <Button type="submit" variant={'default'}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              'Lägg till'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default MarshalForm;

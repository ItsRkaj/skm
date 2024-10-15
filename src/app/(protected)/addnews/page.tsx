'use client';

import { addNews } from '@/modules/apiClient';
import type { NewsInsert } from '@/modules/apiTypes';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function NewsForm() {
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');

  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newNews: NewsInsert = {
      text: text,
      author: author,
      title: title,
      date: date,
    };

    try {
      const success = await addNews(newNews);
      if (success) {
        setText('');
        setAuthor('');
        setDate('');
        setTitle('');
        toast({
          description: 'Nyhet tillagd!',
        });
      } else {
        toast({
          description: 'Något gick fel',
        });
      }
      setLoading(false);
    } catch (error) {
      console.error('message', error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 p-5">
      <h1 className="flex flex-col items-center w-full">Lägg till nyhet</h1>
      <div className="w-full gap-10">
        {/*eslint-disable-next-line @typescript-eslint/no-misused-promises*/}
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1 p-5">
            <Label className="p-1" htmlFor="Titte">
              Titel
            </Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full"
              placeholder="Titel"
            />
          </div>

          <div className="flex flex-col gap-1 p-5">
            <Label className="p-1" htmlFor="Author">
              Författare
            </Label>
            <Input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full"
              placeholder="Namn"
            />
          </div>

          <div className="flex flex-col gap-1 p-5">
            <Label className="p-1" htmlFor="Text">
              Text
            </Label>
            <Textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              className="w-full"
              placeholder="Nyhet"
            />
          </div>

          <div className="flex flex-col gap-1 p-5">
            <Label className="p-1" htmlFor="date">
              Datum
            </Label>
            <Input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full"
              placeholder="date in format: dd-mm-yyyy"
            />
          </div>

          <div className="flex flex-col gap-1 p-5">
            <Button type="submit" variant={'default'} className="w-full">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Skapa händelsen'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

function QuotesForm({
  addQuote,
}: {
  addQuote: (quote: string, author: string) => Promise<boolean>;
}) {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const onSubmit = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();

    const success = await addQuote(quote, author);

    if (success) {
      setQuote('');
      setAuthor('');
      toast({
        description: 'Citat tillagt!',
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
          <Label className="p-1" htmlFor="quoteText">
            Citat
          </Label>
          <Input
            type="text"
            id="quoteText"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            required
            className="w-full"
            placeholder="Text"
          />
        </div>
        <div className="flex flex-col gap-1 p-5">
          <Label className="p-1" htmlFor="author">
            Sagt av
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
          <Label className="p-1" htmlFor="add_quote">
            Lägg till citat
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

export default QuotesForm;

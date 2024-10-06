'use client';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/QuoteUI';
import { getQuotes } from '@/modules/apiClient';
import type { Quote } from '@/modules/apiTypes';
import { useEffect, useState } from 'react';

export default function Quotes() {
  const [quotes, setQuotes] = useState<Quote[] | undefined>(undefined);

  const fetchQuotes = async () => {
    const quoteList: Quote[] | undefined = await getQuotes();
    setQuotes( quoteList);
  };

  


  useEffect(() => {
    void fetchQuotes();
  }, []);


  return (
    <div className='flex flex-col gap-10 p-5'>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Quotes
      </h1>
      <div className="space-y-5"> 
        {quotes?(
          quotes.map((quote) => (
            <Card className="mb-4">
                  <CardHeader>
                       <CardTitle>{quote.quotetext}</CardTitle>
                       <CardDescription>{quote.author}</CardDescription>
                     </CardHeader>
                   </Card>
          ))
        ) : (
          <p>No quotes found</p>
        )}
      </div>
    </div>
  );
}


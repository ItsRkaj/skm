'use client';

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
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Quotes
      </h1>
      <ul>
        {quotes?.map((quote: Quote) => (
          <li key={quote.author}>
            <div className="flex items-center mb-2">

              <div className="ml-2">
                <h2>Quote: {quote.quotetext}</h2>
                <p>Author: {quote.author}</p>
               
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

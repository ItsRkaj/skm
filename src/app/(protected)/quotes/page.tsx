import { addQuote, getQuotes } from '@/modules/apiClient';
import QuotesTable from '@/components/quotes-page/QuotesTable';
import QuotesForm from '@/components/quotes-page/QuotesForm';
import { revalidatePath } from 'next/cache';

const handleSubmit = async (quote: string, author: string) => {
  'use server';
  const message = await addQuote({ quotetext: quote, author });
  if (message?.message === 'Quote added successfully') {
    revalidatePath('/quotes', 'page');
    return true;
  } else {
    return false;
  }
};

export default async function QuoteForm() {
  const quotes = await getQuotes();

  return (
    <div className="container mx-auto py-10">
      <h1 className="flex flex-col items-center w-full">Lista av citat</h1>
      <QuotesTable quotes={quotes ?? []} />
      <h1 className="flex flex-col items-center w-full">Lägg till citat</h1>
      <QuotesForm addQuote={handleSubmit} />
    </div>
  );
}

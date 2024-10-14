import { addMarshal} from '@/modules/apiClient';
import QuotesTable from '../../components/quotes-page/QuotesTable';
import QuotesForm from '@/components/quotes-page/QuotesForm';
import { revalidatePath } from 'next/cache';
import MarshalForm from '@/components/MarshalForm';

const handleSubmit = async (name: string, email: string, phone:string , location:string) => {
  'use server';
  const message = await addMarshal({ name, email, phone, location });
  if (message?.message === 'marshal added successfully') {
    revalidatePath('/addmarshal', 'page');
    return true;
  } else {
    return false;
  }
};

export default async function QuoteForm() {
  

  return (
    <div className="container mx-auto py-10">
      <h1 className="flex flex-col items-center w-full">Lägg till Marshal</h1>
      <MarshalForm addMarshal={handleSubmit} />
    </div>
  );
}

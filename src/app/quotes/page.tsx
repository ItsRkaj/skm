'use client';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/quotes/quoteUI';
import { getQuotes,  addQuote,  } from '@/modules/apiClient';
import type { Quote, QuoteInsert } from '@/modules/apiTypes';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



// export default function Quotes() {
//   const [quotes, setQuotes] = useState<Quote[] | undefined>(undefined);

//   const fetchQuotes = async () => {
//     const quoteList: Quote[] | undefined = await getQuotes();
//     setQuotes( quoteList);
//   };

  


//   useEffect(() => {
//     void fetchQuotes();
//   }, []);


//   return (
//     <div className='flex flex-col gap-10 p-5'>
//       <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
//         Quotes
//       </h1>
//       <div className="space-y-5"> 
//         {quotes?(
//           quotes.map((quote) => (
//             <Card className="mb-4">
//                   <CardHeader>
//                        <CardTitle>{quote.quotetext}</CardTitle>
//                        <CardDescription>{quote.author}</CardDescription>
//                      </CardHeader>
//                    </Card>
//           ))
//         ) : (
//           <p>No quotes found</p>
//         )}
//       </div>
//     </div>
//   );
// }




export default function QuoteForm() {
  const [quotetext, setQuoteText] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [quotes, setQuotes] = useState<Quote[] | undefined>(undefined);

 
  const fetchQuotes = async () => {
       const quoteList: Quote[] | undefined = await getQuotes();
        setQuotes( quoteList);
    };

useEffect(() => {
     void fetchQuotes();
   }, []);
      
 
  



 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
 
  const newQuote: QuoteInsert  = {
    quotetext: quotetext,
    author: author
  };
  
 

    try {

      
      const response = await addQuote(newQuote);
      
      
    } catch (error) {
      console.error('message', error);
      
    }
  };

  
    return (
      <div className="flex flex-col items-right justify-center min-h-screen">
  


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
  
      

        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">Add a Quote</h1>
  
        <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
         
          <div>
            <Label htmlFor="quoteText">
              Quote
            </Label>
            <Input
              type="text"
              id="quoteText"
              value={quotetext}
              onChange={(e) => setQuoteText(e.target.value)}
              required
              className="w-full"
              placeholder="Write a quote..."
            />
          </div>
  
          
          <div>
            <Label htmlFor="author">
              Author
            </Label>
            <Input
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              className="w-full"
              placeholder="Write the the author's name"
            />
          </div>
  
         
          <Button type="submit" className="w-full bg-blue-600 text-white">
            Add Quote
          </Button>
        </form>
  
       
      </div>
  );
}

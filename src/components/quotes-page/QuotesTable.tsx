import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Quote } from '@/modules/apiTypes';

function QuotesTable({ quotes }: { quotes: Quote[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sagt av</TableHead>
          <TableHead>Citat</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {quotes.map((quote) => (
          <TableRow key={quote.id}>
            <TableCell>{quote.author}</TableCell>
            <TableCell>{quote.quotetext}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default QuotesTable;

'use client'; // Needed for the button to handle clicks in Next.js with App Router
import { Button } from '@/components/ui/button';

const CallToAction: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-[hsl(var(--primary-foreground))] to-[hsl(var(--primary))] py-12 lg:py-16 text-center">
      <h2 className="text-3xl font-extrabold sm:text-4xl">
        Låter det intressant?
      </h2>
      <p className="mt-4 max-w-2xl mx-auto text-lg">
        Missa inte att registrera för <span className="font-bold">SKM</span>{' '}
        idag!
      </p>
      <div className="mt-8 flex justify-center">
        <Button variant="default" size="lg">
          Registera dig nu
        </Button>
      </div>
    </div>
  );
};

export default CallToAction;

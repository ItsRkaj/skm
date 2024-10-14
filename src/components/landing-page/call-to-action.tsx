'use client';

import { Button } from '@/components/ui/button';

export default function CallToAction() {
  return (
    <div className="container mx-auto rounded-md bg-gradient-to-r from-[hsl(var(--primary-foreground))] to-[hsl(var(--primary))] py-12 lg:py-16 text-center">
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
}

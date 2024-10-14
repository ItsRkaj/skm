import Image from 'next/image';
import { ArrowRightIcon, Check } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <div className="w-full h-auto flex justify-around items-center">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4 text-center lg:text-left lg:pl-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Kom och festa hos Systrarna!
              </h1>
              <p className="max-w-[600px] text-zinc-600 md:text-xl dark:text-zinc-200 mx-auto lg:mx-0">
                Systrana KM är ett klubbmästeri av sjuksköterskestudenter som
                annordnar pubar och fester för studenter.
              </p>
            </div>
            <div className="space-y-2 text-left">
              <ul className="grid gap-2">
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5" /> Alltid god stämning med bra
                  musik
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5" /> Riktigt härlig lokal
                </li>
                <li className="flex items-center">
                  <Check className="mr-2 h-5 w-5" /> Studentvänliga priser på
                  dryck
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
              <Button size="lg" asChild>
                <Link href="#" className="text-white">
                  Ansök till SKM här! <ArrowRightIcon className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#">Läs mer</Link>
              </Button>
            </div>
          </div>
          <Image
            className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center lg:aspect-square"
            src="/hero.jpg"
            priority={true}
            width={1284}
            height={1284}
            alt="A Grottan neon sign with beer pong tables"
          />
        </div>
      </div>
    </div>
  );
}

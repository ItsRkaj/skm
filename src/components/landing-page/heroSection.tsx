'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

const HeroSection: React.FC = () => {
  return (
    <div className="w-full h-auto flex justify-around items-center]">
      <div className="flex flex-col-reverse md:flex-row w-full">
        <div className="flex-auto px-5 py-5 md:py-20 w-full md:w-auto">
          <h1 className="text-4xl font-bold mb-5">
            Here you can insert the title
          </h1>

          <p className="text-lg mb-4]">Here you can insert the subtitle</p>
          <ul className="list-none p-0 my-5">
            <li>
              <strong>fun fact 1</strong> - fun fact 1 discription.
            </li>
            <li>
              <strong>fun fact 2</strong> - fun fact 12 discription
            </li>
            <li>
              <strong>fun fact 3</strong> - fun fact 3 discription
            </li>
          </ul>
          <div className="flex gap-4 flex-wrap">
            <Button variant="default">ANSÖK TILL SKM HÄR!</Button>
            <Button
              variant="secondary"
              onClick={() => {
                const aboutSection = document.getElementById('about-us');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                  const yOffset = -80;
                  const y = aboutSection.getBoundingClientRect().top + yOffset;
                  window.scrollTo({ top: y, behavior: 'smooth' });
                }
              }}>
              LÄS MER
            </Button>
          </div>
        </div>

        <div className="flex items-end">
          <Image
            className="max-w-full h-auto"
            src="/img.jpeg"
            width={800}
            height={300}
            alt="A group of prople having fun"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

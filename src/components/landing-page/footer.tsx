import { Facebook, Instagram } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="container mx-auto py-6">
      <div className="flex flex-col md:flex-row justify-between items-center w-full space-y-4 md:space-y-0">
        <div className="flex items-center">
          <Image
            src="/skm-logo.png"
            alt="Logo"
            height={714}
            width={714}
            className="rounded-full mr-3 w-[50px]"
          />
          <span className="text-lg font-bold">Systrarna KM</span>
        </div>

        <div className="text-center text-sm flex-grow">
          © 2024 Systrarna KM. Alla rättigheter reserverade.
        </div>

        <div className="flex space-x-8">
          <a
            href="https://www.facebook.com/profile.php?id=100083651442252"
            target="_blank"
            rel="noopener noreferrer">
            <Facebook className="hover:bg-blue-600 hover:text-white rounded-md" />
          </a>
          <a
            href="https://www.instagram.com/systrarnakm/"
            target="_blank"
            rel="noopener noreferrer">
            <Instagram className="hover:bg-pink-500 hover:text-white rounded-md" />
          </a>
        </div>
      </div>
    </footer>
  );
}

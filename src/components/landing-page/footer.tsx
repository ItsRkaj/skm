import { InstagramLogoIcon } from '@radix-ui/react-icons';
import { Facebook } from 'lucide-react'; //radix-ui dosn't contain Facebook logo!
import Image from 'next/image';
const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6">
      <div className="flex flex-col md:flex-row justify-between items-center w-full px-6 space-y-4 md:space-y-0">
        <div className="flex items-center">
          <Image
            src="/skmLogo.png"
            alt="Logo"
            width={50}
            height={50}
            className=" rounded-full mr-3"
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
            <Facebook className="h-12 w-12  hover:bg-blue-600 hover:text-white rounded-full" />
          </a>
          <a
            href="https://www.instagram.com/systrarnakm/"
            target="_blank"
            rel="noopener noreferrer">
            <InstagramLogoIcon className="h-12 w-12 hover:bg-pink-500 hover:text-white rounded-full" />
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

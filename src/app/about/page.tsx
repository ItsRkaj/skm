import Image from 'next/image';

export default function About() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-5 p-5">
      <div className="w-full">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Om SKM
        </h1>
        <p>
          This is the contact page. This is the contact page.This is the contact
          page.This is the contact page.This is the contact page.This is the
          contact page.This is the contact page.This is the contact page.This is
          the contact page.This is the contact page.This is the contact
          page.This is the contact page.
        </p>
      </div>

      <div className="w-full">
        <Image
          src={'/img.jpeg'}
          alt="image does not exist"
          width={500}
          height={200}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
      </div>
    </div>
  );
}
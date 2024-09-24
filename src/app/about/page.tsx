import Image from 'next/image';

export default function About() {
  return (
    <div className="flex flex-col gap-10 p-5">
      <div className="flex flex-col items-center gap-5 p-5">
        <div className="flex flex-col items-center w-full">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            SKM
          </h1>
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

      <div className="flex flex-col md:flex-row items-center gap-5 p-5">
        <div className="w-full">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Om SKM
          </h1>
          <p>
            This is the contact page. This is the contact page.This is the
            contact page.This is the contact page.This is the contact page.This
            is the contact page.This is the contact page.This is the contact
            page.This is the contact page.This is the contact page.This is the
            contact page.This is the contact page.
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

      <div className="flex flex-col md:flex-row items-center gap-5 p-5">
        <div className="flex flex-col items-center w-full gap-5 p-5 ">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Antalet event
          </h1>
          <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            100
          </h2>
        </div>

        <div className="flex flex-col items-center w-full gap-5 p-5 ">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Grundades
          </h1>
          <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            2020
          </h2>
        </div>

        <div className="flex flex-col items-center w-full gap-5 p-5 ">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Medlemmar
          </h1>
          <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            100
          </h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-5 p-5">
        <div className="w-full">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Om Grottan
          </h1>
          <p>
            This is the about grottan. This is the about grottan. This is the
            about grottan. This is the about grottan. This is the about grottan.
            This is the about grottan. This is the about grottan. This is the
            about grottan. This is the about grottan. This is the about grottan.
            This is the about grottan. This is the about grottan. This is the
            about grottan. This is the about grottan. This is the about grottan.
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

      <div className="flex flex-col md:flex-row items-center gap-5 p-5">
        <div className="w-full">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Om ovve
          </h1>
          <p>
            This is the about ovve. This is the about ovve. This is the about
            ovve. This is the about ovve. This is the about ovve. This is the
            about ovve. This is the about ovve. This is the about ovve. This is
            the about ovve. This is the about ovve. This is the about ovve. This
            is the about ovve.
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
    </div>
  );
}

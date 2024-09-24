export default function Contact() {
  return (
    <div className="flex flex-col gap-10 p-5">
      <div className="flex flex-col md:flex-row items-center gap-5 p-5">
        <div className="flex flex-col items-center w-full">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Besök oss
          </h1>
          <p>ggg gatan</p>
          <p>112 41 stokcholm </p>
        </div>

        <div className="w-full h-[550px]">
          <iframe
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2033.986490955325!2d18.067676312470788!3d59.3498733092705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f779d96ed48cb%3A0xb1366ae00b879b4a!2sKTH%20Kungliga%20Tekniska%20h%C3%B6gskolan!5e0!3m2!1ssv!2sse!4v1727193315440!5m2!1ssv!2sse"></iframe>
        </div>
      </div>
    </div>
  );
}

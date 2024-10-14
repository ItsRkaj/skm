import {
  CalendarIcon,
  PersonIcon,
  RocketIcon,
  MagicWandIcon,
} from '@radix-ui/react-icons';

export default function AboutUsSection() {
  return (
    <div id="about-us" className="container mx-auto py-12">
      <div className="w-full px-2">
        <h2 className="text-2xl mb-6">Varför ska just du bli medlem?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center p-6 border rounded-lg shadow-lg">
            <CalendarIcon className="mb-4  text-[hsl(var(--primary))] h-10 w-10 mx-auto" />
            <h3 className="text-xl text-[hsl(var(--primary))] font-semibold mb-2">
              Exklusiv tillgång till evenemang
            </h3>
            <p>
              Som medlem får du tillgång till Systrarna KMs interna evenemang
              och fester, inklusive roliga temakvällar.
            </p>
          </div>

          <div className="text-center p-6 border rounded-lg shadow-lg">
            <PersonIcon className="mb-4  text-[hsl(var(--primary))] h-10 w-10 mx-auto" />
            <h3 className="text-xl text-[hsl(var(--primary))] font-semibold mb-2">
              Bygg ett socialt nätverk
            </h3>
            <p>
              Utöka ditt nätverk genom att bli en del av en nära gemenskap och
              knyt kontakter med andra studenter.
            </p>
          </div>

          <div className="text-center p-6 border rounded-lg shadow-lg">
            <RocketIcon className="mb-4  text-[hsl(var(--primary))] h-10 w-10 mx-auto" />
            <h3 className="text-xl text-[hsl(var(--primary))] font-semibold mb-2">
              Exklusiva medlemsförmåner
            </h3>
            <p>
              Njut av förmåner och rabatter som medlem, och delta i temakvällar
              och andra specialevenemang.
            </p>
          </div>

          <div className="text-center p-6 border rounded-lg shadow-lg">
            <MagicWandIcon className="mb-4  text-[hsl(var(--primary))] h-10 w-10 mx-auto" />
            <h3 className="text-xl text-[hsl(var(--primary))] font-semibold mb-2">
              Chans att utveckla din kreativitet
            </h3>
            <p>
              Bidra med egna idéer och utveckla din kreativitet genom att vara
              med och arrangera aktiviteter.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

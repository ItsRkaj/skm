import { Card, CardContent } from '@/components/ui/card';
import { Building2, Users, Calendar, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-4xl font-bold mb-8 text-center">
        About Systrarna KM
      </h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
        <p className="text-lg mb-4">
          Systrarna KM was founded in 1983 with a vision to create a supportive
          community for women in technology and engineering. What started as a
          small group of passionate students has grown into a thriving
          organization that continues to inspire and empower women in STEM
          fields.
        </p>
        <p className="text-lg">
          Over the years, we&apos;ve organized countless events, workshops, and
          mentorship programs, always striving to bridge the gender gap in tech
          and create opportunities for our members to excel in their chosen
          fields.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Systrarna KM by the Numbers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: Users, label: 'Active Members', value: '500+' },
            { icon: Building2, label: 'Partner Companies', value: '50+' },
            { icon: Calendar, label: 'Annual Events', value: '30+' },
            { icon: MapPin, label: 'University Chapters', value: '5' },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-center p-6">
                <stat.icon className="w-12 h-12 mb-2 text-primary" />
                <h3 className="text-xl font-semibold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Our Chapter Hall</h2>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <p className="text-lg mb-4">
              The Systrarna KM Chapter Hall is the heart of our community.
              Located in the center of campus, it serves as a hub for
              collaboration, learning, and socializing. Our hall features:
            </p>
            <ul className="list-disc list-inside text-lg mb-4">
              <li>A state-of-the-art computer lab</li>
              <li>Cozy study areas</li>
              <li>A library with technical resources</li>
              <li>A kitchen for shared meals and events</li>
              <li>Meeting rooms for project work and mentoring sessions</li>
            </ul>
          </div>
          <div className="flex-1">
            <Image
              src="/img.jpeg"
              priority={true}
              alt="Systrarna KM Chapter Hall"
              className="rounded-lg shadow-md w-full h-auto"
              width={400}
              height={300}
            />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
        <p className="text-lg mb-4">
          At Systrarna KM, we are dedicated to empowering women in technology
          and engineering fields. Our mission is to:
        </p>
        <ul className="list-disc list-inside text-lg mb-4">
          <li>Provide a supportive community for women in STEM</li>
          <li>Offer mentorship and professional development opportunities</li>
          <li>
            Collaborate with industry partners to create internship and job
            opportunities
          </li>
          <li>
            Advocate for gender equality in tech and engineering workplaces
          </li>
          <li>Inspire the next generation of women to pursue STEM careers</li>
        </ul>
        <p className="text-lg">
          Through our events, programs, and initiatives, we strive to create a
          world where women are equally represented and valued in technology and
          engineering fields. Join us in our mission to shape a more diverse and
          inclusive future in STEM!
        </p>
      </section>
    </div>
  );
}

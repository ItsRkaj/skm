import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Kontakta oss</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Kontakt Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>123 Business Street, City, Country</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-primary" />
                <span>+1 (123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>contact@example.com</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Hitta Till Oss</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d474.2497511304724!2d18.074709815096824!3d59.34612896976135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f9d41b42047f7%3A0xb2e314766607d52d!2sValhallav%C3%A4gen%2091d%2C%20114%2027%20Stockholm!5e0!3m2!1sen!2sse!4v1728918708075!5m2!1sen!2sse"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                className="absolute inset-0"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

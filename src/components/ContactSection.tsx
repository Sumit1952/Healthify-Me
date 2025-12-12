import { Phone, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-20 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-[#808000] mb-6">Get in Touch</h2>
          <p className="text-base md:text-lg text-secondary-foreground mb-12">
            Have questions or need support? Feel free to reach out to us. We're here to help you on your health journey.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-4">
              <Phone className="w-8 h-8 text-primary" />
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground">Contact Us</h3>
                <a href="tel:+918877799181" className="text-base md:text-lg text-muted-foreground hover:text-primary transition-colors">
                  +91 88777 99181
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MessageCircle className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-foreground">WhatsApp</h3>
                <a href="https://wa.me/918986117301" target="_blank" rel="noopener noreferrer" className="text-base md:text-lg text-muted-foreground hover:text-primary transition-colors">
                  +91 89861 17301
                </a>
              </div>
            </div>
          </div>
           <Button asChild className="mt-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg">
              <Link href="tel:+918877799181">Call Now</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}

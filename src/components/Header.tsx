"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT' },
  { href: '/faqs', label: 'FAQS' },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "bg-transparent" : "bg-orange-500/50 backdrop-blur-sm shadow-sm"
    )}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24 pt-4">
          <Link href="/" className="flex items-center gap-2" aria-label="HealthifyMe Homepage">
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary">Healthify</span>
            <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">Me</span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={`${link.href}-${link.label}`} href={link.href} className="text-sm font-medium tracking-wider text-secondary-foreground hover:text-primary transition-colors">
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-2">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="https://www.facebook.com/share/1Drng6WnjA/" target="_blank"><Facebook className="h-5 w-5 text-primary" /></Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <Link href="https://www.instagram.com/sssumit____" target="_blank"><Instagram className="h-5 w-5 text-primary" /></Link>
                </Button>
                 <Button variant="ghost" size="icon" asChild>
                    <Link href="https://x.com/sssumit____" target='_blank'>
                      <svg
                        className="h-5 w-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </Link>
                </Button>
            </div>
            <Button asChild className="hidden lg:flex bg-yellow-400 text-black hover:bg-yellow-500 rounded-full px-6">
              <Link href="#contact">CONTACT</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-secondary-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden bg-orange-500/80 backdrop-blur-sm">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}-mobile`}
                href={link.href}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="w-11/12 bg-yellow-400 text-black hover:bg-yellow-500 rounded-full" onClick={() => setIsOpen(false)}>
              <Link href="#contact">CONTACT</Link>
            </Button>
             <div className="flex items-center gap-4 pt-4">
                <Button variant="ghost" size="icon" asChild>
                    <Link href="https://www.facebook.com/share/1Drng6WnjA/" target="_blank"><Facebook className="h-5 w-5 text-primary" /></Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                    <Link href="https://www.instagram.com/sssumit____" target="_blank"><Instagram className="h-5 w-5 text-primary" /></Link>
                </Button>
                 <Button variant="ghost" size="icon" asChild>
                   <Link href="https://x.com/sssumit____" target='_blank'>
                      <svg
                        className="h-5 w-5 text-primary"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </Link>
                </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavigationProps {
  isDark?: boolean;
  onToggleTheme?: () => void;
  showThemeToggle?: boolean;
}

export default function Navigation({
  isDark = true,
  onToggleTheme,
  showThemeToggle = false,
}: NavigationProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/eip", label: "EIP Draft" },
    {
      href: "https://github.com/its-everdred/rancho-del-vote",
      label: "GitHub",
      external: true,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm transition-colors duration-300 ${
        isDark
          ? "border-neutral-800 bg-neutral-900/80"
          : "border-gray-200 bg-white/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 relative">
              <Image
                src="/logo-32.png"
                alt="Ranked Choice Delegation Logo"
                width={32}
                height={32}
                className="object-contain"
                priority={true}
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold">
                Ranked Choice Delegation
              </h1>
            </div>
          </Link>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              {showThemeToggle && onToggleTheme && (
                <button
                  onClick={onToggleTheme}
                  className="p-1 hover:opacity-80 transition-opacity text-lg cursor-pointer flex items-center justify-center"
                  aria-label="Toggle theme"
                >
                  {isDark ? "☀️" : "🌙"}
                </button>
              )}
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-6 text-sm">
                {navItems.map((item) => {
                  const isActive = item.href === pathname;
                  const baseClasses = "transition-colors font-medium";
                  const activeClasses = isDark
                    ? "text-red-400"
                    : "text-red-600";
                  const inactiveClasses = isDark
                    ? "text-neutral-400 hover:text-white"
                    : "text-gray-600 hover:text-black";

                  if (item.external) {
                    return (
                      <a
                        key={item.href}
                        href={item.href}
                        className={`${baseClasses} ${inactiveClasses}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.label}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`${baseClasses} ${
                        isActive ? activeClasses : inactiveClasses
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
              
              {/* Mobile Hamburger Menu */}
              <button
                className="md:hidden p-2 hover:opacity-80 transition-opacity"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                <div className="w-6 h-6 relative">
                  <span className={`absolute left-0 w-6 h-0.5 transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-black'
                  } ${isMenuOpen ? 'top-2.5 rotate-45' : 'top-1'}`}></span>
                  <span className={`absolute left-0 w-6 h-0.5 transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-black'
                  } ${isMenuOpen ? 'opacity-0' : 'top-2.5'}`}></span>
                  <span className={`absolute left-0 w-6 h-0.5 transition-all duration-300 ${
                    isDark ? 'bg-white' : 'bg-black'
                  } ${isMenuOpen ? 'top-2.5 -rotate-45' : 'top-4'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${
            isDark ? 'border-neutral-800' : 'border-gray-200'
          }`}>
            <nav className="px-6 py-4 space-y-4">
              {navItems.map((item) => {
                const isActive = item.href === pathname;
                const baseClasses = "block transition-colors font-medium";
                const activeClasses = isDark
                  ? "text-red-400"
                  : "text-red-600";
                const inactiveClasses = isDark
                  ? "text-neutral-400 hover:text-white"
                  : "text-gray-600 hover:text-black";

                if (item.external) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      className={`${baseClasses} ${inactiveClasses}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`${baseClasses} ${
                      isActive ? activeClasses : inactiveClasses
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

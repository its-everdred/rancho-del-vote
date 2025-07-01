'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface NavigationProps {
  isDark?: boolean;
  onToggleTheme?: () => void;
  showThemeToggle?: boolean;
}

export default function Navigation({ 
  isDark = true, 
  onToggleTheme, 
  showThemeToggle = false 
}: NavigationProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/eip', label: 'EIP Draft' },
    { href: 'https://github.com/its-everdred/rancho-del-vote', label: 'GitHub', external: true }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b backdrop-blur-sm transition-colors duration-300 ${
      isDark 
        ? 'border-neutral-800 bg-neutral-900/80' 
        : 'border-gray-200 bg-white/80'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 relative">
              <Image
                src="/logo-32.png"
                alt="Rancho Del Vote Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold">
                Rancho Del Vote
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
                  {isDark ? '☀️' : '🌙'}
                </button>
              )}
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
                      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors text-sm font-medium">
              Connect Wallet
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
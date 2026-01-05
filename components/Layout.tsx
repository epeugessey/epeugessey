
import React from 'react';
import Logo from './Logo';

// The children prop is made optional to resolve a TypeScript error in App.tsx (line 38)
// where the compiler might fail to correctly associate children in the JSX tree with 
// the required prop in some environments.
export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-2 group">
              <Logo className="h-14 w-auto transition-transform group-hover:scale-105" />
              <span className="text-xl md:text-2xl font-bold text-violet-perso hidden sm:inline">Le Jardin de l'Espoir</span>
            </a>
          </div>
          <div className="flex space-x-4 md:space-x-8 font-medium items-center">
            <a href="#mission" className="text-gray-600 hover:text-violet-perso transition">Mission</a>
            <a href="#jardin" className="text-gray-600 hover:text-violet-perso transition">Le Jardin</a>
            <a href="#contact" className="bg-violet-perso text-white px-5 py-2 rounded-full hover:opacity-90 transition shadow-sm">Contact</a>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <div className="bg-white/10 p-2 rounded-2xl mb-4">
              <Logo className="h-20 w-auto brightness-110" />
            </div>
            <div className="text-2xl font-bold text-horizon-perso mb-2">Le Jardin de l'Espoir</div>
            <p className="text-gray-400 italic">Transformer la douleur en solidarité.</p>
          </div>
          <div className="text-center">
            <h4 className="font-bold mb-4">Liens Utiles</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="#" className="hover:text-horizon-perso">Accueil</a></li>
              <li><a href="#jardin" className="hover:text-horizon-perso">Jardin Mémoriel</a></li>
              <li><a href="#mission" className="hover:text-horizon-perso">Notre Mission</a></li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <h4 className="font-bold mb-4">Contact</h4>
            <p className="text-gray-400">Cocody Angré Rue M42, Abidjan</p>
            <p className="text-gray-400">+225 07 59 87 21 61</p>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-gray-800 mt-10 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} - Le Jardin de l'Espoir. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}

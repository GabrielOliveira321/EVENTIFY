import React from 'react';
import { Home, Search, Ticket, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../Components/Layout';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-purple-500">
      <Layout>
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-32 flex flex-col items-center text-center">
          
          {/* 404 illustration */}
          <div className="relative mb-10">
            <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-[80px] animate-pulse-glow" />
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center border border-white/5 backdrop-blur-md">
              <Compass size={56} className="text-purple-400 animate-float" />
            </div>
          </div>

          <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black leading-none mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            404
          </h1>
          
          <div className="space-y-2 mb-10">
            <h2 className="text-2xl sm:text-3xl font-black">
              Página não encontrada
            </h2>
            <p className="text-[var(--text-tertiary)] text-lg max-w-md mx-auto">
              O caminho que você procurou não existe ou foi movido. 
              Que tal explorar outros cantos?
            </p>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg mb-12">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 rounded-2xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-purple-500/20"
            >
              <Home size={18} />
              Início
            </Link>
            <Link
              to="/all-events"
              className="flex items-center justify-center gap-2 bg-[var(--overlay-medium)] hover:bg-[var(--overlay-medium)] text-[var(--text-primary)] px-6 py-4 rounded-2xl font-bold text-sm border border-[var(--border-primary)] transition-all"
            >
              <Search size={18} />
              Eventos
            </Link>
            <Link
              to="/comunidades"
              className="flex items-center justify-center gap-2 bg-[var(--overlay-medium)] hover:bg-[var(--overlay-medium)] text-[var(--text-primary)] px-6 py-4 rounded-2xl font-bold text-sm border border-[var(--border-primary)] transition-all"
            >
              <Ticket size={18} />
              Comunidades
            </Link>
          </div>

          {/* Helpful links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[var(--text-tertiary)]">
            <Link to="/" className="hover:text-purple-400 transition-colors">Home</Link>
            <Link to="/all-events" className="hover:text-purple-400 transition-colors">Eventos</Link>
            <Link to="/precos" className="hover:text-purple-400 transition-colors">Preços</Link>
            <Link to="/comunidades" className="hover:text-purple-400 transition-colors">Comunidades</Link>
            <Link to="/sobre" className="hover:text-purple-400 transition-colors">Sobre</Link>
            <Link to="/suporte" className="hover:text-purple-400 transition-colors">Suporte</Link>
          </div>

        </main>
      </Layout>
    </div>
  );
}

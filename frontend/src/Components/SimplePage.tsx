import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from './Layout';

interface SimplePageProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export default function SimplePage({ title, subtitle, children }: SimplePageProps) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans selection:bg-purple-500">
      <Layout variant="back" backTo="/" backLabel="Início">
        <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Voltar ao início
            </Link>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight mb-3">
              {title}
            </h1>
            {subtitle && (
              <p className="text-[var(--text-tertiary)] text-lg">{subtitle}</p>
            )}
          </div>
          <div className="prose prose-invert max-w-none space-y-6 text-[var(--text-secondary)] leading-relaxed">
            {children}
          </div>
        </main>
      </Layout>
    </div>
  );
}

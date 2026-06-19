import React from 'react';
import { Ticket, Code, Globe, Mail, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FOOTER_LINKS = {
  Produto: [
    { label: 'Eventos', to: '/all-events' },
    { label: 'Preços', to: '/precos' },
    { label: 'Comunidades', to: '/comunidades' },
    { label: 'Início', to: '/' },
  ],
  Recursos: [
    { label: 'Guia para Criadores', to: '/guia' },
    { label: 'Central de Ajuda', to: '/suporte' },
    { label: 'Blog', href: 'https://blog.eventify.com.br', external: true },
    { label: 'API', href: 'https://api.eventify.com.br/docs', external: true },
  ],
  Empresa: [
    { label: 'Sobre Nós', to: '/sobre' },
    { label: 'Carreiras', href: 'https://carreiras.eventify.com.br', external: true },
    { label: 'Termos de Uso', to: '/termos' },
    { label: 'Privacidade', to: '/privacidade' },
  ],
};

export default function Footer() {
  return (
    <footer className="mt-20 pt-16 pb-10 px-4 sm:px-8 border-t border-[var(--border-primary)] bg-[var(--bg-primary)] relative">
      <div className="absolute inset-0 bg-noise pointer-events-none opacity-30" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12">
          
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-5">
              <div className="bg-gradient-to-tr from-purple-600 to-blue-500 p-2 rounded-lg shadow-lg shadow-purple-500/20">
                <Ticket size={22} className="text-white" />
              </div>
              <span className="text-xl font-black tracking-tighter text-[var(--text-primary)]">EVENTIFY</span>
            </div>
            <p className="text-[var(--text-tertiary)] text-sm leading-relaxed mb-6 max-w-xs">
              A plataforma definitiva para encontrar, organizar e vivenciar experiências inesquecíveis.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Globe, href: 'https://eventify.com.br' },
                { icon: Mail, href: 'mailto:contato@eventify.com.br' },
                { icon: Code, href: 'https://github.com/eventify' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[var(--overlay-light)] flex items-center justify-center text-[var(--text-tertiary)] hover:bg-gradient-to-br hover:from-purple-600 hover:to-blue-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group"
                >
                  <item.icon size={16} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold text-[var(--text-primary)] mb-5 text-sm">{title}</h4>
              <ul className="space-y-3.5">
                {links.map((link, i) => (
                  <li key={i}>
                    {'to' in link && !('external' in link) ? (
                      <Link
                        to={link.to!}
                        className="text-sm text-[var(--text-tertiary)] hover:text-purple-400 transition-colors duration-200 flex items-center gap-1 w-fit group"
                      >
                        {link.label}
                        <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                      </Link>
                    ) : (
                      <a
                        href={link.href!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--text-tertiary)] hover:text-purple-400 transition-colors duration-200 flex items-center gap-1 w-fit group"
                      >
                        {link.label}
                        <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        <div className="pt-8 border-t border-[var(--border-primary)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[var(--text-muted)] text-sm font-medium">
            © 2026 Eventify. Todos os direitos reservados.
          </p>
          <p className="text-[var(--text-muted)] text-xs italic">
            Feito para quem não quer perder nada.
          </p>
        </div>
      </div>
    </footer>
  );
}

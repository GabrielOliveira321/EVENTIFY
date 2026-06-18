import React from 'react';
import { Ticket, Users, Award, Globe } from 'lucide-react';
import SimplePage from '../Components/SimplePage';

export default function About() {
  return (
    <SimplePage title="Sobre Nós" subtitle="Conheça a história por trás do Eventify">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {[
          { icon: <Users size={24} />, label: '+50 mil usuários', desc: 'Crescendo cada dia mais' },
          { icon: <Award size={24} />, label: 'Eventos incríveis', desc: 'Curadoria de qualidade' },
          { icon: <Globe size={24} />, label: 'Brasil inteiro', desc: 'Presente em todas as regiões' },
          { icon: <Ticket size={24} />, label: 'Plataforma completa', desc: 'Do发现 ao ingresso' },
        ].map((item, i) => (
          <div key={i} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0 text-purple-400">
              {item.icon}
            </div>
            <div>
              <p className="font-bold text-[var(--text-primary)]">{item.label}</p>
              <p className="text-sm text-[var(--text-tertiary)]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p>
        O <strong>Eventify</strong> nasceu da paixão por conectar pessoas a experiências únicas. Somos uma plataforma que reúne os melhores eventos, workshops, festivais e encontros acontecendo por todo o Brasil.
      </p>
      <p>
        Acreditamos que cada evento é uma oportunidade de criar memórias inesquecíveis. Por isso, trabalhamos incansavelmente para oferecer a melhor experiência tanto para quem organiza quanto para quem participa.
      </p>
      <p>
        Nossa missão é democratizar o acesso a eventos de qualidade, ajudando produtores a alcançar seu público e facilitando a descoberta de experiências incríveis para quem busca viver momentos especiais.
      </p>

      <div className="bg-purple-500/5 border border-purple-500/20 rounded-2xl p-6 mt-4">
        <h3 className="font-bold text-lg text-[var(--text-primary)] mb-2">Nossos valores</h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 shrink-0" />
            <span><strong>Comunidade</strong> — Pessoas em primeiro lugar, conexões reais.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 shrink-0" />
            <span><strong>Qualidade</strong> — Curadoria rigorosa dos melhores eventos.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 shrink-0" />
            <span><strong>Inovação</strong> — Tecnologia a serviço de experiências memoráveis.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 shrink-0" />
            <span><strong>Acessibilidade</strong> — Eventos para todos, em todo o Brasil.</span>
          </li>
        </ul>
      </div>
    </SimplePage>
  );
}

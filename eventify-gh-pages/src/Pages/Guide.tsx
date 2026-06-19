import React from 'react';
import { Calendar, DollarSign, Users, BarChart3, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import SimplePage from '../Components/SimplePage';

export default function Guide() {
  return (
    <SimplePage title="Guia para Criadores" subtitle="Tudo que você precisa para criar eventos incríveis">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {[
          { icon: <Calendar size={22} />, label: 'Crie eventos', desc: 'Em poucos cliques', color: 'from-purple-600 to-blue-600' },
          { icon: <DollarSign size={22} />, label: 'Venda ingressos', desc: 'Taxa a partir de 5%', color: 'from-green-600 to-emerald-600' },
          { icon: <Users size={22} />, label: 'Comunidades', desc: 'Engaje seu público', color: 'from-pink-600 to-rose-600' },
          { icon: <BarChart3 size={22} />, label: 'Métricas', desc: 'Dashboard completo', color: 'from-blue-600 to-cyan-600' },
          { icon: <Shield size={22} />, label: 'Segurança', desc: 'Pagamentos seguros', color: 'from-orange-600 to-yellow-600' },
          { icon: <Zap size={22} />, label: 'Suporte', desc: 'Equipe dedicada', color: 'from-violet-600 to-purple-600' },
        ].map((item, i) => (
          <div key={i} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-5 card-hover">
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
              <span className="text-white">{item.icon}</span>
            </div>
            <p className="font-bold text-[var(--text-primary)] mb-1">{item.label}</p>
            <p className="text-sm text-[var(--text-tertiary)]">{item.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">📅 Como criar seu primeiro evento</h3>
      <div className="space-y-4 mb-8">
        {[
          { step: '1', title: 'Crie sua conta', desc: 'Cadastre-se na plataforma e escolha o plano ideal para você.' },
          { step: '2', title: 'Configure o evento', desc: 'Adicione título, descrição, data, horário e local do seu evento.' },
          { step: '3', title: 'Defina os ingressos', desc: 'Crie diferentes categorias de ingressos com preços e condições especiais.' },
          { step: '4', title: 'Divulgue', desc: 'Compartilhe o link do seu evento nas redes sociais e comunidades.' },
          { step: '5', title: 'Acompanhe', desc: 'Use o dashboard de métricas para acompanhar vendas em tempo real.' },
        ].map((item, i) => (
          <div key={i} className="flex items-start gap-4 bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl p-5">
            <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center font-bold text-sm text-white shrink-0 shadow-lg">
              {item.step}
            </div>
            <div>
              <p className="font-bold text-[var(--text-primary)]">{item.title}</p>
              <p className="text-sm text-[var(--text-tertiary)] mt-0.5">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-white/10 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-black mb-3 text-[var(--text-primary)]">Pronto para começar?</h3>
        <p className="text-[var(--text-tertiary)] mb-6 max-w-md mx-auto">
          Crie seu primeiro evento hoje e alcance milhares de pessoas interessadas em experiências únicas.
        </p>
        <Link
          to="/precos"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-purple-500/20"
        >
          Ver Planos
        </Link>
      </div>
    </SimplePage>
  );
}

import React from 'react';
import { Mail, MessageCircle, Book, HelpCircle } from 'lucide-react';
import SimplePage from '../Components/SimplePage';

export default function Support() {
  return (
    <SimplePage title="Suporte" subtitle="Estamos aqui para ajudar">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {[
          { icon: <MessageCircle size={24} />, label: 'Chat ao Vivo', desc: 'Seg a Sex, 9h às 18h', color: 'text-purple-400' },
          { icon: <Mail size={24} />, label: 'E-mail', desc: 'Resposta em até 24h', color: 'text-blue-400' },
          { icon: <Book size={24} />, label: 'Central de Ajuda', desc: 'Guias e tutoriais', color: 'text-green-400' },
          { icon: <HelpCircle size={24} />, label: 'FAQ', desc: 'Perguntas frequentes', color: 'text-yellow-400' },
        ].map((item, i) => (
          <div key={i} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-5 flex items-center gap-4">
            <div className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 ${item.color}`}>
              {item.icon}
            </div>
            <div>
              <p className="font-bold text-[var(--text-primary)]">{item.label}</p>
              <p className="text-sm text-[var(--text-tertiary)]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-white/10 rounded-3xl p-8 text-center">
        <h3 className="text-2xl font-black mb-3 text-[var(--text-primary)]">Precisa de ajuda?</h3>
        <p className="text-[var(--text-tertiary)] mb-6 max-w-md mx-auto">
          Nossa equipe está pronta para ajudar com qualquer dúvida sobre eventos, compras ou sua conta.
        </p>
        <a
          href="mailto:suporte@eventify.com.br"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg shadow-purple-500/20"
        >
          <Mail size={18} />
          suporte@eventify.com.br
        </a>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-bold text-[var(--text-primary)] mb-4">Perguntas Frequentes</h3>
        <div className="space-y-4">
          {[
            { q: 'Como comprar um ingresso?', a: 'Navegue pelos eventos, selecione o que deseja, escolha o tipo de ingresso e finalize a compra. Você receberá a confirmação por e-mail.' },
            { q: 'Posso cancelar ou reembolsar um ingresso?', a: 'As políticas de reembolso são definidas pelo organizador do evento. Verifique as condições no momento da compra.' },
            { q: 'Como criar minha própria comunidade?', a: 'Acesse a página de Comunidades e clique em "Criar Comunidade". Preencha as informações e comece a reunir pessoas.' },
            { q: 'Esqueci minha senha, o que fazer?', a: 'Na página de login, clique em "Esqueceu a senha?" e siga as instruções para redefini-la.' },
          ].map((faq, i) => (
            <div key={i} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl p-5">
              <p className="font-bold text-[var(--text-primary)] mb-2">{faq.q}</p>
              <p className="text-sm text-[var(--text-tertiary)]">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </SimplePage>
  );
}

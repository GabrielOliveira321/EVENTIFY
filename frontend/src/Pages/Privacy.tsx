import React from 'react';
import { Shield, Lock, Eye, Trash2 } from 'lucide-react';
import SimplePage from '../Components/SimplePage';

export default function Privacy() {
  return (
    <SimplePage title="Privacidade" subtitle="Como protegemos seus dados">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {[
          { icon: <Shield size={20} />, label: 'Dados protegidos', desc: 'Criptografia de ponta a ponta' },
          { icon: <Lock size={20} />, label: 'Controle total', desc: 'Você decide o que compartilhar' },
          { icon: <Eye size={20} />, label: 'Transparência', desc: 'Sabemos exatamente o que coletamos' },
          { icon: <Trash2 size={20} />, label: 'Exclusão simples', desc: 'Seus dados, sua decisão' },
        ].map((item, i) => (
          <div key={i} className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-xl p-4 flex items-center gap-3">
            <div className="text-blue-400">{item.icon}</div>
            <div>
              <p className="font-bold text-sm text-[var(--text-primary)]">{item.label}</p>
              <p className="text-xs text-[var(--text-tertiary)]">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p><strong>Última atualização:</strong> Junho de 2026</p>

      <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">1. Informações que Coletamos</h3>
      <p>
        Coletamos informações que você nos fornece diretamente ao criar uma conta, comprar ingressos ou entrar em contato
        conosco. Isso inclui nome, e-mail, telefone e dados de pagamento necessários para processar suas compras.
      </p>

      <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">2. Como Usamos suas Informações</h3>
      <p>Utilizamos seus dados para:</p>
      <ul className="space-y-2 ml-6">
        <li className="list-disc">Processar suas compras de ingressos e enviar confirmações</li>
        <li className="list-disc">Personalizar sua experiência na plataforma</li>
        <li className="list-disc">Enviar recomendações de eventos baseadas em seus interesses</li>
        <li className="list-disc">Melhorar nossos serviços e desenvolver novos recursos</li>
        <li className="list-disc">Cumprir obrigações legais e regulatórias</li>
      </ul>

      <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">3. Compartilhamento de Dados</h3>
      <p>
        Não vendemos suas informações pessoais para terceiros. Compartilhamos dados apenas quando necessário para
        processar suas compras (com operadoras de pagamento) ou quando exigido por lei.
      </p>

      <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">4. Seus Direitos</h3>
      <p>
        Você tem o direito de acessar, corrigir ou excluir seus dados pessoais a qualquer momento através das
        configurações da sua conta ou entrando em contato conosco. Você também pode solicitar a portabilidade dos
        seus dados para outro serviço.
      </p>

      <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-5 mt-4">
        <h3 className="font-bold text-[var(--text-primary)] mb-2">🔒 Compromisso com a LGPD</h3>
        <p className="text-sm">
          O Eventify segue rigorosamente as diretrizes da Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018),
          garantindo que seus dados pessoais sejam tratados com segurança, transparência e respeito.
        </p>
      </div>
    </SimplePage>
  );
}

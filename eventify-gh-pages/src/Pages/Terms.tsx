import React from 'react';
import SimplePage from '../Components/SimplePage';

export default function Terms() {
  return (
    <SimplePage title="Termos de Uso" subtitle="Condições gerais de uso da plataforma Eventify">
      <p><strong>Última atualização:</strong> Junho de 2026</p>

      <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">1. Aceitação dos Termos</h3>
      <p>
        Ao acessar ou usar a plataforma Eventify, você concorda em cumprir e ficar vinculado a estes Termos de Uso.
        Se você não concordar com qualquer parte destes termos, não poderá acessar ou usar nossos serviços.
      </p>

      <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">2. Conta de Usuário</h3>
      <p>
        Para acessar certos recursos da plataforma, você precisará criar uma conta. Você é responsável por manter a
        confidencialidade de suas credenciais de login e por todas as atividades que ocorrerem em sua conta.
      </p>

      <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">3. Compra de Ingressos</h3>
      <p>
        Ao comprar ingressos através do Eventify, você concorda com as políticas de reembolso e cancelamento
        estabelecidas pelo organizador do evento. O Eventify atua como intermediário na venda de ingressos e não se
        responsabiliza por alterações ou cancelamentos de eventos por parte dos organizadores.
      </p>

      <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">4. Conduta do Usuário</h3>
      <p>
        Você concorda em usar a plataforma apenas para fins legais e de acordo com estes termos. É proibido:
      </p>
      <ul className="space-y-2 ml-6">
        <li className="list-disc">Utilizar a plataforma para qualquer atividade fraudulenta ou ilegal</li>
        <li className="list-disc">Tentar acessar áreas restritas do sistema sem autorização</li>
        <li className="list-disc">Publicar conteúdo falso, enganoso ou difamatório</li>
        <li className="list-disc">Violar direitos de propriedade intelectual</li>
      </ul>

      <h3 className="text-xl font-bold text-[var(--text-primary)] mt-8 mb-4">5. Limitação de Responsabilidade</h3>
      <p>
        O Eventify não será responsável por danos indiretos, incidentais ou consequenciais decorrentes do uso ou
        da incapacidade de usar nossos serviços, incluindo, mas não se limitando a, cancelamentos de eventos,
        problemas com ingressos ou disputas entre usuários e organizadores.
      </p>
    </SimplePage>
  );
}

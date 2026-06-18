import React, { useState } from 'react';
import { Check, Star, Sparkles, CheckCircle, Mail, ArrowRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../Components/Layout';

const PLANS = [
  {
    name: 'Espectador',
    desc: 'Para quem quer apenas encontrar e participar de eventos.',
    monthly: 0,
    annual: 0,
    color: 'from-gray-500 to-gray-400',
    features: ['Acesso a todos os eventos públicos', 'Compra de ingressos', 'Participar de 3 comunidades'],
    cta: 'Plano Atual',
    popular: false,
  },
  {
    name: 'Criador',
    desc: 'Organize eventos incríveis e monetize sua audiência.',
    monthly: 59,
    annual: 49,
    color: 'from-purple-500 to-pink-500',
    features: ['Crie eventos ilimitados', 'Venda de ingressos (taxa 5%)', 'Comunidades ilimitadas', 'Dashboard de métricas avançado', 'Suporte prioritário'],
    cta: 'Assinar Criador',
    popular: true,
  },
  {
    name: 'Agência',
    desc: 'Para produtoras e empresas com múltiplos eventos.',
    monthly: 249,
    annual: 199,
    color: 'from-blue-500 to-cyan-500',
    features: ['Tudo do plano Criador', 'Taxa zero na venda de ingressos', 'Equipe de até 10 pessoas', 'API pública', 'Gerente de conta dedicado'],
    cta: 'Falar com Vendas',
    popular: false,
  },
];

export default function Prices() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [purchasedPlan, setPurchasedPlan] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const handleSubscribe = (planName: string) => {
    setIsProcessing(planName);
    setTimeout(() => {
      setIsProcessing(null);
      setPurchasedPlan(planName);
    }, 1500);
  };

  if (purchasedPlan) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
        <Layout variant="default">
        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="max-w-md w-full text-center">
            <div className="inline-flex mb-8 relative">
              <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
                <CheckCircle size={56} className="text-green-400" />
              </div>
              <Sparkles size={24} className="text-yellow-400 animate-pulse absolute -top-2 -right-2" />
            </div>
            <h1 className="text-3xl font-black mb-2">Assinatura confirmada!</h1>
            <p className="text-gray-400 mb-8">
              Você agora tem acesso ao plano <span className="font-bold text-white">{purchasedPlan}</span>.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-3 mb-8">
              <Mail size={18} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-300 text-left">
                Os detalhes foram enviados para o seu e-mail.
              </p>
            </div>
            <Link
              to="/profile"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20"
            >
              Acessar meu painel <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </Layout>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500 overflow-hidden">
      <Layout activeLink="precos">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="text-center mb-12 sm:mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-6">
            <Zap size={14} className="text-purple-400" />
            <span className="text-xs font-semibold text-gray-300">Planos que cabem no seu bolso</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
            Preços{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              transparentes
            </span>.
          </h1>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto mb-10">
            Escolha o plano perfeito para você. Seja para curtir eventos ou organizar festivais gigantescos.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-1.5 w-fit mx-auto">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${!isAnnual ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-white'}`}
            >
              Mensal
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-5 py-2 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${isAnnual ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20' : 'text-gray-400 hover:text-white'}`}
            >
              Anual
              <span className="bg-green-500 text-white px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider">−20%</span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 max-w-5xl mx-auto">
          {PLANS.map((plan, i) => {
            const price = isAnnual ? plan.annual : plan.monthly;
            return (
              <div
                key={plan.name}
                className={`relative rounded-3xl p-8 flex flex-col transition-all duration-500 ${
                  plan.popular
                    ? 'bg-gradient-to-b from-purple-900/40 to-[#141414] border-2 border-purple-500/50 shadow-[0_0_60px_rgba(168,85,247,0.15)] hover:shadow-[0_0_80px_rgba(168,85,247,0.2)] md:-translate-y-4'
                    : 'bg-[#141414] border border-white/5 hover:border-white/20'
                } card-hover`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg flex items-center gap-1.5 z-20">
                    <Star size={12} fill="currentColor" /> Mais Popular
                  </div>
                )}

                <div className="mb-6">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Zap size={20} className="text-white" />
                  </div>
                  <h3 className={`text-2xl font-black mb-1 ${plan.popular ? 'text-purple-300' : ''}`}>{plan.name}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{plan.desc}</p>
                </div>

                <div className="mb-8">
                  <span className="text-5xl font-black">{price === 0 ? 'R$ 0' : `R$ ${price}`}</span>
                  {price > 0 && <span className="text-gray-500 text-sm">/mês</span>}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check size={16} className={`shrink-0 mt-0.5 ${plan.popular ? 'text-purple-400' : 'text-green-400'}`} />
                      <span className={plan.popular ? 'text-gray-200' : 'text-gray-300'}>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSubscribe(plan.name)}
                  disabled={isProcessing === plan.name || price === 0}
                  className={`w-full font-bold py-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 text-sm ${
                    plan.popular
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30'
                      : price === 0
                      ? 'bg-white/10 text-white cursor-default'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  } disabled:opacity-50`}
                >
                  {isProcessing === plan.name ? (
                    <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processando...</>
                  ) : price === 0 ? (
                    'Plano Atual'
                  ) : (
                    plan.cta
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </main>

      </Layout>
    </div>
  );
}

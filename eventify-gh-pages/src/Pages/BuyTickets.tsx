import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check, Droplets, Wheat, UserRound, QrCode, CreditCard, CheckCircle, Download, Mail, Ticket, Shield, Sparkles } from 'lucide-react';
import Layout from '../Components/Layout';
import { purchaseTicket, fetchEventById, EventData } from '../API/apiServices';

interface Discount {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  percent: number;
}

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  color: string;
  available: number;
  discounts: string[];
}

const DISCOUNTS: Discount[] = [
  { id: 'blood', label: 'Doador de Sangue', description: 'Apresente comprovante de doação', icon: <Droplets size={16} />, percent: 50 },
  { id: 'elder', label: 'Idoso (60+)', description: 'Meia-entrada obrigatória por lei', icon: <UserRound size={16} />, percent: 50 },
  { id: 'food', label: '1 kg de alimento', description: 'Não perecível na entrada', icon: <Wheat size={16} />, percent: 30 },
];

const TICKET_TYPES: TicketType[] = [
  { id: 'pista', name: 'Pista', price: 80, description: 'Área geral com acesso ao palco principal.', color: 'from-gray-600 to-gray-500', available: 200, discounts: ['blood', 'elder', 'food'] },
  { id: 'plateia', name: 'Plateia', price: 140, description: 'Cadeiras numeradas com boa visibilidade.', color: 'from-blue-700 to-blue-600', available: 80, discounts: ['blood', 'elder'] },
  { id: 'camarote', name: 'Camarote', price: 280, description: 'Área elevada com open bar e serviço exclusivo.', color: 'from-purple-700 to-purple-600', available: 30, discounts: ['elder'] },
  { id: 'vip', name: 'VIP', price: 450, description: 'Acesso backstage, área privativa e kit exclusivo.', color: 'from-yellow-600 to-amber-500', available: 15, discounts: [] },
  { id: 'pcd', name: 'PcD / Acompanhante', price: 0, description: 'Gratuito para pessoa com deficiência + 1 acompanhante. Apresente laudo.', color: 'from-green-700 to-green-600', available: 10, discounts: [] },
];

const INSTALLMENTS = [1, 2, 3, 4, 6, 12];

export default function BuyTickets() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<string | null>(null);
  const [selectedDiscount, setSelectedDiscount] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'credit' | null>(null);
  const [installments, setInstallments] = useState(1);
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseResult, setPurchaseResult] = useState<{ confirmationCode: string; userEmail: string } | null>(null);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchEventById(id)
      .then(setEvent)
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  const ticket = TICKET_TYPES.find(t => t.id === selected);
  const discount = DISCOUNTS.find(d => d.id === selectedDiscount);

  const unitPrice = ticket
    ? discount
      ? ticket.price * (1 - discount.percent / 100)
      : ticket.price
    : 0;

  const total = unitPrice * qty;
  const finalTotal = paymentMethod === 'pix' ? total * 0.95 : total;

  const handleFinalize = async () => {
    if (!ticket || !event) return;
    setPurchasing(true);
    setPurchaseError(null);
    try {
      const result = await purchaseTicket({
        eventId: event.id,
        eventTitle: event.title,
        ticketType: ticket.id,
        ticketName: ticket.name,
        quantity: qty,
        totalPrice: ticket.price === 0 ? 0 : finalTotal,
        paymentMethod: paymentMethod ?? 'free',
        installments: paymentMethod === 'credit' ? installments : undefined,
        discountType: selectedDiscount ?? undefined,
      });
      setPurchaseResult({ confirmationCode: result.confirmationCode, userEmail: result.userEmail });
    } catch (err: any) {
      setPurchaseError(err.message ?? 'Erro ao finalizar compra. Tente novamente.');
    } finally {
      setPurchasing(false);
    }
  };

  const handleDownload = () => {
    if (!purchaseResult || !ticket || !event) return;
    const lines = [
      '╔══════════════════════════════════╗',
      '║        INGRESSO EVENTIFY         ║',
      '╠══════════════════════════════════╣',
      `║ Evento:     ${event.title.padEnd(20)} ║`,
      `║ Data:       ${event.date.padEnd(20)} ║`,
      `║ Local:      ${event.city.padEnd(20)} ║`,
      `║ Ingresso:   ${ticket.name.padEnd(20)} ║`,
      `║ Quantidade: ${String(qty).padEnd(20)} ║`,
      `║ Total:      ${(ticket.price === 0 ? 'Grátis' : `R$ ${finalTotal.toFixed(2)}`).padEnd(20)} ║`,
      `║ Código:     ${purchaseResult.confirmationCode.padEnd(20)} ║`,
      `║ Email:      ${purchaseResult.userEmail.padEnd(20)} ║`,
      '╠══════════════════════════════════╣',
      '║  Apresente na entrada do evento  ║',
      '╚══════════════════════════════════╝',
    ].join('\n');
    const blob = new Blob([lines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ingresso-${purchaseResult.confirmationCode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-2 border-white/20 border-t-purple-500 rounded-full animate-spin" />
        <p className="text-gray-400">Preparando sua experiência...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl font-black">Evento não encontrado</h1>
        <Link to="/all-events" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all">
          <ArrowLeft size={18} /> Ver eventos
        </Link>
      </div>
    );
  }

  if (purchaseResult) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">
        <nav className="flex items-center justify-between px-8 py-5 backdrop-blur-md bg-black/50 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-purple-600 to-blue-500 p-2 rounded-lg">
              <Ticket size={20} className="text-white" />
            </div>
            <Link to="/" className="text-lg font-black tracking-tighter">EVENTIFY</Link>
          </div>
        </nav>

        <div className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="max-w-md w-full">
            {/* Success animation */}
            <div className="text-center mb-10">
              <div className="inline-flex mb-8 relative">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/30">
                  <CheckCircle size={56} className="text-green-400" />
                </div>
                <div className="absolute -top-2 -right-2">
                  <Sparkles size={24} className="text-yellow-400 animate-pulse" />
                </div>
              </div>
              <h1 className="text-3xl font-black mb-2">Compra realizada!</h1>
              <p className="text-gray-400">Seu pedido foi confirmado com sucesso.</p>
            </div>

            {/* Order details */}
            <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/5 rounded-2xl p-6 mb-6 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Evento</span>
                <span className="font-bold text-right">{event?.title}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Ingresso</span>
                <span className="font-bold">{ticket?.name} × {qty}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total pago</span>
                <span className="font-bold text-green-400 text-lg">
                  {ticket?.price === 0 ? 'Grátis' : `R$ ${finalTotal.toFixed(2)}`}
                </span>
              </div>
              {paymentMethod === 'credit' && installments > 1 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Parcelamento</span>
                  <span className="font-bold">{installments}x de R$ {(finalTotal / installments).toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-white/5 pt-4">
                <p className="text-xs text-gray-500 mb-1">Código de confirmação</p>
                <p className="font-mono font-bold text-purple-400 tracking-wide">{purchaseResult.confirmationCode}</p>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 flex items-start gap-3 mb-8">
              <Mail size={18} className="text-blue-400 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-300 text-left">
                Seu ingresso também foi enviado para <span className="font-bold">{purchaseResult.userEmail}</span>. Verifique sua caixa de entrada.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleDownload}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20"
              >
                <Download size={18} /> Baixar Ingresso
              </button>
              <Link
                to="/all-events"
                className="w-full flex items-center justify-center gap-2 border border-white/10 hover:border-white/20 text-gray-300 hover:text-white font-bold py-4 rounded-2xl transition-all"
              >
                Ver mais eventos
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500">
      <Layout
        variant="centered"
        backTo={`/event/${id}`}
        backLabel="Voltar ao evento"
      >

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {/* Event header */}
        <div className="flex items-center gap-4 sm:gap-5 mb-10 bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/5 rounded-2xl p-4 sm:p-6 card-hover">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0 ring-2 ring-white/5" 
          />
          <div className="min-w-0">
            <p className="text-xs font-bold text-purple-400 uppercase tracking-widest mb-1">{event.date} · {event.city}</p>
            <h1 className="text-xl sm:text-2xl font-black truncate">{event.title}</h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left - Ticket types */}
          <div className="flex-1 w-full space-y-8">

            <section>
              <h2 className="text-lg font-black mb-5 flex items-center gap-2">
                <Ticket size={18} className="text-purple-400" />
                Escolha o seu ingresso
              </h2>
              <div className="space-y-3">
                {TICKET_TYPES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setSelected(t.id); setSelectedDiscount(null); }}
                    className={`w-full text-left rounded-2xl border-2 transition-all duration-300 p-5 flex items-center justify-between gap-4
                      ${selected === t.id
                        ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_20px_rgba(168,85,247,0.1)]'
                        : 'border-white/5 bg-[#111] hover:border-white/20 hover:bg-white/[0.02]'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`bg-gradient-to-br ${t.color} p-3 rounded-xl shrink-0 shadow-lg`}>
                        <Ticket size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-base">{t.name}</p>
                        <p className="text-gray-400 text-sm">{t.description}</p>
                        <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${t.available > 20 ? 'bg-green-500' : t.available > 5 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                          {t.available} disponíveis
                        </p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {t.price === 0
                        ? <span className="text-green-400 font-black text-xl">Grátis</span>
                        : <><span className="font-black text-xl">R$ {t.price}</span>
                          {selected === t.id && (
                            <div className="flex justify-end mt-0.5">
                              <span className="text-[10px] text-gray-500">por pessoa</span>
                            </div>
                          )}</>
                      }
                      {selected === t.id && (
                        <div className="flex justify-end mt-1">
                          <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                            <Check size={14} className="text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </section>

            {ticket && ticket.discounts.length > 0 && (
              <section className="animate-fade-in-up">
                <h2 className="text-lg font-black mb-1">Possui alguma condição especial?</h2>
                <p className="text-gray-400 text-sm mb-5">Opcional — comprovante exigido na entrada.</p>
                <div className="space-y-2.5">
                  {DISCOUNTS.filter(d => ticket.discounts.includes(d.id)).map(d => (
                    <button
                      key={d.id}
                      onClick={() => setSelectedDiscount(prev => prev === d.id ? null : d.id)}
                      className={`w-full text-left rounded-2xl border-2 transition-all duration-200 p-4 flex items-center justify-between gap-4
                        ${selectedDiscount === d.id
                          ? 'border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                          : 'border-white/5 bg-[#111] hover:border-white/20'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-xl ${selectedDiscount === d.id ? 'bg-green-500/20' : 'bg-white/5'}`}>
                          <span className={selectedDiscount === d.id ? 'text-green-400' : 'text-gray-400'}>{d.icon}</span>
                        </div>
                        <div>
                          <p className="font-bold text-sm">{d.label}</p>
                          <p className="text-gray-400 text-xs">{d.description}</p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`font-black text-sm ${selectedDiscount === d.id ? 'text-green-400' : 'text-green-500'}`}>−{d.percent}%</span>
                        {selectedDiscount === d.id && <p className="text-[10px] text-green-500">Aplicado</p>}
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right - Order Summary */}
          <div className="w-full lg:w-[360px] shrink-0 lg:sticky lg:top-24">
            <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/5 rounded-2xl p-6 space-y-5 shadow-[0_0_40px_rgba(168,85,247,0.03)]">
              <h2 className="font-black text-lg flex items-center gap-2">
                <ShoppingCart size={18} className="text-purple-400" /> Resumo
              </h2>

              {!ticket ? (
                <div className="py-8 text-center">
                  <Ticket size={32} className="text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">Selecione um tipo de ingresso para continuar.</p>
                </div>
              ) : (
                <>
                  <div className="space-y-2.5 text-sm">
                    <div className="flex justify-between items-center bg-white/5 rounded-xl px-4 py-3">
                      <span className="text-gray-400">Ingresso</span>
                      <span className="font-bold">{ticket.name}</span>
                    </div>
                    {discount && (
                      <div className="flex justify-between items-center bg-green-500/5 rounded-xl px-4 py-3">
                        <span className="text-green-400">Desconto ({discount.label})</span>
                        <span className="text-green-400 font-bold">−{discount.percent}%</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center px-4 py-2">
                      <span className="text-gray-400">Preço unitário</span>
                      <span className="font-bold">
                        {ticket.price === 0 ? 'Grátis' : `R$ ${unitPrice.toFixed(2)}`}
                      </span>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className="flex items-center justify-between bg-white/5 rounded-xl px-4 py-3 border border-white/5">
                    <span className="text-sm font-semibold text-gray-300">Quantidade</span>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => setQty(q => Math.max(1, q - 1))}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 font-bold text-lg flex items-center justify-center transition hover:scale-110 active:scale-95"
                      >
                        −
                      </button>
                      <span className="font-black w-6 text-center text-lg">{qty}</span>
                      <button 
                        onClick={() => setQty(q => Math.min(ticket.available, q + 1))}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 font-bold text-lg flex items-center justify-center transition hover:scale-110 active:scale-95"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-white/10 pt-4 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-gray-300">Total</span>
                      <div className="text-right">
                        {ticket.price > 0 && paymentMethod === 'pix' && (
                          <p className="text-xs line-through text-gray-500">R$ {total.toFixed(2)}</p>
                        )}
                        <span className="text-2xl font-black">
                          {ticket.price === 0 ? 'Grátis' : `R$ ${finalTotal.toFixed(2)}`}
                        </span>
                      </div>
                    </div>
                    {ticket.price > 0 && paymentMethod === 'pix' && (
                      <p className="text-[10px] text-green-400 text-right">Economizou R$ {(total * 0.05).toFixed(2)} com Pix</p>
                    )}
                  </div>

                  {/* Payment methods */}
                  {ticket.price > 0 && (
                    <div className="space-y-3 animate-fade-in-up">
                      <p className="text-sm font-bold text-gray-300">Forma de pagamento</p>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={() => setPaymentMethod('pix')}
                          className={`flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 transition-all duration-200
                            ${paymentMethod === 'pix'
                              ? 'border-green-500 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.1)]'
                              : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'}`}
                        >
                          <QrCode size={28} className={paymentMethod === 'pix' ? 'text-green-400' : 'text-gray-400'} />
                          <span className="text-xs font-bold">Pix</span>
                          {paymentMethod === 'pix' ? (
                            <span className="text-[10px] text-green-400 font-semibold">5% off</span>
                          ) : (
                            <span className="text-[10px] text-gray-500">+ rápido</span>
                          )}
                        </button>
                        <button
                          onClick={() => setPaymentMethod('credit')}
                          className={`flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 transition-all duration-200
                            ${paymentMethod === 'credit'
                              ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                              : 'border-white/5 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'}`}
                        >
                          <CreditCard size={28} className={paymentMethod === 'credit' ? 'text-purple-400' : 'text-gray-400'} />
                          <span className="text-xs font-bold">Cartão</span>
                          {paymentMethod === 'credit' ? (
                            <span className="text-[10px] text-purple-400 font-semibold">até 12x</span>
                          ) : (
                            <span className="text-[10px] text-gray-500">parcelado</span>
                          )}
                        </button>
                      </div>

                      {paymentMethod === 'pix' && (
                        <div className="bg-white/5 rounded-2xl p-5 flex flex-col items-center gap-3 animate-fade-in-up">
                          <div className="bg-white p-4 rounded-xl shadow-lg">
                            <QrCode size={80} className="text-black" />
                          </div>
                          <p className="text-xs text-gray-400 text-center">Escaneie o QR code para pagar</p>
                          <div className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-gray-300 font-mono truncate">
                            eventify@pagamentos.com.br
                          </div>
                          <div className="flex items-center gap-1.5 text-green-400 text-xs font-bold">
                            <CheckCircle size={14} />
                            5% de desconto aplicado!
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'credit' && (
                        <div className="bg-white/5 rounded-2xl p-4 space-y-3 animate-fade-in-up">
                          <p className="text-xs font-semibold text-gray-400">Número de parcelas</p>
                          <div className="grid grid-cols-3 gap-2">
                            {INSTALLMENTS.map(n => (
                              <button
                                key={n}
                                onClick={() => setInstallments(n)}
                                className={`py-2.5 rounded-xl text-xs font-bold border-2 transition
                                  ${installments === n
                                    ? 'border-purple-500 bg-purple-500/20 text-purple-300'
                                    : 'border-white/5 bg-white/5 hover:border-white/20 text-gray-400'}`}
                              >
                                {n === 1 ? 'À vista' : `${n}x`}
                              </button>
                            ))}
                          </div>
                          <p className="text-xs text-gray-400 text-center">
                            {installments === 1
                              ? `R$ ${finalTotal.toFixed(2)} à vista`
                              : `${installments}x de R$ ${(finalTotal / installments).toFixed(2)} sem juros`}
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {purchaseError && (
                    <p className="text-red-400 text-xs text-center bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2.5 animate-scale-in">
                      {purchaseError}
                    </p>
                  )}

                  <button
                    onClick={handleFinalize}
                    disabled={purchasing || (ticket.price > 0 && !paymentMethod)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-gray-700 disabled:to-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-purple-500/20 disabled:shadow-none flex items-center justify-center gap-2 text-base"
                  >
                    {purchasing ? (
                      <><span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processando...</>
                    ) : 'Finalizar compra'}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                    <Shield size={14} className="text-green-500" />
                    Compra 100% segura e garantida
                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </main>
      </Layout>
    </div>
  );
}

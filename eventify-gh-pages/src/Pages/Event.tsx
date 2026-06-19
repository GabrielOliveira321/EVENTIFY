import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowLeft, Share2, Heart, Star, Shield, ChevronRight } from 'lucide-react';
import Layout from '../Components/Layout';
import { fetchEventById, EventData } from '../API/apiServices';

const MOCK_REVIEWS = [
  { id: 1, name: "Ana Silva", avatar: "https://i.pravatar.cc/150?u=ana", rating: 5, comment: "Simplesmente incrível! A organização estava impecável e a energia do lugar era surreal." },
  { id: 2, name: "Carlos Eduardo", avatar: "https://i.pravatar.cc/150?u=carlos", rating: 4, comment: "Muito bom, a estrutura estava ótima. Só as filas do bar que estavam um pouco longas, mas de resto nota 10!" },
  { id: 3, name: "Mariana Costa", avatar: "https://i.pravatar.cc/150?u=mari", rating: 5, comment: "Melhor experiência da minha vida! As palestras agregaram muito e conheci pessoas incríveis." },
  { id: 4, name: "Lucas Fernandes", avatar: "https://i.pravatar.cc/150?u=lucas", rating: 5, comment: "Recomendo a todos! Valeu cada centavo. Vou no próximo com certeza." },
];

function StarRating({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-600"}
        />
      ))}
    </div>
  );
}

export default function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetchEventById(id)
      .then(setEvent)
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-2 border-white/20 border-t-purple-500 rounded-full animate-spin" />
        <p className="mt-4 text-gray-400">Carregando evento...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mb-6">
          <Calendar size={36} className="text-gray-500" />
        </div>
        <h1 className="text-4xl font-black mb-2">Evento não encontrado</h1>
        <p className="text-gray-400 mb-8">Este evento pode ter sido removido ou não existe.</p>
        <Link to="/all-events" className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all">
          <ArrowLeft size={18} /> Ver eventos disponíveis
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500 pb-24 md:pb-0">
      <Layout
        variant="centered"
        backTo="/all-events"
        backLabel="Voltar"
        rightExtra={
          <>
            <button 
              onClick={() => setLiked(!liked)}
              className={`p-2.5 rounded-full transition-all duration-300 ${liked ? 'bg-red-500/20' : 'bg-white/5 hover:bg-white/10'}`}
            >
              <Heart size={20} className={liked ? 'text-red-400 fill-red-400' : 'text-gray-300'} />
            </button>
            <button className="p-2.5 bg-white/5 hover:bg-white/10 rounded-full transition-colors">
              <Share2 size={20} className="text-gray-300" />
            </button>
          </>
        }
      >

      {/* Hero Image */}
      <div className="relative h-[45vh] md:h-[65vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent z-10" />
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover" 
        />

        <div className="absolute bottom-0 left-0 w-full z-20 px-6 md:px-12 pb-8 max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-purple-500/20">
              {event.category}
            </span>
            <span className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-gray-300 border border-white/5">
              {event.date}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight max-w-4xl">
            {event.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 flex flex-col lg:flex-row gap-12 items-start">
        {/* Left - Details */}
        <div className="flex-1 min-w-0">

          {/* Info cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center shrink-0">
                <Calendar size={22} className="text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Data & Horário</p>
                <p className="font-bold text-white">{event.date}</p>
                <p className="text-sm text-gray-400">{event.time}</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-white/5 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={22} className="text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-0.5">Localização</p>
                <p className="font-bold text-white">{event.city}</p>
                <p className="text-sm text-gray-400">{event.location}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full inline-block" />
              Sobre o Evento
            </h2>
            <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
              {event.description}
            </p>
            {event.url && (
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-purple-400 hover:text-purple-300 font-bold transition group"
              >
                Ver no Eventbrite 
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            )}
          </div>

          {/* Reviews */}
          <div className="mb-12">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
              <span className="w-1 h-6 bg-gradient-to-b from-yellow-400 to-orange-500 rounded-full inline-block" />
              <Star className="text-yellow-400 fill-yellow-400" size={22} />
              Avaliações
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {MOCK_REVIEWS.map((review) => (
                <div 
                  key={review.id} 
                  className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-white/5 p-6 rounded-2xl hover:border-purple-500/30 transition-all duration-300 card-hover"
                >
                  <StarRating rating={review.rating} size={14} />
                  <p className="text-gray-300 text-sm my-4 leading-relaxed italic">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="w-9 h-9 rounded-full border border-white/10 ring-2 ring-white/5" 
                    />
                    <div>
                      <p className="text-sm font-bold">{review.name}</p>
                      <p className="text-xs text-gray-500">Participante</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right - Ticket Sidebar */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-white/5 rounded-3xl p-8 sticky top-28 shadow-[0_0_40px_rgba(168,85,247,0.05)]">
            <h3 className="text-xl font-black mb-2">Ingressos</h3>
            <p className="text-gray-500 text-xs mb-6">Garanta seu lugar neste evento</p>

            {event.pricingOptions && event.pricingOptions.length > 0 ? (
              <div className="space-y-2.5 mb-8 pb-8 border-b border-white/5">
                {event.pricingOptions.map((option, i) => (
                  <div
                    key={option.type}
                    className="flex items-center justify-between bg-white/5 hover:bg-white/[0.08] rounded-xl px-4 py-3.5 transition-all duration-200 group"
                  >
                    <div>
                      <span className="font-bold text-sm group-hover:text-purple-400 transition-colors">{option.label}</span>
                      {option.description && (
                        <p className="text-gray-500 text-xs mt-0.5">{option.description}</p>
                      )}
                    </div>
                    <span className="text-lg font-black text-white">R$ {option.price}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mb-8 pb-8 border-b border-white/5">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-medium">Preço</span>
                  <span className="text-3xl font-black text-white">{event.price}</span>
                </div>
              </div>
            )}

            <Link 
              to={`/buy-tickets/${event.id}`} 
              className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-2xl text-base transition-all duration-300 shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] text-center"
            >
              Comprar Ingresso
            </Link>

            <div className="flex items-center justify-center gap-2 text-gray-500 text-xs mt-5">
              <Shield size={14} className="text-green-500" />
              Compra segura e garantida
            </div>
          </div>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#141414]/90 backdrop-blur-xl border-t border-white/10 p-4 z-50 flex items-center justify-between">
        <div>
          <p className="text-[10px] text-gray-400 font-medium mb-0.5">A partir de</p>
          <p className="text-xl font-black">{event.price}</p>
        </div>
        <Link 
          to={`/buy-tickets/${event.id}`} 
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-10 rounded-xl text-sm active:scale-95 transition-all shadow-lg shadow-purple-500/20"
        >
          Comprar
        </Link>
      </div>

      </Layout>
    </div>
  );
}

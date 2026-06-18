import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Sparkles, Zap, Flame, Music, Monitor, Utensils, Palette, Code, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../Components/Layout';
import { fetchEvents, EventData } from '../API/apiServices';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  'Tech': <Code size={18} />,
  'Música': <Music size={18} />,
  'Gastronomia': <Utensils size={18} />,
  'Arte': <Palette size={18} />,
  'Design': <Monitor size={18} />,
};


export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [events, setEvents] = useState<EventData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    fetchEvents('eventos', 'Brazil')
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        {/* ====== HERO SECTION ====== */}
        <div className="relative mb-16 overflow-hidden">
          {/* Animated background blobs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px] animate-float" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-[150px] animate-float-slow" />

          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/30 via-[#0f0f1a] to-blue-900/30 border border-white/5 p-8 sm:p-12 lg:p-16">
            {/* Grain texture overlay */}
            <div className="absolute inset-0 bg-noise pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-8">
                <Sparkles size={14} className="text-purple-400" />
                <span className="text-xs font-semibold text-gray-300 tracking-wide">
                  Mais de 50 mil pessoas conectadas
                </span>
              </div>

              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
                Onde a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                  experiência
                </span>
                <br />
                começa.
              </h1>

              <p className="text-gray-400 text-lg sm:text-xl max-w-xl mb-10 leading-relaxed">
                Descubra eventos únicos, encontre sua tribo e viva momentos inesquecíveis perto de você.
              </p>

              <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex items-center gap-2 max-w-xl shadow-[0_0_30px_rgba(168,85,247,0.1)]">
                <Search className="ml-3 text-gray-400 shrink-0" size={20} />
                <input 
                  type="text" 
                  placeholder="O que você quer viver hoje?" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && navigate('/all-events', { state: { search: searchQuery } })}
                  className="bg-transparent border-none outline-none flex-1 py-3 text-sm sm:text-base text-white placeholder-gray-500" 
                />
                <button 
                  onClick={() => navigate('/all-events', { state: { search: searchQuery } })}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95 shadow-lg shadow-purple-500/20"
                >
                  Buscar
                </button>
              </div>
            </div>

            {/* Decorative floating elements */}
            <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
              <div className="relative w-64 h-64">
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl rotate-12 animate-float border border-white/5 backdrop-blur-md" />
                <div className="absolute bottom-0 right-20 w-20 h-20 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-2xl -rotate-6 animate-float-slow border border-white/5 backdrop-blur-md" />
                <div className="absolute top-20 right-16 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full animate-float border border-white/5 backdrop-blur-md" />
              </div>
            </div>
          </div>
        </div>

        {/* ====== QUICK ACCESS GRID ====== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">

          {/* Categorias em alta */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-white/5 rounded-2xl p-6 sm:p-8 relative overflow-hidden group card-hover">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-[60px] group-hover:bg-purple-500/10 transition-all duration-700" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold">Categorias em alta</h2>
                <Flame size={20} className="text-orange-500" />
              </div>
              <div className="flex flex-wrap gap-2.5">
                {['Tech', 'Música', 'Gastronomia', 'Arte', 'Design'].map(cat => (
                  <Link 
                    to="/all-events" 
                    state={{ category: cat }} 
                    key={cat} 
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 rounded-xl text-xs font-semibold border border-white/5 hover:border-transparent transition-all duration-300 group/cat"
                  >
                    <span className="text-gray-400 group-hover/cat:text-white transition-colors">
                      {CATEGORY_ICONS[cat]}
                    </span>
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* São Paulo */}
          <div 
            onClick={() => navigate('/all-events', { state: { city: 'São Paulo' } })}
            className="relative overflow-hidden rounded-2xl p-6 sm:p-8 flex flex-col justify-between cursor-pointer group card-hover bg-gradient-to-br from-blue-700 to-blue-900"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-transparent" />
            <MapPin size={28} className="text-blue-200 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <div className="relative z-10">
              <p className="text-sm font-medium text-blue-200/80 mb-1">Eventos perto de</p>
              <h3 className="text-2xl font-black italic">São Paulo, SP</h3>
              <div className="flex items-center gap-1 mt-2 text-blue-200/60 text-xs font-medium">
                <span>Explorar</span>
                <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Organizar evento */}
          <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 flex flex-col justify-between group card-hover bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 cursor-pointer"
            onClick={() => navigate('/all-events')}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="relative z-10">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Zap size={24} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-bold leading-tight mb-1">Organize<br />seu evento</h3>
              <p className="text-gray-400 text-xs mt-2 group-hover:text-gray-300 transition-colors">
                Crie e venda ingressos →
              </p>
            </div>
          </div>

        </div>

        {/* ====== EVENTOS SECTION ====== */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight flex items-center gap-3">
                <Calendar className="text-purple-500" size={28} />
                Próximos dias
              </h2>
              <p className="text-gray-500 text-sm mt-1">Os eventos mais esperados perto de você</p>
            </div>
            <Link to={"all-events"} className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-purple-400 hover:text-purple-300 transition-colors group">
              Ver tudo 
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 animate-pulse">
                  <div className="h-56 bg-white/5" />
                  <div className="p-6 space-y-4">
                    <div className="h-3 bg-white/5 rounded w-1/3" />
                    <div className="h-5 bg-white/5 rounded w-2/3" />
                    <div className="h-3 bg-white/5 rounded w-1/2" />
                    <div className="h-12 bg-white/5 rounded-xl" />
                  </div>
                </div>
              ))}
            </div>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.slice(0, 6).map((event, index) => (
                <div 
                  key={event.id} 
                  className="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/40 transition-all duration-500 card-hover animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                >
                  <Link to={`/event/${event.id}`}>
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                      
                      {/* Top badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                        <span className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10 shadow-lg">
                          {event.category}
                        </span>
                      </div>
                      
                      {/* Price badge */}
                      <div className="absolute bottom-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-1.5 rounded-xl text-sm font-black shadow-xl shadow-purple-500/20">
                        {event.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-purple-400 text-xs font-bold mb-3 uppercase tracking-tighter">
                        <Calendar size={12} />
                        <span>{event.date}</span>
                        <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                        <MapPin size={12} className="text-gray-500" />
                        <span className="text-gray-400 font-medium normal-case">{event.city}</span>
                      </div>
                      <h3 className="text-xl font-black mb-4 group-hover:text-purple-400 transition-colors leading-tight line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <button className="flex-1 py-3.5 bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                          Reservar Ingresso
                        </button>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#111] rounded-2xl border border-white/5">
              <Sparkles size={48} className="text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg font-semibold mb-2">Nenhum evento encontrado</p>
              <p className="text-gray-600 text-sm">Configure sua EVENTBRITE_API_KEY no backend para buscar eventos reais.</p>
            </div>
          )}

          {/* Mobile ver tudo */}
          <div className="mt-8 text-center sm:hidden">
            <Link 
              to={"all-events"} 
              className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-xl font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Ver todos os eventos 
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

      </main>
    </Layout>
  );
}

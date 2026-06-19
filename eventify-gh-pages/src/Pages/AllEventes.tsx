import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Filter, ChevronDown, Sparkles, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../Components/Layout';
import { fetchEvents, EventData } from '../API/apiServices';
import { CATEGORIES, CITIES, DATES, MONTH_MAP } from '../Components/filterConstants';

const AllEventes = () => {
    const location = useLocation();
    const [events, setEvents] = useState<EventData[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState(location.state?.category || "Todos");
    const [searchQuery, setSearchQuery] = useState(location.state?.search || "");
    const [activeCity, setActiveCity] = useState(location.state?.city || "Todas as Cidades");
    const [showCityDropdown, setShowCityDropdown] = useState(false);
    const [activeDate, setActiveDate] = useState("Qualquer data");
    const [showDateDropdown, setShowDateDropdown] = useState(false);

    useEffect(() => {
        fetchEvents('eventos no Brasil', 'Brazil')
            .then(setEvents)
            .catch(() => setEvents([]))
            .finally(() => setLoading(false));
    }, []);

    const filteredEvents = events.filter(event => {
        const matchesCategory = activeCategory === "Todos" || event.category === activeCategory;
        const matchesCity = activeCity === "Todas as Cidades" || event.city === activeCity;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.city.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDate = activeDate === "Qualquer data" ||
            event.date.toLowerCase().includes(MONTH_MAP[activeDate]?.toLowerCase() || "");
        return matchesCategory && matchesCity && matchesSearch && matchesDate;
    });

    const hasActiveFilters = activeCategory !== "Todos" || searchQuery !== "" || activeCity !== "Todas as Cidades" || activeDate !== "Qualquer data";

    const clearFilters = () => {
        setActiveCategory("Todos");
        setSearchQuery("");
        setActiveCity("Todas as Cidades");
        setActiveDate("Qualquer data");
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500">
            <Layout variant="back" backTo="/">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
                <header className="mb-12">
                    {/* Title with gradient */}
                    <div className="relative mb-8">
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px]" />
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 relative">
                            Explorar{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                                Eventos
                            </span>
                        </h1>
                        <p className="text-gray-400 text-base sm:text-lg max-w-2xl">
                            Descubra os melhores eventos, workshops e festas acontecendo perto de você.
                        </p>
                    </div>

                    {/* Search + Filters */}
                    <div className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="flex-1 bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-2xl flex items-center gap-3 focus-within:border-purple-500/50 focus-within:shadow-[0_0_20px_rgba(168,85,247,0.08)] transition-all">
                                <Search className="ml-3 text-gray-400 shrink-0" size={20} />
                                <input
                                    type="text"
                                    placeholder="Buscar por nome, cidade..."
                                    className="bg-transparent border-none outline-none flex-1 py-3 text-sm text-white placeholder-gray-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery("")} className="mr-2 p-1 text-gray-500 hover:text-white transition-colors">
                                        <X size={16} />
                                    </button>
                                )}
                            </div>
                            <div className="flex flex-wrap gap-3">
                                <div className="relative">
                                    <button
                                        onClick={() => { setShowCityDropdown(!showCityDropdown); setShowDateDropdown(false); }}
                                        className={`h-full bg-black/40 backdrop-blur-md border ${activeCity !== "Todas as Cidades" ? 'border-purple-500/40' : 'border-white/10'} px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-white/5 transition-all whitespace-nowrap`}
                                    >
                                        <MapPin size={16} className={activeCity !== "Todas as Cidades" ? "text-purple-400" : "text-gray-400"} />
                                        <span className={activeCity !== "Todas as Cidades" ? "text-purple-400" : "text-gray-300"}>
                                            {activeCity === "Todas as Cidades" ? "Cidade" : activeCity}
                                        </span>
                                        <ChevronDown size={14} className={`text-gray-500 transition-transform ${showCityDropdown ? "rotate-180" : ""}`} />
                                    </button>

                                    {showCityDropdown && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setShowCityDropdown(false)} />
                                            <div className="absolute top-full left-0 mt-2 w-56 bg-[#141414] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 animate-scale-in">
                                                {CITIES.map(city => (
                                                    <button
                                                        key={city}
                                                        onClick={() => { setActiveCity(city); setShowCityDropdown(false); }}
                                                        className={`w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-white/5 ${activeCity === city ? 'bg-purple-600/20 text-purple-400 font-bold' : 'text-gray-300'}`}
                                                    >
                                                        {city}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="relative">
                                    <button
                                        onClick={() => { setShowDateDropdown(!showDateDropdown); setShowCityDropdown(false); }}
                                        className={`h-full bg-black/40 backdrop-blur-md border ${activeDate !== "Qualquer data" ? 'border-purple-500/40' : 'border-white/10'} px-5 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 hover:bg-white/5 transition-all whitespace-nowrap`}
                                    >
                                        <Calendar size={16} className={activeDate !== "Qualquer data" ? "text-purple-400" : "text-gray-400"} />
                                        <span className={activeDate !== "Qualquer data" ? "text-purple-400" : "text-gray-300"}>
                                            {activeDate === "Qualquer data" ? "Data" : activeDate}
                                        </span>
                                        <ChevronDown size={14} className={`text-gray-500 transition-transform ${showDateDropdown ? "rotate-180" : ""}`} />
                                    </button>

                                    {showDateDropdown && (
                                        <>
                                            <div className="fixed inset-0 z-40" onClick={() => setShowDateDropdown(false)} />
                                            <div className="absolute top-full right-0 mt-2 w-48 bg-[#141414] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden py-2 animate-scale-in">
                                                {DATES.map(date => (
                                                    <button
                                                        key={date}
                                                        onClick={() => { setActiveDate(date); setShowDateDropdown(false); }}
                                                        className={`w-full text-left px-5 py-2.5 text-sm transition-colors hover:bg-white/5 ${activeDate === date ? 'bg-purple-600/20 text-purple-400 font-bold' : 'text-gray-300'}`}
                                                    >
                                                        {date}
                                                    </button>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>

                                {hasActiveFilters && (
                                    <button
                                        onClick={clearFilters}
                                        className="px-5 py-3 rounded-2xl font-bold text-sm bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
                                    >
                                        <X size={14} />
                                        Limpar
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 border ${
                                        activeCategory === cat
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 border-transparent text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10 hover:text-gray-200'
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {/* Results count */}
                {!loading && (
                    <div className="flex items-center gap-2 mb-6 text-sm text-gray-500">
                        <Sparkles size={14} className="text-purple-400" />
                        <span>{filteredEvents.length} {filteredEvents.length === 1 ? 'evento encontrado' : 'eventos encontrados'}</span>
                    </div>
                )}

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                            <div key={i} className="bg-[#111] rounded-2xl overflow-hidden border border-white/5 animate-pulse">
                                <div className="h-44 bg-white/5" />
                                <div className="p-5 space-y-3">
                                    <div className="h-3 bg-white/5 rounded w-1/2" />
                                    <div className="h-5 bg-white/5 rounded w-3/4" />
                                    <div className="h-10 bg-white/5 rounded-xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredEvents.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {filteredEvents.map((event, index) => (
                            <div 
                                key={event.id} 
                                className="group bg-[#111] rounded-2xl overflow-hidden border border-white/5 hover:border-purple-500/40 transition-all duration-500 card-hover animate-fade-in-up"
                                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'both' }}
                            >
                                <Link to={`/event/${event.id}`}>
                                    <div className="relative h-44 overflow-hidden">
                                        <img 
                                            src={event.image} 
                                            alt={event.title} 
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                                            loading="lazy"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
                                        
                                        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/10">
                                            {event.category}
                                        </div>
                                        
                                        <div className="absolute bottom-3 right-3 bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 rounded-lg text-sm font-black shadow-xl shadow-purple-500/20">
                                            {event.price}
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <div className="flex items-center gap-2 text-purple-400 text-xs font-bold mb-2.5 uppercase tracking-tighter">
                                            <Calendar size={11} />
                                            <span>{event.date}</span>
                                            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                                            <MapPin size={11} className="text-gray-500" />
                                            <span className="text-gray-400 font-medium normal-case">{event.city}</span>
                                        </div>
                                        <h3 className="text-base font-black mb-3 group-hover:text-purple-400 transition-colors leading-snug line-clamp-2">
                                            {event.title}
                                        </h3>
                                        <div className="w-full py-3 bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 rounded-xl text-sm font-bold transition-all duration-300 text-center hover:shadow-lg hover:shadow-purple-500/20">
                                            Ver Detalhes
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="py-20 text-center flex flex-col items-center bg-[#111] rounded-2xl border border-white/5">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                            <Filter size={28} className="text-gray-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Nenhum evento encontrado</h3>
                        <p className="text-gray-500 text-sm mb-6 max-w-md">
                            Nenhum evento corresponde aos filtros selecionados. Tente ajustar sua busca.
                        </p>
                        <button
                            onClick={clearFilters}
                            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl font-bold text-sm hover:shadow-lg hover:shadow-purple-500/20 transition-all"
                        >
                            Limpar todos os filtros
                        </button>
                    </div>
                )}
            </main>
            </Layout>
        </div>
    );
};

export default AllEventes;

import React, { useState } from 'react';
import { Users, ArrowRight, X, Search, Globe, Plus } from 'lucide-react';
import Layout from '../Components/Layout';

const MOCK_COMMUNITIES = [
  {
    id: 1,
    name: "Amantes do Techno",
    members: "12.4k",
    description: "A maior comunidade de música eletrônica do Brasil. Fique por dentro dos melhores festivais e raves.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=400",
    tags: ["Música", "Festa", "Eletrônica"],
    color: "from-purple-600 to-pink-600",
  },
  {
    id: 2,
    name: "Devs Brasil",
    members: "45.1k",
    description: "Onde programadores se encontram. Eventos de tecnologia, hackathons e networking.",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400",
    tags: ["Tech", "Networking", "Carreira"],
    color: "from-blue-600 to-cyan-600",
  },
  {
    id: 3,
    name: "Gastronomia & Vinhos",
    members: "8.2k",
    description: "Para quem ama comer bem. Encontros em restaurantes, feiras e degustações exclusivas.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400",
    tags: ["Gastronomia", "Experiências"],
    color: "from-orange-600 to-red-600",
  },
  {
    id: 4,
    name: "Runners SP",
    members: "15.7k",
    description: "Corredores de São Paulo se unem aqui para treinos coletivos e maratonas.",
    image: "https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?auto=format&fit=crop&q=80&w=400",
    tags: ["Esportes", "Saúde", "Ar Livre"],
    color: "from-green-600 to-emerald-600",
  }
];

export default function Communities() {
  const [communities, setCommunities] = useState(MOCK_COMMUNITIES);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeCommunity, setActiveCommunity] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [newComm, setNewComm] = useState({ name: '', description: '', tags: '', image: '' });

  const filteredCommunities = communities.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateClick = () => setShowCreateModal(true);

  const handleJoinCommunity = (community: any) => setActiveCommunity(community);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCommunity = {
      id: communities.length + 1,
      name: newComm.name,
      members: "1 membro",
      description: newComm.description,
      image: newComm.image || "https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400",
      tags: newComm.tags.split(',').map(t => t.trim()).filter(Boolean),
      color: "from-purple-600 to-blue-600",
    };
    setCommunities([newCommunity, ...communities]);
    setShowCreateModal(false);
    setNewComm({ name: '', description: '', tags: '', image: '' });
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500">
      <Layout activeLink="comunidades">

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}
        <div className="relative mb-12">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />
          <div className="text-center max-w-3xl mx-auto relative">
            <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-6">
              <Users size={14} className="text-purple-400" />
              <span className="text-xs font-semibold text-gray-300">+80 mil membros ativos</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight mb-6">
              Junte-se à sua{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                tribo
              </span>.
            </h1>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Descubra grupos de pessoas apaixonadas pelos mesmos assuntos que você.
            </p>
          </div>
        </div>

        {/* Search + Create */}
        <div className="flex flex-col sm:flex-row gap-3 mb-10">
          <div className="flex-1 bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-2xl flex items-center gap-3 focus-within:border-purple-500/50 transition-all">
            <Search className="ml-3 text-gray-400 shrink-0" size={20} />
            <input
              type="text"
              placeholder="Buscar comunidades..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 py-3 text-sm text-white placeholder-gray-500"
            />
          </div>
          <button
            onClick={handleCreateClick}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/20"
          >
            <Plus size={18} />
            Criar Comunidade
          </button>
        </div>

        {/* Community Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredCommunities.map((community, i) => (
            <div 
              key={community.id} 
              className="group bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-white/5 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-500 card-hover flex flex-col sm:flex-row"
            >
              <div className="w-full sm:w-2/5 h-48 sm:h-auto relative overflow-hidden shrink-0">
                <img 
                  src={community.image} 
                  alt={community.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-[#141414] via-transparent to-transparent opacity-80" />
              </div>
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 relative z-10">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${community.color}`} />
                    <h3 className="text-xl font-black group-hover:text-purple-400 transition-colors leading-tight">
                      {community.name}
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {community.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {community.tags.map(tag => (
                      <span 
                        key={tag} 
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border bg-white/5 border-white/5 text-gray-300`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/5">
                  <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                    <Users size={15} className="text-purple-400" />
                    {community.members} membros
                  </div>
                  <button 
                    onClick={() => handleJoinCommunity(community)} 
                    className="flex items-center gap-2 bg-white/10 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 hover:shadow-lg"
                  >
                    Entrar <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-purple-900/40 to-blue-900/40 border border-white/10 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-noise pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
          <div className="relative z-10">
            <Globe size={40} className="text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-black mb-4">Não encontrou sua comunidade?</h2>
            <p className="text-gray-300 max-w-xl mx-auto mb-8 text-lg">
              Crie sua própria comunidade, reúna pessoas com os mesmos interesses e comece a organizar eventos incríveis.
            </p>
            <button 
              onClick={handleCreateClick} 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-xl shadow-purple-500/20 inline-flex items-center gap-2 hover:shadow-xl hover:shadow-purple-500/30"
            >
              <Plus size={18} />
              Criar Nova Comunidade
            </button>
          </div>
        </div>

      </main>

      </Layout>

      {/* Community Detail Modal */}
      {activeCommunity && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-[#141414] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative flex flex-col shadow-2xl">
            <button onClick={() => setActiveCommunity(null)} className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white hover:bg-black/80 transition-colors z-10">
              <X size={20} />
            </button>
            <div className="h-48 sm:h-56 relative shrink-0">
              <img src={activeCommunity.image} alt={activeCommunity.name} className="w-full h-full object-cover rounded-t-3xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] to-transparent" />
            </div>
            <div className="p-6 sm:p-8 -mt-12 relative z-10">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
                <h2 className="text-3xl font-black">{activeCommunity.name}</h2>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400 mb-6 mt-2">
                <span className="flex items-center gap-1.5"><Users size={15} className="text-purple-400" /> {activeCommunity.members}</span>
                <span className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full font-bold text-[10px] uppercase tracking-wider">Membro</span>
              </div>
              <p className="text-gray-300 mb-8">{activeCommunity.description}</p>
              <div className="space-y-4">
                <h3 className="font-bold border-b border-white/10 pb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
                  Últimas Publicações
                </h3>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center font-bold text-sm">A</div>
                    <div><p className="font-bold text-sm">Administrador</p><p className="text-xs text-gray-500">Há 2 horas</p></div>
                  </div>
                  <p className="text-gray-300 text-sm">Bem-vindos aos novos membros! Não esqueçam de conferir o próximo evento que estamos organizando.</p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full flex items-center justify-center font-bold text-sm">U</div>
                    <div><p className="font-bold text-sm">Usuário Ativo</p><p className="text-xs text-gray-500">Ontem</p></div>
                  </div>
                  <p className="text-gray-300 text-sm">Alguém tem indicação de lugar pra ficar próximo ao evento de semana que vem?</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Community Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in-up">
          <div className="bg-[#141414] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
            <button onClick={() => setShowCreateModal(false)} className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors">
              <X size={22} />
            </button>
            <h2 className="text-2xl font-black mb-6">Criar Comunidade</h2>
            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Nome da Comunidade</label>
                <input required type="text" value={newComm.name} onChange={e => setNewComm({...newComm, name: e.target.value})} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-all" 
                  placeholder="Ex: Desenvolvedores SP" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Descrição</label>
                <textarea required value={newComm.description} onChange={e => setNewComm({...newComm, description: e.target.value})} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-all h-24 resize-none" 
                  placeholder="Qual o propósito deste grupo?" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">Tags (separadas por vírgula)</label>
                <input required type="text" value={newComm.tags} onChange={e => setNewComm({...newComm, tags: e.target.value})} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-all" 
                  placeholder="Ex: Tech, Networking" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">URL da Imagem (Opcional)</label>
                <input type="url" value={newComm.image} onChange={e => setNewComm({...newComm, image: e.target.value})} 
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-purple-500 transition-all" 
                  placeholder="https://..." />
              </div>
              <button type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] mt-2 shadow-lg shadow-purple-500/20">
                Criar Comunidade
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

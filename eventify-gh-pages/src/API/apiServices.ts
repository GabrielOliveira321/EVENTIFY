// =============================================
// MOCK API — Todas as chamadas são locais
// =============================================

export interface PricingOption {
  type: 'camarote' | 'vip' | 'plateia';
  label: string;
  price: number;
  description: string;
}

export interface EventData {
  id: number;
  title: string;
  date: string;
  time: string;
  city: string;
  location: string;
  price: string;
  pricingOptions?: PricingOption[];
  category: string;
  image: string;
  description: string;
  url: string;
}

// ──────────────── Mock Events ────────────────

const MOCK_EVENTS: EventData[] = [
  {
    id: 1,
    title: 'Brazil JS Conference 2026',
    date: '15 Jul 2026',
    time: '09:00 - 18:00',
    city: 'São Paulo',
    location: 'Centro de Convenções Transamerica',
    price: 'R$ 250',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    description: 'A maior conferência de JavaScript do Brasil. Mais de 30 palestrantes internacionais, workshops hands-on e networking de alta qualidade. Venha conhecer as últimas tendências em desenvolvimento web.',
    url: 'https://braziljs.com',
    pricingOptions: [
      { type: 'plateia', label: 'Pista', price: 250, description: 'Acesso geral ao evento' },
      { type: 'camarote', label: 'Camarote', price: 500, description: 'Área elevada com open bar' },
      { type: 'vip', label: 'VIP', price: 900, description: 'Acesso backstage + kit exclusivo' },
    ],
  },
  {
    id: 2,
    title: 'Lollapalooza Brasil 2026',
    date: '28 Mar 2026',
    time: '14:00 - 23:00',
    city: 'São Paulo',
    location: 'Autódromo de Interlagos',
    price: 'R$ 650',
    category: 'Música',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    description: 'O maior festival de música da América Latina. Três dias de música, arte e gastronomia com atrações nacionais e internacionais.',
    url: 'https://lollapaloozabr.com',
    pricingOptions: [
      { type: 'plateia', label: 'Pista', price: 650, description: 'Acesso ao festival' },
      { type: 'camarote', label: 'Camarote', price: 1200, description: 'Área VIP com estrutura premium' },
      { type: 'vip', label: 'VIP Full', price: 2000, description: 'Acesso backstage e zona exclusiva' },
    ],
  },
  {
    id: 3,
    title: 'Summit de Gastronomia Brasileira',
    date: '10 Abr 2026',
    time: '11:00 - 22:00',
    city: 'Rio de Janeiro',
    location: 'Copacabana Palace',
    price: 'R$ 180',
    category: 'Gastronomia',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
    description: 'Um dia inteiro de experiências gastronômicas com chefs renomados. Degustações, workshops de culinária e painéis sobre tendências do setor.',
    url: 'https://gastronomia.com.br',
  },
  {
    id: 4,
    title: 'Bienal de Arte Contemporânea',
    date: '05 Set 2026',
    time: '10:00 - 20:00',
    city: 'São Paulo',
    location: 'Parque Ibirapuera',
    price: 'R$ 80',
    category: 'Arte',
    image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?w=800&q=80',
    description: 'A maior mostra de arte contemporânea do país. Instalações interativas, performances e exposições de artistas de todo o mundo.',
    url: 'https://bienal.com.br',
  },
  {
    id: 5,
    title: 'Design Week São Paulo',
    date: '20 Out 2026',
    time: '09:00 - 19:00',
    city: 'São Paulo',
    location: 'Bienal - pavilhão',
    price: 'R$ 120',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    description: 'Uma semana dedicada ao design brasileiro. Palestras, exposições e workshops com designers de referência nacional e internacional.',
    url: 'https://designweeksp.com',
  },
  {
    id: 6,
    title: 'Rock in Rio 2026',
    date: '18 Set 2026',
    time: '16:00 - 02:00',
    city: 'Rio de Janeiro',
    location: 'Parque da Cidade',
    price: 'R$ 450',
    category: 'Música',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    description: 'O maior festival de música do mundo retorna ao Rio de Janeiro. Atrações internacionais e nacionais em palcos temáticos.',
    url: 'https://rockinrio.com',
    pricingOptions: [
      { type: 'plateia', label: 'Pista', price: 450, description: 'Acesso geral' },
      { type: 'camarote', label: 'Camarote', price: 900, description: 'Área premium com vista privilegiada' },
      { type: 'vip', label: 'Lounge VIP', price: 1500, description: 'Experiência completa all-inclusive' },
    ],
  },
  {
    id: 7,
    title: 'Startup Weekend Florianópolis',
    date: '22 Nov 2026',
    time: '18:00 - 21:00',
    city: 'Florianópolis',
    location: 'SEBRAE SC',
    price: 'R$ 95',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    description: '54 horas para transformar sua ideia em startup. Mentoria, networking e pitch para investidores.',
    url: 'https://startupweekend.co',
  },
  {
    id: 8,
    title: 'Festival de Vino do Vale dos Vinhedos',
    date: '03 Abr 2026',
    time: '12:00 - 20:00',
    city: 'Bento Gonçalves',
    location: 'Vale dos Vinhedos',
    price: 'R$ 150',
    category: 'Gastronomia',
    image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=800&q=80',
    description: 'Deguste os melhores vinhos do sul do Brasil em meio à paisagem de montanhas e vinhedos. Harmonização, música ao vivo evisit as vinícolas.',
    url: 'https://valedosvinhedos.com',
  },
  {
    id: 9,
    title: 'Comic Con Experience São Paulo',
    date: '06 Dez 2026',
    time: '10:00 - 21:00',
    city: 'São Paulo',
    location: 'Expo Center Norte',
    price: 'R$ 200',
    category: 'Arte',
    image: 'https://images.unsplash.com/photo-1618336753974-aae8e04506aa?w=800&q=80',
    description: 'O maior evento de cultura pop da América Latina. quadrinhos, games, cinema, séries e muito cosplay.',
    url: 'https://ccxp.com.br',
  },
  {
    id: 10,
    title: 'Encontro Nacional de UX Design',
    date: '14 Ago 2026',
    time: '08:30 - 18:00',
    city: 'Curitiba',
    location: 'Centro Cultural Teatro Guaíra',
    price: 'R$ 160',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    description: 'Referência em experiência do usuário no Brasil. Palestrantes de empresas globais, workshops práticos e portfólio reviews.',
    url: 'https://enux.com.br',
  },
  {
    id: 11,
    title: 'Maratona de Código Recife',
    date: '30 Mai 2026',
    time: '08:00 - 20:00',
    city: 'Recife',
    location: 'Porto Digital',
    price: 'R$ 50',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80',
    description: '24 horas de programação intensa. Resolva desafios reais de empresas e ganhe prêmios incríveis.',
    url: 'https://maratonadecodigo.dev',
  },
  {
    id: 12,
    title: 'Feira de Artesanato de Belo Horizonte',
    date: '12 Jul 2026',
    time: '09:00 - 18:00',
    city: 'Belo Horizonte',
    location: 'Praça da Liberdade',
    price: 'Grátis',
    category: 'Arte',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
    description: 'Mais de 200 artistas expondo suas obras. Pintura, escultura, cerâmica, tecelagem e artesanato em geral.',
    url: 'https://feitinhobh.com.br',
  },
];

// ──────────────── Simulated delay ────────────────

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// ──────────────── Event APIs ────────────────

export const fetchEvents = async (query?: string, location?: string): Promise<EventData[]> => {
  await delay(400);

  let results = [...MOCK_EVENTS];

  if (query) {
    const q = query.toLowerCase();
    const matched = results.filter(
      e =>
        e.title.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q)
    );
    // Se a busca genérica (ex: "eventos") não encontrou nada específico,
    // retorna todos os eventos para simular resultado do provedor real
    if (matched.length > 0) {
      results = matched;
    }
  }

  if (location) {
    const loc = location.toLowerCase();
    const matched = results.filter(
      e => e.city.toLowerCase().includes(loc) || e.location.toLowerCase().includes(loc)
    );
    if (matched.length > 0) {
      results = matched;
    }
  }

  return results;
};

export const fetchEventById = async (id: string): Promise<EventData | null> => {
  await delay(300);
  return MOCK_EVENTS.find(e => e.id === Number(id)) ?? null;
};

// ──────────────── Auth APIs ────────────────

let mockToken = localStorage.getItem('token') || '';

export interface UserData {
  userEmail: string;
  password: string;
}

export interface CreateUserData {
  userName: string;
  userEmail: string;
  password: string;
}

export const sendUserData = async (data: UserData): Promise<{ access_token: string }> => {
  await delay(500);

  if (!data.userEmail || !data.password) {
    throw new Error('Email e senha são obrigatórios');
  }

  mockToken = `mock_jwt_token_${Date.now()}`;
  localStorage.setItem('token', mockToken);
  return { access_token: mockToken };
};

export const createUser = async (data: CreateUserData): Promise<{ message: string }> => {
  await delay(500);

  if (!data.userName || !data.userEmail || !data.password) {
    throw new Error('Todos os campos são obrigatórios');
  }

  return { message: 'Conta criada com sucesso!' };
};

// ──────────────── Profile APIs ────────────────

export interface ProfileData {
  firstName?: string;
  lastName?: string;
  cpf?: string;
  telefone?: string;
  dataNascimento?: string;
  cep?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  nomeCartao?: string;
  numeroCartao?: string;
  validadeCartao?: string;
}

const MOCK_PROFILE: ProfileData = {
  firstName: 'Gabriel',
  lastName: 'Oliveira',
  cpf: '123.456.789-00',
  telefone: '(11) 99999-0000',
  dataNascimento: '2000-05-15',
  cep: '01310-100',
  rua: 'Av. Paulista',
  numero: '1000',
  bairro: 'Bela Vista',
  cidade: 'São Paulo',
};

export const getProfile = async (): Promise<{ name: string; email: string } & ProfileData> => {
  await delay(300);

  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Não autenticado');
  }

  return {
    name: `${MOCK_PROFILE.firstName} ${MOCK_PROFILE.lastName}`,
    email: 'gabriel@eventify.com',
    ...MOCK_PROFILE,
  };
};

export const updateProfile = async (data: ProfileData): Promise<{ message: string }> => {
  await delay(500);
  Object.assign(MOCK_PROFILE, data);
  return { message: 'Perfil atualizado com sucesso!' };
};

// ──────────────── Purchase API ────────────────

export interface PurchaseData {
  eventId: number;
  eventTitle: string;
  ticketType: string;
  ticketName: string;
  quantity: number;
  totalPrice: number;
  paymentMethod: string;
  installments?: number;
  discountType?: string;
}

export const purchaseTicket = async (
  data: PurchaseData
): Promise<{ confirmationCode: string; userEmail: string }> => {
  await delay(1000);

  const code = `EVT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  return {
    confirmationCode: code,
    userEmail: 'gabriel@eventify.com',
  };
};

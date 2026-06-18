import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const EVENTBRITE_API_URL = 'https://www.eventbriteapi.com/v3';

export interface EventbriteEvent {
  id: string;
  name: { text: string; html: string };
  description: { text: string; html: string };
  start: { local: string; utc: string };
  end: { local: string; utc: string };
  logo: { original: { url: string } } | null;
  venue_id: string;
  category_id: string;
  url: string;
  status: string;
  currency: string;
  online_event: boolean;
}

export interface EventbriteVenue {
  id: string;
  name: string;
  address: {
    address_1: string;
    address_2: string;
    city: string;
    region: string;
    postal_code: string;
    country: string;
  };
}

export interface EventbriteCategory {
  id: string;
  name: string;
}

export interface PricingOption {
  type: 'camarote' | 'vip' | 'plateia';
  label: string;
  price: number;
  description: string;
}

export interface TransformedEvent {
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

const MOCK_EVENTS: TransformedEvent[] = [
  // ============ MÚSICA ============
  {
    id: 1,
    title: 'Festival de Música Eletrônica',
    date: '15 Ago',
    time: '20:00 - 04:00',
    city: 'São Paulo',
    location: 'Autódromo de Interlagos',
    price: 'R$ 80 - R$ 300',
    category: 'Música',
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=400',
    description: 'Maior festival de música eletrônica da América Latina.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 80, description: 'Área geral próxima ao palco.' },
      { type: 'vip', label: 'VIP', price: 180, description: 'Acesso prioritário e área exclusiva.' },
      { type: 'camarote', label: 'Camarote', price: 300, description: 'Camarote premium com open bar e vista privilegiada.' },
    ],
  },
  {
    id: 2,
    title: 'Rock in Rio 2026',
    date: '27 Set',
    time: '16:00 - 00:00',
    city: 'Rio de Janeiro',
    location: 'Parque da Chácara do Céu',
    price: 'R$ 200 - R$ 650',
    category: 'Música',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=400',
    description: 'O maior festival de música do mundo com atrações nacionais e internacionais.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 200, description: 'Cadeiras numeradas próximas ao palco.' },
      { type: 'vip', label: 'VIP', price: 400, description: 'Setor VIP com lounge e serviço de bar incluso.' },
      { type: 'camarote', label: 'Camarote', price: 650, description: 'Camarote luxo com open bar, food hall e vista frontal.' },
    ],
  },
  {
    id: 3,
    title: 'Festa Junina da Vila Madalena',
    date: '12 Jun',
    time: '18:00 - 23:00',
    city: 'São Paulo',
    location: 'Rua Aspicuelta, Vila Madalena',
    price: 'R$ 20 - R$ 80',
    category: 'Música',
    image: 'https://images.unsplash.com/photo-1528698827591-e19cef9a232c?auto=format&fit=crop&q=80&w=400',
    description: 'Celebração junina com forró, quadrilha, comidas típicas e quadrilha.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 20, description: 'Acesso à área geral da festa.' },
      { type: 'vip', label: 'VIP', price: 50, description: 'Área VIP com mesas e garçom.' },
      { type: 'camarote', label: 'Camarote', price: 80, description: 'Camarote com comidas típicas à vontade.' },
    ],
  },
  {
    id: 4,
    title: 'Sertanejo ao Vivo no Bar Brahma',
    date: '20 Jul',
    time: '21:00 - 01:00',
    city: 'Curitiba',
    location: 'Bar Brahma Centro',
    price: 'R$ 50 - R$ 180',
    category: 'Música',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=400',
    description: 'Noite de sertanejo com os melhores artistas da região.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 50, description: 'Acesso à pista em frente ao palco.' },
      { type: 'vip', label: 'VIP', price: 100, description: 'Área VIP com mesas reservadas.' },
      { type: 'camarote', label: 'Camarote', price: 180, description: 'Camarote com open bar e aperitivos.' },
    ],
  },
  {
    id: 5,
    title: 'Festival Jazz na Favela',
    date: '05 Abr',
    time: '19:00 - 23:00',
    city: 'Salvador',
    location: 'Morro do Pelourinho',
    price: 'R$ 35 - R$ 140',
    category: 'Música',
    image: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?auto=format&fit=crop&q=80&w=400',
    description: 'Festival de jazz com vista panorâmica da cidade.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 35, description: 'Assento na área central do evento.' },
      { type: 'vip', label: 'VIP', price: 80, description: 'Setor VIP com varanda e vista panorâmica.' },
      { type: 'camarote', label: 'Camarote', price: 140, description: 'Camarote com open bar e comida de boteco.' },
    ],
  },
  {
    id: 6,
    title: 'MPB no Parque',
    date: '28 Nov',
    time: '17:00 - 22:00',
    city: 'Porto Alegre',
    location: 'Parque da Redenção',
    price: 'Grátis',
    category: 'Música',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&q=80&w=400',
    description: 'Show de MPB ao ar livre com grandes nomes da música brasileira.',
    url: '#',
  },

  // ============ TECNOLOGIA ============
  {
    id: 7,
    title: 'Tech Conference 2026',
    date: '10 Set',
    time: '09:00 - 18:00',
    city: 'Rio de Janeiro',
    location: 'Centro de Convenções Rio',
    price: 'Grátis',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=400',
    description: 'A maior conferência de tecnologia do ano com talks sobre IA, cloud e dev.',
    url: '#',
  },
  {
    id: 8,
    title: 'Hackathon Startup Week',
    date: '18 Out',
    time: '08:00 - 20:00',
    city: 'São Paulo',
    location: 'Avanço Coworking, Pinheiros',
    price: 'Grátis',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400',
    description: '24 horas de hackathon para criar soluções inovadoras com mentoring.',
    url: '#',
  },
  {
    id: 9,
    title: 'Meetup React Brasil',
    date: '25 Jul',
    time: '19:00 - 22:00',
    city: 'Florianópolis',
    location: 'We Work, Centro',
    price: 'Grátis',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=400',
    description: 'Encontro mensal da comunidade React com talks e networking.',
    url: '#',
  },
  {
    id: 10,
    title: 'DevOps Summit Brasil',
    date: '03 Nov',
    time: '09:00 - 18:00',
    city: 'Belo Horizonte',
    location: 'Centro de Convenções UFMG',
    price: 'R$ 120 - R$ 400',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400',
    description: 'Workshop e talks sobre automação, CI/CD e infraestrutura moderna.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 120, description: 'Acesso a todas as palestras e coffee break.' },
      { type: 'vip', label: 'VIP', price: 250, description: 'VIP com almoço incluso e brindes exclusivos.' },
      { type: 'camarote', label: 'Camarote', price: 400, description: 'Camarote com workshop prático e mentoria individual.' },
    ],
  },
  {
    id: 11,
    title: 'Women in Tech Summit',
    date: '15 Mar',
    time: '09:00 - 17:00',
    city: 'Brasília',
    location: 'Centro de Convenções UFBRA',
    price: 'R$ 30 - R$ 120',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=400',
    description: 'Conferência celebrando mulheres na tecnologia com palestras e workshops.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 30, description: 'Ingresso social com acesso a palestras.' },
      { type: 'vip', label: 'VIP', price: 70, description: 'VIP com workshop e networking guiado.' },
      { type: 'camarote', label: 'Camarote', price: 120, description: 'Camarote com mentoria e kit exclusivo.' },
    ],
  },
  {
    id: 12,
    title: 'Code Conf BH',
    date: '08 Dez',
    time: '08:30 - 18:00',
    city: 'Belo Horizonte',
    location: 'PUC Minas',
    price: 'R$ 70 - R$ 250',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=400',
    description: 'Conferência de programação com foco em boas práticas e arquitetura.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 70, description: 'Acesso a todas as palestras.' },
      { type: 'vip', label: 'VIP', price: 150, description: 'VIP com almoço e camiseta do evento.' },
      { type: 'camarote', label: 'Camarote', price: 250, description: 'Camarote com workshop avançado e certificado.' },
    ],
  },

  // ============ GASTRONOMIA ============
  {
    id: 13,
    title: 'Feira Gastronômica',
    date: '22 Jul',
    time: '12:00 - 22:00',
    city: 'Belo Horizonte',
    location: 'Praça da Liberdade',
    price: 'Grátis',
    category: 'Gastronomia',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=400',
    description: 'Venha provar a melhor comida da cidade com pratos de chefs renomados.',
    url: '#',
  },
  {
    id: 14,
    title: 'Festival do Chocolate',
    date: '05 Jun',
    time: '11:00 - 21:00',
    city: 'São Paulo',
    location: 'Centro de Eventos São Paulo Expo',
    price: 'R$ 25 - R$ 100',
    category: 'Gastronomia',
    image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?auto=format&fit=crop&q=80&w=400',
    description: 'O maior festival de chocolate da América Latina com degustações e oficinas.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 25, description: 'Entrada com degustação básica.' },
      { type: 'vip', label: 'VIP', price: 60, description: 'VIP com degustação premium e workshop.' },
      { type: 'camarote', label: 'Camarote', price: 100, description: 'Camarote com degustação ilimitada e brindes.' },
    ],
  },
  {
    id: 15,
    title: 'Expo Pizza & Cerveja',
    date: '20 Set',
    time: '12:00 - 23:00',
    city: 'Porto Alegre',
    location: 'Assis Brasil, Centro',
    price: 'R$ 35 - R$ 140',
    category: 'Gastronomia',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=400',
    description: 'Combinação perfeita de artesanato cervejeiro e pizzarias premiadas.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 35, description: 'Acesso ao evento com 1 pizza + 1 chopp.' },
      { type: 'vip', label: 'VIP', price: 80, description: 'VIP com 3 pizzas + 3 chopps artesanais.' },
      { type: 'camarote', label: 'Camarote', price: 140, description: 'Camarote open food e open bar de cervejas especiais.' },
    ],
  },
  {
    id: 16,
    title: 'Workshop de Cozinha Japonesa',
    date: '14 Ago',
    time: '15:00 - 18:00',
    city: 'São Paulo',
    location: 'Liberdade, Centro',
    price: 'R$ 100 - R$ 350',
    category: 'Gastronomia',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=400',
    description: 'Aprenda a fazer sushi e ramen com chef japonês renomado.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 100, description: 'Workshop com ingredientes inclusos.' },
      { type: 'vip', label: 'VIP', price: 220, description: 'VIP com kit de ferramentas profissional.' },
      { type: 'camarote', label: 'Camarote', price: 350, description: 'Camarote com jantar harmonizado após o workshop.' },
    ],
  },
  {
    id: 17,
    title: 'Festival de Açaí',
    date: '10 Dez',
    time: '10:00 - 20:00',
    city: 'Manaus',
    location: 'Porto da Ceasa',
    price: 'Grátis',
    category: 'Gastronomia',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=400',
    description: 'Celebração do fruto amazônico com variedades e combinações únicas.',
    url: '#',
  },
  {
    id: 18,
    title: 'Brunch & Bubbles',
    date: '08 Set',
    time: '10:00 - 14:00',
    city: 'Recife',
    location: 'Marco Zero, Recife Antigo',
    price: 'R$ 70 - R$ 250',
    category: 'Gastronomia',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=400',
    description: 'Brunch sofisticado com champagnes e pratos autorais.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 70, description: 'Brunch com menu degustação.' },
      { type: 'vip', label: 'VIP', price: 150, description: 'VIP com espumante à vontade.' },
      { type: 'camarote', label: 'Camarote', price: 250, description: 'Camarote com menu especial e welcome drink.' },
    ],
  },

  // ============ ESPORTES ============
  {
    id: 19,
    title: 'Maratona de São Paulo',
    date: '07 Out',
    time: '06:00 - 13:00',
    city: 'São Paulo',
    location: 'Avenida Paulista',
    price: 'R$ 80 - R$ 300',
    category: 'Esportes',
    image: 'https://images.unsplash.com/photo-1461896836934-bd45ba8fcf9b?auto=format&fit=crop&q=80&w=400',
    description: 'A maior maratona da América Latina com percurso pela Avenida Paulista.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 80, description: 'Kit corredor básico e medalha de participação.' },
      { type: 'vip', label: 'VIP', price: 180, description: 'VIP com kit premium, massagem pós-prova e café da manhã.' },
      { type: 'camarote', label: 'Camarote', price: 300, description: 'Camarote com lounge, hidratação exclusiva e fotos profissionais.' },
    ],
  },
  {
    id: 20,
    title: 'Circuito de Surf em Floripa',
    date: '15 Jan',
    time: '08:00 - 16:00',
    city: 'Florianópolis',
    location: 'Praia da Joaquina',
    price: 'Grátis',
    category: 'Esportes',
    image: 'https://images.unsplash.com/photo-1502680390548-bdbac40a9b85?auto=format&fit=crop&q=80&w=400',
    description: 'Competição profissional de surf com praias icônicas de Floripa.',
    url: '#',
  },
  {
    id: 21,
    title: 'Corrida de Rua 10K',
    date: '23 Abr',
    time: '07:00 - 11:00',
    city: 'Curitiba',
    location: 'Bosque do Papa',
    price: 'R$ 50 - R$ 180',
    category: 'Esportes',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=400',
    description: 'Corrida ao ar livre por trilhas e parques de Curitiba.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 50, description: 'Inscrição com numeração de peito e medalha.' },
      { type: 'vip', label: 'VIP', price: 100, description: 'VIP com camiseta técnica e kit pós-prova.' },
      { type: 'camarote', label: 'Camarote', price: 180, description: 'Camarote com aquecimento guiado e massagem.' },
    ],
  },
  {
    id: 22,
    title: 'Campeonato de Vôlei de Praia',
    date: '12 Fev',
    time: '09:00 - 18:00',
    city: 'Rio de Janeiro',
    location: 'Arena Copacabana',
    price: 'Grátis',
    category: 'Esportes',
    image: 'https://images.unsplash.com/photo-1544117266-52a110150064?auto=format&fit=crop&q=80&w=400',
    description: 'Campeonato aberto de vôlei de praia com equipes de todo o país.',
    url: '#',
  },
  {
    id: 23,
    title: 'Trail Run Chapada dos Veadeiros',
    date: '20 Mar',
    time: '06:00 - 14:00',
    city: 'Alto Paraíso de Goiás',
    location: 'Chapada dos Veadeiros',
    price: 'R$ 120 - R$ 400',
    category: 'Esportes',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?auto=format&fit=crop&q=80&w=400',
    description: 'Corrida de trilhas pelo Parque Nacional da Chapada dos Veadeiros.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 120, description: 'Inscrição com seguro e medalha.' },
      { type: 'vip', label: 'VIP', price: 250, description: 'VIP com guia especializado e alimentação.' },
      { type: 'camarote', label: 'Camarote', price: 400, description: 'Camarote com transporte, hospedagem e fotos aéreas.' },
    ],
  },
  {
    id: 24,
    title: 'Torneio de Xadrez Aberto',
    date: '01 Nov',
    time: '09:00 - 18:00',
    city: 'São Paulo',
    location: 'Sesi Vila Mariana',
    price: 'R$ 30 - R$ 120',
    category: 'Esportes',
    image: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?auto=format&fit=crop&q=80&w=400',
    description: 'Torneio aberto com categorias para todas as idades e níveis.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 30, description: 'Inscrição básica com certificado.' },
      { type: 'vip', label: 'VIP', price: 70, description: 'VIP com coaching e análise de partidas.' },
      { type: 'camarote', label: 'Camarote', price: 120, description: 'Camarote com mesa profissional e brindes exclusivos.' },
    ],
  },

  // ============ ARTE & CULTURA ============
  {
    id: 25,
    title: 'Bienal de Arte de São Paulo',
    date: '20 Set',
    time: '10:00 - 20:00',
    city: 'São Paulo',
    location: 'Parque Ibirapuera',
    price: 'Grátis',
    category: 'Arte & Cultura',
    image: 'https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?auto=format&fit=crop&q=80&w=400',
    description: 'A bienal de arte mais importante da América Latina com artistas internacionais.',
    url: '#',
  },
  {
    id: 26,
    title: 'Feira de Artesanato de Ouro Preto',
    date: '03 Dez',
    time: '09:00 - 18:00',
    city: 'Ouro Preto',
    location: 'Praça Tiradentes',
    price: 'Grátis',
    category: 'Arte & Cultura',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400',
    description: 'Artesanato mineiro em um dos centros históricos mais bonitos do Brasil.',
    url: '#',
  },
  {
    id: 27,
    title: 'Noite de Cinema ao Ar Livre',
    date: '18 Nov',
    time: '19:00 - 23:00',
    city: 'Salvador',
    location: 'Farol da Barra',
    price: 'Grátis',
    category: 'Arte & Cultura',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=400',
    description: 'Sessão de cinema ao ar livre com filmes brasileiros e internacionais.',
    url: '#',
  },
  {
    id: 28,
    title: 'Exposição Fotográfica: Brasil Visível',
    date: '10 Set',
    time: '10:00 - 19:00',
    city: 'Brasília',
    location: 'CCBB Brasília',
    price: 'Grátis',
    category: 'Arte & Cultura',
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?auto=format&fit=crop&q=80&w=400',
    description: 'Mostra fotográfica com imagens inéditas dos 26 estados brasileiros.',
    url: '#',
  },
  {
    id: 29,
    title: 'Sarau Literário no Mercado',
    date: '22 Jun',
    time: '19:00 - 22:00',
    city: 'Recife',
    location: 'Mercado de São José',
    price: 'Grátis',
    category: 'Arte & Cultura',
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&q=80&w=400',
    description: 'Sarau com leituras, poesias e música no charmoso Mercado de São José.',
    url: '#',
  },
  {
    id: 30,
    title: 'Feira de HQs e Quadrinhos',
    date: '14 Jul',
    time: '10:00 - 20:00',
    city: 'São Paulo',
    location: 'Centro de Convenções São Paulo',
    price: 'R$ 20 - R$ 80',
    category: 'Arte & Cultura',
    image: 'https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?auto=format&fit=crop&q=80&w=400',
    description: 'Maior feira de quadrinhos do Brasil com artistas e colecionadores.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 20, description: 'Acesso à feira e exposições.' },
      { type: 'vip', label: 'VIP', price: 50, description: 'VIP com meet & greet com artistas e pôster exclusivo.' },
      { type: 'camarote', label: 'Camarote', price: 80, description: 'Camarote com sessão de autógrafos e brindes especiais.' },
    ],
  },

  // ============ NEGÓCIOS ============
  {
    id: 31,
    title: 'Startup Weekend BH',
    date: '25 Out',
    time: '18:00 - 21:00',
    city: 'Belo Horizonte',
    location: 'PUC Minas - Coração Eucarístico',
    price: 'R$ 50 - R$ 200',
    category: 'Negócios',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=400',
    description: '54 horas para construir uma startup do zero com mentoria de especialistas.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 50, description: 'Participação no evento e mentoria em grupo.' },
      { type: 'vip', label: 'VIP', price: 120, description: 'VIP com mentoria individual e materiais exclusivos.' },
      { type: 'camarote', label: 'Camarote', price: 200, description: 'Camarote com pitch para investidores e certificado premium.' },
    ],
  },
  {
    id: 32,
    title: 'Conferência de Empreendedorismo Feminino',
    date: '08 Mar',
    time: '09:00 - 18:00',
    city: 'São Paulo',
    location: 'Transamerica Expo Center',
    price: 'R$ 150 - R$ 500',
    category: 'Negócios',
    image: 'https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&q=80&w=400',
    description: 'Evento inspirador para mulheres empreendedoras com palestras e networking.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 150, description: 'Acesso a todas as palestras e coffee break.' },
      { type: 'vip', label: 'VIP', price: 300, description: 'VIP com almoço, brindes e rodada de networking.' },
      { type: 'camarote', label: 'Camarote', price: 500, description: 'Camarote com mentoria individual e acesso a grupos exclusivos.' },
    ],
  },
  {
    id: 33,
    title: 'Feira Franca de Negócios',
    date: '19 Abr',
    time: '10:00 - 18:00',
    city: 'Florianópolis',
    location: 'Centro de Eventos',
    price: 'Grátis',
    category: 'Negócios',
    image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=400',
    description: 'Maior feira B2B da região com empresas de tecnologia e serviços.',
    url: '#',
  },
  {
    id: 34,
    title: 'Imersão de Marketing Digital',
    date: '30 Nov',
    time: '09:00 - 17:00',
    city: 'Curitiba',
    location: 'WTC Curitiba',
    price: 'R$ 200 - R$ 650',
    category: 'Negócios',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=400',
    description: 'Workshop intensivo de marketing digital com experts do mercado.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 200, description: 'Workshop completo com material didático.' },
      { type: 'vip', label: 'VIP', price: 400, description: 'VIP com consultoria rápida e ferramentas exclusivas.' },
      { type: 'camarote', label: 'Camarote', price: 650, description: 'Camarote com plano de marketing personalizado e suporte de 30 dias.' },
    ],
  },

  // ============ GERAL / VARIEDADES ============
  {
    id: 35,
    title: 'Feira do Livro de Porto Alegre',
    date: '24 Set',
    time: '10:00 - 22:00',
    city: 'Porto Alegre',
    location: 'Caminho da Pedra, Centro Histórico',
    price: 'Grátis',
    category: 'Geral',
    image: 'https://images.unsplash.com/photo-1526243741027-444d633d7365?auto=format&fit=crop&q=80&w=400',
    description: 'A maior feira do livro do Brasil com lançamentos e autógrafos.',
    url: '#',
  },
  {
    id: 36,
    title: 'Expo Pet Brasil',
    date: '06 Out',
    time: '10:00 - 20:00',
    city: 'São Paulo',
    location: 'Pavilhão de Exposições do Anhembi',
    price: 'R$ 25 - R$ 100',
    category: 'Geral',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=400',
    description: 'A maior feira de animais do Brasil com raças, acessórios e shows.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 25, description: 'Acesso à feira e exposições.' },
      { type: 'vip', label: 'VIP', price: 60, description: 'VIP com sacolinha surpresa e área exclusiva.' },
      { type: 'camarote', label: 'Camarote', price: 100, description: 'Camarote com day care para o pet e fotos profissionais.' },
    ],
  },
  {
    id: 37,
    title: 'Carnaval de Rua de Olinda',
    date: '14 Fev',
    time: '14:00 - 23:00',
    city: 'Olinda',
    location: 'Centro Histórico de Olinda',
    price: 'Grátis',
    category: 'Geral',
    image: 'https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=400',
    description: 'O carnaval mais autêntico do Brasil com blocos tradicionais e trios elétricos.',
    url: '#',
  },
  {
    id: 38,
    title: 'Oktoberfest Blumenau',
    date: '03 Out',
    time: '12:00 - 01:00',
    city: 'Blumenau',
    location: 'Pavilhão da Oktoberfest',
    price: 'R$ 50 - R$ 180',
    category: 'Geral',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&q=80&w=400',
    description: 'A maior Oktoberfest da América Latina com cervejas e folclore alemão.',
    url: '#',
    pricingOptions: [
      { type: 'plateia', label: 'Plateia', price: 50, description: 'Acesso ao pavilhão com 1 caneca oficial.' },
      { type: 'vip', label: 'VIP', price: 100, description: 'VIP com mesas reservadas e open bar de chope.' },
      { type: 'camarote', label: 'Camarote', price: 180, description: 'Camarote com open bar, open food e caneca personalizada.' },
    ],
  },
  {
    id: 39,
    title: 'Natal Luz de Paraty',
    date: '15 Dez',
    time: '19:00 - 23:00',
    city: 'Paraty',
    location: 'Centro Histórico',
    price: 'Grátis',
    category: 'Geral',
    image: 'https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&q=80&w=400',
    description: 'Encenação do nascimento de Cristo nas ruas de pedra de Paraty.',
    url: '#',
  },
  {
    id: 40,
    title: 'Festival de Balões de Ouro Preto',
    date: '22 Jul',
    time: '07:00 - 12:00',
    city: 'Ouro Preto',
    location: 'Praça Tiradentes',
    price: 'Grátis',
    category: 'Geral',
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=400',
    description: 'Lançamento de balões coloridos sobre as igrejas barrocas.',
    url: '#',
  },
];

@Injectable()
export class EventsService {
  private readonly logger = new Logger(EventsService.name);
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('EVENTBRITE_API_KEY') || '';
  }

  private async fetchEventbrite<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${EVENTBRITE_API_URL}${endpoint}`);
    url.searchParams.set('token', this.apiKey);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      this.logger.error(`Eventbrite API error: ${response.status} ${response.statusText}`);
      throw new Error(`Eventbrite API error: ${response.status}`);
    }

    return response.json();
  }

  private formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${String(date.getDate()).padStart(2, '0')} ${months[date.getMonth()]}`;
  }

  private formatTime(startStr: string, endStr: string): string {
    const start = new Date(startStr);
    const end = new Date(endStr);
    const formatTime = (d: Date) => `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    return `${formatTime(start)} - ${formatTime(end)}`;
  }

  private formatPrice(event: EventbriteEvent): string {
    if (event.online_event) return 'Online';
    if (event.currency === 'BRL') return 'Grátis';
    return 'Verificar';
  }

  private async getVenue(venueId: string): Promise<EventbriteVenue | null> {
    try {
      return await this.fetchEventbrite<EventbriteVenue>(`/venues/${venueId}/`);
    } catch {
      return null;
    }
  }

  private async getCategory(categoryId: string): Promise<string> {
    try {
      const category = await this.fetchEventbrite<EventbriteCategory>(`/categories/${categoryId}/`);
      return category.name || 'Geral';
    } catch {
      return 'Geral';
    }
  }

  private transformEvent(event: EventbriteEvent, venue?: EventbriteVenue | null): TransformedEvent {
    return {
      id: parseInt(event.id.slice(-6), 10) || Math.floor(Math.random() * 1000000),
      title: event.name?.text || 'Sem título',
      date: this.formatDate(event.start?.local || event.start?.utc),
      time: this.formatTime(event.start?.utc, event.end?.utc),
      city: venue?.address?.city || 'Online',
      location: venue?.address?.address_1 || 'A definir',
      price: this.formatPrice(event),
      category: 'Geral',
      image: event.logo?.original?.url || 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=400',
      description: event.description?.text || 'Sem descrição disponível.',
      url: event.url || '',
    };
  }

  async searchEvents(query: string = 'eventos', location: string = 'Brazil'): Promise<TransformedEvent[]> {
    if (!this.apiKey) {
      this.logger.warn('EVENTBRITE_API_KEY not configured. Retornando eventos de mock.');
      return MOCK_EVENTS;
    }

    try {
      const data = await this.fetchEventbrite<{ events: EventbriteEvent[] }>('/events/search/', {
        'q': query,
        'location.address': location,
        'expand': 'venue,category',
        'sort_by': 'date',
        'status': 'live',
      });

      const events = data.events || [];

      const transformed = await Promise.all(
        events.slice(0, 20).map(async (event) => {
          let venue: EventbriteVenue | null = null;
          if (event.venue_id) {
            venue = await this.getVenue(event.venue_id);
          }
          return this.transformEvent(event, venue);
        })
      );

      return transformed;
    } catch (error) {
      this.logger.error('Error fetching events from Eventbrite', error);
      return [];
    }
  }

  async getEventById(id: string): Promise<TransformedEvent | null> {
    if (!this.apiKey) {
      this.logger.warn('EVENTBRITE_API_KEY not configured. Retornando evento de mock.');
      return MOCK_EVENTS.find(e => e.id === parseInt(id)) || MOCK_EVENTS[0];
    }

    try {
      const event = await this.fetchEventbrite<EventbriteEvent>(`/events/${id}/`, {
        'expand': 'venue,category',
      });

      let venue: EventbriteVenue | null = null;
      if (event.venue_id) {
        venue = await this.getVenue(event.venue_id);
      }

      return this.transformEvent(event, venue);
    } catch (error) {
      this.logger.error(`Error fetching event ${id} from Eventbrite`, error);
      return null;
    }
  }
}

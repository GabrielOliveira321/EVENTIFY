const BASE_URL = 'http://localhost:8080';

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

export const fetchEvents = async (query?: string, location?: string): Promise<EventData[]> => {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (location) params.set('location', location);

  const url = `${BASE_URL}/api/events${params.toString() ? `?${params.toString()}` : ''}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Erro ao buscar eventos');
  }

  return response.json();
};

export const fetchEventById = async (id: string): Promise<EventData | null> => {
  const response = await fetch(`${BASE_URL}/api/events/${id}`);

  if (!response.ok) {
    return null;
  }

  return response.json();
};

type ApiRequestInit<B = unknown> = Omit<RequestInit, 'body'> & {
    body?: B;
};

export const api = async <T = any, B = unknown>(
    url: string,
    options?: ApiRequestInit<B>
): Promise<T> => {
    const response = await fetch(`${BASE_URL}${url}`, {
        ...(options ?? {}),
        headers: {
            'Content-Type': 'application/json',
            ...(options?.headers ?? {})
        },
        body: options?.body !== undefined
            ? JSON.stringify(options.body)
            : undefined
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Erro na requisição');
    }
    return response.json();
};

export interface UserData {
    userEmail: string;
    password: string;
}

export interface CreateUserData {
    userName: string;
    userEmail: string;
    password: string;
}

export const sendUserData = (data: UserData) => {
    return api<any>('/api/authLogin/login', {
        method: 'POST',
        body: { email: data.userEmail, password: data.password }
    });
};

export const createUser = (data: CreateUserData) => {
    return api<any>('/api/authLogin/register', {
        method: 'POST',
        body: { name: data.userName, email: data.userEmail, password: data.password }
    });
};

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

const authHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem('token') ?? ''}`
});

export const getProfile = () => {
    return api<any>('/api/authLogin/perfil', {
        method: 'GET',
        headers: authHeader(),
    });
};

export const updateProfile = (data: ProfileData) => {
    return api<any>('/api/authLogin/perfil', {
        method: 'PUT',
        headers: authHeader(),
        body: data,
    });
};

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

export const purchaseTicket = (data: PurchaseData) => {
    return api<any>('/api/authLogin/comprar', {
        method: 'POST',
        headers: authHeader(),
        body: data,
    });
};
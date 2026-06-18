import React, { useState, useEffect } from 'react';
import { UserCircle, MapPin, CreditCard, Phone, Calendar, Save, Loader2, Mail, Pencil } from 'lucide-react';
import Layout from '../Components/Layout';
import { getProfile, updateProfile } from '../API/apiServices';

interface FormData {
    firstName: string;
    lastName: string;
    cpf: string;
    telefone: string;
    dataNascimento: string;
    cep: string;
    rua: string;
    numero: string;
    bairro: string;
    cidade: string;
    nomeCartao: string;
    numeroCartao: string;
    validadeCartao: string;
    cvv: string;
}

interface ProfileInfo {
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
}

function ProfileCard({ info, onEdit }: { info: ProfileInfo; onEdit: () => void }) {
    const displayName = info.firstName && info.lastName
        ? `${info.firstName} ${info.lastName}`
        : info.name;

    return (
        <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 card-hover">
            <div className="flex items-center gap-5">
                <div className="bg-gradient-to-tr from-purple-600 to-blue-500 p-4 rounded-2xl shrink-0 shadow-lg shadow-purple-500/20">
                    <UserCircle size={40} className="text-white" />
                </div>
                <div>
                    <h2 className="text-xl font-black">{displayName || '—'}</h2>
                    <div className="flex items-center gap-2 text-gray-400 text-sm mt-1">
                        <Mail size={14} />
                        <span>{info.email}</span>
                    </div>
                </div>
            </div>
            <button
                type="button"
                onClick={onEdit}
                className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all hover:border-purple-500/50 hover:shadow-lg"
            >
                <Pencil size={14} />
                Editar dados
            </button>
        </div>
    );
}

function SectionCard({ icon, title, children, color = 'purple' }: { icon: React.ReactNode; title: string; children: React.ReactNode; color?: string }) {
  const colorMap: Record<string, string> = {
    purple: 'text-purple-400',
    blue: 'text-blue-400',
    green: 'text-green-400',
  };
  return (
    <section className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-white/5 rounded-2xl p-6 card-hover">
      <div className="flex items-center gap-2 mb-6">
        <span className={colorMap[color] || 'text-purple-400'}>{icon}</span>
        <h2 className="font-bold text-lg">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function InputField({ label, name, value, onChange, placeholder, icon, maxLength, type = 'text' }: {
  label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; icon?: React.ReactNode; maxLength?: number; type?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{label}</label>
      <div className="relative group">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-400 transition-colors">
            {icon}
          </span>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/10 transition-all ${icon ? 'pl-10' : ''}`}
        />
      </div>
    </div>
  );
}

function EditProfileForm({
    formData, saved, error, onChange, onSubmit, onCancel,
}: {
    formData: FormData; saved: boolean; error: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent) => void; onCancel: () => void;
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-5 animate-fade-in-up">
            {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl flex items-center gap-2">
                    <span>⚠️</span> {error}
                </div>
            )}

            <SectionCard icon={<UserCircle size={18} />} title="Dados Pessoais">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="Nome" name="firstName" value={formData.firstName} onChange={onChange} placeholder="Gabriel" />
                    <InputField label="Sobrenome" name="lastName" value={formData.lastName} onChange={onChange} placeholder="Silva" />
                    <InputField label="CPF" name="cpf" value={formData.cpf} onChange={onChange} placeholder="000.000.000-00" maxLength={14} />
                    <InputField label="Telefone" name="telefone" value={formData.telefone} onChange={onChange} placeholder="(00) 90000-0000" maxLength={15} icon={<Phone size={16} />} />
                    <InputField label="Data de Nascimento" name="dataNascimento" value={formData.dataNascimento} onChange={onChange} type="date" icon={<Calendar size={16} />} />
                </div>
            </SectionCard>

            <SectionCard icon={<MapPin size={18} />} title="Endereço" color="blue">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField label="CEP" name="cep" value={formData.cep} onChange={onChange} placeholder="00000-000" maxLength={9} />
                    <InputField label="Cidade" name="cidade" value={formData.cidade} onChange={onChange} placeholder="São Paulo" />
                    <div className="md:col-span-2">
                      <InputField label="Rua" name="rua" value={formData.rua} onChange={onChange} placeholder="Av. Paulista" />
                    </div>
                    <InputField label="Número" name="numero" value={formData.numero} onChange={onChange} placeholder="1000" />
                    <InputField label="Bairro" name="bairro" value={formData.bairro} onChange={onChange} placeholder="Centro" />
                </div>
            </SectionCard>

            <SectionCard icon={<CreditCard size={18} />} title="Cartão de Crédito" color="green">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-4 py-3 mb-5 flex items-start gap-2">
                    <span className="text-yellow-400 shrink-0">⚠️</span>
                    <p className="text-xs text-yellow-400/80">Não insira dados reais de cartão em ambiente de desenvolvimento.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <InputField label="Nome no Cartão" name="nomeCartao" value={formData.nomeCartao} onChange={onChange} placeholder="GABRIEL SILVA" />
                    </div>
                    <div className="md:col-span-2">
                      <InputField label="Número do Cartão" name="numeroCartao" value={formData.numeroCartao} onChange={onChange} placeholder="0000 0000 0000 0000" maxLength={19} icon={<CreditCard size={16} />} />
                    </div>
                    <InputField label="Validade" name="validadeCartao" value={formData.validadeCartao} onChange={onChange} placeholder="MM/AA" maxLength={5} />
                    <InputField label="CVV" name="cvv" value={formData.cvv} onChange={onChange} placeholder="•••" maxLength={4} type="password" />
                </div>
            </SectionCard>

            <div className="flex gap-3 pt-2">
                <button type="button" onClick={onCancel}
                    className="flex-1 py-4 bg-white/5 hover:bg-white/10 font-bold rounded-2xl text-sm transition-all border border-white/5 hover:border-white/20">
                    Cancelar
                </button>
                <button type="submit"
                    className="flex-[2] flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/20">
                    <Save size={18} />
                    {saved ? 'Salvo com sucesso!' : 'Salvar Informações'}
                </button>
            </div>
        </form>
    );
}

export default function ProfilePage() {
    const [profileInfo, setProfileInfo] = useState<ProfileInfo>({ name: '', email: '' });
    const [formData, setFormData] = useState<FormData>({
        firstName: '', lastName: '', cpf: '', telefone: '', dataNascimento: '',
        cep: '', rua: '', numero: '', bairro: '', cidade: '',
        nomeCartao: '', numeroCartao: '', validadeCartao: '', cvv: '',
    });

    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        getProfile()
            .then(data => {
                setProfileInfo({ name: data.name, email: data.email, firstName: data.firstName, lastName: data.lastName });
                setFormData(prev => ({
                    ...prev,
                    firstName: data.firstName ?? '',
                    lastName: data.lastName ?? '',
                    cpf: data.cpf ?? '',
                    telefone: data.telefone ?? '',
                    dataNascimento: data.dataNascimento ?? '',
                    cep: data.cep ?? '',
                    rua: data.rua ?? '',
                    numero: data.numero ?? '',
                    bairro: data.bairro ?? '',
                    cidade: data.cidade ?? '',
                    nomeCartao: data.nomeCartao ?? '',
                    numeroCartao: data.numeroCartao ?? '',
                    validadeCartao: data.validadeCartao ?? '',
                }));
            })
            .catch(() => setError('Não foi possível carregar os dados do perfil.'))
            .finally(() => setLoading(false));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const { cvv, ...dataToSend } = formData;
            await updateProfile(dataToSend);
            setProfileInfo(prev => ({ ...prev, firstName: formData.firstName, lastName: formData.lastName }));
            setSaved(true);
            setTimeout(() => { setSaved(false); setEditing(false); }, 2000);
        } catch (err: any) {
            setError(err.message ?? 'Erro ao salvar. Tente novamente.');
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-purple-500">
            <Layout hideNavLinks>
            <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-blue-500 rounded-full" />
                    <h1 className="text-3xl font-black">Meu Perfil</h1>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20 text-gray-400 gap-3 bg-[#111] rounded-2xl border border-white/5">
                        <Loader2 size={24} className="animate-spin" />
                        <span>Carregando seus dados...</span>
                    </div>
                ) : (
                    <>
                        <ProfileCard info={profileInfo} onEdit={() => setEditing(true)} />
                        {editing && <EditProfileForm formData={formData} saved={saved} error={error} onChange={handleChange} onSubmit={handleSubmit} onCancel={() => setEditing(false)} />}
                    </>
                )}
            </main>
            </Layout>
        </div>
    );
}

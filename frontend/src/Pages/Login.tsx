import React, { useState, useEffect } from 'react';
import { Ticket, Mail, Lock, User, ArrowRight, Sparkles, Shield, Eye, EyeOff } from 'lucide-react';
import { FaChrome } from 'react-icons/fa';
import { createUser, sendUserData, UserData } from '../API/apiServices';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function AuthPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/';
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate(redirectTo, { replace: true });
        }
    }, [navigate, redirectTo]);

    const [inputValue, setInputValue] = useState({
        userName: "",
        userEmail: "",
        password: "",
    });

    const handlerIputValues = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inptName = e.target.name;
        const value = e.target.value;
        setInputValue((prev) => ({ ...prev, [inptName]: value }));
    }

    const handlerOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const userName = formData.get("userName");
        const userEmail = formData.get("userEmail");
        const password = formData.get("password");

        if (!userEmail || !password || (!isLogin && !userName)) {
            alert("Preencha todos os campos");
            return;
        }

        try {
            if (isLogin) {
                const result = await sendUserData({
                    userEmail: String(userEmail),
                    password: String(password)
                });
                if (result.access_token) {
                    localStorage.setItem("token", result.access_token);
                }
                navigate(redirectTo);
            } else {
                const result = await createUser({
                    userName: String(userName),
                    userEmail: String(userEmail),
                    password: String(password)
                });
                const loginResult = await sendUserData({
                    userEmail: String(userEmail),
                    password: String(password)
                });
                if (loginResult.access_token) {
                    localStorage.setItem("token", loginResult.access_token);
                }
                navigate(redirectTo);
            }
        } catch (err) {
            console.error("Erro:", err);
            alert("Erro na requisição");
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex overflow-hidden">

            {/* Left - Brand Side */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-950 via-[#0a0a1a] to-blue-950 p-16 flex-col justify-between relative">
                <div className="absolute inset-0 bg-noise pointer-events-none" />
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-600/15 rounded-full blur-[150px] animate-float" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] animate-float-slow" />

                {/* Decorative floating shapes */}
                <div className="absolute top-1/4 right-1/4 w-20 h-20 border border-purple-500/20 rounded-3xl rotate-12 animate-float" />
                <div className="absolute bottom-1/3 left-1/4 w-16 h-16 border border-blue-500/20 rounded-full animate-float-slow" />

                <div className="relative z-10 flex items-center gap-3">
                    <div className="bg-gradient-to-tr from-purple-600 to-blue-500 p-2.5 rounded-xl shadow-lg shadow-purple-500/20">
                        <Ticket size={24} className="text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tighter">EVENTIFY</span>
                </div>

                <div className="relative z-10 max-w-lg">
                    <div className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-1.5 mb-8">
                        <Sparkles size={14} className="text-purple-400" />
                        <span className="text-xs font-semibold text-gray-300">+50 mil pessoas conectadas</span>
                    </div>
                    <h2 className="text-5xl sm:text-6xl font-black leading-[1.05] mb-6">
                        A porta de entrada para <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                            novas histórias.
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Junte-se a milhares de pessoas que vivem experiências únicas todos os finais de semana.
                    </p>

                    <div className="mt-10 flex gap-6">
                        <div>
                            <p className="text-2xl font-black text-white">50k+</p>
                            <p className="text-xs text-gray-500">Usuários ativos</p>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-white">10k+</p>
                            <p className="text-xs text-gray-500">Eventos realizados</p>
                        </div>
                        <div>
                            <p className="text-2xl font-black text-white">98%</p>
                            <p className="text-xs text-gray-500">Satisfação</p>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex gap-4 text-sm text-gray-500 font-medium">
                    <span>© 2026 Eventify</span>
                    <span>•</span>
                    <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                    <span>•</span>
                    <a href="#" className="hover:text-white transition-colors">Termos</a>
                </div>
            </div>

            {/* Right - Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-8 relative">
                <div className="absolute inset-0 bg-noise pointer-events-none opacity-50" />
                <div className="w-full max-w-md relative z-10">

                    <div className="mb-10 text-center">
                        <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
                            <div className="bg-gradient-to-tr from-purple-600 to-blue-500 p-2 rounded-lg">
                                <Ticket size={20} className="text-white" />
                            </div>
                            <span className="text-xl font-black tracking-tighter">EVENTIFY</span>
                        </div>
                        <h1 className="text-3xl font-black mb-2">
                            {isLogin ? 'Bem-vindo de volta' : 'Criar sua conta'}
                        </h1>
                        <p className="text-gray-400">
                            {isLogin
                                ? 'Insira suas credenciais para acessar sua conta.'
                                : 'Preencha os dados abaixo para começar.'}
                        </p>
                    </div>

                    {/* Social login */}
                    <div className="mb-6">
                        <button className="w-full flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 py-4 rounded-2xl transition-all font-bold text-sm group hover:border-white/20">
                            <FaChrome size={20} className="group-hover:scale-110 transition-transform" />
                            Continuar com Google
                        </button>
                    </div>

                    <div className="relative mb-8 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/5"></div>
                        </div>
                        <span className="relative bg-[#0a0a0a] px-4 text-xs text-gray-500 uppercase tracking-widest">Ou continue com e-mail</span>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => handlerOnSubmit(e)}>
                        {!isLogin && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300 ml-1">Nome completo</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" size={20} />
                                    <input
                                        value={inputValue.userName}
                                        type="text"
                                        name="userName"
                                        placeholder="Seu nome"
                                        onChange={handlerIputValues}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300 ml-1">E-mail</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" size={20} />
                                <input
                                    value={inputValue.userEmail}
                                    type="email"
                                    name="userEmail"
                                    placeholder="exemplo@email.com"
                                    onChange={handlerIputValues}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-medium text-gray-300">Senha</label>
                                {isLogin && <a href="#" className="text-xs text-purple-400 hover:text-purple-300 transition-colors">Esqueceu a senha?</a>}
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-purple-500 transition-colors" size={20} />
                                <input
                                    value={inputValue.password}
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    placeholder="••••••••"
                                    onChange={handlerIputValues}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/10 transition-all"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 py-4 rounded-2xl font-bold text-base transition-all shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 mt-4 flex items-center justify-center gap-2 group">
                            {isLogin ? 'Entrar na conta' : 'Criar minha conta'}
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    <p className="text-center mt-8 text-gray-400 text-sm">
                        {isLogin ? 'Não tem uma conta?' : 'Já possui uma conta?'}{' '}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-white font-bold hover:underline underline-offset-4 transition"
                        >
                            {isLogin ? 'Cadastre-se grátis' : 'Fazer login'}
                        </button>
                    </p>

                    <div className="flex items-center justify-center gap-2 mt-8 text-gray-600 text-xs">
                        <Shield size={12} />
                        Seus dados estão seguros
                    </div>
                </div>
            </div>
        </div>
    );
}

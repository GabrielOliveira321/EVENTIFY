import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Ticket, ArrowLeft, UserCircle, LogOut, Sparkles, Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeContext';

type NavVariant = 'default' | 'back' | 'centered';

interface NavbarProps {
  variant?: NavVariant;
  activeLink?: 'eventos' | 'comunidades' | 'precos';
  backTo?: string;
  backLabel?: string;
  rightExtra?: React.ReactNode;
  hideNavLinks?: boolean;
  isLoggedIn?: boolean;
}

export default function Navbar({
  variant = 'default',
  activeLink,
  backTo,
  backLabel = 'Voltar',
  rightExtra,
  hideNavLinks = false,
  isLoggedIn,
}: NavbarProps) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const loggedIn = isLoggedIn ?? !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const linkClass = (link: string, active?: string) =>
    `relative text-sm font-semibold transition-all duration-200 ${
      link === active 
        ? 'text-[var(--text-primary)] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-purple-500 after:to-blue-500 after:rounded-full' 
        : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
    }`;

  const themeToggle = (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-full transition-all duration-300 hover:bg-[var(--overlay-medium)] hover:scale-110 active:scale-95"
      title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
    >
      {theme === 'dark' ? (
        <Sun size={18} className="text-yellow-400 hover:text-yellow-300 transition-colors" />
      ) : (
        <Moon size={18} className="text-slate-600 hover:text-slate-500 transition-colors" />
      )}
    </button>
  );

  const userMenu = loggedIn ? (
    <div className="flex items-center gap-2">
      <Link
        to="/profile"
        className="flex items-center gap-2 bg-[var(--overlay-medium)] hover:bg-[var(--overlay-medium)] text-[var(--text-primary)] px-4 py-2 rounded-full font-bold text-sm transition-all hover:shadow-lg border border-[var(--border-primary)]"
      >
        <UserCircle size={18} />
        <span className="hidden sm:inline">Perfil</span>
      </Link>
      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3.5 py-2 rounded-full font-bold text-xs transition-all hover:shadow-lg border border-red-500/10"
      >
        <LogOut size={15} />
        <span className="hidden sm:inline">Sair</span>
      </button>
    </div>
  ) : (
    <Link
      to="/login"
      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all active:scale-95 shadow-lg shadow-purple-500/20 flex items-center gap-2"
    >
      Começar agora
      <Sparkles size={14} />
    </Link>
  );

  const logo = (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="bg-gradient-to-tr from-purple-600 to-blue-500 p-2 rounded-lg group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300">
        <Ticket size={22} className="text-white" />
      </div>
      <Link to="/" className="text-xl font-black tracking-tighter text-[var(--text-primary)]">
        EVENTIFY
      </Link>
    </div>
  );

  const navLinks = !hideNavLinks && (
    <div className="hidden md:flex items-center gap-8">
      <Link to="/all-events" className={linkClass(activeLink, 'eventos')}>
        Eventos
      </Link>
      <Link to="/comunidades" className={linkClass(activeLink, 'comunidades')}>
        Comunidades
      </Link>
      <Link to="/precos" className={linkClass(activeLink, 'precos')}>
        Preços
      </Link>
    </div>
  );

  const backButton = backTo ? (
    <Link
      to={backTo}
      className="p-2.5 bg-[var(--overlay-light)] hover:bg-[var(--overlay-medium)] rounded-full transition-all duration-200 flex items-center gap-2 pr-4 hover:shadow-lg"
    >
      <ArrowLeft size={18} className="text-[var(--text-secondary)]" />
      <span className="text-sm font-bold hidden sm:block text-[var(--text-secondary)]">{backLabel}</span>
    </Link>
  ) : null;

  const commonClasses = "flex items-center justify-between px-4 sm:px-8 py-5 backdrop-blur-xl sticky top-0 z-[1000] border-b";
  const navStyle = {
    backgroundColor: 'var(--nav-bg)',
    borderColor: 'var(--nav-border)',
  };

  // Variant: 'default'
  if (variant === 'default') {
    return (
      <nav className={commonClasses} style={navStyle}>
        <div className="flex items-center gap-8">
          {logo}
          {navLinks}
        </div>
        <div className="flex items-center gap-1">
          {themeToggle}
          {userMenu}
        </div>
      </nav>
    );
  }

  // Variant: 'back'
  if (variant === 'back') {
    return (
      <nav className={commonClasses} style={navStyle}>
        <div className="flex items-center gap-4 sm:gap-6">
          {backButton}
          {logo}
        </div>
        <div className="flex items-center gap-1">
          {themeToggle}
          {userMenu}
        </div>
      </nav>
    );
  }

  // Variant: 'centered'
  return (
    <nav className={`${commonClasses} fixed top-0 w-full`} style={navStyle}>
      <div className="w-32">{backButton}</div>
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 group cursor-pointer">
        <div className="bg-gradient-to-tr from-purple-600 to-blue-500 p-2 rounded-lg group-hover:rotate-12 group-hover:shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300">
          <Ticket size={20} className="text-white" />
        </div>
        <Link to="/" className="text-lg font-black tracking-tighter hidden sm:block text-[var(--text-primary)]">
          EVENTIFY
        </Link>
      </div>
      <div className="flex items-center gap-1.5">
        {rightExtra}
        {themeToggle}
        {loggedIn && (
          <Link
            to="/profile"
            className="p-2.5 bg-[var(--overlay-light)] hover:bg-[var(--overlay-medium)] rounded-full transition-all hover:shadow-lg"
            title="Meu Perfil"
          >
            <UserCircle size={18} className="text-[var(--text-secondary)]" />
          </Link>
        )}
        {loggedIn && (
          <button
            onClick={handleLogout}
            className="p-2.5 bg-red-500/10 hover:bg-red-500/20 rounded-full transition-all"
            title="Sair"
          >
            <LogOut size={16} className="text-red-400" />
          </button>
        )}
      </div>
    </nav>
  );
}

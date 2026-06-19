import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'back' | 'centered';
  activeLink?: 'eventos' | 'comunidades' | 'precos';
  backTo?: string;
  backLabel?: string;
  rightExtra?: React.ReactNode;
  hideNavLinks?: boolean;
  isLoggedIn?: boolean;
}

export default function Layout({
  children,
  variant,
  activeLink,
  backTo,
  backLabel,
  rightExtra,
  hideNavLinks,
  isLoggedIn,
}: LayoutProps) {
  const navbarProps = {
    ...(variant && { variant }),
    ...(activeLink && { activeLink }),
    ...(backTo && { backTo }),
    ...(backLabel && { backLabel }),
    ...(rightExtra && { rightExtra }),
    ...(hideNavLinks !== undefined && { hideNavLinks }),
    ...(isLoggedIn !== undefined && { isLoggedIn }),
  };

  return (
    <>
      <Navbar {...navbarProps} />
      {children}
      <Footer />
    </>
  );
}

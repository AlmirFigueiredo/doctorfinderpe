import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import "../styles/globals.css"
import Navbar from '@/components/navbar/navbar'
import React from 'react'
import { AuthProvider } from '../context/authContext';


export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const noNavbarRoutes = ['/login', '/register']
  const showNavbar = !noNavbarRoutes.includes(router.pathname)
  

  return (
    <AuthProvider>
      {showNavbar && <Navbar />}
      <Component {...pageProps} />
    </AuthProvider>
  )
}
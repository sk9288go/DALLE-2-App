import React from 'react'
import Header from '../components/header.tsx'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header/>
      <Component {...pageProps} />
    </>
  )  
}
export default MyApp

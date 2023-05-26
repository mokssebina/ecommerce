import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import NProgress from "nprogress";
import Router from "next/router";
import Head from "next/head";
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as AuthProvider } from 'next-auth/client';
import PageLayout from '../components/PageLayout';
import { AuthContextProvider } from '../context/AuthContext';
//import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import { createTheme } from '@mui/material/styles';
import { AnimatePresence } from 'framer-motion'


// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
/*
const theme = createTheme({
  palette: {
     primary: {
        main: '#1976d2',
     },
  },
});
*/
const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps}) => {

/*
  NProgress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });
*/


  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}> 
     <AuthContextProvider>
      <Head>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css"
        integrity="sha512-42kB9yDlYiCEfx2xVwq0q7hT4uf26FUgSIZBK8uiaEnTdShXjwr8Ip1V4xGJMg3mHkUt9nNuTDxunHF0/EgxLQ=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />
      </Head>
       <Provider store={store}>
        <PageLayout>
          <ChakraProvider>
          <Component {...pageProps} />
          </ChakraProvider>  
        </PageLayout>
       </Provider>
     </AuthContextProvider>
    </AnimatePresence>  
  )
}

export default MyApp

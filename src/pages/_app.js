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

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, emotionCache = clientSideEmotionCache, pageProps}) => {

  NProgress.configure({ showSpinner: false });

  Router.events.on("routeChangeStart", () => {
    NProgress.start();
  });

  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
  });

  return (
    <CacheProvider value={emotionCache}>
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
      <ThemeProvider theme={theme}>  
       <Provider store={store}>
        <PageLayout>
          <ChakraProvider>
          <CssBaseline />  
          <Component {...pageProps} />
          </ChakraProvider>  
        </PageLayout>
       </Provider>
      </ThemeProvider>
     </AuthContextProvider>  
    </CacheProvider> 

  )
}

export default MyApp

import Head from "next/head";
import { Box } from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";
//import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>TriaHomes - One Stop Real Estate Solution</title>
      </Head>
      <Box maxWidth="1280px" m="auto">
        <header>
          {/*<Navbar />*/}
        </header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
      </Box>
    </>
  );
}
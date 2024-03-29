import { useState, useEffect, useContext, Fragment } from "react";
import SideBar from "./SideBar";
import TopBar from "./TopBar";
import Footer from "./Footer";
import { Transition } from "@headlessui/react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";



export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { user } = useContext(AuthContext)


  const goToTop = () => {
    window.scrollTo({
      top: 0, 
      behavior: 'smooth'
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  }

  /*
  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }
  

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);
  */
 
  return (
    <motion.div
    initial={{ x: 300, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 300, opacity: 0 }}
    transition={{
      type: "spring",
      stiffness: 260,
      damping: 20,
    }}>
     <>
      <div hidden={!showNav} onClick={()=> setShowNav(!showNav)} className="fixed w-screen h-screen bg-dark-disabled z-50 md:overflow-y-hidden lg:overflow-y-hidden xl:overflow-y-hidden"></div>
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <SideBar showNav={showNav} setShowNav={() => setShowNav(!showNav)} />
      </Transition>
      <TopBar showNav={showNav} setShowNav={setShowNav} />
      <main
        className={`relative mb-16 md:overflow-y-hidden lg:overflow-y-hidden xl:overflow-y-hidden`}
      >
        {children}
      </main>
      {/*<Footer goToTop={goToTop} />*/}
    </>
    </motion.div>
  );
}
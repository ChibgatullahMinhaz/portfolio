import { Outlet, useLocation } from "react-router";
import "./App.css";
import { Footer } from "./Components/Footer/Footer";
import { Navbar } from "./Components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { Atom } from "react-loading-indicators";
import { motion } from "framer-motion";
import ParticlesBackground from "./Components/ParticlesBackground";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Helmet } from "react-helmet";
import ScrollToTopButton from "./Components/ScrollToTopButton";

function App() {
  const [loading, setLoading] = useState(true);
  const [isRouteLoading, setIsRouteLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsRouteLoading(true);
    const timer = setTimeout(() => setIsRouteLoading(false), 200);
    return () => clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,     
    });
  }, []);
  return (
    < >
        <ScrollToTopButton />
      <Helmet>
        <title>Home - Chibgatullah Minhaz</title>
        <meta
          name="description"
          content="This is a portfolio website. This website is Chibgatullah Minhaz"
        />
        <link
          rel="shortcut icon"
          href="ch_favLogo.png"
          type="image/x-icon"
        />
      </Helmet>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <Atom
            color={["#00FFFF", "#B0E0E6", "#ADD8E6", "#FFFFFF"]}
            size="large"
            text="Loading..."
            textColor="#F8B90C"
          />
        </div>
      ) : (
        <>
          {/* <ParticlesBackground /> */}
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="sticky top-0 z-50"
          >
            <nav>
              <Navbar></Navbar>
            </nav>
          </motion.header>
          <main className="max-w-11/12 mx-auto min">
            {isRouteLoading && (
              <div className="flex items-center justify-center h-screen">
                <Atom
                  color={["#00FFFF", "#B0E0E6", "#ADD8E6", "#FFFFFF"]}
                  size="large"
                  text=""
                  textColor=""
                />
              </div>
            )}

            {!isRouteLoading && <Outlet></Outlet>}
          </main>
          <footer>
            <Footer></Footer>
          </footer>
        </>
      )}
    </>
  );
}

export default App;

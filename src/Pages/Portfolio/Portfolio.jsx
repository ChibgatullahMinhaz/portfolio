import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import "./portfolio.css";
import { toast } from "react-toastify";
import { Link } from "react-router";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export const Portfolio = () => {
  const [portfolio, setPortfolio] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true);
        const response = await fetch("./portfolio.json");
        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        toast.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPortfolio();
  }, []);
  return (
    <>
      <Helmet>
        <title>Portfolio - Chibgatullah Minhaz</title>
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

      {/* Portfolio Section */}
      <main>
        <section >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={1}
          >
           <div className="text-center my-5 space-y-4">
           <h1 className="text-center text-3xl text-shadow-2xs text-[#F8B90C] md:text-5xl">My Portfolio</h1>
           <h5 className="portfolio_sub_title">Recent work</h5>
           </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? "loading..."
              : portfolio.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="glary_image"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    custom={idx + 2}
                  >
                    <img src={item.img} alt={item.title} />
                    <h3>{item.title}</h3>
                    <div className="see_more">
                      <Link to={`/portfolio-details/${item.id}`}>
                        See more <i className="fa-solid fa-arrow-right"></i>
                      </Link>
                    </div>
                  </motion.div>
                ))}
          </div>
        </section>
      </main>
    </>
  );
};

import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import "./portfolio.css";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { Atom } from "react-loading-indicators";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [filteredPortfolio, setFilteredPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://portfolio-server-side-mu.vercel.app/projects/all"
        );
        const data = await response.json();
        setPortfolio(data);
        setFilteredPortfolio(data);
      } catch (error) {
        toast.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPortfolio();
  }, []);

useEffect(() => {
  const filtered = portfolio.filter((item) =>
    item?.remaining?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item?.techStack?.some((tec) =>
      tec.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  setFilteredPortfolio(filtered);
}, [searchQuery, portfolio]);

console.log(portfolio);
  return (
    <>
      <Helmet>
        <title>Portfolio - Chibgatullah Minhaz</title>
        <meta
          name="description"
          content="This is a portfolio website. This website is Chibgatullah Minhaz"
        />
        <link rel="shortcut icon" href="ch_favLogo.png" type="image/x-icon" />
      </Helmet>

      {/* Portfolio Section */}
      <main>
        <section>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            custom={1}
          >
            <div className="text-center my-5 space-y-4">
              <h1 className="text-center text-3xl text-shadow-2xs text-[#F8B90C] md:text-5xl">
                My Portfolio
              </h1>
              <h5 className="portfolio_sub_title">Recent work</h5>
              <input
                type="text"
                placeholder="Search by title & TeachStack......"
                className="search-input border p-2 rounded-md text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {loading ? (
              <div className="col-end-3 flex items-center justify-center">
                <Atom
                  color={["#00FFFF", "#B0E0E6", "#ADD8E6", "#FFFFFF"]}
                  size="large"
                  text="Loading..."
                  textColor="#F8B90C"
                />
              </div>
            ) : filteredPortfolio.length === 0 ? (
              <p className="text-center col-span-3 text-red-500">No results found.</p>
            ) : (
              filteredPortfolio.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glary_image"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={idx + 2}
                >
                  <img src={item?.screenshots[0]} alt={item.title} />
                  <h3>{item?.remaining?.title}</h3>
                  <div className="see_more">
                    <Link to={`/portfolio-details/${item._id}`}>
                      See more <i className="fa-solid fa-arrow-right"></i>
                    </Link>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
};

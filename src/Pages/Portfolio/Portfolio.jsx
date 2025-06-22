import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import "./portfolio.css";
import { toast } from "react-toastify";
import { Link } from "react-router";
import { Atom } from "react-loading-indicators";
import axios from "axios";

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
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [itemPerPage, setItemPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const loadTotalCount = async () => {
      const res = await axios.get(
        "https://portfolio-server-side-mu.vercel.app/projectsCount"
      );
      setTotalCount(res.data.count);
    };
    loadTotalCount();
  }, []);

  const totalPage = Math.ceil(totalCount / itemPerPage);
  const pages = [];
  for (let index = 0; index < totalPage; index++) {
    pages.push(index);
  }

  // load data by items and page and pagination with searching
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true);
        if (searchQuery) {
          const res = await axios.get(
            `https://portfolio-server-side-mu.vercel.app/searching?searchingquery=${searchQuery}&page=${currentPage}&skip=${itemPerPage}`
          );
          setPortfolio(res.data.result);
          console.log(res.data.result);
          setTotalCount(res.data.totalCount);
        } else {
          const response = await fetch(
            `https://portfolio-server-side-mu.vercel.app/projects/all?page=${currentPage}&skip=${itemPerPage}`
          );
          const data = await response.json();
          setPortfolio(data);
        }
      } catch (error) {
        toast.error("Error fetching portfolio data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPortfolio();
  }, [currentPage, itemPerPage, searchQuery]);

  // next
  const handleNext = () => {
    if (currentPage + 1 < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // prev
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleChangePerPageItems = (e) => {
    setItemPerPage(e.target.value);
    setCurrentPage(0);
  };
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
              {/* <h5 className="portfolio_sub_title">Total Projects {portfolio.length}</h5> */}
              <input
                type="text"
                placeholder="Search by title & TeachStack......"
                className="search-input border p-2 rounded-md text-white"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(0);
                }}
              />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 space-y-3">
            {loading ? (
              <div className="col-end-3 flex items-center justify-center">
                <Atom
                  color={["#00FFFF", "#B0E0E6", "#ADD8E6", "#FFFFFF"]}
                  size="large"
                  text="Loading..."
                  textColor="#F8B90C"
                />
              </div>
            ) : portfolio.length === 0 ? (
              <p className="text-center col-span-3 text-red-500">
                No results found.
              </p>
            ) : (
              portfolio.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glary_image self-start"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={idx + 2}
                >
                  <img
                    className="rounded-xl w-full"
                    src={item?.screenshots[0]}
                    alt={item.title}
                  />
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
        {/* pagination */}
        <div className="text-center mt-5 space-x-2">
          <button
            onClick={handlePrev}
            className="btn glass focus:outline-none focus:border-2 focus:border-blue-300"
          >
            Prev
          </button>
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page)}
              className={` p-3 rounded-lg cursor-pointer btn glass  ${
                page === currentPage ? "selected" : "bg-gray-800"
              }`}
              key={page}
            >
              {page}
            </button>
          ))}
          <button
            onClick={handleNext}
            className="btn glass cursor-pointer focus:outline-none focus:border-2 focus:border-gray-500"
          >
            Next
          </button>
          {/* select per item  */}
          <select name="options" onChange={handleChangePerPageItems}>
            <option className="bg-gray-900 text-white" value="6">
              6
            </option>
            <option className="bg-gray-900 text-white" value="10">
              10
            </option>
            <option className="bg-gray-900 text-white" value="15">
              15
            </option>
          </select>
        </div>
      </main>
    </>
  );
};

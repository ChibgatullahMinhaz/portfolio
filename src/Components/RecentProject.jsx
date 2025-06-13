import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Atom } from "react-loading-indicators";
import { Link } from "react-router";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};
const RecentProject = () => {
  const [isLoading, setLoading] = useState(true);
  const [Recent, setRecent] = useState([]);
  useEffect(() => {
    const loadRecentProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://portfolio-server-side-mu.vercel.app/projects/latest"
        );
        const data = await res.json();
        setRecent(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadRecentProjects();
  }, []);
  return (
    <div className="my-10 md:my-16">
      <h1 className="text-center font-bold text-4xl">Recent Work</h1>
      <Helmet>
        <title>Portfolio - Chibgatullah Minhaz</title>
        <meta
          name="description"
          content="This is a portfolio website. This website is Chibgatullah Minhaz"
        />
        <link rel="shortcut icon" href="ch_favLogo.png" type="image/x-icon" />
      </Helmet>

      {/* Portfolio Section */}
      <main className="my-16">
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
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              <div className="col-end-3 flex items-center justify-center">
                <Atom
                  color={["#00FFFF", "#B0E0E6", "#ADD8E6", "#FFFFFF"]}
                  size="large"
                  text="Loading..."
                  textColor="#F8B90C"
                />
              </div>
            ) : (
              Recent.map((item, idx) => (
                <motion.div
                  key={idx}
                  className="glary_image h-[300px]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  custom={idx + 2}
                >
                  <img className="rounded-xl" src={item?.screenshots[0]} alt={item.title} />
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
     <div className="flex justify-center">
         <Link to={`/Portfolio`} className="btn hireButtonDesign animate-bounce">
        See All Projects
      </Link>
     </div>
    </div>
  );
};

export default RecentProject;

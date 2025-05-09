import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { Atom } from "react-loading-indicators";

const ServiceSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setLoading(true);
      fetch('/service.json')
        .then((res) => res.json())
        .then((data) => {
          setServices(data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error('Error fetching services');
          setLoading(false);
        });
    } catch (error) {
      toast.error('Error fetching services');
    }
  }, []);

  const fadeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
  };

  return (
    <section className="mt-20 ">
      <div className="my-10">
        <h1 className="text-center font-extrabold text-4xl" data-aos="fade-right" data-aos-duration="2000">
          What I Do
        </h1>
        <h5 className="service_sub_title text-center" data-aos="fade-left" data-aos-duration="2000">
          My Services
        </h5>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
       

          <AnimatePresence>
          {services.map((service) => (
            <motion.div
              className="card bg-[#1c222a] hover:transition-all"
              key={service.title}
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              data-aos={service.aos || 'fade-up'}
              data-aos-duration={service.duration || '2000'}
            >
              <div className="sbox">
                <Link href="#">
                  <i className={service.icon}></i>
                </Link>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
                <div className="see_more">
                  <Link to="/contact">
                    Say Hello <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        


      </div>
    </section>
  );
};

export default ServiceSection;

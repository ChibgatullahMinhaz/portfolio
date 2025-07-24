import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Link } from "react-router";

const fadeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
};

const ContactSection = () => {
  const [contactLinks, setContactLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    try {
      setLoading(true);
      fetch("/contact.json")
        .then((res) => res.json())
        .then((data) => {
            setContactLinks(data);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Error fetching services:", error);
          setLoading(false);
        });
    } catch (error) {
      toast.error("Error fetching services:", error);
    }
  }, []);

  return (
    <section className="px-4 py-12">

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {contactLinks.map((contact, index) => (
          <motion.a
            key={contact.title}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block card box_border"
            variants={fadeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="cbox bg=[#1C222A] text-center p-6 rounded-xl shadow hover:shadow-xl transition">
              <i
                className={`${contact.icon} text-3xl text-indigo-500 mb-4`}
              ></i>
              <h3 className="mb-1 text-xl font-semibold">{contact.title}</h3>
              <p className="text-gray-600 line-clamp-1">{contact.sub}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;

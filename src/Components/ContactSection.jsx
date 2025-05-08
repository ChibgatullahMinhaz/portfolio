import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

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
      <div className="text-center mb-10">
        <h1
          className="text-4xl font-bold mb-2"
          data-aos="fade-right"
          data-aos-duration="2000"
        >
          Contact
        </h1>
        <h5
          className="text-lg text-gray-600"
          data-aos="fade-left"
          data-aos-duration="2000"
        >
          Are You Looking For Your Business Online Presence? I am here. 🙂
        </h5>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contactLinks.map((contact, index) => (
          <motion.a
            key={contact.title}
            href={contact.link}
            target="_blank"
            rel="noopener noreferrer"
            className="card box_border block"
            variants={fadeVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="cbox text-center p-6 rounded-xl shadow hover:shadow-xl transition">
              <i
                className={`${contact.icon} text-3xl text-indigo-500 mb-4`}
              ></i>
              <h3 className="text-xl font-semibold mb-1">{contact.title}</h3>
              <p className="text-gray-600">{contact.sub}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ContactSection;

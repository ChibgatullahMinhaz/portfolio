import { Helmet } from "react-helmet";
import React from "react";
import { motion } from "framer-motion";
import profile from "/profile1.png";
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

const AboutMeSection = () => {
  const skills = [
    "JavaScript",
    "React.js",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "Firebase",
    "Next Js",
    "BootStrap",
    "Framer-motion",
    "AOS",
    "Python",
    "Java",
    "Figma",
    "HTML",
    "CSS",
    "Git & GitHub",
    "TanStack Query"
  ];

  return (
    <>
      <Helmet>
        <title>About - Chibgatullah Minhaz</title>
        <meta
          name="description"
          content="This is a portfolio website. This website is Chibgatullah Minhaz"
        />
        <link rel="shortcut icon" href="ch_favLogo.png" type="image/x-icon" />
      </Helmet>
      <section className="container px-4 py-12 mx-auto text-center">
        <motion.h1
          className="mb-6 text-4xl font-bold"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          About Me
        </motion.h1>

        <motion.div
          className="flex flex-col items-center space-y-6"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={1}
        >
          {/* Profile Picture */}
          <motion.img
            src={profile}
            alt="Profile"
            className="object-cover w-40 h-40 border-4 border-yellow-400 rounded-full shadow-lg"
            variants={fadeInUp}
            custom={1.2}
          />

          {/* Short Bio */}
          <motion.p
            className="max-w-2xl text-lg text-gray-300"
            variants={fadeInUp}
            custom={1.4}
          >
            I'm Chibgatullah Minhaz, a passionate MERN-stack web developer
            specializing in the Front-End Development. I enjoy solving
            real-world problems through clean, scalable code and intuitive user
            experiences.
          </motion.p>
        </motion.div>

        {/* Skills */}
        <motion.div
          className="mt-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={1.6}
        >
          <h2 className="mb-4 text-2xl font-semibold text-yellow-400">
            My Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, idx) => (
              <motion.span
                key={idx}
                className="px-4 py-2 text-sm font-medium text-yellow-300 bg-gray-800 rounded-full"
                variants={fadeInUp}
                custom={1.8 + idx * 0.1}
                initial="hidden"
                animate="visible"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default AboutMeSection;

import { Helmet } from "react-helmet";
import React from "react";
import { motion } from "framer-motion";
import profile from '/profile1.png'
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

const AboutMe = () => {
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
  ];

  const education = [
    {
      degree: "Diploma in Computer Science",
      institution: "Habiganj Polytechnic Institute (HPI)",
      year: "2022 - Present",
    },
    {
      degree: "SSC in Science",
      institution: "Sukchari High School ",
      year: "2020 - 2022",
    }
    ,
    {
      degree: "Web Development Self Learning",
      institution: "Youtube, Documentations etc",
      year: "2022 - 2024",
    },
    {
      degree: "Web Development (Level 1)",
      institution: "Programming Hero",
      year: "2024-2025",
    },
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
      <section className="container mx-auto px-4 py-12 text-center">
        <motion.h1
          className="text-4xl font-bold mb-6"
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
            className="w-40 h-40 rounded-full object-cover border-4 border-yellow-400 shadow-lg"
            variants={fadeInUp}
            custom={1.2}
          />

          {/* Short Bio */}
          <motion.p
            className="max-w-2xl text-gray-300 text-lg"
            variants={fadeInUp}
            custom={1.4}
          >
            I'm Chibgatullah Minhaz, a passionate MERN-stack web developer
            specializing in the Front-End Development. I enjoy solving real-world problems
            through clean, scalable code and intuitive user experiences.
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
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400">
            My Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, idx) => (
              <motion.span
                key={idx}
                className="bg-gray-800 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium"
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

        {/* Education */}
        <motion.div
          className="mt-12 text-left"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          custom={2}
        >
          <h2 className="text-2xl font-semibold mb-4 text-yellow-400 text-center">
            Education & Qualifications
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {education.map((edu, idx) => (
              <motion.div
                key={idx}
                className="bg-gray-800 p-4 rounded-lg shadow"
                variants={fadeInUp}
                custom={2.2 + idx * 0.2}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <p className="text-gray-300">{edu.institution}</p>
                <p className="text-yellow-400">{edu.year}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default AboutMe;

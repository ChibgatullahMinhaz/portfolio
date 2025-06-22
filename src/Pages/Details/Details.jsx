import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import axios from "axios";

const Details = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://portfolio-server-side-mu.vercel.app/projects/get/${projectId}`
        );
        setProject(res.data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) return <p className="text-center py-10">Loading...</p>;
  if (!project)
    return <p className="text-center text-red-400 py-10">Project not found.</p>;

  const {
    remaining = {},
    screenshots = [],
    techStack = [],
    Feature = [],
  } = project;

  const {
    title,
    description,
    challenges,
    learnings,
    duration,
    githubLink,
    liveLink,
    role,
    githubLinkServer
  } = remaining;
  return (
    <>
      <Helmet>
        <title>{`${title || "Project"} - Project Details`}</title>
      </Helmet>
 <div className="flex justify-left mt-10">
         <Link to={-1} className="btn hireButtonDesign ">
        Go Back
      </Link>
     </div>
      <section className="max-w-11/12 mx-auto px-4 py-12 grid grid-cols-1  item-center justify-center gap-x-5">

        {/* Left: Screenshot & Title */}
        <div>
          {screenshots.length > 0 && (
            <motion.div
              className="flex justify-center mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <img
                src={screenshots[0]}
                alt="Project Screenshot"
                className="rounded-lg shadow-lg w-full max-w-3xl object-cover"
              />
            </motion.div>
          )}
          <motion.h1
            className="text-4xl font-bold text-center mb-6 text-yellow-400"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {title}
          </motion.h1>
        </div>

        {/* Right: Info and Buttons */}
        <div>
          <motion.div
            className="grid md:grid-cols-2 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Left Column */}
            <div className="space-y-4">
              <InfoItem
                label="Description"
                value={description || "Not Provided"}
              />
              <InfoItem label="Duration" value={duration || "N/A"} />
              <InfoItem
                label="Challenges"
                value={challenges || "Not Mentioned"}
              />
              <InfoItem
                label="Learnings"
                value={learnings || "Not Mentioned"}
              />
              <InfoItem label="Role" value={role || "N/A"} />
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <InfoItem
                label="Features"
                value={
                  Feature.filter(Boolean).length
                    ? Feature.map((f, i) => <li key={i}>{f}</li>)
                    : "Not listed"
                }
                isList
              />

              <InfoItem
                label="Tech Stack"
                value={
                  techStack.filter(Boolean).length
                    ? techStack.map((t, i) => (
                        <span
                          key={i}
                          className="inline-block bg-gray-800 text-yellow-400 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                        >
                          {t}
                        </span>
                      ))
                    : "Not listed"
                }
                isList
              />
            </div>
          </motion.div>
        </div>
        <div>
          {/* Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            {liveLink && (
              <Link
                to={liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow"
              >
                Live Site
              </Link>
            )}
            {githubLink && (
              <Link
                to={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded shadow"
              >
                GitHub Clint Repo
              </Link>
            )}
            {githubLinkServer && (
              <Link
                to={githubLinkServer}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded shadow"
              >
                GitHub Server Repo
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const InfoItem = ({ label, value, isList }) => (
  <div>
    <h3 className="text-lg font-semibold text-yellow-400">{label}</h3>
    <div className="text-gray-300 mt-1">
      {isList ? <ul className="list-disc pl-5">{value}</ul> : <p>{value}</p>}
    </div>
  </div>
);
export default Details;
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

const LottieComponent = () => {
  const [lotttieData, setLottieData] = useState(null);
  useEffect(() => {
    fetch("/lottie.json")
      .then((response) => response.json())
      .then((data) => {
        setLottieData(data);
      })
      .catch((error) =>
        console.error("Error loading Lottie animation:", error)
      );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="hidden sm:block max-w-full"
    >
      <Lottie animationData={lotttieData} loop={true} />
    </motion.div>
  );
};

export default LottieComponent;

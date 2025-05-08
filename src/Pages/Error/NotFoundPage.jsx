import { motion } from "framer-motion";
import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-base-100 text-base-content px-4">
      <motion.h1
        className="text-7xl font-bold text-error mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>

      <motion.p
        className="text-xl text-center max-w-md mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Link to="/" className="btn btn-primary">
          Go to Homepage
        </Link>
      </motion.div>
    </div>
  );
}

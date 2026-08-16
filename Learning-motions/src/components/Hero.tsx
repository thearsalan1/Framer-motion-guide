import { motion } from "framer-motion";

const Hero = () => {
  
  return (
    <section className="h-screen w-screen flex items-center flex-col gap-10 justify-evenly">
      <motion.h1
        className="text-7xl font-semibold text-teal-500"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0, ease: "easeOut" }}
      >
        Connect to your campus
      </motion.h1>
      <div className="flex items-center justify-center flex-col gap-2">
        <motion.p
          className="text-2xl font-sans text-teal-400"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          College verified social platform for students
        </motion.p>
        <motion.button
          className="px-3 py-2 text-xl bg-teal-500 hover:bg-teal-400 cursor-pointer"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default Hero;

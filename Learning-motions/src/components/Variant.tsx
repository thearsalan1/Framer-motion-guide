import { motion } from "framer-motion";

const Variant = () => {
  const headingVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <section className="h-screen w-screen flex items-center flex-col gap-10 justify-evenly">
      <motion.h1
        className="text-7xl font-semibold text-teal-500"
        variants={headingVariant}
        initial="hidden"
        animate="visible"
      >
        Connect to your campus
      </motion.h1>
      <div className="flex items-center justify-center flex-col gap-2">
        <motion.p
          className="text-2xl font-sans text-teal-400"
          variants={headingVariant}
          initial="hidden"
          animate="visible"
        >
          College verified social platform for students
        </motion.p>
        <motion.button
          className="px-3 py-2 text-xl bg-teal-500 hover:bg-teal-400 cursor-pointer"
          variants={headingVariant}
          initial="hidden"
          animate="visible"
        >
          Get Started
        </motion.button>
      </div>
    </section>
  );
};

export default Variant;

import { motion } from "framer-motion";

const Task = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <motion.button
        className="p-10 bg-teal-500 border-teal-300 rounded-2xl hover:bg-teal-600 cursor-pointer font-bold mr-10"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
      >
        Add
      </motion.button>
      <motion.button
        className="p-10 bg-teal-500 border-teal-300 rounded-2xl hover:bg-teal-600 cursor-pointer font-bold"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{
          type: "tween",
          duration: 0.2,
          ease: "easeOut",
        }}
      >
        Add
      </motion.button>
    </div>
  );
};

export default Task;

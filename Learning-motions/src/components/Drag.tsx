import { motion } from "framer-motion";
import { useRef } from "react";

const Drag = () => {
  const ref = useRef(null);
  return (
    <div ref={ref} className="w-full h-80 border-teal-950 border-2 bg-teal-500">
      <motion.div
        className="w-[100px] h-[100px] bg-green-200 rounded-2xl border-green-700"
        drag
        dragConstraints={ref}
        dragElastic={0.15}
        whileDrag={{ scale: 1.1, rotate: 50 }}
      ></motion.div>
    </div>
  );
};

export default Drag;

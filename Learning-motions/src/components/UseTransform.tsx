import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const UseTransform = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // scroll 0->1 ko opacity 0->1 mein map kiya
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // scroll 0->1 ko y position 100->0 mein map kiya (neeche se upar aayega)
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);

  return (
    <div
      ref={sectionRef}
      className="min-h-[1000px] flex items-center justify-center"
    >
      <motion.div style={{ opacity, y }} className="text-4xl font-bold">
        Scroll pe reveal hone wala content
      </motion.div>
    </div>
  );
};

export default UseTransform;

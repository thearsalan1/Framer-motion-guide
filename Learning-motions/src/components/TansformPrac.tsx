import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const TansformPrac = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  return (
    <div ref={sectionRef} className="min-h-screen flex flex-col items-center justify-center gap-10">
    </div>
  )
};

export default TansformPrac;

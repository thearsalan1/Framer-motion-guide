import { useRef } from "react";
import { motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <div className="w-screen bg-teal-200 flex flex-col items-center p-10">
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="w-full h-2 bg-white rounded-2xl fixed top-0 left-0 origin-left z-50"
      />
      <div className="min-h-[500px] flex items-center justify-center text-2xl">
        Scroll down to reach the tracked section
      </div>

      {/* Ye specific section hai jiska scroll track ho raha hai */}
      <div ref={sectionRef} className="min-h-[2000px] bg-teal-400 p-10">
        <p>
          Ye section ka apna scroll progress track ho raha hai — jab ye section
          viewport mein enter karega tabse progress bar 0 se start hoga, aur jab
          ye exit karega tab 1 pe pahunch jayega.
        </p>
        {/* baaki dummy text */}
      </div>

      <div className="min-h-[500px] flex items-center justify-center text-2xl">
        After the tracked section
      </div>
    </div>
  );
};

export default ScrollProgress;

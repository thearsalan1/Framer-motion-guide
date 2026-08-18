import { motion } from "framer-motion";
import { useState } from "react";

const LayoutId = () => {
  const [active, setActive] = useState("Overview");
  const tabs = ["Overview", "Features", "Pricing"];
  return (
    <div className="w-full gap-4 flex items-center justify-center">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={` relative border-2 border-teal-800 rounded-2xl p-3`}
          onClick={() => setActive(tab)}
        >
          {tab}
          {active === tab && (
            <motion.div
              layoutId="activeTabBg"
              className="absolute inset-0 bg-teal-500 rounded-full z-10"
            ></motion.div>
          )}
        </button>
      ))}
    </div>
  );
};

export default LayoutId;

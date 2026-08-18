import { motion } from "framer-motion";
import React, { useState } from "react";

const LayoutComponent = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <motion.div
      layout
      className="bg-teal-500 rounded-2xl p-4 cursor-pointer"
      style={{ width: isExpanded ? 400 : 200, height: isExpanded ? 400 : 200 }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <h2>Click to expand</h2>
      {isExpanded && (
        <p>Extra content which is visible when container is expanded</p>
      )}
    </motion.div>
  );
};

export default LayoutComponent;

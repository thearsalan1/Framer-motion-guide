import { motion } from "framer-motion";
import { useState } from "react";

function Tabs() {
  const [activeTab, setActiveTab] = useState("home");
  const tabs = ["home", "profile", "settings"];

  return (
    <div className="flex gap-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className="relative px-4 py-2"
        >
          {tab}
          {activeTab === tab && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-teal-500 rounded-full "
            />
          )}
        </button>
      ))}
    </div>
  );
}

export default Tabs;

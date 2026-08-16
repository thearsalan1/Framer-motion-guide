import { animate, motion } from "framer-motion";
import Card from "./Card";

const CardComponent = () => {
  const cards = [
    {
      id: 1,
      name: "Basic",
      desc: "This is the base plan",
    },
    {
      id: 2,
      name: "Pro",
      desc: "This is the pro plan",
    },
    {
      id: 3,
      name: "Premium",
      desc: "This is the premium plan",
    },
  ];

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren:0.3
      },
    },
  } as const;

  return (
    <motion.section
      className="w-screen h-screen p-10 flex flex-col items-center justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-[80%] h-125 rounded-2xl border border-teal-800 bg-teal-500 p-10">
        <h1 className="text-5xl text-center mb-5 font-bold">Our offers</h1>
        <Card items={cards}></Card>
      </div>
    </motion.section>
  );
};

export default CardComponent;

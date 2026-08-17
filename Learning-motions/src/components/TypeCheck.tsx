import { motion, spring } from "framer-motion";

const TypeCheck = () => {
  const cards = [
    {
      id: 1,
      title: "Card One",
      description: "This is the first card with some basic info.",
    },
    {
      id: 2,
      title: "Card Two",
      description: "This is the second card with more details.",
    },
    {
      id: 3,
      title: "Card Three",
      description: "This is the third card with extra content.",
    },
  ];

  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center p-10">
      <motion.h1
        className="text-4xl font-bold mb-4"
        animate={{ y: -30 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 50,
          mass: 2,
        }}
      >
        Welcome to Read Component
      </motion.h1>
      <p className="text-lg text-gray-600 mb-8 text-center w-[70%]">
        This is a simple component with a heading, a paragraph, and three
        horizontal cards displayed side by side.
      </p>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        Click me
      </motion.button>
      <motion.div
        drag
        dragTransition={{
          type: "inertia",
          bounceStiffness: 300,
          bounceDamping: 20,
        }}
      >
      inertia
      </motion.div>
      <div className="flex gap-6">
        {cards.map((card) => (
          <div
            key={card.id}
            className="p-6 border rounded-lg shadow-md w-[250px] bg-white"
          >
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TypeCheck;

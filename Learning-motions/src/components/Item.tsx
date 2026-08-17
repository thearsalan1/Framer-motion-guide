import { AnimatePresence, motion } from "framer-motion";

interface item {
  id: number;
  name: string;
}

interface items {
  items: item[];
  onRemove: (id: number) => void;
}

const Items = ({ items, onRemove }: items) => {
  return (
    <div className="w-full h-full flex  p-4  items-center justify-evenly">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="w-[200px] h-[200px] border-2xl bg-teal-700 border-teal-200 p-5 "
            initial={{opacity:0,scale:0.8}}
            animate={{opacity:1,scale:1}}
            exit={{opacity:0,scale:0.8}}
            transition={{duration:0.3}}
          >
            <p>{item.name}</p>
            <button
              className="text-white bg-red-500 p-2 rounded-2xl cursor-pointer"
              onClick={() => onRemove(item.id)}
            >
              Delete
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default Items;

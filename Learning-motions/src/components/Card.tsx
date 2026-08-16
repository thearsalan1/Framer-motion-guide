import { motion } from "framer-motion";

interface CardItem {
  id: number;
  name: string;
  desc: string;
}

interface CardsProps {
  items: CardItem[];
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};
const Card = ({ items }: CardsProps) => {
  return (
    <div className="flex items-center justify-between w-full mt-10">
      {items.map((item) => (
        <motion.div
          className="w-[300px] h-[300px] p-4 bg-teal-600 border border-teal-950 text-center rounded-2xl"
          variants={itemVariants}
          key={item.id}
        >
          <h1 className="font-semibold text-2xl mb-10">{item.name}</h1>
          <p className="text-xl font-semibold">{item.desc}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default Card;

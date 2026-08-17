import { useState } from "react";
import Items from "./item";

interface item {
  id: number;
  name: string;
}

const initialItems = [
  {
    id: 1,
    name: "This is first item",
  },
  {
    id: 2,
    name: "This is second item",
  },
];

const ToggleList = () => {
  const [isAdd, setIsAdd] = useState(false);
  const [name, setName] = useState("");
  const [items, setItems] = useState<item[]>(initialItems);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newItem = { id: Date.now(), name };
    setItems((prev) => [...prev, newItem]);
    setName("");
    setIsAdd(false);
  };

  const onRemove = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <>
      {isAdd && (
        <div className="w-[100px] p-5 ">
          <h1>Name</h1>
          <input
            type="text"
            placeholder="Enter data"
            className="rounded outline-0 border-none bg-teal-400 text-black"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button
            className="p-2 bg-green-500 text-black"
            onClick={handleCreate}
          >
            Create Item
          </button>
        </div>
      )}
      <div className="h-screen w-screen bg-teal-500 flex items-center justify-center flex-col">
        <h1 className="text-6xl font-semibold mb-10">Items List</h1>
        <Items items={items} onRemove={onRemove}></Items>
        <button onClick={() => setIsAdd((prev) => !prev)}>Add</button>
      </div>
    </>
  );
};

export default ToggleList;

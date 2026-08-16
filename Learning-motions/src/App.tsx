import CardComponent from "./components/CardComponent";
import Hero from "./components/Hero";
import Variant from "./components/variant";

const App = () => {
  return (
    <div className="h-full w-full bg-gray-700">
      <Hero></Hero>
      <Variant></Variant>
      <CardComponent></CardComponent>
    </div>
  );
};

export default App;

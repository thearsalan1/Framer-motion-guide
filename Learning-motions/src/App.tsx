import CardComponent from "./components/CardComponent";
import Hero from "./components/Hero";
import ScrollProgress from "./components/ScrollProgress";
import TansformPrac from "./components/TansformPrac";
import Task from "./components/Task";
import ToggleList from "./components/toggleList";
import TypeCheck from "./components/TypeCheck";
import UseTransform from "./components/UseTransform";
import Variant from "./components/Variant";

const App = () => {
  return (
    <div className="h-full w-full bg-gray-700">
      <Hero></Hero>
      <Variant></Variant>
      <CardComponent></CardComponent>
      <ToggleList></ToggleList>
      <TypeCheck></TypeCheck>
      <Task></Task>
      {/* <ScrollProgress></ScrollProgress> */}
      <UseTransform></UseTransform>
      <TansformPrac></TansformPrac>
    </div>
  );
};

export default App;

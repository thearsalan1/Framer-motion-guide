import CardComponent from "./components/CardComponent";
import Drag from "./components/Drag";
import Hero from "./components/Hero";
import LayoutComponent from "./components/LayoutComponent";
import LayoutId from "./components/LayoutId";
import ScrollProgress from "./components/ScrollProgress";
import Tabs from "./components/Tabs";
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
      <Drag></Drag>
      <LayoutComponent></LayoutComponent>
      <Tabs></Tabs>
      <LayoutId></LayoutId>
    </div>
  );
};

export default App;

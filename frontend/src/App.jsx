import "./index.css";
import "./App.css";
import CategorySelection from "./components/CategorySelection";

function App() {
  return (
    <div className="mt-16 p-5 text-center">
      <h1 className="mb-16 text-6xl md:text-7xl lg:text-8xl">
        Welcome to Hangman
      </h1>
      <CategorySelection />
    </div>
  );
}

export default App;

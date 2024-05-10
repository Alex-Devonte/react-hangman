import "./index.css";
import "./App.css";
import CategorySelection from "./components/CategorySelection";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Game from "./components/Game";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={CategorySelection} />
        <Route path="/game" Component={Game} />
      </Routes>
    </Router>
  );
}

export default App;

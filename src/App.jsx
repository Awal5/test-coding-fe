import "./App.css";

import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateTransaction from "./pages/CreateTransaction";

function App() {
  return (
    <HasRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/create" element={<CreateTransaction />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

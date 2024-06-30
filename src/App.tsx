import { Home, Mint } from "./pages";
import { Web3ModalProvider } from "./providers/Web3ModalProvider/Web3ModalProvider";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar } from "@/components";
import "../app/globals.css";

function App() {
  return (
    <>
      <Router>
        <Web3ModalProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<Mint />} />
          </Routes>
        </Web3ModalProvider>
      </Router>
    </>
  );
}

export default App;

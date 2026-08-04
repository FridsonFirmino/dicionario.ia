import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { useTheme } from "./hooks/useTheme";

function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [resetKey, setResetKey] = useState(0);

  const handleLogoClick = () => {
    setResetKey((key) => key + 1);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0b] text-zinc-800 dark:text-zinc-200 transition-colors duration-200">
      <Navbar theme={theme} onToggleTheme={toggleTheme} onLogoClick={handleLogoClick} />

      <Routes>
        <Route path="/" element={<Home key={resetKey} />} />
        <Route path="/sobre" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
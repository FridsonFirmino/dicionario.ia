import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { SettingsPanel } from "./components/settings/SettingsPanel";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { useTheme } from "./hooks/useTheme";
import { useSettings } from "./hooks/useSettings";

function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { language, setLanguage, area, setArea } = useSettings();
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
        <Route
          path="/"
          element={<Home key={resetKey} area={area} language={language} />}
        />
        <Route path="/sobre" element={<About />} />
      </Routes>

      <SettingsPanel
        language={language}
        area={area}
        onLanguageChange={setLanguage}
        onAreaChange={setArea}
      />
    </div>
  );
}

export default App;
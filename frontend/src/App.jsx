import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";
import Home from "./pages/Home";
import Results from "./pages/Results";

export const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const App = () => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("seekron-theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("seekron-theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("seekron-theme", "light");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;

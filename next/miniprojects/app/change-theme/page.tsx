import React from "react";
import useThemeChange from "./useThemeChange";
function page() {
  const [theme, setTheme] = useThemeChange("theme", "dark");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div>
      <p>Check current theme</p>
      <button onClick={toggleTheme}>change</button>
    </div>
  );
}

export default page;

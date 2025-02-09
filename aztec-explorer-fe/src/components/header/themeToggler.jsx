import { useEffect, useState } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
export const ThemeToggler = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("theme");
    if (storedMode === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div
      onClick={toggleDarkMode}
      className="button-orange border border-purpleOp50 !rounded-tl-[32px] !rounded-[5px] cursor-pointer "
    >
      {darkMode ? (
        <MdOutlineLightMode className=" -mr-2 mt-[1px] min-w-4 min-h-4 w-4 h-4" />
      ) : (
        <MdOutlineDarkMode className=" -mr-2 mt-[1px] min-w-4 min-h-4 w-4 h-4" />
      )}
    </div>
  );
};

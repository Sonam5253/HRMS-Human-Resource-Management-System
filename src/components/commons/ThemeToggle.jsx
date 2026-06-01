import { Sun, Moon } from "lucide-react";
import useTheme from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? <Sun /> : <Moon />}
    </button>
  );
}
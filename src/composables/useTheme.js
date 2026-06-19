import { ref } from "vue";

const STORAGE_KEY = "theme";
const DEFAULT_THEME = "light";

const normalizeTheme = (theme) => (theme === "dark" ? "dark" : "light");

const currentTheme = ref(DEFAULT_THEME);

const applyThemeClass = (theme) => {
  document.documentElement.classList.toggle("darkmode", theme === "dark");
  document.documentElement.classList.toggle("lightmode", theme === "light");
};

const setTheme = (theme) => {
  const normalizedTheme = normalizeTheme(theme);

  currentTheme.value = normalizedTheme;
  localStorage.setItem(STORAGE_KEY, normalizedTheme);
  applyThemeClass(normalizedTheme);
};

const initTheme = () => {
  setTheme(localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME);
};

const toggleTheme = () => {
  setTheme(currentTheme.value === "dark" ? "light" : "dark");
};

export function useTheme() {
  return {
    currentTheme,
    initTheme,
    setTheme,
    toggleTheme,
  };
}

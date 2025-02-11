import { useColorMode } from "@vueuse/core";

export const useTheme = () => {
  const colorMode = useColorMode();

  const toggleTheme = () => {
    colorMode.value = colorMode.value === "light" ? "dark" : "light";
  };

  return {
    colorMode,
    toggleTheme,
  };
};

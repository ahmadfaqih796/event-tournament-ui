export const useTheme = () => {
  const colorMode = useColorMode();

  const toggleTheme = () => {
    colorMode.preference = colorMode.value === "light" ? "dark" : "light";
  };

  return {
    colorMode,
    toggleTheme,
  };
};

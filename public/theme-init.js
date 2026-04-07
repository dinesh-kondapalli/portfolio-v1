(() => {
  try {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    root.classList.remove("light", "dark");
    if (stored === "light" || stored === "dark") {
      root.classList.add(stored);
    } else {
      root.classList.add("dark");
    }
  } catch {
    try {
      document.documentElement.classList.add("dark");
    } catch {
      /* ignore */
    }
  }
})();

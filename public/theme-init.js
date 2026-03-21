(() => {
  try {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      document.documentElement.classList.toggle("dark", media.matches);
    };
    sync();
    media.addEventListener("change", sync);
  } catch {
    /* ignore */
  }
})();

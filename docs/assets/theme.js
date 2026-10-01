(() => {
  const root = document.documentElement;
  const toggle = document.getElementById("theme-toggle");
  const label = document.getElementById("theme-label");
  let theme = "dark";
  try {
    const saved = localStorage.getItem("persianyar-theme");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch {}
  apply(theme);

  toggle?.addEventListener("click", () => {
    theme = theme === "dark" ? "light" : "dark";
    apply(theme);
    try { localStorage.setItem("persianyar-theme", theme); } catch {}
  });

  function apply(value) {
    root.dataset.theme = value;
    toggle?.setAttribute("aria-pressed", String(value === "dark"));
    if (label) label.textContent = value === "dark" ? "پوستهٔ روشن" : "پوستهٔ تیره";
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", value === "dark" ? "#09090b" : "#f5f4f1");
  }
})();

(() => {
  const title = "Monthly Design Subscription";

  const updateTitle = () => {
    const heading = document.querySelector("h1.hero-title");
    if (!heading) return false;

    if (heading.textContent !== title) heading.textContent = title;
    return true;
  };

  if (updateTitle()) return;

  const observer = new MutationObserver(() => {
    if (updateTitle()) observer.disconnect();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();

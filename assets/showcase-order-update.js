(() => {
  const leadAlts = [
    "Vectrro trucking operations website design",
    "Cooragent landing page",
    "Cooragent agent market interface",
    "Vectrro trucking operations website",
  ];

  const reorderShowcase = () => {
    const tiles = [...document.querySelectorAll("button.showcase-tile")];
    if (tiles.length !== 36) return false;

    const cycleGroups = Array.from({ length: 3 }, (_, cycle) =>
      tiles.slice(cycle * 12, (cycle + 1) * 12),
    );

    for (const cycleTiles of cycleGroups) {
      const orderedLead = leadAlts.map((alt) =>
        cycleTiles.find((tile) => tile.querySelector(`img[alt="${alt}"]`)),
      );

      if (orderedLead.some((tile) => !tile)) return false;

      const remaining = cycleTiles.filter((tile) => !orderedLead.includes(tile));
      const track = cycleTiles[0].parentElement;
      if (!track) return false;
      const fragment = document.createDocumentFragment();
      [...orderedLead, ...remaining].forEach((tile) => fragment.appendChild(tile));
      track.appendChild(fragment);
    }

    const track = tiles[0].parentElement;
    const firstTile = track?.querySelector("button.showcase-tile");
    if (track && firstTile instanceof HTMLElement) {
      const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 12;
      const leadPosition = (firstTile.offsetWidth + gap) * 12;
      const previousScrollBehavior = track.style.scrollBehavior;

      track.style.overflowAnchor = "none";
      track.style.scrollBehavior = "auto";
      track.scrollLeft = leadPosition;

      requestAnimationFrame(() => {
        track.scrollLeft = leadPosition;
        requestAnimationFrame(() => {
          track.scrollLeft = leadPosition;
          track.style.scrollBehavior = previousScrollBehavior;
        });
      });
    }

    return true;
  };

  if (reorderShowcase()) return;

  const observer = new MutationObserver(() => {
    if (reorderShowcase()) observer.disconnect();
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();

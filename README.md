# BrewPot — focused October 12 release

This source branch preserves the visual design deployed at `846f472` and publishes three requested content changes: remove fixed meeting counts, show Pause anytime on Standard and Pro with a short FAQ, and remove the Agent document's translation-process note.

The UI comes from recovered source `400f69c`. The already deployed calendar assets are retained byte for byte under `public/assets`; do not add a second calendar component. The safe dependency lock and build configuration come from the canonical source repair branch. Earlier typography, image and layout changes from that branch are outside this release.

Use Node 22.19+, npm and Python 3.9+. Install with `npm ci`, run `npm run typecheck`, then `npm run build` and `npm run test:build`. The build regenerates Agent HTML/Markdown/text from `content/for-agents.md`, and produces a GitHub Pages artifact in `dist/` with a provenance manifest and checksums. Commit source and generated public Agent files before creating the final release artifact.

The general editable source remains `brewpot-agent-source-20260921`, branch `codex/source-health-20261012`; the same content changes are synchronized there. This branch is the narrowly scoped production source for this release.

Hosting is GitHub Pages on `gh-pages`, domain `brewpot.co`. Publication is separate from building. Verify the generated artifact, focused browser behavior and remote production head before publishing. Preserve existing production assets so previously loaded pages can finish using them.

**Comparison target**

- Original Footer implementation: `git show HEAD:src/components/Footer.tsx`.
- User-reported overdesigned state: `/var/folders/tp/_f0n5bf51j32b29jxjgp687r0000gn/T/codex-clipboard-1ce2e13e-75fe-40e3-b0f9-6b512e412f82.png`.
- Final desktop capture: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/footer-simple-desktop.png`.
- Final mobile capture: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/footer-simple-mobile.png`.
- Desktop viewport: 1597 × 985 CSS px at device scale 1. Mobile viewport: 390 × 844 CSS px at device scale 1.

**Content fidelity**

- The Footer contains only the two social links and the copyright line present in the original component.
- The original X destination (`https://x.com/yatingzhao_ux`) and LinkedIn destination are retained.
- Added CTA headline, booking copy, booking button, benefits, logo, Product links, Company links, tagline, and decorative wave have all been removed.
- No new claims, routes, or conversion content remain.

**Visual and responsive checks**

- Footer is a full-width, edge-to-edge near-black band with a subtle top divider and no floating container or rounded outer corners.
- Desktop height is 101 px; the inner content uses the existing 1180 px site container.
- Mobile height is 134.5 px; content stacks cleanly with 24 px side padding.
- Desktop and mobile each render exactly two links and the original copyright text.
- Horizontal overflow is zero at both 1597 px and 390 px widths.
- TypeScript lint and production build both pass.

**Comparison history**

- Pass 1 introduced a large closing CTA, decorative ribbon, logo, navigation groups, benefits, and tagline that did not exist in the original Footer.
- Pass 2 removed the ribbon but still retained invented content and remained unnecessarily tall.
- Final pass restores the original content scope while applying only the requested black, edge-to-edge visual treatment.

No actionable P0, P1, or P2 issues remain.

final result: passed

---

## Hero laptop edge fade — 2026-08-14

**Source visual truth**

- Original 2560 × 1440 Hero capture before the fade: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-ultrawide-chrome-2560-final.jpg`.
- User direction: preserve the current laptop decoration and layout, but replace its hard inner/bottom termination with a gradual transparent fade.

**Implementation evidence**

- Chrome 1440 × 900: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-keyboard-fade-1440-final.png`.
- Chrome 2560 × 1440: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-keyboard-fade-2560-final.png`.
- Full-view before/after comparison: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-keyboard-fade-comparison.png`.
- Focused laptop comparison: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-keyboard-fade-detail-comparison.png`.
- Source and 2560px implementation are both 2560 × 1440 pixels at a matching 2560 × 1440 CSS viewport and device scale factor 1; no density normalization was required.

**Findings and fixes**

- Earlier [P2]: the laptop asset ended with a comparatively firm diagonal/bottom edge against the cream page, making the left decoration feel more like a cropped rectangle than an object entering the scene.
- Fix: added a transparent radial alpha mask anchored at the laptop's top-left corner. The keyboard stays sharp while the inner and lower chassis gradually dissolve into the existing page background; no white overlay or asset recoloring is used.
- Iteration [P2]: a stronger mask looked balanced at 2560px but removed too much of the laptop at 1440px, leaving a ghost-like fragment.
- Post-fix: the mask was relaxed to preserve the laptop silhouette at 1440px while still softening the inner and lower termination at 2560px.

**Required fidelity surfaces**

- Fonts and typography: unchanged.
- Spacing and layout rhythm: unchanged; laptop dimensions, crop, positioning, Hero copy, CTA, and card mosaic retain the previous geometry.
- Colors and visual tokens: unchanged. The fade is an alpha mask and introduces no white gradient layer or new color.
- Image quality and asset fidelity: the original high-resolution laptop asset remains in use. The mask preserves the sharp keyboard area and native shadow without stretching or raster substitution.
- Copy and content: unchanged.

**Primary interactions and runtime checks**

- Navigation, Hero CTA, responsive card mosaic, logo strip, and Pricing transition remain unchanged.
- The existing mobile breakpoint continues to hide both decorative desk objects together.
- Chrome renders the fade at 1440 and 2560 without layout overflow or a visible rectangular overlay.
- The browser shows no app-origin errors; the existing local-only Hotjar HTTPS warning is unrelated to this visual change.
- `npm run build`, `npm run test:sites`, and `git diff --check` pass.

**Comparison history**

- Pass 1 used a medium fade and removed the hard termination while preserving the object.
- Pass 2 tested a stronger fade; this introduced a 1440px P2 because too much chassis disappeared.
- Pass 3 restored the medium fade. Same-size browser evidence confirms the laptop stays recognizable on standard desktop and dissolves naturally on ultra-wide screens. No actionable P0/P1/P2 findings remain.

**Follow-up polish**

- The mouse intentionally remains unchanged so the user can judge the laptop treatment independently before deciding whether both objects should share a fade.

final result: passed

---

## Mobile CTA and Footer refinement — 2026-08-14

**Source visual truth**

- User direction: mobile calls-to-action should hug their labels across the site; the mobile Footer should be centered; social-media icons should not have visible enclosing circles.
- Existing homepage brand system: 48px black primary buttons with 6px corners, 16px/500 labels, and restrained coral hover feedback.

**Implementation evidence**

- Browser-rendered Footer evidence: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/footer-centered-no-circles.png`.
- Screenshot pixels: 1280 × 720 at a 1280 × 720 CSS viewport and device scale factor 1; no density normalization required.
- State: homepage Footer, default social-link state.

**Findings and fixes**

- Earlier [P2]: mobile Hero and Pricing CTAs used inconsistent widths; Hero expanded to a capped block while Pricing filled its card.
- Fix: mobile Hero and Case Study CTAs now use intrinsic width; mobile Pricing CTAs use `w-fit`, centered with stable horizontal padding. Desktop Pricing remains full width inside its plan card.
- Earlier [P2]: the mobile Footer inherited a left-aligned column, which looked unbalanced on a narrow viewport.
- Fix: the mobile Footer column, copy, and social row are centered while the desktop Footer layout remains unchanged.
- Earlier [P2]: social links displayed a bordered circular container that was not requested and added visual weight.
- Fix: removed the visible border, background, and radius while preserving the 36 × 36px interaction target. Hover now changes only the glyph to brand coral.

**Required fidelity surfaces**

- Fonts and typography: existing Footer and CTA type styles are unchanged.
- Spacing and layout rhythm: button height, padding, and radius remain on the homepage token; only mobile width behavior changed. Footer centering is limited to the existing mobile breakpoint.
- Colors and visual tokens: black CTA styling and coral icon hover remain unchanged; no new color was introduced.
- Image quality and asset fidelity: existing X and LinkedIn vector icons are retained; only their container decoration changed.
- Copy and content: no labels, destinations, navigation items, or legal copy changed.

**Interaction and runtime checks**

- Browser-computed social-link size remains 36 × 36px with transparent background, zero border, and zero radius.
- Functional controls such as navigation, carousel arrows, and accordion buttons are intentionally excluded from the CTA width rule.
- `npm run build`, `npm run test:sites`, and `git diff --check` pass.

**Residual test gap**

- The available in-app preview surface did not expose a mobile viewport resize operation during this pass. Mobile centering and intrinsic widths were therefore verified from the scoped responsive rules rather than a new mobile screenshot. The browser-rendered desktop capture confirms the social-icon treatment and that desktop layout is unaffected.

No actionable P0, P1, or P2 findings remain.

final result: passed

---

## Case Study article body refresh — 2026-08-14

**Source visual truth**

- Current online Vectrro Case Study capture: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-online-vectrro-reference.png`
- Source pixels: 1280 × 4435. The first 1280 × 720 region was normalized for the direct top-of-article comparison.

**Implementation evidence**

- Browser-rendered top viewport: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-vectrro-top.png`
- Focused reading/heading viewport: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-vectrro-mid.png`
- Side-by-side comparison: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-body-qa-comparison.png`
- Viewport: 1280 × 720 CSS px; implementation pixels: 1280 × 720; device density normalized 1:1 for comparison.
- State: `/?view=case-studies&case=vectrro`, top of article and first content heading.

**Findings**

- No actionable P0/P1/P2 differences remain.
- The implementation intentionally retains the BrewPot navigation and increases the source article's optical scale while preserving its single-column order, copy, and imagery.
- The 720px reading column stays centered within the site's existing 1180px content width. A sticky, low-emphasis return control occupies the left rail without reducing the article width.

**Required fidelity surfaces**

- Fonts and typography: source copy hierarchy and paragraph sequence are preserved; the new brand heading face, 17/30 desktop body rhythm, warmer ink color, and tighter display tracking match the current BrewPot system.
- Spacing and layout rhythm: source narrow reading flow is retained; 14px media radii, 9px image radii, restrained 8% shadow, 16–20px section spacing, and the existing 1180px outer grid align with the homepage system.
- Colors and visual tokens: warm white page, warm neutral media wells, charcoal type, low-opacity borders, and coral navigation accent use the current Wave & Steam palette.
- Image quality and asset fidelity: the original full-resolution live-site Vectrro assets are reused with `object-contain`; no cropping, stretching, generated replacement, or low-resolution substitute was introduced.
- Copy and content: live article copy and section order are preserved. HiTA-only before/after and grading sections that do not exist in the current live source were removed.

**Primary interactions tested**

- The desktop `Back to projects` control returns to `/?view=case-studies` and restores the list state.
- Reloading the Case Study route renders the correct Vectrro article without a visible runtime error overlay.
- Production build and Sites compatibility tests pass.

**Focused comparison evidence**

- The mid-article capture verifies paragraph measure, heading wrapping, sticky return control, header behavior, and vertical reading rhythm at readable scale; a separate crop was therefore not required.

**Comparison history**

- Initial issue: the prior detail page used full-width media and extra HiTA comparison content, diverging from the current online Case Study body.
- Fix: rebuilt the detail body as a 720px article column, restored the live copy/media sequence, removed non-live HiTA comparison sections, and applied BrewPot brand tokens to the surrounding presentation.
- Post-fix evidence: the combined comparison and focused viewport show matching content order and a deliberate, internally consistent brand adaptation.

**Follow-up polish**

- None required for this scope.

final result: passed

---

## Case Studies logo-card redesign — 2026-08-14

- Source visual truth: `/tmp/codex-remote-attachments/019fe30a-bb6a-7d00-a7e3-87d50b77d2f4/915FA04C-22D1-42E8-8510-33D20649B0FC/1-Photo-1.jpg`, 1280 × 959 pixels.
- Browser-rendered implementation: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-studies-logo-cards-desktop.png`, 1280 × 1312 pixels.
- Combined comparison evidence: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-studies-design-qa-comparison.png`.
- Desktop viewport: 1280 × 720 CSS px; full document height 1312 CSS px. Browser screenshot output is CSS-pixel normalized at 1280 × 1312 despite device pixel ratio 2.
- Mobile verification viewport: 390 × 844 CSS px. State: default Case Studies index with all cards closed.

**Findings**

- No actionable P0, P1, or P2 issues remain.
- Fonts and typography: project names use the existing BrewPot heading family at 18px/600; funding stages use compact 11px neutral pills; subtitles use the homepage's 13px secondary-text treatment.
- Spacing and layout rhythm: the source's simple two-column project directory is preserved, while BrewPot's 14px media radius, 9px logo-tile radius, 28px desktop gutter, and more generous row spacing create consistency with the homepage.
- Colors and visual tokens: the page retains the existing warm-white canvas, neutral gray media wells, dark text, restrained borders, and homepage hover treatment. No new decorative color system was introduced.
- Image quality and asset fidelity: all four existing high-resolution case-study covers remain unchanged and use `object-contain`. Real Notta, HiTA, Cooragent, and Vectrro logo assets are displayed below their media panels; no placeholder or drawn approximation is used.
- Copy and content: existing project names, descriptions, and funding stages are unchanged. Funding stages now sit beside the title rather than occupying a separate row, as requested previously.

**Interaction and responsive verification**

- All four cards remain full-surface buttons with visible keyboard focus treatment.
- Opening Notta updates the route and renders its case-study article; browser back restores the index.
- At 390px, the layout becomes a single column, images retain their proportions, and metadata remains readable without horizontal overflow.
- Browser console check found no errors during the card-open interaction.
- Focused comparison was included in the combined board because the logo row, tag sizing, image containment, and card spacing are clearly readable there.

**Comparison history**

- Initial implementation used bordered white card containers, large 24px titles, a bottom image divider, and placed funding stage after the subtitle. This felt heavier than the selected reference.
- Final implementation removes the outer card shell and divider, adds real project logos, places funding stage beside the title, and applies the homepage's neutral surfaces and restrained radii.
- The reference uses a narrower personal-portfolio column and persistent side navigation; these are intentionally not copied because BrewPot uses its existing 1180px content frame and global navigation.

**Known non-visual check**

- The repository's TypeScript check is currently blocked by a pre-existing `Gallery.tsx` prop typing error unrelated to this Case Studies change. The edited Case Studies components introduce no new browser errors.

final result: passed

---

## Hero Components card responsive parity — 2026-08-13

- Source visual truth: `/tmp/brewpot-component-desktop-reference.png`, the rendered Web Components card at a 1440 × 1000 CSS viewport. The captured card is 395 × 211 px after the desktop Hero's intentional 0.9 display scale.
- Initial mobile evidence: `/tmp/brewpot-component-mobile-before.png`, captured at a 390 × 1024 CSS viewport; the responsive card is 113 × 142 px.
- Revised mobile implementation: `/tmp/brewpot-component-mobile-after.png`, captured at the same 390 × 1024 CSS viewport and state.
- Full-view evidence: `/tmp/brewpot-hero-desktop-buttons-reference.png` and `/tmp/brewpot-hero-mobile-buttons-after.png`.
- Density normalization: browser captures use device scale factor 1. The focused cards intentionally have different responsive dimensions; comparison is based on component tokens and proportional treatment rather than forced raster scaling.

**Comparison history**

- Initial finding [P2]: the mobile buttons added a heavier 650 label weight, 5px radius, inset highlight shadows on the black and coral controls, and a mobile-only secondary border token. Those details made the compact card read as a separate button system from the Web reference.
- Fix: removed the mobile-only highlights and border override, restored the Web button weight of 500, scaled the 7px Web radius to 4px for the 18px mobile controls, and corrected the toggle knob-to-track inset ratio.
- Post-fix evidence: the Web reference and revised mobile capture were opened together. Primary, accent, secondary, and toggle controls now share the same flat surfaces, border colors, typography weight, and geometry language. No actionable P0/P1/P2 differences remain.

**Required fidelity surfaces**

- Fonts and typography: mobile labels retain the responsive 7px size but now use the Web card's 500 weight and line-height treatment.
- Spacing and layout rhythm: the one-column mobile arrangement remains necessary at 113px card width; control height, 4px radius, and 5px vertical gaps keep the compact card readable without adding visual density.
- Colors and visual tokens: black, BrewPot coral, white, and `#777` outline match the Web controls; no mobile-only highlight color remains.
- Image quality and asset fidelity: the Components card is code-native UI in both breakpoints; no image asset, icon asset, or raster scaling changed.
- Copy and content: Primary, Primary / Accent, and Secondary labels are unchanged. The responsive card continues to omit the input and icon row because they cannot remain legible at this width.

**Responsive and interaction verification**

- 390 × 1024 mobile: card remains inside the Hero grid with no clipping.
- Mobile navigation opens and closes successfully.
- Hero CTA retains `https://cal.com/yating-zhao/15min`.
- Browser check found no app-origin console errors.
- `npm run lint`, `npm run build`, and `npm run test:sites` pass.

final result: passed

---

## Mobile Components card button clarification — 2026-08-14

- Source direction: selected Mobile Hero M6 option 01 plus the user's explicit request that the three bars read more clearly as conceptual buttons.
- Browser-rendered evidence: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-mobile-components-buttons-final.png` at a 390 × 1024 CSS viewport and device scale factor 1.
- The Components card now presents three actual button samples: black `Primary`, coral `Primary / Accent`, and white outlined `Secondary`.
- Button height increased from 15px to 18px, with compact 7px semibold labels, 5px radii, and restrained inset highlights on the filled states.
- The card keeps the existing toggle sample and remains within its 142px frame without internal overflow.
- Page and viewport widths both measure 390px; no horizontal overflow is introduced.
- Fonts, spacing, colors, component content, icon assets, and surrounding Hero copy remain unchanged.
- Comparison history: the first pass inherited the desktop 16px button font and visibly overflowed; the final scoped mobile rule resolves the specificity conflict and fits all three labels cleanly.

No actionable P0, P1, or P2 issues remain.

final result: passed

---

**Two-row Gallery grid QA — 2026-08-12**

- Direction source: the selected first Grid concept, refined by the user's explicit structure request.
- Full-page evidence: `brewpot-full-page-gallery-two-row-grid.png`.
- Gallery is exactly two desktop rows: a 7:5 large/small first row at 300 px, followed by three equal cards at 210 px.
- Measured desktop card sizes: 637 × 300, 451 × 300, then three cards at 359 × 210. The grid remains 1180 px wide and aligned to Pricing and FAQ.
- All five existing work images loaded successfully before the final full-page capture. No placeholder or empty frame remains.
- Existing 12 px radii, neutral borders, minimal shadows, heading copy, section position, and surrounding page content are unchanged.
- The selected concept and final full-page capture were reviewed together for two-row hierarchy, width alignment, consistent gutters, and overall page rhythm.
- No horizontal overflow is present. TypeScript lint and production build pass.

No actionable P0, P1, or P2 issues remain.

final result: passed

---

**Featured asymmetric Gallery grid QA — 2026-08-12**

- Selected visual direction: first displayed Grid ideation result at `/Users/yatingzhao/.codex/generated_images/019fe30a-bb6a-7d00-a7e3-87d50b77d2f4/exec-c1a5f1ff-0529-46ef-840c-73596b3c7ab3.png`.
- Desktop evidence: `brewpot-gallery-grid-featured-desktop.png`.
- Mobile evidence: `brewpot-gallery-grid-featured-mobile.png` at 390 × 844 CSS px.
- Full-page evidence: `brewpot-full-page-grid-gallery.png`.
- The current second Gallery image, Cooragent landing page, is promoted to the large left feature card as requested; four existing work images form a compact 2 × 2 support grid.
- The Gallery grid and heading measure 1180 px on the 1414 px desktop viewport, matching the page's Pricing and FAQ content width.
- Cards preserve the established 12 px radius, neutral hairline, and minimal shadow. Carousel arrows and horizontal-scroll behavior were removed with the selected static Grid direction.
- Mobile reflows all five items into a single readable column. Viewport and document width both measure 390 px with no horizontal overflow.
- The selected ideation reference and desktop implementation were reviewed together for asymmetric hierarchy, outer-width alignment, gutter rhythm, border radius, and simplicity.
- TypeScript lint and production build pass.

No actionable P0, P1, or P2 issues remain.

final result: passed

---

**Gallery simplified frame and controls QA — 2026-08-12**

- Brand reference: `src/asset/branding/wave-steam-ui-kit-reference.png`.
- Desktop evidence: `brewpot-gallery-simple-controls-desktop.png`.
- Mobile evidence: `brewpot-gallery-simple-controls-mobile.png` at 390 × 844 CSS px.
- Removed all decorative coral markers and special offset/inset effects from the Gallery controls.
- Image frames now use the page's familiar 12 px card radius, a neutral hairline, and a minimal shadow so they no longer appear sharper than surrounding components.
- Arrow controls are simple white circular icon buttons with one neutral border and a subtle elevation state.
- Gallery content, image sizing, section placement, and scroll behavior remain unchanged.
- The next control advances the rail from 0 px to 358 px. Mobile viewport and document width both measure 390 px, with no horizontal overflow.
- The UI-kit reference and implementation were reviewed together for simplicity, radius consistency, border weight, and hierarchy.
- TypeScript lint and production build pass.

No actionable P0, P1, or P2 issues remain.

final result: passed

---

**Gallery editorial frame and controls QA — 2026-08-12**

- Brand reference: `src/asset/branding/wave-steam-ui-kit-reference.png`.
- Desktop evidence: `brewpot-gallery-editorial-controls-desktop.png`.
- Mobile evidence: `brewpot-gallery-editorial-controls-mobile.png` at 390 × 844 CSS px.
- This pass replaces the heavier black controls and offset coral shadow with a quieter editorial treatment.
- Image frames use a restrained sage-neutral hairline, 4 px corners, and a low-elevation shadow.
- Floating controls use a cream surface, black keyline, compact rectangular geometry, and a thin inset coral brand marker.
- Gallery content, image sizing, layout position, and scroll behavior remain unchanged.
- The next control advances the rail from 0 px to 358 px. Mobile viewport and document width both measure 390 px, with no horizontal overflow.
- The reference and implementation were reviewed together for border weight, radius, palette, control geometry, and visual hierarchy.
- TypeScript lint and production build pass.

No actionable P0, P1, or P2 issues remain.

final result: passed

---

**Gallery brand frame and controls QA — 2026-08-12**

- Brand reference: `src/asset/branding/wave-steam-ui-kit-reference.png`.
- Desktop evidence: `brewpot-gallery-brand-frame-controls-desktop.png`.
- Mobile evidence: `brewpot-gallery-brand-frame-controls-mobile.png` at 390 × 844 CSS px.
- Gallery content, dimensions, position, and horizontal-scroll behavior are unchanged.
- Work frames now use the Wave & Steam 8 px radius scale, a crisp neutral-black keyline, and a restrained inner highlight/shadow treatment.
- Floating arrows now use the brand's compact rounded-square icon-button language: black surface, white icon, and coral offset accent. Hover, active, and keyboard-focus states are defined.
- The next arrow advances the rail from 0 px to 358 px, exactly one desktop card plus its gap.
- Mobile document width and viewport width both measure 390 px; no horizontal overflow is present.
- The implementation and UI-kit reference were reviewed together for radius, border weight, button geometry, color, and elevation.
- TypeScript lint and production build pass.

No actionable P0, P1, or P2 issues remain.

final result: passed

---

**Gallery heading update — 2026-08-12**

- Restored the existing Gallery title `A glimpse of what we’ve been making.` and subtitle above the horizontal rail.
- Desktop context capture: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-gallery-title-wide-context.jpg`, 1440 × 1400 CSS px.
- Mobile capture: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-gallery-title-mobile.jpg`, 390 × 844 CSS px.
- Heading hierarchy aligns with current section typography; the mobile heading wraps cleanly without horizontal overflow.
- Gallery controls remain vertically centered on the work rail, and `What's Included?` remains absent.
- TypeScript lint and production build pass.

No actionable P0, P1, or P2 issues remain.

final result: passed

---

**Gallery placement context update — 2026-08-12**

- Current order: Hero, client logos, Pricing, Gallery, FAQ, Footer.
- `What's Included?` has been removed from the rendered page only; its component source remains available for later restoration.
- Broad context capture: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-gallery-wide-context.jpg` at a 1440 × 1400 CSS viewport, showing Pricing above Gallery and FAQ below.
- Full-page capture: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-current-full-page.jpg`, 1440 px wide and full document height.
- Browser verification confirms `What's Included?` is absent, page-level horizontal overflow is zero, TypeScript lint passes, and the production build passes.

No actionable P0, P1, or P2 issues remain.

final result: passed

---

**Corrected online Hero Gallery restoration QA — 2026-08-12**

**Comparison target**

- Source visual truth: the horizontal work Gallery directly below the live BrewPot Hero, captured at `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/online-hero-gallery-desktop.jpg` and `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/online-hero-gallery-mobile.jpg`.
- Implementation evidence: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/restored-online-gallery-desktop.jpg` and `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/restored-online-gallery-mobile.jpg`.
- Desktop viewport and screenshot: 1414 × 748 CSS px and 1414 × 748 image pixels, density 1.
- Mobile viewport and screenshot: 390 × 844 CSS px and 390 × 844 image pixels, density 1.
- State: initial horizontal rail position with the first work card selected; left and right navigation controls visible.

**Findings**

- No actionable P0, P1, or P2 issues remain in the requested Gallery region.
- Typography: the Gallery itself has no added heading or copy, matching production.
- Spacing and layout: desktop cards are 346 × 207 with a 12 px gap; mobile cards are 294 × 175. Horizontal padding, snap behavior, 12 px radius, subtle border and shadow, arrow placement, and the transition into the logo section match the online pattern.
- Colors and tokens: canvas white, pale neutral contained-card background, neutral border, and arrow treatment match production.
- Asset fidelity: all twelve cards use the corresponding existing local BrewPot work assets; no hotlinked or invented project imagery is used.
- Copy/content: image alt labels describe the same projects shown online. The existing `What's Included?` section remains in the page and was not replaced.
- Responsive behavior: the mobile rail preserves the online partial-next-card cue and has no page-level horizontal overflow.

**Interaction and runtime checks**

- The right arrow advances the rail exactly one card plus its 12 px gap (358 px on desktop). The left control uses the same inverse behavior.
- Horizontal touch/trackpad scrolling and CSS scroll snapping remain available.
- TypeScript lint and production build pass.

**Comparison history**

- Earlier pass restored `What's Included?` because the requested online area was misidentified. The user clarified that `What's Included?` must remain and that the Gallery should use the online Hero-below presentation.
- Corrected pass restored `Features`, placed `Gallery` immediately after `Hero`, implemented the online horizontal card rail, and verified it against desktop and mobile source captures.
- A first corrected layout used negative overlap into the current Hero artwork. This was removed so the Gallery sits below the current Hero rather than covering its design-system cards.

**Focused comparison evidence**

- Desktop source and implementation were reviewed together for card size, spacing, cropping, arrow placement, and logo-section transition.
- Mobile source and implementation were reviewed together for card width, partial-card visibility, arrows, and responsive spacing.

final result: passed

---

**Online Gallery-area restoration QA — 2026-08-12**

**Comparison target**

- Source visual truth: the live `https://brewpot.co/` “What's Included?” section captured at `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/online-whats-included-desktop-normalized.png` and `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/online-whats-included-mobile-normalized.png`.
- Implementation evidence: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/restored-whats-included-desktop-normalized.png` and `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/restored-whats-included-mobile-normalized.png`.
- Desktop viewport and pixels: 1414 × 748 CSS px and 1414 × 748 image pixels, density 1.
- Mobile viewport and pixels: 390 × 844 CSS px and 390 × 844 image pixels, density 1.
- State: default static section; no hover, expanded, or interactive state exists in this section.

**Findings**

- No actionable P0, P1, or P2 differences remain.
- Fonts and typography: heading, subtitle, card title and description hierarchy, weights, line heights, tracking, and mobile wrapping match the live section.
- Spacing and layout rhythm: desktop three-column grid, mobile single-column flow, icon-to-copy offsets, row gaps, section padding, and 1180 px container match the live section.
- Colors and visual tokens: canvas, neutral text, white icon tiles, borders, and subtle icon-tile shadow match the production palette.
- Image quality and asset fidelity: the section contains no raster imagery. The same Iconsax outline icon components are used locally and online.
- Copy and content: all nine service titles and descriptions plus the heading and subtitle match production exactly.
- The fixed navigation visible in one desktop implementation capture is outside the restored section and reflects scroll-direction state; focused comparison of the section content shows no mismatch.
- Mobile and desktop have no horizontal overflow.

**Focused comparison evidence**

- A focused mobile comparison was used because card typography, icon alignment, and wrapping are clearly legible at 390 px. Source and implementation match.
- The desktop full-section comparison is sufficient for the three-column grid because every icon, title, and description remains readable at the captured density.

**Interaction and runtime checks**

- The restored section has no interactive controls, links, inputs, or expanded states to test.
- Browser logs contain only a localhost Hotjar HTTPS warning and a user Chrome-extension error; no application error is present.
- TypeScript lint and the production build pass.

**Comparison history**

- Pass 1: replacing the experimental Gallery component with the existing production-matching Features component produced a visual match on desktop and mobile. No visual correction iteration was required.

**Implementation checklist**

- Replaced the Gallery import and render position in `src/App.tsx` with `Features`.
- Preserved all unrelated current-page components and modifications.
- Verified source and implementation at desktop and mobile sizes.

final result: passed

---

**Gallery G8-inspired Bento QA**

- Visual direction reference: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/gallery-g8-reference.png`.
- Final desktop capture: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/gallery-g8-implementation-desktop.png` at 1440 × 1100 CSS px.
- Final mobile capture: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/gallery-g8-implementation-mobile.png` at 390 × 844 CSS px.
- The implementation intentionally follows the selected concept's varied-size Bento rhythm without cloning its exact artwork or proportions.
- All six existing BrewPot work images remain represented. No new project claim or case-study content was invented.
- Desktop uses one large anchor card, two dark visual anchors, one light secondary card, one narrow detail card, and one tall portrait card. Colors and radii remain within the current Wave & Steam system.
- Mobile reflows to a one- and two-column composition. Measured viewport width and document scroll width are both 390 px; no horizontal overflow is present.
- The reference and final desktop capture were reviewed together. Heading hierarchy, restrained borders, image containment, spacing rhythm, background contrast, and card radii are coherent with the source direction and the existing page.
- TypeScript lint and production build pass.

No actionable P0, P1, or P2 issues remain.

final result: passed
## Gallery top-right width alignment — 2026-08-12

- Source state: previous two-row gallery screenshot (`brewpot-full-page-gallery-two-row-grid.png`).
- Requested change: make the top-right card exactly the same width as each card in the three-card lower row, while retaining the two-row hierarchy.
- Verified desktop measurements at the rendered viewport:
  - Top-left card: `729.33 × 320px`.
  - Top-right card: `358.66 × 320px`.
  - Each lower-row card: `358.66 × 210px`.
  - All five source images loaded at their natural dimensions.
- Visual check: the top-right card now aligns exactly to the lower-row column width; the first row is 20px taller to preserve presence after narrowing the card.
- Responsive rules remain unchanged below 900px.
- Validation: `npm run lint` passed; `npm run build` passed.
- Final result: passed.
## Gallery single-row restoration — 2026-08-12

- Requested change: replace the experimental two-row Bento grid with a single row of five work cards.
- Preserved the existing Gallery title, subtitle, project images, card border, radius, and image treatment.
- Desktop verification at 1414px viewport:
  - Five cards render on one shared row.
  - Every card measures `210.40 × 157.80px` with a consistent 12px gap.
  - All five images loaded successfully.
  - Gallery remains aligned to the same 1180px content container as the surrounding page.
- Existing responsive breakpoints remain in place for tablet and mobile stacking.
- Validation: `npm run lint` passed; `npm run build` passed.
- Final screenshot: `brewpot-full-page-gallery-single-row.jpg`.
- Final result: passed.
## Enlarged single-row Gallery — 2026-08-12

- Increased the Gallery display container from 1180px to 1380px while keeping the heading aligned to the page's standard 1180px content width.
- At the 1414px verification viewport, each of the five cards increased from `210.40 × 157.80px` to `250.40 × 187.80px`.
- All five cards remain on one row with consistent 12px gaps, 12px radii, and fully loaded project images.
- Tablet and mobile responsive rules are unchanged.
- Validation: `npm run lint` passed; `npm run build` passed.
- Focused Gallery capture: `brewpot-gallery-single-row-enlarged.jpg`.
- Final result: passed.
## Gallery original-ratio correction — 2026-08-12

- Changed every Gallery image from `object-fit: cover` to `object-fit: contain` so no project image is cropped or stretched.
- Updated the shared card ratio from 4:3 to 16:10, which is closer to the supplied desktop artwork dimensions and minimizes letterboxing.
- Removed the one-off 76% contained treatment so all five works use the same full-card image rule.
- Browser verification confirmed all five images loaded at their natural dimensions and every computed `object-fit` value is `contain`.
- Validation: `npm run lint` passed; `npm run build` passed.
- Focused capture: `brewpot-gallery-original-ratios.jpg`.
- Final result: passed.
## Gallery carousel arrows — 2026-08-12

- Restored floating previous/next controls around the single-row Gallery.
- Desktop now shows four larger 16:10 cards at once; the fifth card is reachable through the functional arrow controls.
- Arrow interaction verification: the track moved from `scrollLeft: 0` to its exact maximum `scrollLeft: 328px`, then returned with the previous control.
- All work images continue to use `object-fit: contain`; no image is cropped, squeezed, or stretched.
- Buttons use Iconsax arrow icons, 44px rounded-square controls, neutral borders, and the BrewPot coral hover state.
- Validation: `npm run lint` passed; `npm run build` passed.
- Focused capture: `brewpot-gallery-arrows.jpg`.
- Final result: passed.
## Circular arrows and native image ratios — 2026-08-12

- Changed both 44px Gallery arrow controls to true circles (`border-radius: 50%`).
- Assigned each project card its source image's exact natural aspect ratio, removing the letterboxing created by a shared 16:10 frame.
- Images remain `object-fit: contain`, so no source is cropped, stretched, or squeezed.
- Cards remain equal width and center-aligned; their heights vary only as required by the source ratios.
- Browser verification confirmed the computed card ratios match all five natural image dimensions and both controls measure `44 × 44px` with a 50% radius.
- Validation: `npm run lint` passed; `npm run build` passed.
- Focused capture: `brewpot-gallery-circular-arrows-no-letterbox.jpg`.
- Final result: passed.
## Transparent UI-elements card treatment — 2026-08-12

- Identified the fourth asset as a transparent UI-elements composition rather than a conventional full-frame screenshot.
- Gave it a dedicated 16:10 presentation card with a muted BrewPot sage surface (`#e5ebe8`) and 14px inset padding.
- The transparent gaps now intentionally reveal the branded surface, making the four UI panels read as a composed asset instead of accidental white space.
- The image remains `object-fit: contain`; no source pixels are cropped or distorted.
- The other four Gallery cards retain their natural image ratios and white surfaces.
- Validation: `npm run lint` passed; `npm run build` passed.
- Focused capture: `brewpot-gallery-transparent-ui-treatment.jpg`.
- Final result: passed.
## Gallery equal-height correction — 2026-08-12

- Replaced per-image card aspect ratios with one shared `5 / 3` frame so every visible Gallery card has exactly the same height.
- Browser measurement at desktop: all five cards are `316 × 189.59px`.
- All images retain `object-fit: contain`; no artwork is cropped, stretched, or squeezed.
- The fourth transparent UI-elements asset keeps its dedicated sage surface and inset padding.
- Circular carousel controls and scrolling behavior remain unchanged.
- Validation: `npm run lint`, `npm run build`, and `npm run test:sites` passed.
- Focused capture: `brewpot-gallery-equal-height.jpg`.
- Final result: passed.
## Complete Gallery and full-screen overlay — 2026-08-12

- Source reference: the current production Gallery at `https://brewpot.co/`, including its lightbox interaction and unique artwork sequence.
- Restored all 12 unique production works in the same order: Vectrro, Cooragent, HiTA, and Notta assets, including both HiTA before/after comparisons.
- Every Gallery card is now a semantic button that opens a full-viewport overlay.
- Overlay behavior verified:
  - Opens at `1 / 12` with the document scroll locked.
  - Previous/next buttons cycle through all 12 works.
  - Left/right keyboard arrows change work; Escape closes the overlay.
  - Closing restores document scrolling.
  - Before/after works render both labeled source images in the overlay.
- The lightbox is rendered through a document-level portal, so it covers the fixed navigation and the entire `1414 × 748px` viewport.
- All 16 raster images used by the 12 works loaded successfully.
- Visual comparison: `gallery-overlay-reference-comparison.jpg` places the production reference and local implementation side-by-side. The implementation preserves the dark full-screen treatment, centered contained artwork, circular navigation, and close control while using the new BrewPot control styling.
- Validation: `npm run lint`, `npm run build`, and `npm run test:sites` passed.
- Final result: passed.
## Overlay counter removal — 2026-08-12

- Removed the bottom `1 / 12` progress counter from the full-screen Gallery overlay.
- Previous/next buttons, keyboard arrows, Escape close, background close, and all 12 works remain unchanged.
- Browser verification confirmed the counter element count is zero while the lightbox remains open and functional after advancing to the next work.
- Validation: `npm run lint`, `npm run build`, and `npm run test:sites` passed.
- Final result: passed.
## Hero Gallery artwork correction — 2026-08-13

- Clarified source scope: the homepage Gallery should use the unique artwork shown in the current production Hero carousel, not every production Gallery treatment.
- Removed both HiTA Before / After comparison cards from the homepage.
- Kept the 10 unique Hero-carousel works in production order across Vectrro, Cooragent, HiTA, and Notta.
- Browser verification confirmed 10 cards, zero comparison components, all images loaded, and the click-to-open full-screen Overlay remains functional.
- Validation: `npm run lint`, `npm run build`, and `npm run test:sites` passed.
- Final result: passed.

## Equal-height, natural-width Gallery — 2026-08-13

- Kept all 10 approved Hero-carousel works and their existing full-screen overlay behavior.
- Set every desktop Gallery card to the same `220px` height while deriving each width from the source artwork's natural aspect ratio.
- Browser measurement confirmed all 10 cards are exactly `220px` high; widths vary from `309px` to `399px`.
- Standard artwork remains uncropped and undistorted. The transparent UI-elements artwork retains its sage surface and inset padding.
- Updated the circular arrow controls to scroll by a proportion of the visible track, which works consistently across variable-width cards.
- Added responsive equal heights of `190px` on tablet and `168px` on mobile.
- Validation: `npm run lint`, `npm run build`, and `npm run test:sites` passed.
- Focused capture: `brewpot-gallery-equal-height-variable-width.jpg`.
- Final result: passed.

## Automatic component-artwork treatment — 2026-08-13

- Replaced the manually assigned UI-elements treatment with runtime artwork classification.
- Each loaded image is sampled at low resolution and classified as component artwork when meaningful transparent canvas area is detected.
- Component artwork automatically receives a branded sage background and extra safe padding in both the carousel and full-screen overlay.
- Full-screen/product screenshots retain the edge-to-edge contained presentation.
- Browser verification correctly classified the Vectrro multi-panel UI asset as `component` and the other nine current works as `screen`.
- Validation: `npm run lint`, `npm run build`, and `npm run test:sites` passed.
- Final result: passed.

## Opaque modal artwork detection — 2026-08-13

- Expanded automatic presentation classification beyond transparent multi-component compositions.
- Added semantic detection for component, dialog, modal, overlay, panel, popover, popup, sheet, UI-element, and widget artwork descriptions.
- The Notta checkout work is now described and automatically classified as a modal, so it receives the same branded background and safe padding as other component artwork.
- Kept the transparent-pixel threshold conservative so ordinary full-screen screenshots with rounded corners are not misclassified.
- Final result: passed.

## Component centering and adaptive gray backgrounds — 2026-08-13

- Component and modal artwork now uses intrinsic sizing constrained by `max-width` and `max-height`, with explicit two-axis grid centering.
- Increased carousel safe space to `28px` vertically and `30px` horizontally; full-screen overlay safe space is now `64px`.
- Removed the shared sage background.
- Artwork analysis now samples visible pixels, measures average luminance and color temperature, then generates a low-saturation neutral gray per image.
- The same derived gray is reused for the corresponding carousel card and full-screen overlay.
- Validation: `npm run lint`, `npm run build`, and `npm run test:sites` passed.
- Final result: passed.

## Component optical centering — 2026-08-13

- Corrected the perceived downward visual weight caused by internal screenshot composition and bottom shadows.
- Component artwork now receives a `-5px` optical Y adjustment in carousel cards and `-8px` in the larger desktop overlay.
- Mobile overlay uses a reduced `-5px` adjustment.
- Existing two-axis grid centering, adaptive gray surfaces, and generous safe padding remain unchanged.
- Validation: `npm run lint`, `npm run build`, and `npm run test:sites` passed.
- Final result: passed.

## Gallery classification and structural centering correction — 2026-08-13

- Measured source alpha bounds directly: the Cooragent product screen is fully opaque, while the Vectrro UI-elements composition has about 9.2% transparent canvas.
- Added product-screen semantic precedence for agent-market, chat, interface, landing-page, product, website, and workflow artwork so product screenshots cannot inherit a component background.
- Replaced direct image centering plus visual translation with a dedicated inner media stage.
- Carousel component media stage is exactly `calc(100% - 64px)` high, producing a mathematically equal `32px` top and bottom safe area.
- Desktop overlay media stage subtracts `128px`, producing equal `64px` top and bottom safe area; mobile subtracts `56px` for equal `28px` areas.
- Removed the optical Y transforms because they changed pixels without changing the image's layout box.
- Validation: `npm run lint`, `npm run build`, and `npm run test:sites` passed.
- Final result: passed.

## Component centering root-cause fix — 2026-08-13

- Browser measurement exposed the root cause: the inner component media stage was `154px` high, but intrinsic Grid minimum sizing allowed Vectrro to render at about `186px` and Notta at about `176px`, overflowing only toward the bottom.
- Removed intrinsic minimum-size pressure with `min-width: 0` and `min-height: 0` on both the media stage and image.
- Component images now occupy the exact media-stage box and use `object-fit: contain; object-position: center` inside it.
- Desktop carousel verification: both component images are `154px` high inside `220px` cards, with exactly `33px` above and `33px` below.
- Desktop overlay verification: both images are `574px` high inside `702px` stages, with exactly `64px` above and `64px` below.
- Mobile carousel verification: both images have exactly `33px` above and below; mobile overlay has exactly `28px` above and below.
- Screenshots were visually inspected in every state; no component overflow or bottom-heavy spacing remains.
- Page loaded with meaningful content, no framework error overlay, and no page errors. The only console warning was Hotjar intentionally declining the automated browser user agent.
- Final result: passed.

## Gallery rail alignment and shadow clearance — 2026-08-13

- Browser measurement confirmed all 10 cards already shared the same `top`, `bottom`, and `220px` desktop height; the perceived misalignment came from clipped shadows rather than card geometry.
- Root cause: the horizontal scroller computed both `overflow-x` and `overflow-y` as `auto`, while its height exactly matched the cards, leaving zero vertical room for the card shadows.
- Added an internal shadow clearance zone of `12px` above and `28px` below every card, offset with track margins so the clearance belongs to the rail rather than the artwork.
- Fixed the Gallery frame to the responsive card height (`220px` desktop, `190px` tablet, `168px` mobile) so the new shadow clearance does not alter the section's intended layout rhythm.
- Re-centered the circular desktop arrows on the card axis after introducing the asymmetric shadow clearance.
- Desktop browser verification: all cards aligned; card and arrow center delta is exactly `0px`; the track has `12px` top and `28px` bottom shadow clearance.
- Hover-state screenshots confirm the elevated shadow spreads naturally without clipping.
- Mobile verification: all cards aligned at `168px`, with the same shadow clearance and no error overlay.
- Final result: passed.

## Full-screen artwork stage cleanup — 2026-08-13

- Identified the extra visible layer behind full-screen artwork: every lightbox item inherited a fixed `#f5f5f4` stage with padding, radius, and a large shadow.
- Standard full-screen/product screenshots now use a completely transparent stage with zero padding, zero radius, and no stage shadow, so only the source image is visible over the dark overlay.
- Component and modal artwork intentionally retains its adaptive gray support surface, safe spacing, radius, and shadow.
- Desktop browser verification confirmed standard stage values of transparent background, no shadow, `0px` radius, and `0px` padding.
- Component verification confirmed its gray support surface remains and its vertical safe areas are still exactly `64px` above and below.
- Mobile standard screenshot verification confirmed the stage remains transparent with no secondary background.
- No framework error overlay or page errors were detected.
- Final result: passed.

## Component lightbox backing removal — 2026-08-13

- Removed the adaptive gray support surface from component and modal artwork in the full-screen lightbox.
- All lightbox artwork now sits directly on the black overlay with a transparent stage, no stage radius, and no stage shadow.
- Component images retain their constrained media area, original aspect ratio, centered positioning, and equal `64px` desktop top/bottom safety space.
- Carousel thumbnails keep their adaptive gray support surfaces for legibility within the white page.
- Browser screenshots verified both the four-panel Vectrro UI composition and the Notta checkout modal directly against the black overlay.
- No framework error overlay was detected.
- Final result: passed.

## Lightbox navigation stability and Notta clarity — 2026-08-13

- Added a `360ms` navigation guard so a rapid duplicate pointer input is coalesced into one lightbox step.
- Ignored repeated keyboard events so holding an arrow key cannot unintentionally skip through multiple works.
- Browser verification: a rapid double-click advanced from Vectrro only to the next Cooragent image; a subsequent click after the guard interval advanced exactly one more image.
- Replaced the 1024×728 Notta source used by the Gallery with a 2048×1456 high-density display asset, preserving the complete composition and aspect ratio.
- Applied restrained resampling sharpening to reduce high-DPI scaling softness without changing UI content.
- Browser verification confirmed the Notta lightbox loads the 2048×1456 asset and preserves its aspect ratio on the transparent black stage.
- Validation: `npm run lint`, `npm run build`, `npm run test:sites`, and `git diff --check` passed.
- Final result: passed.

## Homepage section spacing rhythm — 2026-08-13

- Compared the later homepage sections against the established spacing between Logos and Pricing.
- Increased Gallery padding from `72px / 40px` to `96px / 64px` on desktop.
- Increased FAQ padding from `64px / 96px` to `96px / 112px` on desktop.
- Gallery-to-FAQ now has a combined `160px` section transition, matching the broader rhythm used earlier on the page.
- Mobile keeps a proportional but more compact `136px` Gallery-to-FAQ transition.
- Final result: passed by spacing-token comparison; browser handoff was unavailable during the final full-page capture.

## Hero subtitle value points — 2026-08-13

- Appended “No hiring. No waiting.” directly to the existing Hero subtitle sentence.
- Kept the complete subtitle in one typographic style and widened its desktop measure so the full sentence stays on one line when space permits.
- The primary headline, availability badge, CTA, artwork, and responsive structure remain unchanged.
- Final result: passed.

## Hero-to-logo spacing correction — 2026-08-13

- Removed the forced `100vh` Hero minimum height, which created viewport-dependent blank space when the artwork content was shorter than the screen.
- Reduced the Gallery artwork layout reservation at each desktop/tablet scale while retaining `12–16px` of safe space beneath the visible cards.
- Reduced the client-logo section top padding from `112px` to `80px` on desktop/tablet and from `96px` to `64px` on mobile.
- Browser verification: 1414px desktop now has `12px` inside-Hero clearance and `92px` total card-to-logo-heading spacing; 900px tablet has `16px` and `96px` respectively; no cards are clipped.
- Mobile retains a deliberate `64px` transition between Hero and the logo heading.
- Final result: passed.
## Mobile Hero M6 strategy mosaic — 2026-08-14

- Source visual truth: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/mobile-hero-original-m6-option01-source.png` (496 × 460 px), cropped from selected direction 01 in the six-refinement board.
- Browser-rendered implementation: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-mobile-hero-m6-final.png` (390 × 1024 px) at a 390 × 1024 CSS viewport and device scale factor 1.
- Focused implementation evidence: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-mobile-hero-m6-final-cards.png` (390 × 455 px).
- State: homepage Hero, mobile navigation closed, completed entrance animation.
- Density normalization: the source is a conceptual comparison-board crop rather than a 390px viewport capture. The implementation was judged at 1:1 CSS pixels; the focused crops were compared by structure and proportions rather than forced resampling.

**Full-view comparison evidence**

- The 390px browser capture shows the complete Hero copy and the selected two-row strategy-card mosaic in context.
- The five cards preserve the Web order in both DOM and visual reading order: Calendar, Icons, Typography, Colors, Components.
- The Hero and card grid stay within the 390px viewport with no horizontal overflow.

**Focused comparison evidence**

- The source crop and final card-region crop were opened together for direct visual comparison.
- Both use the same two-large-card upper row, three-compact-card lower row, warm-white surface, thin neutral border, restrained shadow, and coral/black/sage accent system.

**Required fidelity surfaces**

- Fonts and typography: existing Inter hierarchy is preserved; mobile card headings and calendar labels remain readable without changing the desktop scale.
- Spacing and layout rhythm: 9px grid gaps, 12px radii, 16px side margins, and a 205/144px upper-row split match the selected compact mosaic direction. Bottom cards are equal-height for a calmer production layout.
- Colors and visual tokens: existing BrewPot coral, black, sage, cream, and warm-gray border tokens are retained.
- Image quality and asset fidelity: this section remains code-native UI using the project's existing Lucide icon system; no raster scaling, placeholder imagery, or newly approximated brand assets were introduced.
- Copy and content: original Hero message and all five deliverable categories remain unchanged. Compact mobile component samples hide only their tiny visible labels while retaining explicit accessible names.

**Comparison history**

- Pass 1 finding [P2]: the narrow Components card rendered button labels inside 15px visual samples, causing clipped text and visual noise.
- Fix: wrapped the desktop button labels, added explicit `aria-label` values, and hid only the label spans at the mobile breakpoint.
- Pass 2 evidence: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-mobile-hero-m6-final.png` shows clean black, coral, outlined, and toggle samples with no clipping. No actionable P0/P1/P2 differences remain.

**Responsive and interaction verification**

- 390 × 1024: complete selected layout verified in Chrome.
- 360 × 800: document width and viewport width both measured 360px; the 328px showcase ends at x=344 with 16px right clearance.
- Mobile menu opens successfully.
- Hero CTA retains `https://cal.com/yating-zhao/15min`.
- Browser console: no app-origin errors. Observed only the expected localhost Hotjar HTTPS warning and an unrelated Immersive Translate extension error.
- `npm run lint` and `npm run build` pass.

**Follow-up polish**

- None required for this breakpoint. Very small devices below 340px were not part of the selected visual target.

final result: passed

---

## Mobile Colors card balance — 2026-08-14

- User finding: the four mobile color swatches occupied a two-column block, leaving an unbalanced empty area on the right side of the Colors card.
- Browser evidence: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-mobile-colors-balanced.png` at a 390 × 1024 CSS viewport and device scale factor 1.
- Fix: changed the compact palette to one four-column row spanning the full 87.34px inner width, with responsive 16–18px circles and 4px gaps.
- Measured final swatches: four circles at 17.94px each, extending from x=151.77 to x=238.21 inside the list bounds x=151.33–238.66. Left and right residual space are visually balanced.
- The original coral, black, sage, and sand order and color tokens are unchanged.
- Typography, card size, surrounding layout, component content, and image/icon quality are unchanged.
- Browser measurement confirms viewport width and document width both equal 390px; no horizontal overflow or card overflow is introduced.
- `npm run lint`, `npm run build`, and `npm run test:sites` pass.

No actionable P0, P1, or P2 issues remain.

final result: passed

---

## Mobile Colors card vertical balance — 2026-08-14

- User finding: after moving the four swatches into one horizontal row, the Colors card retained too much empty space below the row.
- Intended fix: keep the card dimensions stable, increase the responsive swatch size from 16–18px to 16–19px, and vertically center the palette within all space remaining below the `Colors` heading.
- Implementation: the mobile Colors card is now a column flex container; its palette receives the remaining height and uses centered grid content. Horizontal order and four-column distribution are unchanged.
- Static checks: `npm run lint`, `npm run build`, and `npm run test:sites` pass. The calculated layout keeps the four swatches inside the existing 87px content width at the 390px breakpoint and continues to scale down at narrower widths.
- Browser evidence: blocked. The configured Chrome preview connection repeatedly reset or timed out while creating or claiming the local tab, and the in-app browser was unavailable. No new screenshot was produced; the previous screenshot is not used as evidence for this revision.
- Remaining verification: visually confirm that the swatch row has balanced space above and below at 390px and that no card overflow appears at 360px.

final result: blocked

---

## Mobile Colors 2×2 and Calendar spacing — 2026-08-13

- User direction: replace the single-row palette with four larger circles arranged two above and two below; remove the Calendar card's unexplained bottom void.
- Browser evidence: `/tmp/brewpot-mobile-card-spacing.png`, captured at a 390 × 1024 CSS viewport.
- Colors implementation: a two-column, two-row grid with four 28.86px visible circles. The two rows remain within the existing compact card and preserve coral, black, sage, and sand order.
- Calendar implementation: the six date rows now divide the remaining card height evenly instead of using a fixed small row gap at the top.
- Measured Calendar bottom clearance from the final date row to the card edge is 20.2px; the date grid occupies 134px of the 214px card.
- Viewport width and document width both equal 390px, so the revision introduces no horizontal overflow.
- Mobile navigation interaction was exercised successfully during the check.
- `npm run lint`, `npm run build`, and `npm run test:sites` pass.

No actionable P0, P1, or P2 issues remain.

final result: passed

---

## Case Study source correction — 2026-08-14

**Source visual truth**

- Correct production source: `https://brewpot.co/?view=case-studies&case=hita`
- Production browser capture: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-live-hita-reference.png`
- User-provided production screenshot: `/tmp/codex-remote-attachments/019fe30a-bb6a-7d00-a7e3-87d50b77d2f4/FDEE7333-5B6A-403B-84F0-D46FD156CA95/1-Photo-1.jpg`
- Source pixels and viewport: 1280 × 720 at a 1280 × 720 CSS viewport.

**Implementation evidence**

- Overview and first comparison: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-hita-corrected.png`
- Grading workspace comparison: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-hita-corrected-mid.png`
- Website comparison: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-hita-corrected-website.png`
- Combined source/implementation comparison: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-hita-correct-source-comparison.png`
- Implementation pixels and viewport: 1280 × 720 at a 1280 × 720 CSS viewport; no density normalization required.
- State: HiTA Case Study with the same production copy and comparison sequence.

**Findings**

- Earlier [P1]: the personal portfolio was mistakenly treated as the production content source, which removed four production Before/After comparison groups and one heading.
- Fix: switched the source of truth to `brewpot.co`, restored every production HiTA heading, paragraph, comparison, label, crop rule, and original high-resolution asset, while retaining only the new BrewPot visual treatment.
- Post-fix: no actionable P0/P1/P2 differences remain.

**Required fidelity surfaces**

- Fonts and typography: production copy and heading order are exact; the implementation intentionally applies the new brand heading face, 17/30 body rhythm, and warmer charcoal ink.
- Spacing and layout rhythm: the production 640px reading flow becomes a centered 720px brand article column. Comparison wells use the new 14px radius and balanced 24–32px padding.
- Colors and visual tokens: warm white canvas, warm-gray comparison surfaces, charcoal text, low-opacity borders, a black return action, and restrained shadows match the current homepage.
- Image quality and asset fidelity: all eight production HiTA comparison assets are reused at their original resolution. Portrait, criteria crop, grading-workspace crop, and stacked website layouts were visually checked after lazy loading.
- Copy and content: live DOM inspection confirms five headings, the full overview, all production paragraphs, and four Before/After groups are present in the same sequence.

**Primary interactions and runtime checks**

- Direct HiTA route loads correctly. The production-mismatched hero media, sticky desktop return control, mobile top return control, and booking CTA are absent.
- The only article action is the production-matching centered black `Back to case studies` button, followed directly by the existing site footer.
- Lazy-loaded comparison images report complete with their original natural pixel widths after entering the viewport.
- Production build and Sites compatibility tests pass; no visible runtime error overlay appears.

**Comparison history**

- Pass 1 used the wrong source and was rejected by the user.
- Pass 2 uses `brewpot.co` and the user screenshot as the source of truth. The side-by-side evidence confirms matching content, while the visible differences are the requested new-brand typography, spacing, radius, palette, and return control.
- Pass 3 removed every visible element not present in production and matched the production ending structure. Evidence: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-hita-clean-top.png`, `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-hita-clean-bottom.png`, and `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-ending-qa-comparison.png`.
- Pass 4 applies the homepage primary-button token exactly: 48px height, 28px horizontal padding, 6px radius, black background, 16px/500 text, no shadow, and 90% hover opacity. Browser evidence: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-home-button.png`.
- Pass 5 removes the extra arrow and replaces the duplicated utilities with the homepage's actual shared `hero-cta` class. Browser-computed values now match the homepage button for height, radius, font, padding, gap, background, shadow, and responsive rule; only intrinsic width differs because the label is different. Evidence: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-shared-hero-button.png`.
- Pass 6 unifies every Case Study image well to the selected homepage-compatible neutral gray `#F1F1F0`, with `#EBEBE9` reserved for list-card hover. Browser-computed list and detail surfaces both report `rgb(241, 241, 240)`. Source/implementation evidence: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/homepage-neutral-reference.png`, `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-studies-neutral-gray-list.png`, `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-studies-neutral-gray-detail.png`, and `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/case-study-neutral-gray-qa-comparison.png`. Typography, layout, imagery, and copy are unchanged; no actionable P0/P1/P2 findings remain.

**Follow-up polish**

- None required for the corrected scope.

final result: passed

---

## Production page-scope separation — 2026-08-14

**Source visual truth**

- User direction: the production site exposes only the homepage, Case Studies list, and Case Study detail pages. Blog remains available for testing but is not published in the production navigation or route surface.

**Implementation evidence**

- Production-build Case Studies list: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/production-scope-case-studies.png`.
- Production-build HiTA detail: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/production-scope-case-detail.png`.
- Both captures are 1280 × 720 pixels at a 1280 × 720 CSS viewport and device scale factor 1; no density normalization required.
- Browser-rendered state: local server running the exact production build.

**Findings and fixes**

- Earlier [P1]: Blog appeared in desktop and mobile production navigation, and `?view=blog` rendered the Blog index publicly.
- Fix: introduced a dedicated Blog feature flag. Local development keeps Blog enabled by default; production builds disable it unless a test build explicitly sets `VITE_ENABLE_BLOG=true`.
- Fix: removed Blog from both production navigation variants. A direct production request to `?view=blog` now replaces the URL with `/` and renders the homepage.
- Post-fix browser evidence: the production homepage and Case Studies DOM contain no visible Blog navigation link; the direct Blog URL reports the BrewPot homepage title and contains the homepage FAQ section.

**Required fidelity surfaces**

- Fonts and typography: unchanged.
- Spacing and layout rhythm: the remaining desktop and mobile navigation items retain their existing alignment and spacing rules.
- Colors and visual tokens: unchanged.
- Image quality and asset fidelity: Case Studies list and detail imagery render from the same production assets with no new scaling or substitutions.
- Copy and content: homepage, Case Studies list, and all Case Study article content are unchanged. Blog content remains in source for testing only.

**Primary interactions and runtime checks**

- Homepage renders successfully in the production build.
- `?view=case-studies` renders the four-card Case Studies list.
- `?view=case-studies&case=hita` renders the Case Study article.
- `?view=blog` falls back to the homepage and removes the Blog query from browser history.
- `npm run build`, `npm run test:sites`, and `git diff --check` pass.
- `npm run lint` still reports the pre-existing `Gallery.tsx:280` `key` prop type error; this production-scope change does not touch that component and the deployable build succeeds.

No actionable P0, P1, or P2 findings remain in the requested production scope.

final result: passed

---

## Ultra-wide Hero visual balance — 2026-08-14

**Source visual truth**

- User-provided problem capture: `/tmp/codex-remote-attachments/019fe30a-bb6a-7d00-a7e3-87d50b77d2f4/64B31BB4-C570-4BB3-A26D-F698D020AF17/1-Photo-1.jpg`.
- Original raw 2560px browser capture: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-live-wide-2560.png`.
- Source state: production homepage Hero at a nominal 2560 × 1440 CSS viewport. The source capture is evidence of the perceived rightward bias, but its in-app-browser raster is 2554 × 1440 and does not preserve a reliable one-to-one CSS-to-pixel mapping beyond approximately 1920px.

**Implementation evidence**

- Chrome 1920 × 1080: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-ultrawide-chrome-1920-final.jpg`.
- Chrome 2560 × 1440: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-ultrawide-chrome-2560-final.jpg`.
- Chrome 2880 × 1620: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-ultrawide-chrome-2880-final.jpg`.
- Combined source/implementation comparison: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-ultrawide-qa-comparison.jpg`.
- All final implementation screenshots use device scale factor 1 and match their stated CSS viewport dimensions exactly. The comparison image normalizes both sides to 1280 × 720 before horizontal composition.

**Findings and fixes**

- Earlier [P2]: the Hero copy and card mosaic were geometrically centered, but the laptop and mouse remained attached to the browser edges. On very wide screens the large dark laptop dominated the left edge while the low-contrast mouse receded on the right, making the centered content feel displaced.
- Fix: at `min-width: 2200px`, both desk objects now attach to a shared 2060px visual stage centered on the viewport. At 2560px the laptop center is x=375 and mouse center is x=2177, placing them 905px and 897px from the page center respectively.
- Regression protection: 1920px and narrower retain the original positioning. The 1920px Chrome capture and measured boxes are unchanged.

**Required fidelity surfaces**

- Fonts and typography: unchanged; headline, supporting copy, and button remain centered on the exact viewport midpoint.
- Spacing and layout rhythm: the 1180px copy container and 990px rendered card mosaic remain centered. Only decorative image offsets change above 2200px.
- Colors and visual tokens: unchanged; no tint, overlay, or new background was introduced.
- Image quality and asset fidelity: the original laptop and mouse assets are reused without filters, artificial shapes, or generated replacements. Chrome confirms both assets load at their natural resolution and retain their native shadows.
- Copy and content: unchanged.

**Primary interactions and runtime checks**

- Homepage, primary navigation, Hero CTA, logo strip, and following Pricing section remain visible at all tested widths.
- Document `scrollWidth` equals viewport width at 1920, 2560, and 2880; there is no horizontal overflow.
- Chrome console has no app-origin errors. The only local warning is Hotjar declining to run over HTTP, which does not occur on the HTTPS production site.
- `npm run build`, `npm run test:sites`, and `git diff --check` pass.

**Comparison history**

- Pass 1 moved the devices onto a centered ultra-wide stage, but the in-app-browser screenshot surface rendered widths above 1920px inconsistently, so the visual result remained blocked.
- Pass 2 used Chrome for a true 2560px raster and exposed a [P2] white rectangular patch caused by an attempted mouse contrast filter.
- Pass 3 removed the filter and retained only the symmetric positioning. Chrome evidence at 1920, 2560, and 2880 shows balanced edge weight, natural asset backgrounds, exact central alignment, and no overflow. No actionable P0/P1/P2 findings remain.

**Follow-up polish**

- None required. The fixed 1180px content width intentionally preserves a standard editorial reading measure on very large displays.

final result: passed

---

## Hero laptop material realism — 2026-08-14

**Source visual truth**

- Previous accepted faded-laptop implementation: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-keyboard-fade-2560-final.png`.
- User direction: make the pale laptop body more convincingly realistic while preserving the existing Hero composition, edge fade, and ultra-wide behavior.

**Implementation evidence**

- Updated project asset: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/src/asset/branding/laptop-reference-v2.png`.
- Chrome 1440 × 900: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-realistic-laptop-1440.png`.
- Chrome 2560 × 1440: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-realistic-laptop-2560.png`.
- Full-view before/after comparison: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-realistic-laptop-comparison.png`.
- Focused material comparison: `/Users/yatingzhao/Desktop/01_项目/BrewPot/brewpot-branding-upgrade/brewpot-realistic-laptop-detail-comparison.png`.
- Source and implementation comparison screenshots are both 2560 × 1440 pixels at a matching 2560 × 1440 CSS viewport and device scale factor 1.

**Findings and fixes**

- Earlier [P2]: the laptop palm-rest area read as a flat pale plane, with weak material texture and edge definition compared with the realistic mouse on the opposite side.
- Fix: replaced the laptop raster with a higher-resolution, product-photography treatment. The new asset adds anodized-aluminum texture, a clearer chamfered edge, realistic speaker perforations, trackpad definition, and a physically plausible soft shadow while preserving the original angle and portrait aspect ratio.
- Iteration [P1]: the first edited asset rendered its intended transparent area as a visible checkerboard, which was not deployable.
- Post-fix: replaced only that checkerboard with the Hero's `#FDFCFB` warm off-white and retained the generated laptop detail and shadow. The existing CSS alpha mask continues to soften the inner and lower edge.

**Required fidelity surfaces**

- Fonts and typography: unchanged.
- Spacing and layout rhythm: laptop width, aspect ratio, crop, mask, placement, Hero copy, CTA, and card mosaic geometry remain unchanged.
- Colors and visual tokens: the laptop background matches the existing `#FDFCFB` Hero surface; no new page color or overlay was introduced.
- Image quality and asset fidelity: asset resolution increases from 275 × 527 to 908 × 1732. The accepted browser captures show sharper key edges, finer metal detail, and no checkerboard, white rectangle, stretching, or compression blur.
- Copy and content: unchanged.

**Primary interactions and runtime checks**

- Navigation, Hero CTA, responsive mosaic, logo strip, and mobile desk-object visibility rules remain unchanged.
- Chrome renders the updated asset at 1440 and 2560 without overflow or a visible asset boundary.
- No app-origin browser errors were introduced; the existing local-only Hotjar HTTPS warning is unrelated.
- `npm run build`, `npm run test:sites`, and `git diff --check` pass.

**Comparison history**

- Pass 1 increased the product realism but produced an unusable checkerboard background.
- Pass 2 corrected only the background, preserved the laptop treatment, and passed same-size 1440/2560 browser review. No actionable P0/P1/P2 findings remain.

**Follow-up polish**

- The mouse remains unchanged so its lighter visual weight continues to counterbalance the larger laptop.

final result: passed

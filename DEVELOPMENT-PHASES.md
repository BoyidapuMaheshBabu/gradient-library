# Gradient Library — Development Phases

## Product direction

Build an original, developer-friendly gradient resource that helps people **discover, customize, and implement** expressive backgrounds in real projects.

Use Aura as a technical and product reference for layered gradient rendering, live preview, customization, and export workflows. Do not reproduce Aura's branding, visual layout, category taxonomy, preset collection, or interface screen-for-screen.

Our direction:
- Preserve Gradient Library's own graphite and neon-green visual identity.
- Keep the experience clear and approachable rather than turning every screen into a dense design tool.
- Support simple gradients and progressively add more expressive layered compositions.
- Make exported code accurate, reusable, and useful to both developers and AI coding agents.
- Build one phase at a time and keep accepted functionality working as the product grows.

The intended user journey is:

**Discover → Customize → Implement**

## Accepted foundation

These phases are already completed and merged into `main`:

### Phase 01 — Website Foundation · Completed
Establish the Vite, React, TypeScript, and Tailwind website, initial layout, responsive foundation, and first gradient collection.

### Phase 02 — Gallery-first Experience · Completed
Make the gallery the primary experience and add selection with a focused editor-entry view.

### Phase 03 — Gradient Editor · Completed
Add the two-colour linear-gradient editor with editable HEX values, direction control, live preview, validation states, and reset to original values.

### Phase 04 — Export Experience · Completed
Add Copy CSS and Copy AI-ready Prompt actions for the currently edited gradient, including clipboard success/error feedback.

---

## Planned development

### Phase 05 — Layered Gradient Foundation

Evolve the data model and rendering foundation so a gradient can contain one or more independently configured layers.

Scope:
- Define a typed, structured layer model instead of relying on parsing arbitrary CSS strings.
- Support layer properties such as gradient type, colour stops, direction or geometry, blend mode, blur, opacity, and stacking order.
- Support a base/background colour where the composition requires one.
- Build one shared renderer that can display the same composition in gallery cards and the editing preview.
- Keep existing simple gradients compatible by representing them as a single-layer composition or through a safe migration adapter.
- Add a small, original set of layered example presets to prove the model.

Acceptance:
- All existing presets still render correctly.
- Simple and layered gradients use the same predictable rendering path.
- Layer order and properties are represented explicitly in data.
- The renderer does not depend on fragile CSS-string parsing.

### Phase 06 — Layered Gradient Editor

Extend the current editor from two fixed colours and one angle into a focused layer-editing workspace.

Scope:
- Add and remove layers, with a sensible minimum layer count.
- Reorder layers and make the stacking order understandable.
- Edit each layer's colour stops and relevant gradient geometry.
- Expose blend mode, blur, and opacity controls.
- Edit the composition's base/background colour where applicable.
- Provide a live preview that stays synchronized with every edit.
- Keep the existing simple linear-gradient editing experience easy to use; advanced controls should not overwhelm it.

Acceptance:
- Changes to any supported property update the preview accurately.
- Adding, removing, and reordering layers produces the expected visual stack.
- Invalid or unsupported values cannot corrupt the editor state.
- Existing one-layer gradients remain straightforward to customize.

### Phase 07 — Editing History and Recovery

Make experimentation safe and reversible.

Scope:
- Add Undo and Redo for meaningful editing actions.
- Add a clear reset-to-selected-preset action.
- Add keyboard shortcuts where appropriate, with visible or discoverable hints.
- Keep history consistent when layers are added, removed, edited, or reordered.
- Handle rapid consecutive changes without losing or corrupting state.

Acceptance:
- Undo and Redo restore the exact previous composition.
- Reset restores the selected preset, not an unrelated default.
- History controls show correct enabled/disabled states.
- Keyboard shortcuts do not interfere with typing in inputs.

### Phase 08 — Gallery Discovery and Curation

Grow the gallery into a useful library rather than just a larger grid.

Scope:
- Introduce a small, meaningful category system designed for Gradient Library's own collection.
- Add search by gradient name and description.
- Add favourites with local persistence.
- Add useful featured/curated ordering and a random-gradient action.
- Keep the gallery responsive and load larger collections without rendering every card at once.
- Define consistent metadata for each preset, such as name, description, category, mood, and preview text colour when needed.

Acceptance:
- Search, category filters, and favourites work together predictably.
- Favourites survive refreshes on the same browser.
- Empty search/filter results have a helpful state.
- Gallery cards use the shared renderer and remain visually consistent with the editor.

### Phase 09 — Preview, Themes, and Shareable Links

Make it easy to inspect a gradient in context and return to it later.

Scope:
- Add a focused or fullscreen preview with previous/next navigation.
- Add light and dark preview backdrops so users can judge contrast and blend-mode behaviour.
- Add useful keyboard navigation and Escape-to-close behaviour.
- Support shareable URLs that open a specific gradient directly.
- Preserve relevant gallery navigation state and return-to-gallery position where practical.
- Handle unknown or removed gradient IDs gracefully.

Acceptance:
- A copied URL opens the intended gradient.
- Browser back/forward navigation stays coherent.
- Preview works with mouse, keyboard, and touch.
- Text/content contrast is not silently assumed to be suitable on every background.

### Phase 10 — Developer-ready Code Export

Expand the current CSS export into a reliable multi-format implementation tool.

Scope:
- Retain the current Copy CSS action.
- Add exports for Tailwind markup/classes, CSS custom properties, and React/CSS-in-JS.
- Add Copy All for the available formats.
- Show the selected format's generated code before copying.
- Make generated output account for every layer, stacking order, base background, blend mode, blur, opacity, and optional texture.
- Improve the AI-ready prompt so it describes the actual edited composition and explains important implementation constraints instead of merely listing colours.

Acceptance:
- Exported output reflects the current editor state, not the original preset.
- Each format is syntactically valid for its stated target.
- Layered exports reproduce the preview as closely as the target format allows.
- The AI prompt includes exact values and does not invent missing design requirements.

### Phase 11 — Image Export

Allow users to take a gradient composition out of the browser as an image.

Scope:
- Add PNG and SVG download options.
- Render the current edited composition, including supported layers, blur, blend modes, background, and optional grain/texture.
- Provide sensible default dimensions and a small set of practical size options.
- Handle export failures and prevent blank or incomplete downloads.
- Keep the export process separate from the editor's normal interactive preview.

Acceptance:
- Downloaded files contain the currently edited composition.
- PNG and SVG results are checked for visible, complete output.
- Export controls communicate progress and errors.
- Image export does not alter the user's editing state.

### Phase 12 — Product Polish and Release Readiness

Stabilize the complete experience before treating the expanded library as finished.

Scope:
- Review desktop, tablet, and mobile layouts across the gallery, preview, editor, and export flows.
- Improve accessibility: labels, focus states, keyboard operation, contrast, and reduced-motion support.
- Review rendering and gallery performance with a larger collection and layered previews.
- Add focused tests for gradient data, rendering helpers, history behaviour, URL handling, and export generation.
- Resolve broken states, empty states, and clipboard/download errors.
- Update the README and usage guidance to describe the real, implemented capabilities only.

Acceptance:
- Core workflows work from discovery through customization and implementation.
- Existing functionality has no known regressions.
- Automated checks and a production build pass.
- The owner completes a final manual review on desktop and mobile before release.

---

## Working rules

1. Develop **one phase at a time**. Do not start the next phase while the current phase is under review.
2. Before implementation, state the current branch and inspect the latest accepted `main`, relevant source files, documentation, and existing assets.
3. Create each phase branch from the latest accepted `main`.
4. Keep each phase within its stated scope. Do not silently bundle later-phase features or unrelated redesigns.
5. After implementation, report inspected files, changed files, verification performed, known limitations, and the proposed commit message.
6. The owner tests the changes and explicitly accepts the phase before it is merged.
7. After acceptance, merge the phase into `main`. Create the next phase branch only from that newly accepted `main`.
8. Do not claim a build, test, visual review, or browser interaction was completed unless it was actually performed.

**Current planning status:** Phases 01–04 are accepted and merged. Phase 05 is the next phase to plan and implement. No Phase 05 implementation branch is created by this roadmap update.

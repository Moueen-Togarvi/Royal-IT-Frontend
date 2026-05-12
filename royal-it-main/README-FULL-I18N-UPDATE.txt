Royal IT Full i18next Update

Changes made:
- Language switcher now applies site-wide across all visible sections and component pages.
- English selection restores the original English content.
- Arabic selection converts visible text, placeholders, alt/title text, buttons, cards, FAQs, footer, offcanvas sections, and component pages.
- Added smart fallback Arabic conversion so text without manual data-i18n keys does not remain in English.
- Kept navbar layout professional: logo remains on the left and action/language controls remain on the right.
- Fixed remaining Royal Estate wording to Royal IT.

Note:
This is still a static HTML implementation using i18next via CDN. For production-level Arabic, replace fallback/generated Arabic with final client-approved translations in assets/i18n/i18n.js.

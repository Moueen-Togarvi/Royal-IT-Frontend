Royal IT i18next English/Arabic Setup

Implemented:
- i18next CDN package added to every HTML page.
- English/Arabic language switcher added.
- Arabic RTL mode with responsive CSS added.
- Translations are stored in assets/i18n/i18n.js.
- RTL/mobile styling is stored in assets/i18n/i18n.css.

How to edit translations:
Open assets/i18n/i18n.js and add/modify entries inside resources.ar.translation.
The key should match the English text exactly.

How to use manually for new content:
You can also add data-i18n to HTML elements and add matching keys in the JS file.
Example: <h1 data-i18n="hero_title">Your Technology, Our Priority</h1>

# Registration Form

Responsive, accessible registration form built with semantic HTML, modern CSS (BEM, custom properties), and vanilla JavaScript. Includes real-time validation, country-aware phone checks, and a polished card UI ready for backend wiring.

## Features

- Clean card layout with gradient backdrop, rounded corners, and subtle shadows
- Fully responsive across mobile, tablet, and desktop breakpoints
- Semantic markup and accessible focus states; success banner auto-hides after submission
- Real-time validation with inline error messaging and success indicators
- Country-code dropdown with flag labels and country-specific phone number rules
- CSS custom properties for colors, spacing, radii, and transitions

## Validation Rules

- **Full Name**: required, ≥ 2 chars, letters and spaces only
- **Father's Name**: required, ≥ 2 chars, letters and spaces only
- **Date of Birth**: required, past date, age must be 13+
- **Address**: required, ≥ 10 chars
- **Phone**: required, validated per country selection
  - US/CA `+1`: 10 digits, cannot start with 0/1
  - UK `+44`: 10 digits, mobile without leading 0 (starts with 7)
  - AU `+61`: 9 digits, mobile without leading 0 (starts with 4)
  - IN `+91`: 10 digits, starts with 6–9
  - PK `+92`: 10 digits, mobile without leading 0 (starts with 3)

## File Structure

- `index.html` — Form markup and asset links
- `style.css` — Layout, theme tokens (CSS variables), BEM styling, responsive rules
- `script.js` — Real-time validation, submission handling, success banner timing

## Run Locally

Open the HTML file directly in a browser (no build or server needed):

- macOS: `open index.html`
- Linux: `xdg-open index.html`
- Windows: `start index.html`

## Form Behavior

- Inline feedback toggles `form-field--error` / `form-field--success` classes and status dot
- Country change updates the phone placeholder hint to match the selected rule
- Submit blocks when any field is invalid; focuses the first errored control
- On valid submit, shows a success banner that auto-hides after 2 seconds and resets the form state

## Accessibility & Semantics

- Labels explicitly tied to inputs; `aria-describedby` for inline messages
- Success banner uses `role="alert"` and `aria-live="polite"`
- Keyboard-friendly focus outlines and `:focus-within` highlighting on controls
- Clear visual hierarchy with descriptive headings and placeholders

## Customization

- Update colors, spacing, radii, and shadows via CSS variables in `style.css`
- Extend country rules or add formats in `script.js` (`countryRules` map)
- Adjust animations (e.g., success pop-in) by editing keyframes and transition variables

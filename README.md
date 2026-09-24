# Angular Portfolio

A responsive, data-driven portfolio built with Angular. The design uses a dark minimal visual
system, accessible expandable project cards, and motion that respects reduced-motion preferences.

## Customize the content

All portfolio copy, links, navigation, education, experience, skills, and contact details live in:

`public/assets/data/portfolio.json`

Replace the placeholder SVG files in `public/assets/images/` or update their paths in the JSON.
Set `profile.cvUrl` to the path of your CV (for example, `assets/cv/your-name-cv.pdf`) and update
`profile.cvLabel` when it is ready.

## Development

```bash
npm install
npm start
```

Open `http://localhost:4200/`.

## Verification

```bash
npm test -- --watch=false
npm run build
```

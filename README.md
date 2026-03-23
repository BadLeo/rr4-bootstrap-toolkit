# RR4 UI Toolkit

RR4 UI Toolkit is a static frontend showcase and cookbook inspired by the visual language of Ridge Racer Type 4. It demonstrates a Bootstrap-based component set with RR4-styled typography, panels, dialogs, menus, meters, data tables, placeholders, and lightweight Anime.js motion.

## Features

- Static, dependency-light site with no build step required
- RR4-inspired visual system layered on top of Bootstrap 5
- Showcase page for browsing the full interface direction
- Cookbook page with live examples and copyable HTML patterns
- Responsive layout for desktop and mobile screens
- Motion that respects reduced-motion preferences

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- [Bootstrap 5.3](https://getbootstrap.com/)
- [Anime.js 3](https://animejs.com/)

## Project Structure

```text
.
├── assets/
│   ├── images/
│   ├── favicon.svg
│   ├── toolkit.css
│   └── toolkit.js
├── cookbook.html
└── index.html
```

## Getting Started

Because this is a static site, you can run it locally with any simple HTTP server.

### Option 1: Python

```bash
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

### Option 2: VS Code Live Server

Open the repository and serve `index.html` with your preferred live preview extension.

## Pages

- `index.html`: primary showcase and landing page
- `cookbook.html`: component reference with live patterns and example markup

## Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening pull requests.

## Security

Please report vulnerabilities according to [SECURITY.md](./SECURITY.md).

## Code Of Conduct

Community expectations are documented in [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

## License

This project is released under the [MIT License](./LICENSE).

## Acknowledgements

This project is an original frontend homage inspired by Ridge Racer Type 4's UI direction. Ridge Racer is a trademark of its respective owners.

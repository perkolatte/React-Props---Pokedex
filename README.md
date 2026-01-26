# React Props - Pokedex

Small demo project showcasing React props using a Pokédex-style UI.

**How to run**

1. Clone the repo and enter the folder

```bash
git clone https://github.com/username/repo.git "React Props - Pokedex"
cd "React Props - Pokedex"
```

```bash
cd ~/Downloads/React\ Props\ -\ Pokedex
```

2. Start a local server

```bash
python3 -m http.server 8000
```

3. Open the demo in your browser

Go to: http://localhost:8000

Note: use the local server command above rather than opening `index.html` with `file://` so remote sprites load correctly.

Credits

- Original game: Pokémon (Red/Blue/Green/Yellow) — Game Freak / Nintendo. Concept: Satoshi Tajiri; art: Ken Sugimori.
- Fonts in `fonts/` are fan resources; credit original font authors listed in the font metadata.
- API / sprites: PokeAPI (https://pokeapi.co) and PokeAPI sprites (https://github.com/PokeAPI/sprites).

# React Props - Pokedex

Small demo project showcasing React props using a Pokédex-style UI.

## Quick Start (for complete beginners)

1. Get the files
   **Code → Download ZIP** on GitHub, unzip, then `cd` into the folder.

2. Run a local server (one command)

- Python 3:

```bash
python3 -m http.server 8000
```

3. Open the demo

- In your browser go to: `http://localhost:8000`

Tip: always use a local server rather than opening `index.html` with `file://` so remote sprite images load correctly.

## Included Pokémon

- All 151 Generation I Pokémon (Bulbasaur #001 through Mew #151) are defined in `components/Pokedex.js`.

## Credits

- Original game: Pokémon (Red/Blue/Green/Yellow) — developed by Game Freak and published by Nintendo. Concept: Satoshi Tajiri; art: Ken Sugimori.
- Fonts in `fonts/` are fan resources; credit the original font authors listed in the font metadata.
- API / sprites:
  - PokeAPI — https://pokeapi.co (used to fetch Pokémon data).
  - PokeAPI sprites — https://github.com/PokeAPI/sprites (Generation I Yellow sprites are referenced in `components/Pokecard.js`/`components/Pokegame.js`).

If you are the author of any included asset and want a different credit or removal, please open an issue or PR.

Conventional commit example: `refactor(pokecard): add per-character spans and improve font handling`

# React Props - Pokedex

Small demo project showcasing React props using a Pokedex-style UI.

## Overview

This repository contains a small React app (no build step required) that demonstrates component composition and props passing through a Pokédex-style interface.

--

##

If you're new to Git/GitHub and just want to run this demo, follow these exact steps:

1. Get the project files from GitHub

- Open the repository page on GitHub in your browser.
- Click the green **Code** button, then either:
  - Copy the **HTTPS** URL shown (it looks like `https://github.com/username/repo.git`) to clone via terminal, OR
  - Click **Download ZIP** to download a zip file of the project, then unzip it on your computer.

2. Open a Terminal (macOS)

- Press Command+Space, type **Terminal**, and press Enter.

3. Clone the repo (if you copied the URL)

```bash
# replace the URL below with the one you copied from GitHub
git clone https://github.com/username/repo.git "React Props - Pokedex"
cd "React Props - Pokedex"
```

If you downloaded the ZIP, double-click the ZIP to extract it, then `cd` into the extracted folder:

```bash
cd ~/Downloads/React\ Props\ -\ Pokedex
```

4. Start a local server (recommended)

- Using Python 3 (built into modern macOS):

```bash
python3 -m http.server 8000
```

- Or using Node (if you have Node installed):

```bash
npx serve .
```

5. Open the demo in your browser

- Open your browser and go to `http://localhost:8000` (or the URL printed by `npx serve`).

Quick tips:

- If images look missing or sprites fail to load, ensure you used a local server (don't open `index.html` via `file://`).
- If you need help copying the GitHub URL, click **Code** on the repo page and then the clipboard icon next to the HTTPS URL.

## Credits

- Original game: Pokémon (Red / Blue / Green / Yellow era) — developed by Game Freak and published by Nintendo. Original concept by Satoshi Tajiri; character art by Ken Sugimori.
- Fonts included (fan resources): `Pokemon Classic.ttf`, `pokemon-red-blue-green-yellow-edition-font.otf`, and `pokemon-red-blue-green-yellow-edition-font.ttf` in the `fonts/` directory. These are not official Nintendo fonts — credit any original fan author listed in the font metadata; contact the repo owner to add an explicit attribution if you are the font author.

- API / data sources: this demo specifically uses resources from PokeAPI and its sprites repository:
  - PokeAPI: https://pokeapi.co — used to fetch the list of Generation I Pokémon in `components/Pokegame.js` (example request: `https://pokeapi.co/api/v2/pokemon?limit=151`). Please follow PokeAPI's terms and attribution guidance: https://pokeapi.co/docs/v2
  - PokeAPI Sprites (GitHub): https://github.com/PokeAPI/sprites — Generation I (Yellow) sprite images are referenced directly via raw URLs hosted on GitHub (example: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-i/yellow/<id>.png`). Credit the PokeAPI sprites maintainers and follow the sprite repo license if you reuse the images.

If you are the author of any asset included here (font, sprite, or other), and you prefer a different credit line or removal, please open an issue or submit a PR.

```

```

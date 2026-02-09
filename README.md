cat > README.md << 'EOF'
# DOT

DOT foundation repo (HTML/CSS/JS). Source lives in `/src`. GitHub Pages serves `/docs`.

## Project Structure

- `src/` — **source of truth** (edit here)
  - `index.html`
  - `styles/`
  - `scripts/`
  - `assets/`
  - `prototypes/`
- `docs/` — **deployment output** (auto-generated from `src/`)
- `deploy.sh` — rebuilds `docs/` from `src/`

## Local Development

### Option A: Python server (recommended)
From repo root:

```bash
python3 -m http.server 5173 --directory src

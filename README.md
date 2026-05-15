# Personal Academic Website

My personal academic website, built with [Hugo](https://gohugo.io/) and the [HugoBlox Academic CV](https://github.com/HugoBlox/hugo-theme-academic-cv) theme, hosted on GitHub Pages.

## Local development

Prerequisites (already installed on this machine):
- Hugo Extended (`hugo version`)
- Node.js + npm (`node --version`)
- Go (`go version`)

```powershell
# One-time, after fresh clone:
hugo mod tidy
npm install

# Run a live-reloading local server at http://localhost:1313
$env:Path = "$PWD\node_modules\.bin;$env:Path"; hugo server
```

The Tailwind binary lives in `node_modules\.bin`, so it must be on `PATH` before `hugo` is run.

## Editing content

Every page is plain Markdown. Edit the file, save, and the local server hot-reloads.

| What you want to change | File or folder |
| --- | --- |
| Name, bio, photo, education, skills, awards, social links | `content/authors/me/_index.md` and image at `content/authors/me/avatar.jpg` |
| Homepage layout (which sections show) | `content/_index.md` |
| CV / Experience page | `content/experience.md` plus the `work` / `education` / `awards` blocks in `content/authors/me/_index.md` |
| Research projects | `content/research/<project-slug>/index.md` (add `featured.png` to that folder for a card image) |
| Extracurricular items | `content/extracurricular/<activity-slug>/index.md` |
| News posts | `content/blog/<post-slug>/index.md` |
| Talks / events | `content/events/<event-slug>/index.md` |
| Site title, tagline, theme colors | `config/_default/params.yaml` |
| Navigation menu | `config/_default/menus.yaml` |
| Site URL (`baseURL`) | `config/_default/hugo.yaml` |
| Your CV PDF (the Download CV button) | drop the file at `static/uploads/resume.pdf` |

Search for `<<REPLACE ME>>` in the repo to find every spot that needs your info.

## Adding a research project

1. Create `content/research/my-cool-project/index.md`.
2. Copy the front matter from `content/research/example-project/index.md`.
3. Set `categories:` to the field name (e.g. `Computer Vision`, `NLP`, `Robotics`) — this is how items get grouped by field.
4. Drop a square-ish image as `featured.png` in the same folder.
5. Save. The project appears on `/research/`.

## Adding an extracurricular item

Same pattern as research, in `content/extracurricular/<slug>/`.

## Adding a news post

Create `content/blog/<slug>/index.md` with `date:` set; it'll show on the homepage News section, newest first.

## Deploying to GitHub Pages

1. Create a repo on GitHub named `<your-username>.github.io` (using your account name makes it deploy at `https://<your-username>.github.io/`).
2. Push this directory to that repo:
   ```powershell
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. On GitHub, go to **Settings → Pages**. Under "Build and deployment", set **Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will build and publish on every push to `main`.

> Note: edit `baseURL` in `config/_default/hugo.yaml` to your GitHub Pages URL before the first deploy, otherwise links and assets will point at `example.com`.

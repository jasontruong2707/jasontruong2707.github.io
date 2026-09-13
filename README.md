# jasontruong2707.github.io

Personal academic website of Nhan (Jason) Truong. Plain HTML and CSS, no build step and no
JavaScript. Published with GitHub Pages from the root of the `main` branch.

## Layout

```
index.html              Home, a research summary with four area tiles
profile.html            Short profile, links out to the CV for detail
research.html           Four area tiles
publications.html       Manuscripts and conference presentations
extracurricular.html    Extracurricular index
news.html               News and talks index

research/               Four area pages (multiphase-flow, turbulent-flow,
                        combustion, machine-learning), each listing its
                        projects as cards, plus one page per project
extracurricular/        One page per activity
news/                   One page per news post
talks/                  One page per talk

css/styles.css          The only stylesheet
img/                    Portrait, section thumbnails, logos
media/<project>/        Figures and simulation videos, one folder per project
uploads/                CV
```

## Editing

Every page is a complete standalone HTML file. The sidebar and footer are copied into each one,
so changing a nav link means changing it in every file:

```bash
grep -rl 'href="/research.html"' --include='*.html' .
```

Paths are root-relative (`/css/styles.css`), which is correct both on GitHub Pages and under a
local server rooted at this directory.

## Preview locally

```bash
python -m http.server 8000
```

Then open http://127.0.0.1:8000. Opening the files directly with `file://` will not work, because
the root-relative paths need a server.

## Updating the CV

Replace `uploads/NhanTruong_CV.pdf`, keeping the same filename. Every link on the site points at
that path, so nothing else needs to change.

## Adding a page

Copy an existing page in the same section, replace the body between the `<h1>` and the footer,
and add a link to it from the section index.

# Library section (saved for later)

Removed from the live X Freeze portfolio on request.
Say **"add library back"** or **"restore library"** to put this section back.

## Files in this folder
- `library.section.html` — full `<section id="posts">` markup
- `posts.js` — post data (`XF_POSTS`, `XF_CHIPS`)
- `library.app.js` — `initLibrary()` from app.js
- `library.routes.txt` — path routes to re-add
- `library.css` — styles (also still present in styles.css for easy re-enable)
- `nav-and-script.snippet.html` — nav link + script tag

## Restore checklist
1. Add script before app.js: `<script src="posts.js" defer></script>`
2. Nav: `<a href="/posts">Library</a>`
3. Paste `library.section.html` after Articles section (before Contact)
4. Append `library.app.js` to app.js
5. Routes in app.js pathToSection: `/posts` and `/library` → `posts`
6. vercel.json rewrites for `/posts` and `/library`
7. Copy `posts.js` to site root

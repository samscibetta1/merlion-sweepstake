# World Cup Scores

A mobile-friendly site for posting live World Cup updates to a group of friends who've
drafted teams. Tap **Admin** to add people, assign their teams, create matches, bump
scores, and post text updates. Everyone else sees three tabs: **Live**, **Who owns who**,
and **Updates**.

## Run it locally

Just open `index.html` in any browser. No build step, no dependencies.

Your data is saved automatically in that browser (via localStorage). Use the
**Backup & sharing** section in Admin to export a file or import it on another device.

## Put it online so friends can see it (free)

The fastest way is **Netlify Drop**:

1. Go to https://app.netlify.com/drop
2. Drag this whole `Fifa Scores` folder onto the page.
3. You get a public link to share with the group.

(Or use GitHub Pages, Vercel, Cloudflare Pages — any static host works.)

## Important: making updates show up on friends' phones

Right now the app stores data **in the browser it's used in**. That means when you host it
and post updates, *your* phone sees them — but your friends' phones each start with their
own empty copy. To get true live, shared updates that everyone sees, the site needs a
small shared backend.

The cleanest option is **Firebase Realtime Database** (free, ~5 minutes):
- You create a free Firebase project and paste its config into the app.
- After that, every score change and update you make appears on everyone's screen live.

The code is structured so this can be added without rewriting anything. Ask Claude to
"wire up Firebase for live sync" and provide your Firebase config when ready.

## Files

- `index.html` — markup and layout
- `styles.css` — styling (dark, pitch-green theme)
- `app.js` — all the logic and data handling

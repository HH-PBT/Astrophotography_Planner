# Installing Night Plan on the phone

The app is now six files. They must be served over http or https — not opened from
disk — because the service worker that makes it installable and offline-capable is not
allowed to run on a `file://` page.

## GitHub Pages, about five minutes

1. Make a new repository. Public is simplest; private works on a paid plan.
2. Upload the contents of this folder to the root of the repo: `index.html`,
   `manifest.webmanifest`, `sw.js`, and the three PNG icons. Don't nest them in a
   subfolder — everything is referenced relatively, so the folder root must be the site
   root.
3. Settings → Pages → Source: *Deploy from a branch*, branch `main`, folder `/ (root)`.
4. Wait a minute, then open `https://<your-username>.github.io/<repo>/` on the phone in
   Chrome.
5. Chrome menu → **Add to Home screen** → Install. It will offer *Install* rather than
   *Add shortcut*, which is the sign the manifest was read properly.

Open it from the home screen and there's no address bar, no tab strip, no
pull-to-refresh, and it opens from cache in well under a second.

Any other static host works the same way: Netlify Drop, Cloudflare Pages, or an S3
bucket. So does a folder served off your own laptop while you're at home
(`py -m http.server` in this directory, then browse to the laptop's IP), though a
hosted copy is less fuss in the field.

## Updating it

Replace `index.html` and bump the `SHELL` cache name in `sw.js` (`np-shell-v3` →
`np-shell-v4`). The running app notices the new version, tells you, and puts an
**Update** button in Setup. Nothing is lost when it reloads — settings, the imaged log,
horizons and photos all live in the browser's own storage, separate from the cached app.

## What's stored where

- Settings, imaged log, notes, horizons: localStorage.
- Photos: IndexedDB, and the app asks the browser to mark that storage permanent so it
  is not treated as a disposable cache. An installed app is granted this readily; a
  browser tab sometimes isn't.
- Survey cutouts you've already looked at: cached by the service worker, capped at 160,
  so previously opened targets still show a picture with no signal.

Back up occasionally anyway — Setup → *Back up with photos* writes a single JSON with
everything in it.

## The single-file version

`night-plan.html` is the whole app in one file with no service worker. It still works
offline and keeps its data, and it's convenient on the laptop or as a spare copy. It
just can't be installed as an app, and Chrome on Android is inconsistent about letting
`file://` pages keep storage, so don't rely on it as the only copy of a gallery.

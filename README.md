# Night Plan — deep sky session planner

One self-contained HTML file. No install, no account, no server. Open it and it works,
including at a dark site with no signal — only the weather forecast and the survey
images need a connection.

## Getting it on the phone

Two builds ship together.

**`night-plan-pwa.zip`** is the installable app: six files to drop in a GitHub repo with
Pages turned on. Chrome then offers *Install* rather than *Add shortcut*, and it runs
with no address bar, opens from cache in well under a second, works with no signal, and
keeps its storage permanently. Full steps are in `INSTALL.md` inside the zip.

**`night-plan.html`** is the same app in a single file with no service worker. Handy on
the laptop or as a spare copy, but it can't be installed and Chrome on Android is
inconsistent about letting `file://` pages keep storage.

Either way, **Setup → Back up with photos** writes one JSON containing everything, so
nothing is ever trapped.

## The icon

Cut from your own HOO frame of NGC 6188 — the orange ridge lower left, the blue cavity
upper right, the dark lane between them. It's contrast-lifted a little so it still reads
at 48px in a browser tab, and it's full-bleed at 512px so it survives Android's circular
and rounded masks without a border. The same crop is inlined as the favicon, so the
single-file build carries it too.

## Reading the charts

Every altitude curve carries hour marks along the bottom, and dragging a finger across it
reads out the time, altitude and compass direction under your finger. The cloud chart has
three-hourly labels and the same scrubbing, giving cloud, temperature, how close the air
is to its dew point, wind and rain chance for that hour.

Lists that pick *for a window* — Pick as I go, Swap target, gap suggestions, Quick — now
show the same number they're ordered by: tonight's score adjusted for how much of the slot
the target covers and how high it sits in it. The raw nightly score sits alongside it. The
choice lists also go deeper (top 25 rather than top 10), so a good target that happens to
be eleventh for a slot is still one tap away.

## Feel

Every button, chip and row has a press state and a 44px minimum target. Destructive
actions — removing a block, clearing kept targets, deleting a logged session, unmarking
an object — all come back with an **Undo** in the toast rather than a confirmation dialog
in front of them.

Long screens are grouped rather than scrolled: Setup is six collapsible sections instead
of one column, and each schedule block keeps three actions visible with the rest under
*More for this block*. Waiting shows the shape of the page rather than a spinner. Reduced
motion is respected, keyboard focus is visible, tabs are announced properly to a screen
reader, and the dimmest text on the darkest panel still clears 4.7:1 contrast.

## Gestures

Swipe left and right anywhere to move between the seven tabs. Sheets can be thrown away by
dragging them down from the handle — a short drag springs back, and scrolling inside a
sheet never dismisses it. The Android back button closes a sheet instead of leaving the
app. Sliders and confirmations give a short haptic tick, which can be turned off in
Setup.

## The seven screens

**Tonight** — the dark window for the chosen night, moon phase and how much of the
night it's up for, the cloud forecast hour by hour, and a go / marginal / stay-in
verdict with the reasoning spelled out. Arrows in the header step night by night.

**Plan** — the schedule, and the timing controls that shape it: target count, block
lengths, slew gap, darkness used, and don't-start-before / stop-by times, all in a
collapsible card at the top rather than buried in Setup. Change any of them and the plan
rebuilds around whatever you've locked.

**Different targets** keeps your criteria and walks to a different set, steering away from
what's on screen and from the last few builds, so tapping it wanders through the field
instead of settling on one answer. **Different mix of types** works out which types
dominate the current plan and leans against them, so a night of emission nebulae comes
back with clusters and galaxies in it.

Each block carries two separate decisions on the front of the card. **+ Log 3h** adds the
block's length to that target's time on target, and can be tapped again on another night —
the target stays in the pool, and with *Lean towards what I've started* on it actually gets
preferred until it reaches your goal. **Done for the season** is the other one: it takes the
target out of every list — plan, Quick, swap, gap suggestions, the catalogue — while keeping
every logged minute, until its next apparition 240 days later. The Year ahead view still
shows it, ticked, and any target's page or the log in Images will put it back.

Build it in one shot, or choose *Pick as I go* and select each slot from the top 5 or 10
that fit. Every block has **↻ Another**, which keeps the slot and steps through
everything else that fits it, counter included, touching nothing else in the night.
*Swap target* does the same with a list, plus a search box that reaches the whole
catalogue — including objects your Setup filters would normally hide. Blocks can also be
retimed, locked or removed.

Any stretch of the dark window left empty shows up as its own dashed card, with a
suggestion you can refresh through the ranked alternatives, put straight in, replace with
a search, or hand to the Quick tab with those times already filled in. **+ Add a target** forces anything into the night, shortening the longest
unlocked block if there's no room, and raising the target limit if it has to.

Anything you place by hand is locked, so rebuilds and *Different mix* keep it. *Different
mix* now steers away from what's already on screen, so it genuinely rotates through
alternatives instead of settling on the same best answer. Export to text, CSV or a
calendar file.

**Time on target** — every object's page has a running total of stacked minutes against a
goal you set in Setup (four hours by default), with quick +15/+30/+1h/+2h buttons, an
"Other…" entry for anything else, and a list of individual sessions you can remove. A
scheduled block has a *Log 3h* button that records its own length in one tap.

That total feeds the planner: a target you've started but not finished outscores a fresh
one until it reaches the goal, and one that's past the goal is quietly demoted. Both
behaviours are switchable in Setup, along with the goal itself and the score weight.
"Hide anything I've imaged" now keeps unfinished targets in the list, since those are the
ones worth going back to.

**Images** — everything you've shot. Two views: a gallery grouped by object, and the imaged
log with dates you can correct. Attach photos from here, or from **Add a photo** on any
target's page. Each frame gets a date, a caption for exposure notes, and one can be set as
the object's cover. Open a frame and a slider fades between your image and the survey view
of the same field at the same width, so you can see which faint structure you actually
caught. Your cover image also appears on the object's own page beneath the survey preview.

Stacked JPEG, PNG and WebP work. FITS and TIFF can't be shown by a browser, so export
first. Anything over 8 MB is stored as a high-quality 3200 px copy rather than the full
file, which keeps the browser's storage allowance from filling up — the original stays
wherever you keep it, and the frame says so.

Photos live in this browser's IndexedDB, not in the settings backup, and the app asks the
browser to treat them as permanent rather than a disposable cache. **Setup → Back up with
photos** writes a single JSON that includes them, and restoring it puts them back.

**Quick** — one time frame in, targets out. Set From and To, or tap *From now*, *Next 2h*,
*Rest of tonight*, *All darkness*, or any gap the current plan has left. It uses the same
altitude limit, custom horizon, moon clearance and rig framing as the planner, so anything
it offers is genuinely shootable.

The result is one target at a time, big, with the survey cutout and your sensor outlined
on it — the fastest way to judge whether something is worth the night. **↻ Next** steps
through the ranked list with a counter, the strip underneath jumps straight to any of the
next two dozen, and *Add to the plan* drops it in at the window shown, shortening or
dropping whatever it overlaps and telling you which. With no plan yet, it starts one.

Narrow by nebulae, galaxies or clusters in one tap. Under *Order and filters*: sort by
best fit, biggest, brightest or best known, hide what you've already shot, *Surprise me*,
and *Ignore my Setup filters* — which lifts the size, type, magnitude and catalogue
filters while keeping every visibility rule.

**Targets** — two modes. *Catalogue* is the whole 1,356, searchable and sortable by
tonight's score, popularity, size, or how high it ever gets from your latitude.

*Year ahead* is the season planner: pick any of the next twelve months and see what is
coming into its prime, with hours above your altitude limit inside that month's darkness
and the peak it reaches. Each object is tagged with the month it spends longest in the
dark, so "prime" means exactly that. A *Coming into their prime* panel lists what turns
good over the next three months — the bit you can actually look forward to. Filter to
showpieces, Messier only, things you haven't shot, or things you've started and not
finished. The Messier filter also tells you the truth about your latitude: from Brisbane
two never rise at all (M81 and M82), thirteen never clear 20°, and however keen you are,
no planner can fix that. The whole year for the whole catalogue computes in about 20 ms,
so flicking between months is instant.

**Targets** — the whole catalogue, searchable and sortable by tonight's score,
popularity, size, or how high it ever gets from your latitude. Tap anything for the
detail sheet: framing preview with your sensor outlined, size, magnitude, surface
brightness, altitude curve, moon distance, score breakdown, notes, and links out to
AstroBin and Aladin. Marks for imaged / never-suggest, and a running Messier count.
*Done for the season* and *Force into schedule* are standing instructions: it's saved, and it holds through
rebuilds, filter changes and moving to another night, until you clear it.

**Horizon** — three ways to set your real skyline: trace it from a panorama photo,
type altitudes at the 16 compass points, or import a Stellarium `.hrz` file. You can
also export what you've built as `.hrz`.

**Setup** — location, sky brightness, rig, session shape, visibility rules, filters,
type preferences, and the score weights.

## How the panorama horizon works

Stand where the scope goes and shoot a panorama, ideally a full 360° sweep in daylight.
Load it, and the skyline is traced automatically by looking for where the bright,
blue-biased sky gives way to something darker, then smoothed across columns.

Three things need to be true for the numbers to come out right:

1. **Azimuth at left edge** and **degrees covered** must match the sweep. A full
   panorama starting due north is `0` and `360`.
2. The **0° line** (cyan) sits on flat, open ground.
3. **Photo covers vertically** is the vertical field of view of the photo — about 55°
   for a phone panorama. The app guesses from that, then you can nudge the purple
   reference line and its altitude directly.

Then drag along the photo to fix anything the tracer got wrong — the brush follows
your finger and its width is adjustable. The graph underneath shows the resulting
altitude against azimuth; check a known obstruction reads about right before saving.

## The catalogue

**1,356 objects.** Built as you asked: every Messier object, plus everything in the
DwarfLab atlas you supplied with an apparent size at least as large as the smallest
Messier object — that's **M76 at 1.12′**, the Little Dumbbell. (M40 is a double star and
M73 an asterism, so neither has a real extent.)

The atlas file itself only holds a name and a position, so sizes, types, magnitudes,
surface brightness, constellations and cross-identifications come from **OpenNGC**,
cross-matched by position within 3′ (falling back to 10′). 1,268 of the 1,410 atlas
entries matched directly. Of the rest, the recognisable named ones — Witch Head, Cone,
Jellyfish, Pipe, Dark Doodad, Puppis A, Vela Junior, the Local Group dwarfs and others —
were added by hand; the remainder are anonymous PGC/UGC/ESO galaxies with no size data
anywhere, which would have failed the size cut in any case.

Two additions worth knowing about, both marked "outside atlas" in the target list:

- **The Caldwell catalogue and a set of showpieces the atlas leaves out** — NGC 6752,
  the Bug, the Eight-Burst, Cat's Eye, NGC 3576, the Veil, the Heart and Soul. Without
  them the planner would have had visible holes in the southern sky.
- Those extras keep their true sizes even below 1.12′, so the small bright planetaries
  are there if you want them. They're hidden by the default minimum size of 1.1′ —
  drop **Setup → Smallest size** to about 0.4 to see them.

**Popularity is an estimate, not an AstroBin count.** AstroBin's image counts aren't
available without an API key and per-object requests, so the figure is derived from
catalogue fame, brightness, size and object class, with a curated floor for about 120
known showpieces. It behaves sensibly — M42 at 100, an anonymous PGC galaxy at 1 — but
it is a proxy. Any object's value can be overwritten in its detail sheet under *Fix the
catalogue entry*, and the sheet links straight to an AstroBin search if you want to
check a number yourself.

## How targets get ranked

Seven weighted terms, all visible per block under *Score breakdown* and all adjustable
in Setup:

| Term | What it measures |
|---|---|
| Framing | how much of your frame the object fills — best between about 30% and 100%, penalised for specks and for overflow |
| Type preference | your sliders, with part of the nudge passed to related types (asking for emission nebulae also lifts cluster-with-nebulosity) |
| Window length | usable minutes against your preferred block length |
| Altitude | peak altitude and airmass through the window |
| Popularity | the estimate above |
| Brightness | surface brightness against your Bortle class and the moon |
| Moon | distance from the moon, scaled by illumination, softened if you're shooting narrowband |

The scheduler then lays blocks into the dark window, placing each target where it sits
highest, honouring your slew gap and your minimum and maximum target count. It runs
many randomised passes and keeps the best total, which is what *Different mix* re-rolls.
Locked and retimed blocks are laid down first and never moved.

## Rig presets

Dwarf 3 telephoto (2.93° × 1.65°, 2.75″/px) and wide angle; Draco telephoto in both
2×2 binned (1.87° × 1.05°, 1.45″/px) and full 50 MP (0.73″/px) modes, plus its
ultra-wide; Seestar S50; and a custom rig where you enter focal length, sensor pixels
and pixel size. Mosaic panels multiply the field, and a rotation angle feeds the
framing preview. Draco numbers come from DwarfLab's published specs and the field of
view listed in the Atlas app — worth re-checking against your unit when it arrives.

## Accuracy

Sun and moon positions were checked against pyephem: sun altitude agrees to 0.005°,
moon illumination to 0.0006, moon altitude to under 1° (the moon uses a truncated
series and geocentric positions, which is far finer than any planning decision needs).
Catalogue positions are precessed from J2000 to the night being planned.

## What I'd add next

- Field rotation warnings for alt-az work, which don't matter in EQ mode but would for
  a future rig.
- Comets and a supernova feed, which Clear Night Coach carries and which need a live
  data source.
- A "Plan B" branch that reshuffles when cloud arrives mid-session.
- Hooking the imaged log to your subframe inspector, so a session marks itself off.

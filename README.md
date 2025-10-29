# myfam360

Vite + React starter (JavaScript) with:
- Firebase Auth + Firestore
- Zustand for auth state
- React Router
- Tailwind CSS (mobile-first)
- PWA support via vite-plugin-pwa

## Quick start

1. Install deps:
```bash
npm install
```

2. Run dev server:
```bash
npm run dev
```

3. Build:
```bash
npm run build
```

## Notes

- Firebase config is provided via `.env`. Ensure values are correct.
- For production, set `VITE_ENV=prod`.
- Add proper Firestore security rules before heavy use.


## Firebase Hosting deploy

1. Install Firebase CLI (if not installed):
```bash
npm install -g firebase-tools
```
2. Login and initialize (only the first time):
```bash
firebase login
firebase init hosting
# - Use existing project: fam360-official (or choose your project)
# - Set public directory to `dist`
# - Configure as single-page app: Yes
# - Do not overwrite `index.html` when asked (choose 'No')
```
3. Build and deploy:
```bash
npm run build
firebase deploy --only hosting
```

## Firestore rules
A sample `firestore.rules` file is included in the project root. Review and adapt the rules to match your family membership model before deploying to production.

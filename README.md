# NextJS Skeleton

## Installation

### Web
1. Open `web` project: `cd web`
2. Install dependencies: `npm i`
3. Run local server: `npm run dev`
4. Open web local project: `http://127.0.0.1:3000/`

### Firebase
1. Open `functions` project: `cd firebase/functions`
2. Install dependencies: `npm i`
3. Build project and watch: `npm run build:watch`
4. Start Firebase emulators: `npm run dev`
5. Open Firebase local control panel: `http://127.0.0.1:4000/`

## Customization

### Firebase
1. Change following files to change Firebase project:
   - `firebase/.firebaserc`
   - `firebase/config.json`

### Locales
1. Define available locales and default locale:
   - `web/next.config.js`

## Fetch skeleton
1. Fetch the skeleton repository: `git fetch --all`
2. Merge updates into current project: `git merge template/master --allow-unrelated-histories`

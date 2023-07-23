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
2. (OPTIONAL) Change region of cloud functions (default: `europe-west3`):
   - `firebase/functions/src/index.ts`

### Locales
1. Define available locales and default locale:
   - `web/next.config.js`

## Deployment configuration
1. Go to `https://console.cloud.google.com/iam-admin/serviceaccounts?authuser=0&hl=en&project=###_PROJECT_ID_###`
2. Click on the email starting with `firebase-adminsdk`
3. Click on `Keys`
4. Click on `ADD KEY`
5. Click on `Create new key`
6. Select `JSON`
7. Click `Create`
8. JSON file will be automatically downloaded
9. Copy the content of the downloaded file
10. Create new repository secret with name `GCP_SA_KEY` and content the copied content of the JSON file
11. Go to `https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com?project=###_PROJECT_ID_###`
12. Click `ENABLE`
13. Go to `https://console.cloud.google.com/apis/library/artifactregistry.googleapis.com?project=###_PROJECT_ID_###`
14. Click `ENABLE`
15. Go to `https://console.cloud.google.com/apis/library/iam.googleapis.com?project=###_PROJECT_ID_###`
16. Click `ENABLE`
17. Open `https://console.cloud.google.com/iam-admin/iam?project=###_PROJECT_ID_###`
18. Click on the `pencil` icon on the line where `Name` is `firebase-adminsdk`
19. Make sure following roles are assigned: 
    - `Service Account User`
20. Click `SAVE`

## Fetch skeleton
1. Define skeleton repository: `git remote add template git@github.com:monterway/nextjs-skeleton.git`
2. Fetch the skeleton repository: `git fetch --all`
3. Merge updates into current project: `git merge template/master --allow-unrelated-histories`

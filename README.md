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
   - `web/src/core/services/Firebase/FirebaseFunctions.ts`

### Locales
1. Define available locales and default locale:
   - `web/next.config.js`

## Create project in Firebase Console
1. Go to `https://console.firebase.google.com/`
2. Create new project
3. Check the `Enable Google Analytics for this project` checkbox
4. Click `Continue`
5. Under `Choose or create a Google Analytics account` choose `Default Account for Firebase`
6. Click `Create project`
7. Wait few seconds to create project
8. Click `Continue` when project is ready
9. Go to `https://console.firebase.google.com/project/###_PROJECT_ID_###/settings/general`
10. Under `Your apps` click on the `tag` icon
11. Under `App nickname` write `Web`
12. Click on `Register app`
13. Copy the `firebaseConfig` object and place in the JSON file `firebase/config.json`
14. Click on `Continue to console`
15. From the sidebar choose `Build`
16. Then `Authentication`
17. Click `Get started`
18. Choose the sign-in methods you want to enable
    - `Google`
      - Click on the `Enable` toggle
      - Under `Support email for project` choose one of the emails, which will be used for support
      - Click `Save`
19. From the sidebar choose `Build`
20. Then `Firestore Database`
21. Click `Create database`
22. Choose `Start in production mode`
23. Click `Next`
24. Under `Cloud Firestore location` choose region (recommended `europe-west3`)
25. Click `Enable`
26. From the sidebar choose `Build`
27. Then `Functions`
28. Click `Upgrade project`
29. Under `Your billing accounts` choose the account, which credit card will be charged
30. Click `Continue`
31. Under `Budget amount in USD` write the budget for the cloud functions (recommended `10`)
32. Click `Continue`
33. Click `Purchase`
34. When ready close the modal
35. Click `Get started`
36. Click `Continue`
37. Click `Finish`
38. Go to `https://console.cloud.google.com/iam-admin/serviceaccounts?authuser=0&hl=en&project=###_PROJECT_ID_###`
39. Click on the email starting with `firebase-adminsdk`
40. Click on `Keys`
41. Click on `ADD KEY`
42. Click on `Create new key`
43. Select `JSON`
44. Click `Create`
45. JSON file will be automatically downloaded
46. Copy the content of the downloaded file
47. Create new repository secret with name `GCP_SA_KEY` and content the copied content of the JSON file
48. Go to `https://console.cloud.google.com/apis/library/cloudbuild.googleapis.com?project=###_PROJECT_ID_###`
49. Click `ENABLE`
50. Go to `https://console.cloud.google.com/apis/library/artifactregistry.googleapis.com?project=###_PROJECT_ID_###`
51. Click `ENABLE`
52. Go to `https://console.cloud.google.com/apis/library/iam.googleapis.com?project=###_PROJECT_ID_###`
53. Click `ENABLE`
54. Open `https://console.cloud.google.com/iam-admin/iam?project=###_PROJECT_ID_###`
55. Click on the `pencil` icon on the line where `Name` is `firebase-adminsdk`
56. Make sure following roles are assigned: 
    - `Service Account User`
    - `Firebase Rules Admin`
    - `Cloud Datastore Index Admin`
57. Click `SAVE`

## Fetch skeleton
1. Define skeleton repository: `git remote add template git@github.com:monterway/nextjs-skeleton.git`
2. Fetch the skeleton repository: `git fetch --all`
3. Merge updates into current project: `git merge template/master --allow-unrelated-histories`

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

## Project setup
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
58. Go to `https://vercel.com/`
59. Click `Add New`
60. Choose `Project`
61. Click `Import` on the project repository
62. Under `Root Directory` click `Edit`
63. Click on the circle next to the `web` folder
64. Click `Continue`
65. Under `Framework Preset` choose `Next.js`
66. Click `Deploy`
67. Go to `https://vercel.com/`
68. Click on the project
69. Click `Settings`
70. Click `Domains`
71. Copy the domain
72. Go to `https://console.firebase.google.com/project/###_PROJECT_ID_###/authentication/settings`
73. Click `Authorized domains`
74. Click `Add domain`
75. Paste the copied domain from step 71
76. Click `Add`
77. Set up the mailing configuration inside `firebase/functions/src/app/config/MailingConfig.ts`
    - `Gmail`:
      - Go to `https://myaccount.google.com/`
      - Click `Security`
      - Click `2-Step Verification`
      - If not enabled, enable 2-Step Verification
      - Click on `App passwords`
      - Under `App name` write `Cloud functions mailing`
      - Click `Create`
      - Copy the password
      - Go to `firebase/functions/src/app/config/MailingConfig.ts`
      - Paste the password inside `auth.pass`
      - In `host` write `smtp.gmail.com`
      - In `port` write `465`
      - In `secure` write `true`
      - In `auth.user` write the Gmail email address; Example: `example@gmail.com`
      - In `fromName` write your first name and last name; Example: `John Doe`
      - In `fromEmail` write the Gmail email address; Example: `example@gmail.com`

## Fetch skeleton
1. Define skeleton repository: `git remote add template git@github.com:monterway/nextjs-skeleton.git`
2. Fetch the skeleton repository: `git fetch --all`
3. Merge updates into current project: `git merge template/master --allow-unrelated-histories`

## Translations
The file with the translations for both cloud functions and web are located inside the `translations.json` file.
Inside it you will see `"// DYNAMIC": "DYNAMIC",` line.
The custom translations should be located before it.
Under it are the translations, which are used by component, which are building the translation key dynamically and can't be found be directly searching for the translation key string inside the projects.

### Translation patterns
#### Used by `web/src/core/components/atoms/FormField/FormField.tsx`
1. `form_###_FORM_ID_###_field_###_FIELD_ID_###_label`: Label of a form field
2. `form_###_FORM_ID_###_field_###_FIELD_ID_###_placeholder`: Placeholder of a form field
3. `form_###_FORM_ID_###_field_###_FIELD_ID_###_option_###_OPTION_ID_###`: Option label in `<select>`
4. `form_###_FORM_ID_###_field_###_FIELD_ID_###_option_###_OPTION_ID_###`: Option label in `<select>`
#### Used by `firebase/functions/src/core/modules/Validator/Validator.ts`
1. `fields_###_FIELD_ID_###`: Name of field
2. `messages_###_VALIDATION_RULE_###`: Message for rule
   - `{{ rule }}`: can be used inside the translation to output name of the field, which didn't pass the validation
#### Used by `web/pages/_app.tsx` (SEO)
1. `###_ROUTE_PATH_###_title`: Title of the page
2. `###_ROUTE_PATH_###_description`: Meta description of the page

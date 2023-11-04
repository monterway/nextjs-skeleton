import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const App: functions.CloudFunction<admin.firestore.QueryDocumentSnapshot>[] =
  [];

export default App;

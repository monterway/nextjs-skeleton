import * as functions from 'firebase-functions';

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

export const createTranslation = functions.firestore.document('translations/{docId}').onCreate((change, context) => {
  console.log(change);
  functions.logger.info('TEST IN CONSOLE', { structuredData: true });
  console.log('TEST IN CONSOLE');
});

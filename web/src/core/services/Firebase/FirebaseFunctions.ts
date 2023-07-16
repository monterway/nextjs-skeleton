import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import FirebaseApp from './FirebaseApp';
import firebaseConfig from '../../../../firebase/firebase.json';

const FirebaseFunctions = getFunctions(FirebaseApp);

if (process.env.NODE_ENV === 'development') {
  connectFunctionsEmulator(FirebaseFunctions, '127.0.0.1', firebaseConfig.emulators.functions.port);
}

export default FirebaseFunctions;

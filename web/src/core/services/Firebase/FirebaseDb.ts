import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import FirebaseApp from './FirebaseApp';
import firebaseConfig from '../../../../../firebase/firebase.json';

const FirebaseDb = getFirestore(FirebaseApp);

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(FirebaseDb, '127.0.0.1', firebaseConfig.emulators.firestore.port);
}

export default FirebaseDb;

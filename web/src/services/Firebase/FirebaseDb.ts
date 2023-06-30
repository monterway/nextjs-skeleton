import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import FirebaseApp from './FirebaseApp';
import firebaseConfig from '../../../../firebase/firebase.json';

const FirebaseDb = getFirestore(FirebaseApp);

if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(FirebaseDb, 'localhost', firebaseConfig.emulators.firestore.port);
}

export default FirebaseDb;

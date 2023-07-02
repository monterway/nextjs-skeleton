import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import FirebaseAuth from '../../services/Firebase/FirebaseAuth';
// import {UserType} from "../../../../types/UserType";
// import {httpsCallable} from "@firebase/functions";
// import FirebaseFunctions from "../../services/Firebase/FirebaseFunctions";

export interface GoogleSignInButton1Props {
  className?: string;
}

const GoogleSignInButton1 = (props: GoogleSignInButton1Props): JSX.Element => {
  const { className = '' } = props;

  const onClick = (): void => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(FirebaseAuth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential === null) {
        return;
      }
      // const token = credential.accessToken;
      // const user = result.user;
      // console.log(user);

      // const userEndpoint = httpsCallable(FirebaseFunctions, 'api/me');
      // userEndpoint().then((response) => {
      //   const user = response.data as UserType|null;
      //   console.log(user);
      // }).catch((error) => {
      //   console.log(error);
      // });
    });
  };

  return (
    <button onClick={onClick} className={`btn btn-primary ${className ?? ''}`}>
      Sign up
    </button>
  );
};

export default GoogleSignInButton1;

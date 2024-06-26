import { signInWithGooglePopUp, createUserDocumentFromAuth  } from "../../utils/firebase/firebase.utils";


const SignIn = () =>{
  const logGoogleUser = async () =>{
    const {user} = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user)
  }

  return(
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>
        Sign In With Google PopUp
      </button>
    </div>
  )
}

export default SignIn;
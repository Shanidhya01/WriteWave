import { Button } from "flowbite-react";
import { FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../Redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const OAuth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isAuthReady, setIsAuthReady] = useState(false)

  useEffect(() => {
    // Check if Firebase Auth is properly initialized
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthReady(true)
    }, (error) => {
      console.error("Auth state change error:", error)
      setIsAuthReady(false)
    })

    return () => unsubscribe()
  }, [])

  const handleGoogleClick = async () => {
    if (!isAuthReady) {
      alert('Authentication is not ready. Please check Firebase configuration.');
      return;
    }

    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ 
      prompt: 'select_account',
      hd: undefined // Allow any domain
    })
    
    try {
        console.log("Starting Google sign-in...");
        console.log("Auth instance:", auth);
        console.log("Provider:", provider);
        console.log("Auth ready:", isAuthReady);
        
        const resultsFromGoogle = await signInWithPopup(auth, provider)
        console.log("Google sign-in successful, user:", resultsFromGoogle.user.email);
        
        const res = await fetch('/api/auth/google', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: resultsFromGoogle.user.displayName,
            email: resultsFromGoogle.user.email,
            googlePhotoUrl: resultsFromGoogle.user.photoURL
          })
        })
        const data = await res.json()
        console.log("Backend response:", data);
        
        if(res.ok){
          dispatch(signInSuccess(data))
          navigate('/')
        } else {
          console.error("Backend error:", data);
          alert(`Authentication failed: ${data.message || 'Unknown error'}`);
        }
    } catch (error) {
      console.error("Google sign-in error:", error);
      
      if (error.code === 'auth/configuration-not-found') {
        alert(`Google Sign-In configuration issue. Please ensure:
        1. Google provider is enabled in Firebase Console
        2. OAuth consent screen is configured in Google Cloud Console
        3. Authorized domains include your current domain
        
        Error details: ${error.message}`);
      } else if (error.code === 'auth/popup-blocked') {
        alert('Popup was blocked by browser. Please allow popups for this site.');
      } else if (error.code === 'auth/popup-closed-by-user') {
        alert('Sign-in cancelled by user.');
      } else {
        alert(`Sign-in failed: ${error.message}`);
      }
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="greenToBlue"
      outline
      onClick={handleGoogleClick}
    >
      <FcGoogle className="w-6 h-6 mr-2" />
      Continue with Google
    </Button>
  );
};

export default OAuth;

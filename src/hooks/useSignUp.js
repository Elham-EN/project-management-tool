import { useEffect, useState } from "react";
import {
  authService,
  storageService,
  firestoreService,
} from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(null);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);

  const signup = async (email, password, displayName, thumbnail) => {
    setError(null);
    setIsPending(true);
    try {
      //Sign up the user (Create new user)
      const res = await authService.createUserWithEmailAndPassword(
        email,
        password
      );
      //If network connection is bad
      if (!res) {
        throw new Error("Could not complete signup");
      }
      //The path to upload user thumbnail into the storage bucket
      const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
      const img = await storageService.ref(uploadPath).put(thumbnail);
      //Get the image url from the bucket storage
      const imgUrl = await img.ref.getDownloadURL();
      //Add display name to user and add an image for the user. First
      //need to upload the image into the storage
      await res.user.updateProfile({
        displayName: displayName,
        photoURL: imgUrl,
      });
      //Create a user document and using User UId as document id
      await firestoreService.collection("users").doc(res.user.uid).set({
        online: true,
        displayName: displayName,
        photoURL: imgUrl,
      });
      //Update the state
      dispatch({ type: "LOGIN", payload: res.user });
      if (!isCancelled) {
        setError(null);
        setIsPending(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  //fire just onces when signing up the user
  useEffect(() => {
    setIsCancelled(false);
    //Clean up function. Whenever this component unmount using this hook,
    //if we navigate away then this clean up function is invoke.
    return () => setIsCancelled(true);
  }, []);
  return { signup, error, isPending };
};

import { useEffect, useState } from "react";
import { authService, firestoreService } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);
    try {
      //Sign the user in
      const res = await authService.signInWithEmailAndPassword(email, password);
      //Change user status to online
      await firestoreService.collection("users").doc(res.user.uid).update({
        online: true,
      });
      //dispatch login action
      dispatch({ type: "LOGIN", payload: res.user });
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  //fire just onces when logging out
  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);
  return { login, isPending, error };
};

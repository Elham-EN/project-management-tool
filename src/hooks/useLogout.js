import { useEffect, useState } from "react";
import { authService, firestoreService } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch, user } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //Allow users that are logged into the app to edit
      //their own data, not those who logged out
      //Update online status
      const uid = authService.currentUser.uid;

      await firestoreService
        .collection("users")
        .doc(uid)
        .update({ online: false });

      //Sign the user out
      await authService.signOut();

      //dispatch logout action
      dispatch({ type: "LOGOUT" });

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
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { logout, isPending, error };
};

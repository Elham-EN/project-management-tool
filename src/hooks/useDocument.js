import { useState, useEffect } from "react";
import { firestoreService } from "../firebase/config";

export function useDocument(collection, id) {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  //Real-time data for document
  useEffect(() => {
    //Get a reference to the document
    const ref = firestoreService.collection(collection).doc(id);
    //Get a real-time update on that document, inside the snapshot fire a function
    //everytime we get an snapshot from the database of that document. The snapshot
    //object represent that document in the database, that we have reference to.
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        if (snapshot.data()) {
          setDocument({ ...snapshot.data(), id: snapshot.id });
          setError(null);
        } else {
          setError(`This project with id: ${id} does not exist`);
        }
      },
      (error) => {
        console.log(error);
        setError("Failed to get the document");
      }
    );
    return () => unsubscribe(); //return a cleanup function
  }, [collection, id]);
  return { document, error };
}

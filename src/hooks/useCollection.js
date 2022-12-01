import { useEffect, useState, useRef } from "react";
import { firestoreService } from "../firebase/config";

export default function useCollection(collection, _query, _orderBy) {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = firestoreService.collection(collection);
    //If include query
    if (query) {
      console.log(query);
      //Retrieve documents based on the query
      ref = ref.where(...query);
    }
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        //update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data");
      }
    );
    //Unsubscribe from the real-time listener on unmount component
    return () => unsubscribe;
  }, [collection, query, orderBy]);
  return { documents, error };
}

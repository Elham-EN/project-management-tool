import { useState, useEffect, useReducer } from "react";
import { firestoreService, timestamp } from "../firebase/config";

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: false,
};

function firestoreReducer(state, action) {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    default:
      return state;
  }
}

export default function useFirestore(collection) {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  //Get a reference to the collection in the firestore
  const ref = firestoreService.collection(collection);
  //Only dispatch is not cancelled
  const dispatchIfNotCancelled = (action) => {
    //Update the state when the component has not unmounted
    if (!isCancelled) {
      dispatch(action);
    }
  };
  //Add a document to the collection
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" }); //Update the state
    try {
      const createdAt = timestamp.fromDate(new Date());
      const addedDocument = await ref.add({ ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };
  //Delete a document from the collection
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const deletedDocument = await ref.doc(id).delete();
      dispatchIfNotCancelled({
        type: "DELETED_DOCUMENT",
        payload: deletedDocument,
      });
    } catch (error) {
      dispatchIfNotCancelled({
        type: "ERROR",
        payload: "Could not delete the item",
      });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response };
}

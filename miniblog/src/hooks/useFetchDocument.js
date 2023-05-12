import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
    doc, getDoc
} from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
    const [document, setDocument] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadDocument() {
            if (cancelled) return;

            setLoading(true);

            try {
                
                const docRef = await doc(db, docCollection, id)
                const docSnap = await getDoc(docRef.data())

                setDocument

            } catch (error) {
                
            }

            
        }

        loadDocument();
    }, [docCollection, search, uid, cancelled]);

    // console.log(document);

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { document, loading, error };
};
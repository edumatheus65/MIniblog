import { db } from "../firebase/config"

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut,
} from "firebase/auth";

import { useEffect, useState } from "react"

export const useAuthentication = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    // Cleanup
    // deal witch memory leak
    const [cancelled, setCancelled] = useState(false);

    const auth = getAuth();

    // Evitar vazamento de memória
    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createUser = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(null)

        try {
            const { user } = await createUserWithEmailAndPassword(
                auth,
                data.email,
                data.password
            );

            await updateProfile(user, {
                displayName: data.displayName,
            });

            setLoading(false);

            return user;
        } catch (error) {
            console.log(error.message);
            console.log(typeof error.message);

            let systemErroMessage

            if (error.message.includes("Password")) {
                systemErroMessage = "A senha precisa ter no mínimo 6 caracters"
            } else if (error.message.includes("email-already")) {
                systemErroMessage = "E-mail já cadastrado."
            } else {
                systemErroMessage = "Ocorreu um erro tente mais tarde"
            }

            setError(systemErroMessage)

            setLoading(false);
            setError(systemErroMessage)
        }
    };

    //   logout - sign out
    const logout = () => {
        checkIfIsCancelled()
        signOut(auth)
    }

    // login - sign in
    const login = async (data) => {
        checkIfIsCancelled();

        setLoading(true);
        setError(false);

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password)
            setLoading(false)

        } catch (error) {
            let systemErroMessage;

            if (error.message.includes("user-not-found")) {
                systemErroMessage = "Usuário não encotrado."
            } else if (error.message.includes("wrong-password")) {
                systemErroMessage = "A senha está incorreta"
            } else {
                systemErroMessage = "Ocorreu um erro, por favor tente mais tarde"
            }
           
            setError(systemErroMessage);
            setLoading(false);
        }       
        
    }

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return {
        auth,
        createUser,
        error,
        logout,
        login,
        loading,
    };
};
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const ProviderContext = createContext();
const googleAuthProvider = new GoogleAuthProvider()
const auth = getAuth(app)

const Provider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic()

    const createUser = (email, password, displayName, photoURL) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // After creating the user, update the display name and photoURL
                const promises = [];

                if (displayName) {
                    promises.push(updateProfile(userCredential.user, { displayName }));
                }

                if (photoURL) {
                    promises.push(updateProfile(userCredential.user, { photoURL }));
                }

                return Promise.all(promises)
                    .then(() => {
                        // Update the local user state with the display name and photoURL
                        setUser({
                            uid: userCredential.user.uid,
                            email: userCredential.user.email,
                            displayName,
                            photoURL,
                        });
                        return userCredential;
                    })
                    .catch((error) => {
                        // Handle error while updating profile
                        console.error("Error updating user profile:", error);
                        throw error;
                    });
            })
            .catch((error) => {
                // Handle error while creating user
                console.error("Error creating user:", error);
                throw error;
            });
    };


    // sign in user through email and password
    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // this is for google sign in users
    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleAuthProvider)
    }

    // this function is for logging out users
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, createUser => {
            setUser(createUser);
            console.log('current user', createUser)
            setLoading(false);
        })
        return () => {
            return unsubscribe()
        }
    }, [axiosPublic])

    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInGoogle,
        logOut,
    }

    return (
        <ProviderContext.Provider value={authInfo}>
            {children}
        </ProviderContext.Provider>
    );
};

export default Provider;




// create a file name .env.local and paste all value after each = sign.
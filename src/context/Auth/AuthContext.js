import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

export const AuthContext = createContext();

// custom context hook to return values
export function useAuthValue() {
    const value = useContext(AuthContext);
    return value;
}

// custom context Provider
export function AuthContextProvider({ children }) {

    // list of all the users in database
    const [userList, setUserList] = useState([]);
    // user who is logged in
    const [userLoggedIn, setUserLoggedIn] = useState(false);


    const auth = getAuth();

    // creating new user
    async function createUser(data) {
        try {
            await createUserWithEmailAndPassword(auth, data.email, data.password);
            console.log('User signed up successfully!');
            return true;
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                toast.error("Error (auth/email-already-in-use).");
            } else {
                toast.error("Please enter valid data!", {
                    toastId: "error1",
                });

                // console.log("Sign UP");
            }
        }
    }

    // sign IN user 
    async function signIn(data) {

        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            console.log('User signed in successfully!');
            setUserLoggedIn(true);
            console.log("login", userLoggedIn);
            return true;
        } catch (error) {
            if (data.password.length < 6) {
                // toast.error("Please enter valid data!");
                console.log("sign IN password length < 6")
            }
            else if (error.code === "auth/invalid-login-credentials") {
                toast.error("Error (auth/wrong-password).");
            }
            throw error;
        }
    }

    // signout function 
    function signOut() {
        signOut(auth);
        setUserLoggedIn(false);
        console.log("logout", userLoggedIn);
        toast.success("Sign Out Successfully!!!!");
    }

    return (
        // context API with values
        <>
            <AuthContext.Provider value={
                {
                    createUser,
                    signIn,
                    userLoggedIn,
                    setUserLoggedIn,
                    signOut
                }
            }>
                {/* <ToastContainer /> */}
                {children}
            </AuthContext.Provider>
        </>
    );
}
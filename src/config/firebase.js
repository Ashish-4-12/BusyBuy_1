
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyDP2WyGUOgmU0LoqbGY_nl8s2f5dHiYvo8",
    authDomain: "busybuy-cn.firebaseapp.com",
    projectId: "busybuy-cn",
    storageBucket: "busybuy-cn.appspot.com",
    messagingSenderId: "447121534531",
    appId: "1:447121534531:web:f6a2eeddb04cacbc70eef6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
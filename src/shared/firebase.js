import firebase from "firebase/app";
//auth사용하기
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCwwZJRQmRbXdDnwVgy919DRw_i7g_ePEE",
    authDomain: "image-community-d3a1e.firebaseapp.com",
    projectId: "image-community-d3a1e",
    storageBucket: "image-community-d3a1e.appspot.com",
    messagingSenderId: "181561193175",
    appId: "1:181561193175:web:791498878e265db8dc3692",
    measurementId: "G-1PM0P33Z3T",
};

firebase.initializeApp(firebaseConfig);

const apikey = firebaseConfig.apiKey;
const auth = firebase.auth();
const firestore = firebase.firestore();
const storage = firebase.storage();
const realtime = firebase.database();

//다른 곳에서 auth를 가지고와서 사용할 수 있도록 만들어줍니다.
export { auth, apikey, firestore, storage, realtime };

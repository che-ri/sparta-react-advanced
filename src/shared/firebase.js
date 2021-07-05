import firebase from "firebase/app";
//auth사용하기
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCwwZJRQmRbXdDnwVgy919DRw_i7g_ePEE",
    authDomain: "image-community-d3a1e.firebaseapp.com",
    projectId: "image-community-d3a1e",
    storageBucket: "image-community-d3a1e.appspot.com",
    messagingSenderId: "181561193175",
    appId: "1:181561193175:web:791498878e265db8dc3692",
    measurementId: "G-1PM0P33Z3T",
};

//초기화해줍니다!
firebase.initializeApp(firebaseConfig);

//다른 곳에서 auth를 가지고와서 사용할 수 있도록 만들어줍니다.
const auth = firebase.auth();
export { auth };

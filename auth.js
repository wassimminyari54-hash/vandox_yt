// استيراد الوظائف الضرورية من Firebase عبر CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// الإعدادات اللي جبتي من Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAHerXxCb6wqeHvUXuFB5KOiKcVHg4jEeU",
  authDomain: "vandox.firebaseapp.com",
  projectId: "vandox",
  storageBucket: "vandox.firebasestorage.app",
  messagingSenderId: "953994388305",
  appId: "1:953994388305:web:1e03e39f3c87799131e970",
  measurementId: "G-STKNS271B2"
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// دالة إنشاء حساب (لصفحة signup.html)
export async function signUpUser(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User Created:", userCredential.user);
        alert("تم إنشاء الحساب بنجاح! مرحبا بك في Vandox YT");
        window.location.href = "index.html"; 
    } catch (error) {
        alert("Error: " + error.message);
    }
}

// دالة تسجيل الدخول (لصفحة login.html)
export async function loginUser(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("Logged In:", userCredential.user);
        alert("مرحباً بعودتك!");
        window.location.href = "index.html";
    } catch (error) {
        alert("خطأ في الدخول: تأكد من الإيميل وكلمة السر");
    }
}
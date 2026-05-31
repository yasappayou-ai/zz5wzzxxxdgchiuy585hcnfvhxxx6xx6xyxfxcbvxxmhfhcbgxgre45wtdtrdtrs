// --- Mobile Menu Toggle ---
const mobileMenuBtn = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '70px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(2, 8, 19, 0.95)';
        navLinks.style.padding = '20px 0';
        navLinks.style.textAlign = 'center';
    }
});

// --- Dynamic Background Stars Animation ---
function createStars() {
    const container = document.getElementById('particles');
    const starCount = 50;

    for (let i = 0; i < starCount; i++) {
        let star = document.createElement('div');
        star.classList.add('star');
        
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        let size = Math.random() * 2 + 1;
        let duration = Math.random() * 3 + 2;
        let delay = Math.random() * 2;

        star.style.left = `${x}vw`;
        star.style.top = `${y}vh`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        container.appendChild(star);
    }
}

document.addEventListener('DOMContentLoaded', createStars);

// --- Firebase Configuration & Integration ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQ5bxMakYqyraD7vToxgkMrpWtoOVWsX0",
  authDomain: "youases-website.firebaseapp.com",
  projectId: "youases-website",
  storageBucket: "youases-website.firebasestorage.app",
  messagingSenderId: "445503036368",
  appId: "1:445503036368:web:94e86eb4dfb7a7c52337d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form Submission Handling
const subscribeForm = document.getElementById('subscribe-form');
const emailInput = document.getElementById('email-input');
const submitBtn = document.getElementById('submit-btn');
const formMessage = document.getElementById('form-message');

subscribeForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();

    if (!email) return;

    // Loading state
    const originalBtnText = submitBtn.innerText;
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    try {
        // Save to Firestore 'subscribers' collection
        await addDoc(collection(db, "subscribers"), {
            email: email,
            timestamp: serverTimestamp()
        });

        // Success state
        formMessage.textContent = "Successfully subscribed! Thank you.";
        formMessage.className = "form-message success";
        subscribeForm.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
        formMessage.textContent = "Something went wrong. Please try again.";
        formMessage.className = "form-message error";
    } finally {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = "none";
            formMessage.className = "form-message";
        }, 5000);
    }
});
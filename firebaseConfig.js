import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAXtRyoDukwqzbrxw4X9kAwcMfHJIKFwFs",
  authDomain: "foodiefusion-7d7fd.firebaseapp.com",
  projectId: "foodiefusion-7d7fd",
  storageBucket: "foodiefusion-7d7fd.appspot.com",
  messagingSenderId: "862441769914",
  appId: "1:862441769914:web:aa7d7b097f5f952715eb83",
  measurementId: "G-4NLMWJLQTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'en';
const provider = new GoogleAuthProvider();

// Get the login button, submit recipe button, and user info container elements
const loginButton = document.getElementById("loginButton");
const loginText = document.getElementById("loginText");
const userProfileImg = loginButton.querySelector("img[alt='user-profile']");
const submitRecipeButton = document.getElementById("submitRecipeButton");
const userInfoContainer = document.getElementById("userInfo");

// Handle Google login button click
loginButton.addEventListener("click", () => {
    signInWithPopup(auth, provider)
    .then((result) => {
        const user = result.user;
        console.log(user);

        // Update UI after successful login
        updateUI(user);
    })
    .catch((error) => {
        console.error('Error during sign in:', error);
    });
});

// Get the logout button element
const logoutButton = document.getElementById("logout-btn");

// Handle logout button click
logoutButton.addEventListener("click", () => {
  signOut(auth)
  .then(() => {
      // Sign-out successful.
      console.log("User signed out");
      // Redirect to the homepage or another page
      window.location.href = "main.html"; 
  })
  .catch((error) => {
      // An error happened.
      console.error("Error signing out:", error);
  });
});

let isUIUpdated = false;

function initializeModal() {
  const login = document.getElementById('loginText');
  const modal = document.getElementById('modal-login');

  const showModal = () => {
    modal.style.display = 'block'; // Show the modal when hovered
  };

  const hideModal = () => {
    modal.style.display = 'none'; // Hide the modal when mouseout
  };

  login.addEventListener('mouseover', showModal);
  modal.addEventListener('mouseover', showModal);

  login.addEventListener('mouseout', hideModal);
  modal.addEventListener('mouseout', hideModal);
}

// Function to update UI after successful login
function updateUI(user) {
  isUIUpdated = true;

  // Update the login button text to the user's display name or email
  if (loginText) {
    loginText.textContent = user.displayName || user.email;
  }

  // Update the profile picture to the user's Google profile picture
  if (userProfileImg) {
    userProfileImg.src = user.photoURL;
  }

  // Optionally update user info section with the user's details
  if (userInfoContainer) {
    userInfoContainer.style.display = "block";
    userInfoContainer.innerHTML = `
      <p>Welcome, ${user.displayName}!</p>
      <p>Email: ${user.email}</p>
      <img src="${user.photoURL}" alt="Profile Picture">
    `;
  }

  if (isUIUpdated) {
    initializeModal();
  }
}

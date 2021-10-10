const auth = firebase.auth()
const db = firebase.firestore()

// Get Elements
const whenSignedIn = document.getElementById("signedIn")
const whenSignedOut = document.getElementById("signedOut")

const signInButton = document.getElementById("signInBtn")
const signOutButton = document.getElementById("signOutBtn")

const provider = new firebase.auth.GoogleAuthProvider()

// Google Sign in Button Events
signInButton.onclick = () => auth.signInWithPopup(provider)
signOutButton.onclick = () => auth.signOut()

// On Signin or Signout

auth.onAuthStateChanged(user => {
    if (user) {
        whenSignedIn.hidden = false
        whenSignedOut.hidden = true
        signInButton.hidden = true
        signOutButton.hidden = false
    } else {
        whenSignedIn.hidden = true
        whenSignedOut.hidden = false
        signInButton.hidden = false
        signOutButton.hidden = true
    }
})

// Get Firestore Data

var tutorialsRef = db.collection("tutorials").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        document.querySelector(".container").innerHTML += 
        `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title"> ${doc.get("Title")} </h5>
            <p class="card-text">${doc.get("Description")}</p>
                <div class="author-container d-flex inline align-items-center">
                    <a href="#" class="btn btn-primary">Read  </a>
                    <img src="${doc.get("AuthorProfile")}" alt="Avatar" class="author-pfp ms-4" style="
                        vertical-align: middle;
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                    ">
                    <p class="mb-0 ms-1">${doc.get("AuthorName")}</p>
                </div>
            </div>
        </div>
        `
    })
})
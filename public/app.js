const auth = firebase.auth()

const whenSignedIn = document.getElementById("signedIn")
const whenSignedOut = document.getElementById("signedOut")

const signInButton = document.getElementById("signInBtn")
const signOutButton = document.getElementById("signOutBtn")

const provider = new firebase.auth.GoogleAuthProvider()

signInButton.onclick = () => auth.signInWithPopup(provider)
signOutButton.onclick = () => auth.signOut()

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
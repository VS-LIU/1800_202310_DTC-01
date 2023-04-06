// Initialize the FirebaseUI Widget using Firebase auth.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            var user = authResult.user;
            if (authResult.additionalUserInfo.isNewUser) {
                db.collection("users").doc(user.uid).set({
                    name: user.displayName,
                    email: user.email,
                    country: "Canada",
                    city: "Vancouver"
                }).then(function () {
                    console.log("New user added to firestore");
                    //re-direct to main.html after signup
                    window.location.assign("main.html");
                }).catch(function (error) {
                    console.log("Error adding new user: " + error);
                });
            } else {
                return true;
            }
            return false;
        },
        uiShown: function () {
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: 'main.html', //directs to main page once login successful
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
};
// Start up the authenctication widget's UI
ui.start('#firebaseui-auth-container', uiConfig);
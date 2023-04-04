// const storage = firebase.storage();

function uploadPic(postDocID) {
    console.log("inside uploadPic " + postDocID);
    var storageRef = storage.ref("images/" + postDocID + ".jpg");

    storageRef.put(ImageFile)   //global variable ImageFile

        .then(function () {
            console.log('Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

                .then(function (url) { // Get URL of the uploaded file
                    console.log("Got the download URL.");
                    db.collection("posts").doc(postDocID).update({
                        "image": url // Save the URL into users collection
                    })
                    db.collection("images").add({
                        "image": url // Save the URL into users collection
                    })

                        .then(function () {
                            console.log('Added pic URL to Firestore.');
                        }).then(function () {
                            location.assign("./myListing.html");
                        })
                })
        })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        })
}


var ImageFile;
function listenFileSelect() {

    var fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2


    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        image.src = blob; // Display this image
    })
}
listenFileSelect();


// function to save post id to user's document in database
function saveNewPostID(userUID, postDocID) {
    db.collection("users")
        .doc(userUID)
        .update({
            posts: firebase.firestore.FieldValue.arrayUnion(postDocID)
        })
        .then(() =>
            console.log("Saved to user's document!"))
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
}

function savePost() {
    alert("SAVE POST is triggered");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here. 
            var postTitle = document.getElementById("createTitle").value;
            console.log("postTitle: " + postTitle);
            var postLoc = document.getElementById("createLocation").value;
            var postCatSelect = document.getElementById("createCategory");
            var postCat = postCatSelect.options[postCatSelect.selectedIndex].text;
            console.log("postCat: " + postCat);
            var postDesc = document.getElementById("createDescription").value;
            db.collection("posts").add({
                owner: user.uid,
                title: postTitle,
                location: postLoc,
                category: postCat,
                description: postDesc,
                last_updated: firebase.firestore.FieldValue
                    .serverTimestamp() //current system time
            }).then(doc => {
                console.log("Post document added!");
                console.log(doc.id);
                saveNewPostID(user.uid, doc.id);
                uploadPic(doc.id);
        })
        } else {
            // No user is signed in.
            alert("Error, no user signed in");
            console.log("Error, no user signed in");
        }
    });
}






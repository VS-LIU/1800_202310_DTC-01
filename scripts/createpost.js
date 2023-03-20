// links:
// https://bcit-cst.notion.site/Tech-Tip-B08-When-user-makes-a-post-how-do-I-have-the-post-ID-into-the-user-s-document-899eda82797a4d25bc957dd7c1897201


// const storage = firebase.storage();

// File Selection
var ImageFile;
function listenFileSelect() {
    const image = document.getElementById("mypic-goes-here"); // pointer #2
    // listen for file selection
    var fileInput = document.getElementById("mypic-input"); // pointer #1

    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        image.src = blob; // Display this image
    })
}
listenFileSelect();


// function getFiles() {
//     const image = document.getElementById("mypic-goes-here");
//     const fileSelector = document.getElementById('files');
//     fileSelector.addEventListener('change', (event) => {
//         const fileList = event.target.files;
//         console.log(fileList);

//         // Convert FileList to array
//         const arr = Array.from(fileList);

//         // Loop through an array
//         arr.forEach(file => {
//             console.log(file.name);
//             // do what you would now do for ONE image
//             ImageFile = e.target.files[file];
//             var blob = URL.createObjectURL(ImageFile);
//             image.src = blob; // Display this image

//         })
//     });
// }
// getFiles();


function uploadPic(postDocID) {
    console.log("inside uploadPic " + postDocID);
    var storageRef = storage.ref("images/" + postDocID + ".jpg");

    storageRef.put(ImageFile)   //global variable ImageFile

        // AFTER .put() is done
        .then(function () {
            console.log('Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

                // AFTER .getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file
                    console.log("Got the download URL.");
                    db.collection("posts").doc(postDocID).update({
                        "image": url // Save the URL into users collection
                    })

                        // AFTER .update is done
                        .then(function () {
                            console.log('Added pic URL to Firestore.');
                        })
                })
        })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        })
}


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
            // Define variables for value of each field 
            var postTitle = document.getElementById("createTitle").value;
            console.log("postTitle: " + postTitle);
            var postLoc = document.getElementById("createLocation").value;
            var postCatSelect = document.getElementById("createCategory");
            var postCat = postCatSelect.options[postCatSelect.selectedIndex].text;
            console.log("postCat: " + postCat);
            var postDesc = document.getElementById("createDescription").value;
            // Write post to database
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
                // uploadPic(doc.id);
                // Save post id to user's document in database
                saveNewPostID(user.uid, doc.id);
            })
        } else {
            // No user is signed in.
            console.log("Error, no user signed in");
        }
    });
}


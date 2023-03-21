const storage = firebase.storage();

function uploadPic(postDocID) {
    console.log("inside uploadPic " + postDocID);
    var storageRef = storage.ref("images/" + postDocID + ".jpg");

    storageRef.put(ImageFile)   //global variable ImageFile

    AFTER.put() is done
        .then(function () {
            console.log('Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

            AFTER.getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file
                    console.log("Got the download URL.");
                    db.collection("posts").doc(postDocID).update({
                        "image": url // Save the URL into users collection
                    })

                    AFTER.update is done
                        .then(function () {
                            console.log('Added pic URL to Firestore.');
                        })
                })
        })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        })
}


var ImageFile;
function listenFileSelect() {
listen for file selection
var fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2

 When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        image.src = blob; // Display this image
    })
}
listenFileSelect();

function savePost() {
    alert("SAVE POST is triggered");
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            // Do something for the user here. 
            var desc = document.getElementById("createDescription").value;
            var title = document.getElementById("createTitle").value;
            db.collection("posts").add({
                owner: user.uid,
                title: title,
                description: desc,
                last_updated: firebase.firestore.FieldValue
                    .serverTimestamp() //current system time
            }).then(doc => {
                console.log("Post document added!");
                console.log(doc.id);
                //uploadPic(doc.id);
            })
        } else {
            // No user is signed in.
            console.log("Error, no user signed in");
        }
    });
}
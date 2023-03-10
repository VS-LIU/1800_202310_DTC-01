const storage = firebase.storage();

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
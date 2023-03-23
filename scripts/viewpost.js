// populate page with number of posts (e.g. number of documents from the 'posts' collection)
// populate post page with data from Firestore

// access to firebase, access relevant data, and populate the page with that data

// const storage = firebase.storage();  
// const db = firebase.firestore();

// function uploadPic(postDocID) {
//     console.log("inside uploadPic " + postDocID);
//     var storageRef = storage.ref("images" + postDocID + ".jpg");

//     storageRef.put(ImageFile)   //global variable ImageFile

//         .then(function () {
//             console.log('Uploaded to Cloud Storage.');
//             storageRef.getDownloadURL()

//                 .then(function (url) { // Get URL of the uploaded file
//                     console.log("Got the download URL.");
//                     db.collection("images").add({
//                         "image": url // Save the URL into users collection
//                     })
//                         .then(function () {
//                             console.log('Added pic URL to Firestore.');
//                         })
//                 })
//         })
//         .catch((error) => {
//             console.log("error uploading to cloud storage");
//         })
// }

//function that uploads the listings from the database to the page
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("listingTemplate");
    console.log("hello")

    db.collection("posts").orderBy("last_updated").get() //get all docs from collection and orders them by last_updated
        .then(allListings => {
            // console.log("allListings: " + allListings.docs)
            allListings.forEach(doc => { //iterate thru each doc
                var title = doc.data().title;
                console.log("allListings: " + doc.data().title)

                var description = doc.data().description;
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true);

                //update title and text and image etc.
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = description;
                newcard.querySelector('.card-link').href = `./viewListing.html?${docID}`; //Example: ./viewpost.html?NV01

                // //Finally done modifying newcard
                // //attach to gallery, Example: "hikes-go-here"
                document.getElementById("posts-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}
displayCardsDynamically("posts");
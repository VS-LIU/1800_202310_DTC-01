// const storage = firebase.storage();

//-------------------------------------------------
// this function shows finds out who is logged in,
// reads the "myposts" field (an array) for that user, 
// reads the details for each item in the array
// and displays a card for each item. 
//------------------------------------------------
function showMyPosts() {
    firebase.auth().onAuthStateChanged(user => {
        console.log("user is: " + user.uid);
        db.collection("users").doc(user.uid)
            .get()
            .then(doc => { //'doc' object here is the specific user 
                myposts = doc.data().posts; //get array of all user 'posts' (user.posts)
                console.log(`Line 16: myposts: ${myposts}`);
                myposts.forEach(item => {  // for each item in the user.posts array
                    db.collection("posts")  // go to posts collection
                        .doc(item)  // find the document with the same id of the item
                        .get()
                        .then(doc => {  // 'doc' object here is the specific post
                            console.log(`Line 22 is post object: ${doc.data()}`)
                            console.log(`line 23: db.posts.owner.id ${doc.get("owner")}`)
                            displayMyPostCard(doc); // Pass post object to displayMyPostCard()
                        })
                })
            })
    })
}
showMyPosts();

//------------------------------------------------------------
// this function displays ONE card, with information
// from the post document extracted (name, description, image)
// this function is called by showMyPosts()
//------------------------------------------------------------
function displayMyPostCard(doc) {
    console.log(`line 38a: post object: ${doc.data()}`);
    console.log(`line 38b: db.posts.doc.id: ${doc.id}`);
    //print type of the doc object
    console.log(`line 39: type of doc: ${typeof doc.id}`);

    var title = doc.get("title"); // get value of the "name" key
    // var desc = doc.get("description"); //gets the length field
    var image = doc.get("image"); //the field that contains the URL 

    //define doc id 
    var docID = doc.id;
    var docUID = doc.get("owner");
    console.log(`line 48: db.posts.owner: ${docUID}`)


    //clone the new card
    let newcard = document.getElementById("postCardTemplate").content.cloneNode(true);
    //populate with title, image
    // newcard.querySelector('.card-link').href = `./viewListing.html?docID=${docID}`;
    newcard.querySelector('.card-title').innerHTML = title;
    newcard.querySelector('.card-image').src = image;
    newcard.querySelector('.card-image').setAttribute('onclick', `location.href='./viewListing.html?docID=${docID}'`);
    // Replacing the Id by different docID
    newcard.querySelector('#my-listing-card').setAttribute('id', docID);
    document.getElementById("myposts-go-here").prepend(newcard);

    // newcard.querySelector(docID).addEventListener('click', function () {
    // newcard.addEventListener('click', function () {

    const deleteBtn = document.querySelector('.modaldeleteBtn');
    deleteBtn.addEventListener('click', function () {
        deleteListing(doc);  // passing the post object to deleteListing()
    });
    // });

}
console.log("hello from outside")

function deleteListing(doc) {
    console.log("hello from delete")
    console.log(`line 74: post object in deleteListing: ${doc}`)
    db.collection("posts").doc(doc.id)
        .delete()
        .then(() => {
            console.log("1. Document deleted from Posts collection");
            deleteFromMyPosts(doc);
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    let docUID = doc.get("owner");  // get the owner (user id) of the post
    // db.collection("users")
    //     // .doc(user.uid)
    //     .doc(docUID)  // find the user document with the same id as the owner of the post
    //     .delete({
    //         posts: firebase.firestore.FieldValue.arrayUnion(doc.id)  // remove the post id from the user's posts array
    //     })
    //     .then(() =>
    //     console.log("Deleted post from user's profile"))
    //     .catch((error) =>
    //     console.error("Error deleting document! :("))

}


function deletePost(postid) {
    // var result = confirm("Want to delete?");
    // if (result) {
    //Logic to delete the item
    db.collection("posts").doc(postid.id)
        .delete()
        .then(() => {
            console.log("1. Document deleted from Posts collection");
            deleteFromMyPosts(postid.id);
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    // }
}


function deleteFromMyPosts(post) {
    firebase.auth().onAuthStateChanged(user => {
        db.collection("users").doc(user.uid).update({
            posts: firebase.firestore.FieldValue.arrayRemove(post.id)
        })
            .then(() => {
                console.log("2. post deleted from user doc");
                console.log(`line 127: post id: ${post.id}`);
                console.log(`line 126: post id type: ${typeof post.id}`);
                // deleteFromStorage(postid);
                location.reload()
            })
    })
}


// function deleteFromStorage(postid) {
//     // Create a reference to the file to delete
//     var imageRef = storageRef.child('images/' + postid + '.jpg');

//     // Delete the file
//     imageRef.delete().then(() => {
//         // File deleted successfully
//         console.log("3. image deleted from storage");
//         alert("DELETE is completed!");
//         location.reload();
//     }).catch((error) => {
//         // Uh-oh, an error occurred!
//     });
// }
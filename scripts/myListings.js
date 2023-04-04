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
            .then(doc => {
                myposts = doc.data().posts; //get array of my posts
                console.log(myposts);
                myposts.forEach(item => {
                    db.collection("posts")
                        .doc(item)
                        .get()
                        .then(doc => {
                            console.log("AAAAAAAAAAAAAAAAAAAAAAAAA", doc.data())
                            console.log(doc.get("owner"))
                            displayMyPostCard(doc);
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
    console.log(doc.data());
    var title = doc.get("title"); // get value of the "name" key
    // var desc = doc.get("description"); //gets the length field
    var image = doc.get("image"); //the field that contains the URL 

    //define doc id 
    var docID = doc.id;

    //clone the new card
    let newcard = document.getElementById("postCardTemplate").content.cloneNode(true);
    //populate with title, image
    // newcard.querySelector('.card-link').href = `./viewListing.html?docID=${docID}`;
    newcard.querySelector('.card-title').innerHTML = title;
    newcard.querySelector('.card-image').src = image;
    // newcard.querySelector('.card-description').innerHTML = desc;
    //append to the posts
    // newcard.querySelector('.click-card').setAttribute('onclick', `location.href='./viewListing.html?docID=${docID}'`);
    // console.log("hello")
    newcard.querySelector('.card-image').setAttribute('onclick', `location.href='./viewListing.html?docID=${docID}'`);
    // newcard.querySelector('.deleteBtn').onclick = () => deletePost(doc.id);
    let delbtn = newcard.querySelector('.deletebttn')
    delbtn.addEventListener('click', deletePost)
    console.log("hello")
    document.getElementById("myposts-go-here").prepend(newcard);

}

function deletePost(postid) {
    // var result = confirm("Want to delete?");
    // if (result) {
        //Logic to delete the item
        db.collection("posts").doc(postid)
                        .delete()
        .then(() => {
            console.log("1. Document deleted from Posts collection");
            deleteFromMyPosts(postid);
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    // }
}


function deleteFromMyPosts(postid) {
    firebase.auth().onAuthStateChanged(user => {
        db.collection("users").doc(user.uid).update({
                myposts: firebase.firestore.FieldValue.arrayRemove(postid)
            })
            .then(() => {
                console.log("2. post deleted from user doc");
                deleteFromStorage(postid);
            })
    })
}


function deleteFromStorage(postid) {
    // Create a reference to the file to delete
    var imageRef = storageRef.child('images/' + postid + '.jpg');

    // Delete the file
    imageRef.delete().then(() => {
        // File deleted successfully
        console.log("3. image deleted from storage");
        alert("DELETE is completed!");
        location.reload();
    }).catch((error) => {
        // Uh-oh, an error occurred!
    });
}
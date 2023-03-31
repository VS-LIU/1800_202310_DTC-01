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
//------------------------------------------------------------
function displayMyPostCard(doc) {
    console.log(doc.data());
    var title = doc.get("title"); // get value of the "name" key
    var desc = doc.get("description"); //gets the length field
    var image = doc.get("image"); //the field that contains the URL 

    //define doc id 
    var docID = doc.id;

    //clone the new card
    let newcard = document.getElementById("postCardTemplate").content.cloneNode(true);
    //populate with title, image
    // newcard.querySelector('.card-link').href = `./viewListing.html?docID=${docID}`;
    newcard.querySelector('.card-title').innerHTML = title;
    newcard.querySelector('.card-image').src = image;
    newcard.querySelector('.card-description').innerHTML = desc;
    //append to the posts
    newcard.querySelector('.click-card').setAttribute('onclick', `location.href='./viewListing.html?docID=${docID}'`);
    document.getElementById("myposts-go-here").prepend(newcard);
}

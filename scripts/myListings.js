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
    newcard.querySelector('.click-card').setAttribute('onclick', `location.href='./viewListing.html?docID=${docID}'`);
    document.getElementById("myposts-go-here").prepend(newcard);
}


//function that uploads the listings from the database to the page
// function displayCardsDynamically(collection) {
//     let cardTemplate = document.getElementById("postCardTemplate");
//     console.log("hello")

//     db.collection("posts").orderBy("last_updated", "desc").get() //get all docs from collection and orders them by last_updated
//         .then(allListings => {
//             // console.log("allListings: " + allListings.docs)
//             allListings.forEach(doc => { //iterate thru each doc
//                 var title = doc.data().title;
//                 console.log("allListings: " + doc.data().title)

//                 var image = doc.data().image;
//                 console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", image)
//                 var description = doc.data().description;
//                 var docID = doc.id;
//                 let newcard = cardTemplate.content.cloneNode(true);

//                 //update title and text and image etc.
//                 newcard.querySelector('.card-title').innerHTML = title;
//                 newcard.querySelector('.card-description').innerHTML = description;
//                 //update image
//                 // newcard.querySelector('.card-image').src = `./images/${docID}.jpg`;
//                 newcard.querySelector('.card-image').src = image;
//                 // update link
//                 newcard.querySelector('.card-link').href = `./viewListing.html?docID=${docID}`; //Example: ./viewpost.html?NV01

//                 // //Finally done modifying newcard
//                 // document.getElementById("posts-go-here").appendChild(newcard);
//                 document.getElementById("posts-go-here").prepend(newcard);

//             })
//         })
// }
// displayCardsDynamically("posts");
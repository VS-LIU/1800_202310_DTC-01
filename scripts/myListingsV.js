
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
                        
                        posts = doc.data().posts; //get array of my posts
                        console.log(posts);
                        console.log("asdfas12412412412421412f");
                        posts.forEach(item => {
                            db.collection("posts")
                            .doc(item)
                                .get()
                                .then(doc => {
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
            var title = doc.data().title; // get value of the "name" key
            var desc = doc.data().description; //gets the length field
            var image = doc.data().image; //the field that contains the URL 
            

            //clone the new card
            let newcard = document.getElementById("postCardTemplate").content.cloneNode(true);
            //populate with title, image
            newcard.querySelector('.card-title').innerHTML = title;
            newcard.querySelector('.card-image').src = image;
            newcard.querySelector('.card-description').innerHTML = desc;
            //append to the posts
            document.getElementById("myposts-go-here").prepend(newcard);
}


// //function that uploads the listings from the database to the page
// function displayCardsDynamically(collection) {
//     let cardTemplate = document.getElementById("listingTemplate");
//     console.log("hello")

//     db.collection("posts").orderBy("last_updated", "desc").get() //get all docs from collection and orders them by last_updated
//         .then(allListings => {
//             //order by last_updated in descending order


//             // console.log("allListings: " + allListings.docs)
//             allListings.forEach(doc => { //iterate thru each doc
//                 var title = doc.data().title;
//                 console.log("allListings: " + doc.data().title)

//                 var description = doc.data().description;
//                 var docID = doc.id;
//                 let newcard = cardTemplate.content.cloneNode(true);

//                 //update title and text and image etc.
//                 newcard.querySelector('.card-title').innerHTML = title;
//                 newcard.querySelector('.card-text').innerHTML = description;
//                 newcard.querySelector('.card-link').href = `./viewListing.html?${docID}`; //Example: ./viewpost.html?NV01

//                 // //Finally done modifying newcard
//                 // //attach to gallery, Example: "hikes-go-here"
//                 document.getElementById("posts-go-here").appendChild(newcard);

//                 //i++;   //Optional: iterate variable to serve as unique ID
//             })
//         })
// }
// displayCardsDynamically("posts");
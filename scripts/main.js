function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            user_Name = user.displayName;

            displayCardsDynamically("posts");
        } else {
            // No user is signed in.
        }
    });
}
insertName(); //run the function

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("cb-listing-card-template");
    console.log("TEST CHEESEBURGER!")

    db.collection(collection).orderBy("date", "desc").limit(6).get() 
        .then(allPosts => {
            
            allPosts.forEach(doc => { //iterate through each doc
                var title = doc.data().title; 
                console.log("allPosts: " + doc.data().title)
                var imageURL = doc.data().image;
                // var description = doc.data().description;
                // var docID = doc.id;
                let listingCard = cardTemplate.content.cloneNode(true);

                //update title and text and image etc.
                listingCard.querySelector('.cb-listing-card-img').src = `${imageURL}`; 
                listingCard.querySelector('.cb-listing-card-title').innerHTML = title;
                listingCard.querySelector('a').href = "main.html?docID=" + docID;

                console.log("WORKS CHEESEBURGER!");

                document.getElementById("cb-listing-card").appendChild(listingCard)

                //NEW LINES: next 2 lines are new for demo#11
                //this line sets the id attribute for the <i> tag in the format of "save-hikdID" 
                //so later we know which hike to bookmark based on which hike was clicked
            //     newcard.querySelector('i').id = 'save-' + docID;
            //     // this line will call a function to save the hikes to the user's document             
            //     newcard.querySelector('i').onclick = () => updateBookmark(docID);

            //     currentUser.get().then(userDoc => {
            //         //get the user name
            //         var bookmarks = userDoc.data().bookmarks;
            //         if (bookmarks.includes(docID)) {
            //            document.getElementById('save-' + docID).innerText = 'bookmark';
            //         }
            //   })

            //     //Finally done modifying newcard
            //     //attach to gallery, Example: "hikes-go-here"
            //     document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}
displayCardsDynamically("posts");
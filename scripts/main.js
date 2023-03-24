function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("cb-card-template");
    console.log("TEST #1!")

    db.collection(collection).orderBy("last_updated", "desc").limit(6).get()
        .then(allPosts => {

            allPosts.forEach(doc => { //iterate through each doc
                let title = doc.data().title;
                console.log("allPosts: " + doc.data().title)
                let imageURL = doc.data().image;
                var docID = doc.id;
                let listingCard = cardTemplate.content.cloneNode(true);

                //update title and text and image etc.
                listingCard.querySelector('.cb-card-img').src = `${imageURL}`;
                listingCard.querySelector('.cb-card-title').innerHTML = title;
                // listingCard.querySelector('a').href = "main.html?docID=" + docID;

                console.log("TEST #2!");

                document.getElementById("cb-card").appendChild(listingCard)

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

displayCardsDynamically("posts")
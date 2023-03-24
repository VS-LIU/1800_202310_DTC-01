function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("cb-card-template");
    console.log("TEST #1!")

    db.collection(collection).orderBy("last_updated", "desc").limit(6).get()
        .then(allPosts => {

            allPosts.forEach(doc => { //iterate through each doc
                let title = doc.data().title;
                console.log("allPosts: " + doc.data().title)
                let imageURL = doc.get("image");
                var docID = doc.id;
                let listingCard = cardTemplate.content.cloneNode(true);

                //update title and text and image etc.
                listingCard.querySelector('.cb-card-img').src = imageURL;
                listingCard.querySelector('.cb-card-title').innerHTML = title;
                listingCard.querySelector('.click-card').setAttribute('onclick', `location.href='./viewListing.html?docID=${docID}'`);
                console.log("TEST #2!");

                document.getElementById("cb-card").appendChild(listingCard)
            })
        })
}

displayCardsDynamically("posts")
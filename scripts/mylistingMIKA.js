
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
                //update image
                newcard.querySelector('.card-image').src = `./images/${docID}.jpg`;
                // update link
                newcard.querySelector('.card-link').href = `./viewListing.html?docID=${docID}`;

                // //Finally done modifying newcard
                document.getElementById("posts-go-here").appendChild(newcard);

            })
        })
}
displayCardsDynamically("posts");

//function that uploads the listings from the database to the page
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("listingTemplate");
    console.log("hello")

    db.collection("posts").orderBy("last_updated", "desc").get() 
        .then(allListings => {
            allListings.forEach(doc => { 
                // var title = doc.data().title;
                let image = doc.get("image");
                let title = doc.get("title");
                let category = doc.get("category");
                console.log("allListings: " + doc.data().title)

                // var description = doc.data().description;
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true);

                newcard.querySelector('.card-image').src = image;
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-category').innerHTML = category;
                newcard.querySelector('.click-card').setAttribute('onclick', `location.href='./viewListing.html?docID=${docID}'`);
                document.getElementById("posts-go-here").appendChild(newcard);

            })
        })
}
displayCardsDynamically("posts");
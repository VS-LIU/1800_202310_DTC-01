// Function that populates the page with posts from the database
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("listingTemplate");
    db.collection("posts").orderBy("last_updated", "desc").get() 
        .then(allListings => {
            allListings.forEach(doc => { 
                var docID = doc.id;
                let image = doc.get("image");
                let title = doc.get("title");
                let category = doc.get("category");
                
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

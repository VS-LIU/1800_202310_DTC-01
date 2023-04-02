
//function that uploads the listings from the database to the page
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("listingTemplate");
    console.log("hello")

    db.collection("posts").orderBy("last_updated").get() 
        .then(allListings => {
            allListings.forEach(doc => { 
                // var title = doc.data().title;
                var title = doc.get("title");
                var image = doc.get("image");
                console.log("allListings: " + doc.data().title)

                // var description = doc.data().description;
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true);

                newcard.querySelector('.card-title').innerHTML = title;
                // newcard.querySelector('.card-text').innerHTML = description;
                newcard.querySelector('.card-image').src = image;
                // newcard.querySelector('.card-link').href = `./viewListing.html?docID=${docID}`; //Example: ./viewpost.html?NV01
                newcard.querySelector('.click-card').setAttribute('onclick', `location.href='./viewListing.html?docID=${docID}'`);
                document.getElementById("posts-go-here").appendChild(newcard);

            })
        })
}
displayCardsDynamically("posts");
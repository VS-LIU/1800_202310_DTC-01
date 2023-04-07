// This file contains the code for the Community Board section in main.html
// This funciton displays Community Board posts as cards sorted by last added
function displayCardsDate(collection) {
    let cardTemplate = document.getElementById("cb-card-template");

    db.collection(collection).orderBy("last_updated", "desc").limit(6).get()
        .then(allPosts => {

            allPosts.forEach(doc => { //iterate through each doc
                let title = doc.data().title;
                let category = doc.data().category;
                let imageURL = doc.get("image");
                var docID = doc.id;
                let listingCard = cardTemplate.content.cloneNode(true);

                //update title and text and image etc.
                listingCard.querySelector('.cb-card-img').src = imageURL;
                listingCard.querySelector('.cb-card-title').innerHTML = title;
                listingCard.querySelector('.cb-card-category').innerHTML = category;
                listingCard.querySelector('.click-card').setAttribute('onclick', `location.href='./communityboard/viewListing.html?docID=${docID}'`);

                document.getElementById("cb-card-date").appendChild(listingCard)
            })
        })
}

// This funciton displays Community Board posts as cards sorted randomly
function displayCardsRandom(collection) {
    let cardTemplate = document.getElementById("cb-card-template");


    db.collection(collection).orderBy("last_updated", "desc").limit(6).get()
        .then(allPosts => {

            var allPostsArray = [];
            allPosts.forEach(doc => { //store each doc id into an a newly created array
                allPostsArray.push(doc);
                // randomize items in allListingsArray
                allPostsArray.sort(() => Math.random() - 0.5);

            })
            return allPostsArray;
        })
           .then(allPostsArray => {
                allPostsArray.forEach(doc => { 
                console.log("line 49: doc.id " + doc.id);

                let imageURL = doc.get("image");
                let title = doc.get("title");
                let category = doc.get("category");

                var docID = doc.id;
                let listingCard = cardTemplate.content.cloneNode(true);

                //update title and text and image etc.
                listingCard.querySelector('.cb-card-img').src = imageURL;
                listingCard.querySelector('.cb-card-title').innerHTML = title;
                listingCard.querySelector('.cb-card-category').innerHTML = category;
                listingCard.querySelector('.click-card').setAttribute('onclick', `location.href='./communityboard/viewListing.html?docID=${docID}'`);
                document.getElementById("cb-card-random").appendChild(listingCard);
                })
            })
}

// invoke the funcitons
displayCardsDate("posts");
displayCardsRandom("posts");
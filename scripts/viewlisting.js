//-------------------------------------------------------------------
// Populate the listing page with the listing details from Firestore
//-------------------------------------------------------------------

function populateReviews() {

    //retrieve the urls for each listing .
    let params = new URL(window.location.href) 
    let postID = params.searchParams.get("docID");

    // Sets listing elements dynamically after reading from Firestore
    db.collection("posts").doc(postID).get()
        .then(doc => {
            let listTitle = doc.data().title;
            let postTitle = document.getElementById("postTitle");
            postTitle.innerHTML = listTitle;

            let postedDate = doc.data().last_updated.toDate().toDateString();
            let postDate = document.getElementById("last_updated");
            postDate.innerHTML = postedDate

            let description = doc.data().description;
            let postDescription = document.getElementById("postDescription");
            postDescription.innerHTML = description;

            let myImage = document.getElementById("postedImage");
            let postedImage = doc.get("image");
            myImage.src = postedImage;

            let postCategory = document.getElementById("postCategory");
            let category = postCategory.innerHTML = doc.data().category;
            postCategory.innerHTML = category

            let postLocation = doc.data().location;
            let location = document.getElementById("postLocation");
            location.innerHTML = postLocation;          
        })
}
populateReviews();

function populateReviews() {
    //retreive thes url.
    let params = new URL(window.location.href) //get the url from the searbar
    // Looks for Docid. This is how it is passed from the previous page.
    let postID = params.searchParams.get("docID");


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




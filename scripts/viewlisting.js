function populateReviews() {
    //retreive thes url.
    let params = new URL(window.location.href) //get the url from the searbar
    // Looks for Docid. This is how it is passed from the previous page.
    let postID = params.searchParams.get("docID");


    db.collection("posts").doc(postID).get()
        .then(doc => {
            // Grabbing the and assigning inside
            let listTitle = doc.data().title;


            let postTitle = document.getElementById("postTitle");
            postTitle.innerHTML = listTitle;
            // grab the date in the viewlisting.html
            let postedDate = doc.data().last_updated;
            let postDate = document.getElementById("last_updated");
            postDate.innerHTML = postedDate
            // Grab the description in the viewlisting.html
            let description = doc.data().description;
            let postDescription = document.getElementById("postDescription");
            postDescription.innerHTML = description;
            // grab the image in the viewlisting.html
            let postImage = document.getElementById("postImage");
            // postImage.src = `./images/${postID}.jpg`;

            // Grab the category in the viewlisting.html
            let postCategory = document.getElementById("postCategory");
            let category = postCategory.innerHTML = doc.data().category;
            postCategory.innerHTML = category
            // Grab the location in the viewlisting.html
            let postLocation = doc.data().location;
            let location = document.getElementById("postLocation");
            location.innerHTML = postLocation;          
        })
}
populateReviews();
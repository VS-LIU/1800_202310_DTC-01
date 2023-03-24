function populateReviews() {
    // Gets the template from the HTML.
    let reviewCardTemplate = document.getElementById("reviewCardTemplate");
    // Gets the div where the cards will be placed.
    let hikeCardGroup = document.getElementById("reviewCardGroup");

    
    //retreive thes url.
    let params = new URL(window.location.href) //get the url from the searbar
    // Looks for Docid. This is how it is passed from the previous page.
    let hikeID = params.searchParams.get("docID");
    // var hikeID = localStorage.getItem("hikeDocID");
    console.log(hikeID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    // In the database, going inside collection called reviews, looking where 'hikedocID' == the parameter hikeid.
    db.collection("posts").doc(hikeID).get()
        .then(allReviews => {
            // Maybe it turns it into an array?
            console.log(allReviews.data().title)
            // Grabbing the and assigning inside
            let hikeTitle = allReviews.data().title;
            // Grab the postTitle span id in the viewlisting.html
            let postTitle = document.getElementById("postTitle");
            //Assign postitle with hiketitle
            postTitle.innerHTML = hikeTitle;

            
        })
}
populateReviews();
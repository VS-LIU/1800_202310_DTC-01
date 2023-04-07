// Function to populate the post details from the database
function populateReviews() {
  //retreive the url.
  let params = new URL(window.location.href) //get the url from the searbar
  // Looks for Docid. This is how it is passed from the previous page.
  let postID = params.searchParams.get("docID");


  db.collection("posts").doc(postID).get()
    .then(doc => {
      let listTitle = doc.get("title");
      let postTitle = document.getElementById("createTitle");
      postTitle.value = listTitle;
      
      let description = doc.get("description");
      let postDescription = document.getElementById("createDescription");
      postDescription.value = description;

      let postedImage = doc.get("image");
      let myImage = document.getElementById("mypic-goes-here");
      myImage.setAttribute("src", postedImage);

      let category = doc.get("category");
      let postCategory = document.getElementById("createCategory");

      for (let i = 0; i < postCategory.options.length; i++) {
        if (postCategory.options[i].text === category) {
          postCategory.options[i].selected = true;
          break;
        }
      }
      let postLocation = doc.get("location");
      let location = document.getElementById("createLocation");
      location.value = postLocation;
    })
}
populateReviews();


// Function to update any changes made to the database on Firebase
function editPost() {
  let params = new URL(window.location.href)
  let postID = params.searchParams.get("docID");

  var postTitle = document.getElementById("createTitle").value;
  console.log("postTitle: " + postTitle);

  var postLoc = document.getElementById("createLocation").value;

  var postCatSelect = document.getElementById("createCategory");
  var postCat = postCatSelect.options[postCatSelect.selectedIndex].text;
  console.log("postCat: " + postCat);

  var postDesc = document.getElementById("createDescription").value;

  db.collection("posts").doc(postID)
    .update({
      title: postTitle,
      location: postLoc,
      category: postCat,
      description: postDesc,
      last_updated: firebase.firestore.FieldValue
        .serverTimestamp()
    }).then(doc => {
      console.log("Post document updated!");
      window.location.replace("./myListing.html");
    }) }


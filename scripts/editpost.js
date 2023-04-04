function populateReviews() {
  //retreive thes url.
  let params = new URL(window.location.href) //get the url from the searbar
  // Looks for Docid. This is how it is passed from the previous page.
  let postID = params.searchParams.get("docID");


  db.collection("posts").doc(postID).get()
    .then(doc => {
      let listTitle = doc.get("title");
      let postTitle = document.getElementById("createTitle");
      // postTitle.setAttribute("placeholder", listTitle);
      postTitle.value = listTitle;
      
      let description = doc.get("description");
      let postDescription = document.getElementById("createDescription");
      // postDescription.innerHTML = description;
      // postDescription.setAttribute("placeholder", description);
      postDescription.value = description;

      let postedImage = doc.get("image");
      let myImage = document.getElementById("mypic-goes-here");
      // myImage.src = postedImage;
      myImage.setAttribute("src", postedImage);

      // let category = doc.data().category;
      let category = doc.get("category");
      let postCategory = document.getElementById("createCategory");
      console.log("line 69: ", category)

      for (let i = 0; i < postCategory.options.length; i++) {
        if (postCategory.options[i].text === category) {
          postCategory.options[i].selected = true;
          break;
        }
      }
      let postLocation = doc.get("location");
      let location = document.getElementById("createLocation");
      // location.setAttribute("placeholder", postLocation);
      location.value = postLocation;
    })
}
populateReviews();

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


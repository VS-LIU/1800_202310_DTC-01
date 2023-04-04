// for editing posts
// 1. get the post id from the URL
// 2. get the post data from Firestore
// 3. display the post data in the form
// 4. listen for changes to the form
// 5. save the changes to Firestore
// 6. redirect to the post page with the new data

// let modal = document.getElementsByClassName("modal");
// let deletebttn = document.getElementsByClassName("deletebtn");
// let modalDelete = document.getElementsByClassName("modaldeleteBtn")

// deletebttn.addEventListener('click', function deletePost(postid) {
//     console.log("hello")
//     var result = confirm("Want to delete?");
//     if (result) {
//         //Logic to delete the item
//         db.collection("posts").doc(postid)
//             .delete()
//             .then(() => {
//                 console.log("1. Document deleted from Posts collection");
//                 deleteFromMyPosts(postid);
//             }).catch((error) => {
//                 console.error("Error removing document: ", error);
//             });

//     }
// })

// let deletedummy = document.getElemetsBtClassName("deletebutton2")
// let modaldummy = document.getElementsByClassName("modalDUMMYDEL")

// console.log("hi")
// deletedummy.addEventListener('click', function deleteDummy() {
// }
// )
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




// for editing posts
// 1. get the post id from the URL
// 2. get the post data from Firestore
// 3. display the post data in the form
// 4. listen for changes to the form
// 5. save the changes to Firestore
// 6. redirect to the post page with the new data

let modal = document.getElementsByClassName("modal");
let deletebtn = document.getElementsByClassName("deletebtn");
let modalDelete = document.getElementsByClassName("modaldeleteBtn")

// deletebtn.onclick = function () {
//     console.log("hello")
//     modal.style.display = "none";
//     newcard.querySelector('#modaldeleteBtn').onclick = () => deletePost(doc.id);
//     console.log("hello")
// }

deletebtn.onclick(function deletePost(postid) {
    console.log("hello")
    var result = confirm("Want to delete?");
    if (result) {
        //Logic to delete the item
        db.collection("posts").doc(postid)
            .delete()
            .then(() => {
                console.log("1. Document deleted from Posts collection");
                deleteFromMyPosts(postid);
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });

    }
})







// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }
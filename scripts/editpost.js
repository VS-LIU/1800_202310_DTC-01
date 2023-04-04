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
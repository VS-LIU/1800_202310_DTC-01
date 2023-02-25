//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton(){
    console.log($('#my-navbar').load('./partials/navbar.html'));
    console.log($('#my-footer').load('./partials/footer.html'));
}
loadSkeleton();  //invoke the function

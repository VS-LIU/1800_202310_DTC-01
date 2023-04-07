// ----------------------------------------------------------
// This function loads our custom navbar and footer(icon bar)
// ----------------------------------------------------------
function loadSkeleton(){
    console.log($('#my-navbar').load('./partials/navbar.html'));
    console.log($('#my-footer').load('./partials/footer.html'));
}
loadSkeleton();  //invoke the function

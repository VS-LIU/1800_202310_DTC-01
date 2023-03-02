
function swiper () {
    $(".carousel").swipe({
        swipe: function (direction) {
            if (direction == 'left') $(this).carousel('next');
            if (direction == 'right') $(this).carousel('prev');
        }
    });
}

swiper ();

// $('.carousel').on('touchstart', function(event){
//     const xClick = event.originalEvent.touches[0].pageX;
//     $(this).one('touchmove', function(event){
//         const xMove = event.originalEvent.touches[0].pageX;
//         const sensitivityInPx = 5;

//         if( Math.floor(xClick - xMove) > sensitivityInPx ){
//             $(this).carousel('next');
//         }
//         else if( Math.floor(xClick - xMove) < -sensitivityInPx ){
//             $(this).carousel('prev');
//         }
//     });
//     $(this).on('touchend', function(){
//         $(this).off('touchmove');
//     });
// });
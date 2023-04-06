// This function enables swiping on the carousel for touch screen mobile devices
function swiper () {
    $(".carousel").swipe({
        swipe: function (direction) {
            if (direction == 'left') $(this).carousel('next');
            if (direction == 'right') $(this).carousel('prev');
        }
    });
}

swiper ();


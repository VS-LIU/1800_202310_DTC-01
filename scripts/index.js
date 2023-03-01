// function swiper(){
//     $(".carousel").swipe({
//     swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
//         if (direction == 'left') $(this).carousel('next');
//         if (direction == 'right') $(this).carousel('prev');

//         if (distance == '1px') $(this).carousel('next');
//         if (distance == '1px') $(this).carousel('prev');


//     },
//     allowPageScroll:"vertical"
//     });
// }

// swiper();

if (Modernizr.touch) {
    $(".carousel").swipe({
        swipe: function (
            event,
            direction,
            distance,
            duration,
            fingerCount,
            fingerData
        ) {
            if (direction == "left") $(this).carousel("next");
            if (direction == "right") $(this).carousel("prev");
        },
        allowPageScroll: "vertical"
    });
} else {
    $(".alert").removeClass("hidden");
}
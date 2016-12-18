"use strict";

require('jquery');
require('../bootstrap/javascripts/bootstrap');

// Change Menu Background onscroll
$(window).scroll(() => {
    const scroll = $(window).scrollTop();

    if (scroll >= 500) {
        $(".navbar").addClass("scrolling");
    } else {
        $(".navbar").removeClass("scrolling");
    }
});
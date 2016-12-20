"use strict";

require('jquery');
require('../bootstrap/javascripts/bootstrap');
require('smoothscroll-polyfill').polyfill();

// Change Menu Background onscroll
$(window).scroll(() => {
    const scroll = $(window).scrollTop();

    if (scroll >= 400) {
        $(".navbar").addClass("scrolling");
    } else {
        $(".navbar").removeClass("scrolling");
    }
});

$('.homepage-scroll-down-button').click(() => {
    document.querySelector('.homepage-feature').scrollIntoView({
        behavior: 'smooth'
    });
});
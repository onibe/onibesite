"use strict";

import 'jquery';
import '../styles/bootstrap/javascripts/bootstrap';
import smoothscroll from 'smoothscroll-polyfill';

smoothscroll.polyfill();

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
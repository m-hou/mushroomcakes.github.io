/*globals $:false */

//https://github.com/twbs/bootstrap/issues/14040 ramon18
// TODO: Add any custom classes with 'position: fixed' to the selector below
//fix modal popup navbar shift
var fixedCls = '.navbar-fixed-top,.navbar-fixed-bottom';
    var oldSSB = $.fn.modal.Constructor.prototype.setScrollbar;
    $.fn.modal.Constructor.prototype.setScrollbar = function () {
        oldSSB.apply(this);
        if (this.bodyIsOverflowing && this.scrollbarWidth)
            $(fixedCls).css('padding-right', this.scrollbarWidth);
    }

    var oldRSB = $.fn.modal.Constructor.prototype.resetScrollbar;
    $.fn.modal.Constructor.prototype.resetScrollbar = function () {
        oldRSB.apply(this);
        $(fixedCls).css('padding-right', '');
    }

$(document).ready(function () {
    $('.modal').on('show.bs.modal', function () {
        if ($(document).height() > $(window).height()) {
            // no-scroll
            $('body').addClass("modal-open-noscroll");
        }
        else {
            $('body').removeClass("modal-open-noscroll");
        }
    });
    $('.modal').on('hide.bs.modal', function () {
        $('body').removeClass("modal-open-noscroll");
    });
})
    
//carousel settings
$(function() {
    $('.carousel').carousel({
        interval: 5000,
        pause: false,
        keyboard: true
    });
});

// alternates side and rotates title with the ones in the list
// list of titles
var titleQueue = ['Creator', 'Thinker', 'Innovater', 'Builder', 'Designer'];

// true is left, false is right
var sideToChangeLeft = true;

var changeTitleText = function() {
    var nextTitle = titleQueue.shift();
    var titleToChange = sideToChangeLeft ? $('#title-text-left') : $('#title-text-right');
    titleQueue.push(titleToChange.text());
    titleToChange.fadeOut('fast', function(){
        titleToChange.text(nextTitle).fadeIn('fast');
        sideToChangeLeft = !sideToChangeLeft;
    });
};

setInterval(changeTitleText, 2000);

$(document).ready(function(){       
    var scrollStart = 0;
    var navBarHeight = $('nav').height();
    var firstPageOffset = $('[name=about-me]').offset().top - navBarHeight;
    var secondPageOffset = $('[name=projects]').offset().top - navBarHeight;
    var thirdPageOffset = $('[name=background]').offset().top - navBarHeight;
    var fourthPageOffset = $('[name=skills]').offset().top - navBarHeight;
    var fifthPageOffset = $('[name=contact]').offset().top - navBarHeight;
    $(document).scroll(function() { 
        scrollStart = $(this).scrollTop();
        $('.nav.navbar-nav.navbar-right a span').removeClass('current-page');
        if (scrollStart >= fifthPageOffset) {
            $('.nav.navbar-nav.navbar-right a span').eq(4).addClass('current-page');   
        }
        else if (scrollStart >= fourthPageOffset) {
            $('.nav.navbar-nav.navbar-right a span').eq(3).addClass('current-page');   
        }
        else if (scrollStart >= thirdPageOffset) {
            $('.nav.navbar-nav.navbar-right a span').eq(2).addClass('current-page');   
        }
        else if (scrollStart >= secondPageOffset) {
            $('.nav.navbar-nav.navbar-right a span').eq(1).addClass('current-page');   
        }
        else if(scrollStart >= firstPageOffset) {
            $('.nav.navbar-nav.navbar-right a span').eq(0).addClass('current-page');   
        }
    });    
});

$(function() {
    $('a[href*="#"]:not([href="#"]):not([href*="#slider"])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            var navOffset = this.hash.slice(1) === 'contact' ? 0 : $('.navbar-header').height();
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body').animate({
                scrollTop: target.offset().top - navOffset + 1
            }, 500);
            return false;
            }
        }
    });
});
// more efficient than jQuery AJAX
var _ = (selector, all) => {
    if (all) return document.querySelectorAll(selector);
    else return document.querySelector(selector);
};


// LOADER HIDE
window.onload = () => {
    // fade out loader, then hide
    _('#loader-bg').style.opacity = 0;
    //_('#loader').style.opacity = 0;
    setTimeout(() => {
        _('#loader-bg').style.display = 'none';
        //_('#loader').style.display = 'none';
    }, 300);

    // set vh property to the true viewport height to fix it on mobile browsers
    document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);

    // "Xilog" hero text animation
    // wrap every letter in a span
    /*
    var textWrapper = _("#xilogheader");
    textWrapper.innerHTML = textWrapper.innerHTML.replace(/\S/g, "<span class='letter'>$&</span>");
    headerSpans = _("#xilogheader span", true)
    for (var i = 0; i < headerSpans.length; i++) {
        headerSpans[i].style.animationDelay = `${i*0.1}s`;
        headerSpans[i].classList.add('animated');
    }
    */

    // animate background zoom in - doesn't work right with parallax scroll so disabled
    // window.setTimeout(() => { $("#background").css("transform", "scale(1.3)"); }, 350);
}


// alternative to jQuery document ready
function ready(callback) {
    // in case the document is already rendered
    if (document.readyState!='loading') callback();
    // modern browsers
    else if (document.addEventListener) document.addEventListener('DOMContentLoaded', callback);
    // IE <= 8
    else document.attachEvent('onreadystatechange', function(){
        if (document.readyState=='complete') callback();
    });
}

ready(() => {
    window.scrollTo(0, 0); // scroll to top on page load

    
    // DISABLE RIGHT CLICK
    noRightClick = _(".norightclick", true)
    for (var i = 0; i < noRightClick.length; i++) {
        noRightClick[i].addEventListener('contextmenu', event => event.preventDefault());
    }


    // DARK MODE
    // if localstorage says user's last setting is dark
    /*
    darkToggle = _("#darkmode");
    if ((localStorage.getItem('mode') || 'dark') === 'dark') {
        document.body.classList.add('dark'); // make the page dark
        darkToggle.checked = true; // check darkmode box
    }
    darkToggle.addEventListener("click", () => { // if dark/light toggle is clicked, set it in localstorage
        localStorage.setItem('mode', (localStorage.getItem('mode') || 'dark') === 'dark' ? 'light' : 'dark');
        // then change it on the page too, add a "dark" class to body
        localStorage.getItem('mode') === 'dark' ? document.body.classList.add('dark') : document.body.classList.remove('dark')
    })
    */
    


    //MOBILE MENU
    menuBg = _('#menu-bg')
    _('.menu').addEventListener("click", () => {
        // when clicked clone all hidden navbar items to the nav menu
        navItems = _("nav a", true)
        for (var i = 0; i < navItems.length; i++) {
            if(!navItems[i].classList.contains('menu')) { // don't clone the menu button though!
                e = navItems[i].cloneNode(true);
                _('#menu').appendChild(e);
            }
        }

        // fade in menu - delay because if it wasn't there the opacity transition didn't work
        menuBg.style.display = "flex";
        setTimeout(() => { menuBg.style.opacity = 1; }, 2);
    });
    closeTriggers = _('.m-close, #menu-bg', true)
    for (var i = 0; i < closeTriggers.length; i++) {
        func = () => {
            menuBg.style.display = "none";
            $("#menu > *:not('.m-close')").remove(); // lastly empty the menu except for close button
            menuBg.removeEventListener('transitionend',func); // remove listener so it won't trigger on fadein
        }
        closeTriggers[i].addEventListener("click", function(e) { // when close button clicked
            menuBg.style.opacity = 0;
            menuBg.addEventListener('transitionend', func, false);
        })
    }

    
    // SCROLL UP BUTTON
    // This looks like it's defined to be used once but it is used more
    // in the scroll-position loop
    scrollup = $('.scrollup');
    scrollup.on('click', function () { // if scroll up clicked
        window.scroll({
            top: 0, 
            left: 0, 
            behavior: 'smooth' // smooth scroll
        });
    })

    
    // Checking if element is in viewport (used for parallax scroll)
    function isInViewport(node) {
        var rect = node.getBoundingClientRect()
        return (
            (rect.height > 0 || rect.width > 0) &&
            rect.bottom >= 0 &&
            rect.right >= 0 &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.left <= (window.innerWidth || document.documentElement.clientWidth)
        )
    }


    // SCROLL POSITION
    let scrollpos = 0;
    $(window).scroll(function () { // when scrolling
        scrollpos = $(window).scrollTop();

        // parallax scroll
        $('.parallax').each(function(index, element) {
            // Check if the element is in the viewport.
            if (isInViewport(this)) {
                var diff = scrollpos - this.offsetTop
                var ratio = Math.round((diff / this.offsetHeight) * 350)
                $(this).css('background-position','center ' + parseInt(-ratio) + 'px')
                $(".hero").css('transform', `translateY(${parseInt(ratio*0.5)}px)`)
            }
        })
    });



    let intro; // top of content
    let nav = $('nav');
    // run every 150ms, put most scroll events here
    // more efficient than the scroll event
    window.setInterval(function(){
        intro = $('.content').offset().top; // set top of content
        // ^ this is in a loop so that when the screen is turned it
        // will update with the new position

        // SHOW/HIDE SCROLL UP BUTTON
        if (scrollpos > intro) { // if user scrolls below intro, show button
            scrollup.fadeIn(300)
        } else { // scroll above, hide button
            scrollup.fadeOut(300)
        }


        // FIXED NAV
        // handles attaching nav to screen when scrolled far enough
        if (scrollpos > 200) { // after the nav is no longer visible
            if (!nav.hasClass('scrolled')) nav.addClass('scrolled');

            // nest these since realistically they only run if the
            // scroll is above 100, more efficient code
            if (scrollpos > intro) {
                if (!nav.hasClass('awake')) nav.addClass('awake');
            }
            if (scrollpos < intro) {
                if (nav.hasClass('awake')) {
                    nav.removeClass('awake');
                    nav.addClass('sleep');
                }
            }
        } 
        if (scrollpos < 200) {
            if (nav.hasClass('scrolled')) nav.removeClass('scrolled sleep');
        }
    }, 150);
});
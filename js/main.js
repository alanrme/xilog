$(function(){
    window.scrollTo(0, 0); // scroll to top on page load

    
    // LOADER HIDE
    window.setTimeout(function () {
        $('#loader-bg').animate({opacity: 0}, 300, function () { $('#loader-bg').hide();} );
        // fade out loader after 800ms, then hide
    }, 800);

    
    // DISABLE RIGHT CLICK
    $(".norightclick").on("contextmenu",function(e){
        return false;
    });



    // DARK MODE
    if ((localStorage.getItem('mode') || 'dark') === 'dark') { // if localstorage says user's last setting is dark
        $('body').addClass('dark'); // make the page dark
        $(".darkmode").prop('checked', true); // and check darkmode box
    } else { $('body').removeClass('dark'); $(".darkmode").prop('checked', false); }
    // else vice versa

    $(".darkmode").on("click", function(e){ // if dark/light toggle is clicked, set it in localstorage
        localStorage.setItem('mode', (localStorage.getItem('mode') || 'dark') === 'dark' ? 'light' : 'dark');
        // then change it on the page too, add a "dark" class to body
        localStorage.getItem('mode') === 'dark' ? $('body').addClass('dark') : $('body').removeClass('dark')
    })
    


    //MOBILE MENU
    $('.menu').on("click", function(e){
        $('nav a').each(function () { // for each nav item on desktop, clone that to mobile menu
            if(!$(this).is('menu')) $(this).clone().appendTo($('#menu')); // don't clone the menu button though!
        })

        $('#navbar').css('margin-top', '0').animate({'margin-top': '-2em'}, 500);
        $('#menu-bg').css({'display': 'flex', opacity: 0}).animate({opacity: 1}, 500);
        // remove navbar and fade in menu
    });
    $('.m-close, #menu-bg').on("click", function(e){ // when close button clicked
        // put navbar back and fade out menu
        $('#navbar').css('margin-top', '-2em').animate({'margin-top': '0'}, 500);
        $('#menu-bg').animate({opacity: 0}, 500, function () { $('#menu-bg').css('display', 'none') });
        
        $("#menu > *:not('.m-close')").remove(); // lastly empty the menu except for close button
    });

    
    // SCROLL UP BUTTON
    let scrollup = $('.scrollup')
    scrollup.on('click', function () { // if scroll up clicked
        $('html, body').animate({ // animated scroll to top in 800ms
            scrollTop: $('#top').offset().top
        }, 800);
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
            var initY = $(this).offset().top
            var height = $(this).height()
            var endY  = initY + $(this).height()
        
            // Check if the element is in the viewport.
            var visible = isInViewport(this)
            if(visible) {
              var diff = scrollpos - initY
              var ratio = Math.round((diff / height) * 500)
              $(this).css('background-position','center ' + parseInt(-(ratio * 1.5)) + 'px')
            }
        })
    });


    let intro; // top of content
    let nav = $('nav')

    window.setInterval(function(){ // run every 250ms, put scroll events here
        intro = $('.content').offset().top; // set top of content
        // this is in a loop so that when the screen is turned it will update with the new position

        // SHOW/HIDE SCROLL UP BUTTON
        if (scrollpos > intro) { // if user scrolls below intro, show button
            scrollup.fadeIn(500)
        } else { // scroll above, hide button
            scrollup.fadeOut(500)
        }


        // FIXED NAV
        // handles attaching nav to screen when scrolled far enough
        if (scrollpos > 150) {
            if (!nav.hasClass('scrolled')) nav.addClass('scrolled');
        } 
        if (scrollpos < 150) {
            if (nav.hasClass('scrolled')) nav.removeClass('scrolled sleep');
        } 
        if (scrollpos > intro) {
            if (!nav.hasClass('awake')) nav.addClass('awake');
        }
        if (scrollpos < intro) {
            if (nav.hasClass('awake')) {
                nav.removeClass('awake');
                nav.addClass('sleep');
            }
        }
    }, 250);
});
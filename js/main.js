// LOADER HIDE
window.onload = () => {
    // fade out loader, then hide
    loadBg = _("#loader-bg")
    loadBg.style.opacity = 0;
    //_('#loader').style.opacity = 0;
    loadBg.addEventListener("transitionend", () => {
        loadBg.style.display = 'none';
        //_('#loader').style.display = 'none';
    });

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

ready(() => {
    window.scrollTo(0, 0); // scroll to top on page load

    
    // DISABLE RIGHT CLICK
    noRightClick = _(".norightclick", true)
    for (var i = 0; i < noRightClick.length; i++) {
        noRightClick[i].addEventListener('contextmenu', event => event.preventDefault());
    }


    // Haptics when link/button is pressed or released
    _("button, a", true).forEach(e => {
        // for each element in the array, add an event listener of the same name
        ["touchstart", "touchend"].forEach(event => {
            e.addEventListener(event, () => { navigator.vibrate(5) });
        });
    });


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
    _('.m-close, #menu-bg', true).forEach(e => {
        func = () => {
            menuBg.style.display = "none";
            // empty the menu except for close button & remove listener so it won't fire on fadein
            _("#menu a:not(.m-close)", true).forEach(e => e.remove());
            menuBg.removeEventListener('transitionend', func);
        }
        e.addEventListener("click", () => { // when close button clicked
            menuBg.style.opacity = 0;
            menuBg.addEventListener('transitionend', func, false);
        })
    })

    
    // SCROLL UP BUTTON
    // scrollup looks like it's defined to only be used once but it is
    // used more in the scroll-position loop further down
    scrollup = _('.scrollup');
    scrollup.addEventListener("click", () => {
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
    document.addEventListener('scroll', () => {
        scrollpos = $(window).scrollTop();

        // parallax scroll
        /*
        $('.parallax').each(function(index, element) {
            // Check if the element is in the viewport.
            if (isInViewport(this)) {
                var diff = scrollpos - this.offsetTop
                var ratio = Math.round((diff / this.offsetHeight) * 350)
                $(this).css('background-position','center ' + parseInt(-ratio) + 'px')
                $(".hero").css('transform', `translateY(${parseInt(ratio*0.5)}px)`)
            }
        })
        */
    });



    let intro; // top of content
    let nav = _('nav');
    // run every 150ms, put most scroll events here
    // more efficient than the scroll event
    window.setInterval(function(){
        intro = $('.content').offset().top; // set top of content
        // ^ this is in a loop so that when the screen is turned it
        // will update with the new position

        // if user scrolls below intro, show button
        if (scrollpos > intro) {
            scrollup.classList.add("show")
        } else {
            scrollup.classList.remove("show")
        }


        // FIXED NAV
        // handles attaching nav to screen when scrolled far enough
        if (scrollpos > 200) { // after the nav is no longer visible
            if (!nav.classList.contains('scrolled')) nav.classList.add('scrolled');

            // nest these since realistically they only run if the
            // scroll is above 100, more efficient code
            if (scrollpos > intro) {
                if (!nav.classList.contains('awake')) nav.classList.add('awake');
            }
            if (scrollpos < intro) {
                if (nav.classList.contains('awake')) {
                    nav.classList.remove('awake');
                    nav.classList.add('sleep');
                }
            }
        } 
        if (scrollpos < 200) {
            if (nav.classList.contains('scrolled')) nav.classList.remove("scrolled", "sleep");
        }
    }, 150);
});
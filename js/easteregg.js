function showEgg(egg) {
    // var for compatibility
    var audio = new Audio("../audio/easteregg.mp3")
    audio.play()
    egg.style.display = "block"
    setTimeout(function(){
        egg.classList.add("show")
    }, 1500);
}

function hideEgg(egg) {
    egg.classList.remove("show")
    egg.addEventListener("transitionend", () => {
        if (!egg.classList.contains("show")) // so this only fires when fading out
            egg.style.display = "none"
    })
}

ready(() => {
    // called egg cuz I wanted an excuse to call a variable egg
    var egg = _("#easteregg")
    _("#easteregg #close", true).forEach(e => {
        e.addEventListener("click", () => { // when close button or bg clicked
            hideEgg(egg)
        })
    })
    _("#loader-enable").addEventListener("click", () => { // when loader button clicked
        _("#loader-bg").style.display = "block"
        _("#loader-bg").style.opacity = 1
    })

    //CLICK-TRIGGER EASTEREGG
    _("#trigger").addEventListener("click", () => { // when trigger clicked
        showEgg(egg)
    })


    //KONAMI CODE
    var konamikeys = [38,38,40,40,37,39,37,39,66,65], 
    started = false, 
    count = 0
    
    document.addEventListener('keydown', e => {
        var reset = function() {
            started = false 
            count = 0
        }
        
        // begin watching if first key in sequence was pressed
        if(!started){
            if(e.keyCode == konamikeys[0]){
                started = true
            }
        }
        
        // if sequence was started, start checking keypresses
        if (started){
            if (konamikeys[count] == e.keyCode){
                count++
            } else {
                // incorrect key, reset
                reset()
            }

            if (count == konamikeys.length){ // full code entered
                if (egg.style.display === "none") { // if diplay none fade in easteregg
                    showEgg(egg)
                } else {
                    hideEgg(egg)
                }
                reset()
            }
        }
    })
})
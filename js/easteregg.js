function triggerEgg(egg) {
    // var for compatibility
    var audio = new Audio('../audio/easteregg.mp3');
    audio.play();
    $(egg).delay(1500).fadeIn(3000)
}

ready(() => {
    // called egg cuz I wanted an excuse to call a variable egg
    var egg = _('#easteregg')
    _('#easteregg-content #close').addEventListener("click", () => { // when close button clicked
        $(egg).fadeOut()
    })
    _('#easteregg-content #loader-enable').addEventListener("click", () => { // when loader button clicked
        $('#loader-bg').show().css("opacity", 1)
    })

    //CLICK-TRIGGER EASTEREGG
    $('#trigger').click(function() { // when trigger clicked
        triggerEgg(egg)
    });


    //KONAMI CODE
    var konamikeys = [38,38,40,40,37,39,37,39,66,65], 
    started = false, 
    count = 0;
    
    $(document).keydown(function(e){
        var reset = function() {
            started = false; 
            count = 0;
            return;
        };
        
        key = e.keyCode;
        
        // Begin watching if first key in sequence was pressed.
        if(!started){
            if(key == 38){
                started = true;
            }
        }
        
        // If we've started, pay attention to key presses, looking for right sequence.
        if (started){
            if (konamikeys[count] == key){
                count++;
            } else {
                // Incorrect key, restart.
                reset();
            }
            if (count == 10){
                // Success!
                if (egg.style.display === "none") { // if diplay none fade in
                    triggerEgg(egg)
                } else {
                    $(egg).fadeOut(); // vice versa
                }
                reset();
            }
        } else {
            reset();
        }
    });
});
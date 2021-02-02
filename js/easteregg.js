function easteregg(x) {
    // var for compatibility
    var audio = new Audio('../audio/easteregg.mp3');
    audio.play();
    x.delay(1500).fadeIn(3000)
}

$(function(){
    var x = $('#easteregg') // find easteregg
    $('#easteregg-content #close').click(function() { // when close button clicked
        x.fadeOut()
    })
    $('#easteregg-content #loader-enable').click(function() { // when loader button clicked
        $('#loader-bg').show().css("opacity", 1)
    })

    //CLICK-TRIGGER EASTEREGG
    $('#trigger').click(function() { // when trigger clicked
        easteregg(x)
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
                if (x.css('display') === "none") { // if diplay none fade in
                    easteregg(x)
                } else {
                    x.fadeOut(); // vice versa
                }
                reset();
            }
        } else {
            reset();
        }
    });
});
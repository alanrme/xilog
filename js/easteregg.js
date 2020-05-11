$(function(){
    let x = $('#easteregg') // find easteregg
    $('#easteregg-content #close').click(function() { // when close button clicked
        x.fadeOut()
    })

    //CLICK-TRIGGER EASTEREGG
    $('#trigger').click(function() { // when trigger clicked
        let audio = new Audio('../audio/easteregg.wav');
        audio.play();
        $('body').css('animation', 'shake 0.5s')
        setTimeout(function() { x.fadeIn() }, 2000);
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
                    let audio = new Audio('../audio/easteregg.wav');
                    audio.play();
                    $('body').css('animation', 'shake 0.5s')
                    setTimeout(function() { x.fadeIn() }, 2000);
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
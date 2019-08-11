$(function(){
    let x = $('#easteregg') // find easteregg
    $('#trigger').click(function() { // when trigger clicked
        if (x.css('display') === "none") { // if diplay none set display block
            x.css('display', 'block');
        } else {
            x.css('display', 'none'); // vice versa
        }
    });
});
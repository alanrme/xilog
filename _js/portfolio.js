$(function(){
    // PORTFOLIO
    let portView = $('#p-view');
    $('#port-items .p-item').each(function ()
    {
        let img = $($(this).find('img')[0]);
        let item = $(this);
        img.on('click', function () { // if image is clicked on
            portView.empty(); // clear portview
            item.clone().appendTo(portView); // clone this to portview
            portView.prepend('<div id="p-over"></div>'); // add the darkened bg
            portView.fadeIn(); // animate portview from 0 to 1 opacity
            $('#p-over').on('click', function () {
                portView.fadeOut(function () { portView.empty(); })
                // if user clicks anywhere, fade out portview then clear it
            });
        });
    });
});
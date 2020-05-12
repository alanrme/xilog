$(function(){
    // PORTFOLIO
    let modal = $('#p-view'); // this is the modal for the portfolio's viewer
    $('#port-items .p-item').each(function () { // for each portfolio item
        let img = $($(this).find('img')[0]);
        let item = $(this);
        img.on('click', function () { // if image is clicked on
            modal.empty(); // clear modal
            item.clone().prependTo(modal); // clone this to modal, on top of p-over
            modal.fadeIn(); // animate modal from 0 to 1 opacity

            // if portfolio-overlay is clicked
            modal.on('click', function () {
                modal.fadeOut(function () { modal.empty(); })
                // if user clicks anywhere, fade out modal then clear it
            });
            // if the image in the modal is clicked stop the event
            // from propagating up to p-over's click event so you
            // can click on a button in the image
            $('#p-view .p-item img').click(function(event){
                event.stopPropagation();
                console.log("fuck")
            });
        });
    });
});
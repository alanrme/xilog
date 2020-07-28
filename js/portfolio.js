$(function(){
    // PORTFOLIO
    let modal = $('#p-view'); // this is the modal for the portfolio's viewer
    $('#port-items .p-item').each(function () { // for each portfolio item
        let item = $(this);
        item.on('click', function () { // if image is clicked on
            modal.empty(); // clear modal
            
            item.clone().find("img").attr("src", function() {
                return this.src.replace("_m", "_c").replace("/thumbnails", "");
            }).closest(".p-item").prependTo(modal)
            // replace the image source with a higher resolution one

            modal.fadeIn(); // fade in modal

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
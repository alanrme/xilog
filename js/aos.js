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
window.setInterval(function(){
    $(".aos").each(function(index, element) {
        item = $(element)
        if(isInViewport(element)) {
            delay = item.data("aos-delay");
            if(delay) {
                console.log(delay)
                item.css("transition-delay", `0.${delay}s`)
                item.addClass("aos-animate")
            }
            else item.addClass("aos-animate");
        } else {
            item.removeClass("aos-animate");
        }
    })
}, 250)
function imgLoad() {
    var img = $('img[origin-src]');
    for (var i = 0; i < img.length; i++) {
        img[i].src = img[i].attributes['origin-src'].value;
    }
}
window.onload = function() {
    imgLoad();
    $('.nav-solution,.nav-product,.nav-contact').on('mouseenter', function() {
        $(this).children().addClass('active');
    });
    $('.nav-solution,.nav-product,.nav-contact').on('mouseleave', function() {
        $(this).children().removeClass('active');
    });
}
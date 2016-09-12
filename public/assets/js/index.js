$(document).ready(function() {
    function imgLoad() {
        var img = $('img[origin-src]');
        for (var i = 0; i < img.length; i++) {
            img[i].src = img[i].attributes['origin-src'].value;
        }
    }
    if ($('#myslider')[0]) {
        imgLoad();
        var slider = new SimpleSlider(document.getElementById('myslider'), {
            autoPlay: true,
            transitionProperty: 'opacity',
            transitionDuration: 2,
            transitionDelay: 5,
            startValue: 0,
            visibleValue: 1,
            endValue: 0,
            onChange: null,
            onChangeEnd: null
        });
    }

    function windowResize() {
        var h = $('.inner-height').width();
        $('.inner-height').height(h * 1000 / 1920);
    }
    $(window).resize(function() {
        var h = $('.inner-height').width();
        $('.inner-height').height(h * 1000 / 1920);
    });
    windowResize();
    $('.nav-solution,.nav-product,.nav-contact').on('mouseenter', function() {
        $(this).children().addClass('active');
    });
    $('.nav-solution,.nav-product,.nav-contact').on('mouseleave', function() {
        $(this).children().removeClass('active');
    });
});
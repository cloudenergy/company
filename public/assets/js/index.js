$(document).ready(function() {
    function imgLoad(src, element) {
        for (var i = 0; i < src.length; i++) {
            var img = $(element + ' ' + 'img')[i];
            img.src = src[i];
        }
    }
    var bannerSrc = [
        'assets/img/banner01.png',
        'assets/img/banner02.png',
        'assets/img/banner03.png',
        'assets/img/banner04.png',
        'assets/img/banner05.png'
    ];
    if ($('#myslider')[0]) {
        imgLoad(bannerSrc, '#myslider');
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
        var h = $('.inner-height img').height();
        $('.inner-height').height(h);
    }
    $(window).resize(function() {
        var h = $('.inner-height img').height();
        $('.inner-height').height(h);
    });
    windowResize();
    $('.nav-solution,.nav-product,.nav-contact').on('mouseenter', function() {
        $(this).children().addClass('active');
    });
    $('.nav-solution,.nav-product,.nav-contact').on('mouseleave', function() {
        $(this).children().removeClass('active');
    });
});
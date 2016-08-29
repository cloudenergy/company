$(document).ready(function() {
    function imgLoad(src, element1) {
        for (var i = 0; i < src.length; i++) {
            var img = $(element1 + ' ' + 'img')[i + 1];
            img.src = src[i];
        }
    }
    var bannerSrc = [
        './img/banner02.png',
        './img/banner03.png',
        './img/banner04.png',
        './img/banner05.png'
    ];
    imgLoad(bannerSrc, '#myslider');

    function windowResize() {
        var h = $('#myslider img').height();
        var m = $('#myslider').css('margin-left');
        $('#myslider').height(h);
        $('.news').css('left', m);
    }
    $(window).resize(function windowResize() {
        var h = $('#myslider img').height();
        var m = $('#myslider').css('margin-left');
        $('#myslider').height(h);
        $('.news').css('left', m);
    });
    windowResize();
});
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
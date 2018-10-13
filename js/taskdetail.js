(function () {
    $('.tishi').click(function () {
        sessionStorage.setItem('from','pageA');
    });
    $(".lunbo").slick({
        vertical: true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow:'<span class="prev"><img src="img/dingzhi/top.png" alt=""></span>',
        nextArrow:'<span class="next"><img src="img/dingzhi/bot.png" alt=""></span>'
    });
}())
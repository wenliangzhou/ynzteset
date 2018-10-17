(function () {
    $(document).ready(function () {
        wlz.tabInit2('duihuan');
    })
    $('.lunbo').slick({
        lazyLoad: 'ondemand',
        vertical: true,
        infinite:true,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow:'<span class="prev"><img src="img/dingzhi/top.png" alt=""></span>',
        nextArrow:'<span class="next"><img src="img/dingzhi/bot.png" alt=""></span>'
      });
    //   $(".lunbo").slick({
    //     lazyLoad: 'ondemand', // ondemand progressive anticipated
    //     infinite: true,
    //         vertical: true,
    //     slidesToShow: 4,
    //     slidesToScroll: 4
    //   });
}());
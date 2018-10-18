(function () {
    // 文本滚动
    function marquee(speed) {
        var pwidth = $('.marquee').width()
            ,boxwidth = $('.marqueebox').width()
            , juli = boxwidth + pwidth
            , time = juli / speed
            , percent = (juli - boxwidth)/juli*100
            , str1 = '.marquee {animation: marquee ' + time + 's linear infinite;}'
            , style = document.createElement('style');
        style.innerHTML = '@keyframes marquee {0%   { left: 0% }'+percent+'% { left: -' + pwidth + 'px;}'+(percent+0.00001)+'% { left: 100%;} 100%{left:0%}}' + str1;
        document.head.append(style);
    }
    marquee(100);
    
    $('.xuanfubox').click(function () {
        $(this).hide(2000);        
    })
}());
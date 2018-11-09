(function () {
    $('.lingqu').click(function () {
        var D = new Date(),
        d = D.getDay(),
        h = D.getHours();
        // 条件8888 或者 时间到了
        if($(this).attr('data')==8888 || (d==0&&h>=12)){
            $(this).addClass('ok');
            layer.msg('ok');
            // 发送请求
        }
    });
    // 文本滚动
    $('.dowebok').liMarquee({
        direction: 'up',
        drag:false,
        hoverstop:false,
		runshort: false
    });
    
}());
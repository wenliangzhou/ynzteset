(function () {
    // 初始化懒加载
    lazyLoadInit({
        coverColor:"white",
        offsetBottom:330,
        offsetTopm:330,
        showTime:0
        // onLoadBackEnd:function(i,e){
        //     console.log("onLoadBackEnd:"+i);
        // }
        // ,onLoadBackStart:function(i,e){
        //     console.log("onLoadBackStart:"+i);
        // }
    });
    // 初始化滚动
    $('.dowebok').liMarquee();
    // 推荐轮播
    $('.lunbo').slick({
        lazyLoad: 'ondemand',
        vertical: false,
        slidesToShow: 4,
        slidesToScroll: 4,
        prevArrow: '<span class="prev"><img src="img/task/right.png" alt=""></span>',
        nextArrow: '<span class="next"><img src="img/task/left.png" alt=""></span>'
    });
    function xr() {
        console.log('渲染');
    }
    layui.use(['element', 'laydate','layer'], function () {
        var element = layui.element,
            laydate = layui.laydate,
            layer = layui.layer;
        laydate.render({
            elem: '#shengri' //指定元素
        });
        // 切换请求数据
        element.on('tab(test1)', function(data){
            var send = $(this).attr('send'),
                send2 = $(this).attr('send2'),
                urldata = [{url:'https://api.github.com/users',pagebox:'shangxifan',tablebox:'shangxibox',fn:xr,limit:2}
                        ,{url:'https://api.github.com/users',pagebox:'taskfan',tablebox:'taskbox',fn:xr,limit:2}
                        ,{url:'https://api.github.com/users',pagebox:'duihuanfan',tablebox:'duihuanbox',fn:xr,limit:2}
                        ,{url:'https://api.github.com/users',pagebox:'shangjintifan',tablebox:'shangjintibox',fn:xr,limit:2}
                        ,{url:'https://api.github.com/users',pagebox:'redtifan',tablebox:'redtibox',fn:xr,limit:2}
                        ,{url:'https://api.github.com/users',pagebox:'redxifan',tablebox:'redxibox',fn:xr,limit:2}];
            if(send !== 'yes' && send !== undefined){
                wlz.tableRequsetDate(urldata[send]);
            }
            $(this).attr('send',"yes");
            layer.msg('切到到了'+ data.index + '：' + this.innerHTML);
          });
    });
}());
(function () {
    $(document).ready(function () {
        wlz.tabInit2('duihuan');
        $('.lunbo').slick({
            lazyLoad: 'ondemand',
            vertical: true,
            slidesToShow: 4,
            slidesToScroll: 4,
            prevArrow: '<span class="prev"><img src="img/dingzhi/top.png" alt=""></span>',
            nextArrow: '<span class="next"><img src="img/dingzhi/bot.png" alt=""></span>'
        });

        layui.use(['layer'], function () {
            var layer = layui.layer;
            // 兑换按钮添加事件
            var status = 1;//处理的地址状态 0 没有地址/ 1 有地址
            $('.duihuan,.xiugai').click(function (e) {
                // 填写/修改地址
                if(status ==0 || (status ==1 && $(e.target).hasClass('xiugai'))){
                    layer.open({
                        skin:'tianxie',
                        resize:false,
                        shadeClose:true,
                        move: false,
                        area:['730px','auto'],
                        title:'填写收货地址',
                        type: 1,
                        content: $('.placebox') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                    });
                }else{
                    // 确认地址
                    layer.open({
                        skin:'sure',
                        resize:false,
                        shadeClose:true,
                        area:['730px','auto'],
                        move: false,
                        title:'确认地址',
                        type: 1,
                        content: $('.surebox') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
                    });
                }  
            });
            // 修改触发事件
            $('.baocun').click(function () {
                var data = $('#place').serializeArray();
                console.log(data)
                // 发送AJAX
                // 保存成功后修改 地址状态
                status = 1;
                // 成功关闭窗口
                layer.closeAll();
            });
            
        });
        // 初始化联动
        $("#distpicker3").distpicker({
            province: "浙江省",
            city: "杭州市",
            district: "西湖区"
        });
        
        
    })
    
    
    
}());
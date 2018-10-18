   /**
    * jq3.3.1版本的$ 变量避免与 其他版本JQ冲突
    */
    (function () {
        /**
         * @ 避免jQuery冲突
         */
        $(document).ready(function () {
            $('.slick-2').slick({
                dots: false,
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1,
            });
            $('.slick-prev,.slick-next').text('');

            layui.use('layer', function () {
                var layer = layui.layer;
            });
            $('.task .logo,.pic,.answer,.article,.forum,.share').click(function () {
                layer.msg('hello!')
            })

            // 添加分页
        var data = {fanye:1};
        var maxfanye = 3;
        $('[data]').click(function () {
            var datavalue = $(this).attr('data');
            
            
            
            if(datavalue=='leftfan'){
                data.fanye-=1;
                if(data.fanye<1){
                    data.fanye =1;
                }
                $('.dangqian').html(data.fanye);
            }else{
                data.fanye+=1;
                if(data.fanye>maxfanye){
                    data.fanye = maxfanye;
                }
                $('.dangqian').html(data.fanye);
            }
            
            // 发送ajax  获得data 数据 
            $.get('http://test.php', data, (res) => {
                //更新最大翻页数
                maxfanye = Math.ceil(18/8);
                // 总条数渲染
                $('.all').html(maxfanye);
                
                function xr(res) {
                
                }
            }, 'json');
        });
        // 触发分页
        $('[data="leftfan"]').click();
        });
        
    })();
    
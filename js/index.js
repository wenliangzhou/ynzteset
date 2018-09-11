   /**
    * jq3.3.1版本的$ 变量避免与 其他版本JQ冲突
    */
   var $331 = (function () {
        /**
         * @ 避免jQuery冲突
         */
        var $331 = $;
        $331(document).ready(function () {
            $331('.slick-2').slick({
                dots: false,
                infinite: true,
                slidesToShow: 5,
                slidesToScroll: 1,
            });
            $331('.slick-prev,.slick-next').text('');

            layui.use('layer', function () {
                var layer = layui.layer;
            });
            $331('.task .logo,.pic,.answer,.article,.forum,.share').click(function () {
                layer.msg('hello!')
            })
            
            
        });
        return $331;
    })();
    
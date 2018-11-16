(function () {
    $(document).ready(function () {
        var element = layui.element;
        element.on('tab(notice)', function (data) {
            // 获取导航条的ID
            var send = $(this).attr('send'),
                footer = $('[data-footer-item = '+send+']');
                urldata = [{ url: 'https://api.github.com/users', pagebox: footer, tablebox: send, fn: xr, limit: 2 }
                    , { url: 'https://api.github.com/users', pagebox: footer, tablebox: send, fn: xr, limit: 2 }];
            if (send !== 'yes' && send !== undefined) {
                wlz.tableRequsetDate(urldata[send]);
            }

            $(this).attr('send', "yes");
            layer.msg('切到到了' + data.index + '：' + this.innerHTML);
            function xr(res, curr, limit, pagebox, tablebox) {
                var html = '';
                for(i=0;i<res.length-25;i++){
                    html += '<div class="item-li">'+
                            '<img src="img/public/gonggao.png" alt="">'+
                            '<div>'+
                            '<span class="time">公告 &nbsp;&nbsp;&nbsp;&nbsp;09/10&nbsp;&nbsp;12：51</span>'+
                            '<p class="title"><a href="noticedetail.html">【活动】棋牌福利期奖励翻倍</a></p>'+
                            '</div>'+
                            '<a href="noticedetail.html">阅读全文>></a>'+
                            '</div>';
                }
                $('[data-tab-item = '+send+']').html(html);
                console.log($('[data-tab-item = '+send+']'))
                console.log($('[data-footer-item = '+send+']'))
            }
        });
    });
}());
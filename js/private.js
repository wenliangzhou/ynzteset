var glo = this;
$(document).ready(function () {
    var url_xr_arr = ['https://test5.php', 'https://test6.php'];
    layui.use(['element', 'laypage'], function () {
        var element = layui.element;
        glo.laypage = layui.laypage;
        wlz.tableRequsetDate({ url: 'https://api.github.com/users', pagebox: 'sixinfan', tablebox: 'sixinbox', fn: xr, limit: 2 });
        element.on('tab(test2)', function (data) {
            var send = $(this).attr('send'),
                send2 = $(this).attr('send2'),
                urldata = [{ url: 'https://api.github.com/users', pagebox: 'sixinbox', tablebox: 'sixinfan', fn: xr, limit: 2 }
                    , { url: 'https://api.github.com/users', pagebox: 'taskfan', tablebox: 'taskbox', fn: xr, limit: 2 }];
            if (send !== 'yes' && send !== undefined) {
                wlz.tableRequsetDate(urldata[send]);
            }

            $(this).attr('send', "yes");
            layer.msg('切到到了' + data.index + '：' + this.innerHTML);
        });
        function xr(res, curr, limit, pagebox, tablebox) {
            console.log(element);
            
            var html = '',
                i = 0;
            for (i; i < res.length; i++) {
                html += '<li class="layui-colla-item"><span class="choose checkbox_"></span><span class="layui-colla-title"><span class="shenglue" title="点击查看更多">很沉踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩很沉踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩</span> </span> <span class="time">日期</span><div class="layui-colla-content">很沉踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩很沉踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩踩</div></li>';
            }
            $('#' + tablebox).html(html);
            element.init();
        }


        $('.head-title [data-type]').click(function () {
            var type = $(this).attr('data-type');
            switch (type) {
                case '0':
                    // 标记已读操作
                    var data0 = filter_el(this, con);
                        data0.caozuotype = 0;
                    send(data0);
                    break;
                case '1':
                    var data1 = filter_el(this);
                    // ajax
                        data1.caozuotype = 1;
                    send(data1);
                    break;
                case '2':
                    // 全选按钮触发选择操作
                    choose(this);
                    break;
                default:
                    break;
            }
        });
        // item选择事件
        $(document).on('click','.head-title li .checkbox_',function () {
            choose(this);
        })
        // 选择操作
        function choose(this_) {
            if ($(this_).hasClass('choose')) {
                $(this_).addClass('choosed').removeClass('choose');
                if ($(this_).hasClass('all')) {
                    $('.head-title [data-chooseid = ' + $(this_).attr('data-chooseid') + '] .checkbox_').addClass('choosed').removeClass('choose');
                }
            } else {
                $(this_).addClass('choose').removeClass('choosed');
                if ($(this_).hasClass('all')) {
                    $('.head-title [data-chooseid = ' + $(this_).attr('data-chooseid') + '] .checkbox_').addClass('choose').removeClass('choosed');
                }
            }
        }
        // 过滤条件的数据
        function filter_el(this_, condition) {
            var chooseid = $(this_).parent().parent().attr('data-chooseid'),
                li = $('.head-title [data-chooseid = ' + chooseid + '] li'),
                data = [],
                data2 = {};
            [...li].forEach(el => {
                if (!$(el).children().hasClass('choosed')) {
                    return false;
                }
                if (condition) {
                    if (!condition(el)) {
                        return false;
                    }
                }
                var id = $(el).attr('data-item-id');
                data.push(id);
            });
            data2.box = chooseid;
            data2.datak = data;
            return data2;
        }

        // 已读条件
        function con(el) {
            return !$(el).children().children().hasClass('read');
        }
        // 添加已读样式
        // 发送ajax
        function send(d) {
            console.log(d)
            var url_,
                url_xr;
            if (d.box == 0) {
                url_ = 'https://test0.php';
                url_xr = url_xr_arr[0];
                // ajax
                // $.post(url_,d,function () {
                    
                // });
            } else {
                url_ = 'https://test1.php';
                url_xr = url_xr_arr[1];
            }
            $.post(url_, d, function (s) {
                wlz.tableRequsetDate({ url: url_xr, pagebox: 'sixinfan', tablebox: 'sixinbox', fn: xr, limit: 2 });
            });
        }

    });
});
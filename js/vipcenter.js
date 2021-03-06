(function () {
    $(document).ready(function () {
        console.log('vip-document');
        layer.ready(function(){
        console.log('vip-layer.ready');
        // 初始化提现选项卡
        wlz.tabInit('.tixian-item');
        wlz.tabInit('.mingxi-item');
        wlz.tabInit('.shenqing-item');  
        wlz.tabInit2('shang');
        wlz.tabInit2('red');
        layui.use(['element', 'laydate','layer'], function () {
            var element = layui.element,
                laydate = layui.laydate,
                layer = layui.layer;
            laydate.render({
                elem: '#shengri' //指定元素
            });
            element.on('tab(test1)', function (data) {
                var send = $(this).attr('send'),
                    send2 = $(this).attr('send2'),
                    urldata = [{ url: 'https://api.github.com/users', pagebox: 'shangxifan', tablebox: 'shangxibox', fn: xr, limit: 2 }
                        , { url: 'https://api.github.com/users', pagebox: 'taskfan', tablebox: 'taskbox', fn: xr, limit: 2 }
                        , { url: 'https://api.github.com/users', pagebox: 'duihuanfan', tablebox: 'duihuanbox', fn: xr, limit: 2 }
                        , { url: 'https://api.github.com/users', pagebox: 'shangjintifan', tablebox: 'shangjintibox', fn: xr, limit: 2 }
                        , { url: 'https://api.github.com/users', pagebox: 'redtifan', tablebox: 'redtibox', fn: xr, limit: 2 }
                        , { url: 'https://api.github.com/users', pagebox: 'redxifan', tablebox: 'redxibox', fn: xr, limit: 2 }];
                if (send !== 'yes' && send !== undefined) {
                    // 财富明细表格第一次渲染
                    if (send2) {
                        wlz.tableRequsetDate(urldata[send2]);
                    }
                    wlz.tableRequsetDate(urldata[send]);
                }
                
                $(this).attr('send', "yes");
                layer.msg('切到到了' + data.index + '：' + this.innerHTML);
            });
            // 任务详情页打开指定item和位子
            var str = sessionStorage.getItem('from');
            if(str == 'pageA'){
                element.tabChange('test1', 'detail');
                sessionStorage.setItem("from","");
            }
            var str = sessionStorage.getItem('fromb');
            if(str == 'pageB'){
                element.tabChange('test1', 'safe');
                sessionStorage.setItem("fromb","");
                $('.mingxi-item #shangjing_').click();
            }
            var str = sessionStorage.getItem('private');
            if(str == 'pageprivate-a'){
                element.tabChange('test1', 'mingxi');
                sessionStorage.setItem("private","");
            }else if(str == 'pageprivate-b'){
                element.tabChange('test1', 'mingxi');
                sessionStorage.setItem("private","");
                $('.mingxi-item #hongbao_').click();
            }
        });
        
        // 渲染财富明细的表格
        function xr(res,curr,limit) {
            console.log("页数"+ curr);
            console.log("条数"+ limit);
        }
        
        // 详细资料-----------------------------------------------
        new YMDselect('year1', 'month1', 'day1', 2010, 3, 20);

        $('#touxiang').change(function () {
            wlz.showImage('.pic', '#touxiang');
        });
        // 提交信息
        $('.form-ziliao #submit').click(function () {
            var nichen = $('#nichen').val(),
                user = $('#xingming').val()
            phone = $('#phone').val(),
                email = $('#email').val(),
                place = $('#place').val();
            if (nichen == '') {
                layer.tips('昵称不能为空 !', '#nichen', {
                    anim: 6
                });
                return false;
            }
            if (user == '') {
                layer.tips('姓名不能为空 !', '#xingming', {
                    anim: 6
                });
                return false;
            }
            if (phone == '') {
                layer.tips('手机号不能为空 !', '#phone', {
                    anim: 6
                });
                return false;
            }
            if (email == '') {
                layer.tips('邮箱不能为空 !', '#email', {
                    anim: 6
                });
                return false;
            }
            if (place == '') {
                layer.tips('地址不能为空 !', '#place', {
                    anim: 6
                });
                return false;
            }

            var formData = new FormData();
            var file = document.querySelector('[type=file]');
            formData.append('touxiang', file.files[0]);

            //ajax发送数据
            console.log(formData)
            console.log(formData.get('touxiang'))

            $.ajax({
                url: "http://test.php",
                method: 'POST',
                data: formData,
                contentType: false, // 注意这里应设为false
                processData: false,
                cache: false,
                success: function (data) {

                }
            });
            return false;
        });
        
        layui.use(['layer'], function () {
            var  layer = layui.layer;
            // 安全中心
            $('.tan1').click(function () {
                layer.open({
                    type: 1,
                    shadeClose: true,
                    resize: false,
                    move: false,
                    shade: 0,
                    skin: 'tan-class',
                    title: '手机绑定',
                    content: $('.bangphone')
                });
            });
            $('.tan2').click(function () {
                layer.open({
                    type: 1,
                    shadeClose: true,
                    resize: false,
                    move: false,
                    shade: 0,
                    skin: 'tan-class',
                    title: '绑定银行卡',
                    content: $('.bangbank')
                });
            });
            $('.tan3').click(function () {
                layer.open({
                    type: 1,
                    shadeClose: true,
                    resize: false,
                    move: false,
                    shade: 0,
                    skin: 'tan-class',
                    title: '真实信息',
                    content: $('.banginformation')
                });
            });
            $('.tan4').click(function () {
                layer.open({
                    type: 1,
                    shadeClose: true,
                    resize: false,
                    move: false,
                    shade: 0,
                    skin: 'tan-class',
                    title: '修改登录密码',
                    content: $('.bangpsw')
                });
            });
            $('.tan5').click(function () {
                layer.open({
                    type: 1,
                    shadeClose: true,
                    resize: false,
                    move: false,
                    shade: 0,
                    skin: 'tan-class',
                    title: '设置密保',
                    content: $('.bangmibao')
                });
            });
            $('.tan6').click(function () {
                layer.open({
                    type: 1,
                    shadeClose: true,
                    resize: false,
                    move: false,
                    shade: 0,
                    skin: 'tan-class',
                    title: '设置提款密码',
                    content: $('.bangtipsw')
                });
            });
            // 获取验证码禁用按钮
            $('.bangphone .getma,.bangpsw .getma,.bangtipsw .getma')
            .click(function () {
                // 调用按钮禁用
                wlz.btnTime(this,10);
            });
            // $('.bangpsw .getma').click(function () {
            //     // 调用按钮禁用
            //     wlz.btnTime(this,10);
            // });
            // 手机号提交获取数据
            $('.bang-phone-btn').click(function () {
                var phonereg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
                    phonenum = $('#phonenum').val(),
                    mima = $('#mima').val();
                    console.log(phonenum)
                if(mima==''){
                    layer.tips('请输入登录密码 !', '#mima', {
                        anim: 6
                    });
                    return false;
                }    
                if(!phonereg.test(phonenum)){
                    layer.tips('请输入正确的手机号 !', '#phonenum', {
                        anim: 6
                    });
                    return false;
                }
                var data = $('.phone-form').serializeArray();
                console.log(data);
            });
            // 银行信息提交获取数据
            $('.bang-bank-btn').click(function () {
                var bankreg = /^[0-9]{16,19}$/,
                    bankname = $('#bankname').val(),
                    banknum = $('#banknum').val();
                    console.log(bankname);
                if(bankname == ''){
                    layer.tips('请输入银行名称 !', '#bankname', {
                        anim: 6
                    });
                    return false;
                }
                if(!bankreg.test(banknum)){
                    layer.tips('请输入正确的银行卡号 !', '#banknum', {
                        anim: 6
                    });
                    return false;
                }
                var data = $('.bank-form').serializeArray();
                console.log(data);
            });
            // 真实信息数据提交
            $('.bang-real-btn').click(function () {
                var realreg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                    realname = $('#realname').val(),
                    realnum = $('#realnum').val();
                if(realname == ''){
                    layer.tips('请输入真实姓名 !', '#realname', {
                        anim: 6
                    });
                    return false;
                }
                if(!realreg.test(realnum)){
                    layer.tips('请输入正确的身份证号 !', '#realnum', {
                        anim: 6
                    });
                    return false;
                }
                var data = $('.real-form').serializeArray();
                console.log(data);
            });
            // 修改登录密码提交
            $('.bang-psw-btn').click(function () {
                var pswreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/,
                    psw = $('#psw').val(),
                    pswa = $('#pswa').val(),
                    pswma = $('#pswma').val();
                if(!pswreg.test(psw)){
                    layer.tips('请输入正确的密码格式 !', '#psw', {
                        anim: 6
                    });
                    return false;
                }
                if(psw !== pswa){
                    layer.tips('密码不一致 !', '#pswa', {
                        anim: 6
                    });
                    return false;
                }
                if(pswma == ''){
                    layer.tips('请输入验证码 !', '#pswma', {
                        anim: 6
                    });
                    return false;
                }
                var data = $('.psw-form').serializeArray();
                console.log(data);
            });
            // 提交密保
            $('.bang-mi-btn').click(function () {
                
                var mibao = $('#mibao').val(),
                    mida = $('#mida').val();
                if(mida == ''){
                    layer.tips('请输入密保答案 !', '#mida',{
                        anim: 6
                    });
                    return false;
                }
        
                var data = $('.mi-form').serializeArray();
                console.log(data);
            });
            // 提款密码
            $('.bang-pswti-btn').click(function () {
                var pswtireg = /^[0-9]{6}$/,
                    pswti = $('#pswti').val(),
                    pswati = $('#pswati').val(),
                    pswtima = $('#pswtima').val();
                if(!pswtireg.test(pswti)){
                    layer.tips('请输入正确的密码格式 !', '#pswti', {
                        anim: 6
                    });
                    return false;
                }
                if(pswti !== pswati){
                    layer.tips('密码不一致 !', '#pswati', {
                        anim: 6
                    });
                    return false;
                }
                if(pswtima == ''){
                    layer.tips('请输入验证码 !', '#pswtima', {
                        anim: 6
                    });
                    return false;
                }
                var data = $('.pswti-form').serializeArray();
                console.log(data);
            });
        });
        // 申请提现信息提交------------
        var datashengqi = {};
        var jinereg = /^[0-9]*$/;
        // 赏金提现
        $('.shangti').click(function () {
            [...$('.shang .condition .tiao-btn li')].forEach(el => {
                if(el.className ==='li-active'){
                    datashengqi.way = el.getAttribute('num');
                }
            });
            datashengqi.num = $('.shang .jine').val();
            datashengqi.psw = $('.shang .mima').val();
            // 正则验证
            if(!jinereg.test(datashengqi.num)||datashengqi.num==''){
                layer.tips('请输入数字字符 !', '#jineshang', {
                    anim: 6
                });
                return false;
            }
            if(datashengqi.psw==''){
                layer.tips('请输入提款密码 !', '#pswshang', {
                    anim: 6
                });
                return false;
            }
            // 赏金提现 ajax
            console.log(datashengqi)
        });
        // 红包提现
        $('.redti').click(function () {
            [...$('.red .condition .tiao-btn li')].forEach(el => {
                if(el.className ==='li-active'){
                    datashengqi.way = el.getAttribute('num');
                }
            });
            datashengqi.num = $('.red .jine').val();
            datashengqi.psw = $('.red .mima').val();
            if(!jinereg.test(datashengqi.num)||datashengqi.num==''){
                layer.tips('请输入数字字符 !', '#jinered', {
                    anim: 6
                });
                return false;
            }
            if(datashengqi.psw==''){
                layer.tips('请输入提款密码 !', '#pswred', {
                    anim: 6
                });
                return false;
            }
            console.log(datashengqi)
            // 红包提现ajax
        });
        // ------------------------------表格渲染-----------------------------------
        // 表格渲染，日期选择
        layui.use(['laypage','form', 'layer','laydate'], function () {
            var laypage = layui.laypage
                ,layer = layui.layer
                ,laydate = layui.laydate
                ,form = layui.form;
            // 财富明细--------------------------------
            // 各个日期控件的初始化
            laydate.render({
                elem: '#moneytime' //指定元素
              });        
            laydate.render({
                elem: '#moneytime2' //指定元素
              });
            laydate.render({
                elem: '#tasktime' //指定元素
            });
            laydate.render({
                elem: '#tasktime2' //指定元素
            });
            laydate.render({
                elem: '#shangtitime' //指定元素
            });
            laydate.render({
                elem: '#shangtitime2' //指定元素
            });
            laydate.render({
                elem: '#redtitime' //指定元素
            });
            laydate.render({
                elem: '#redtitime2' //指定元素
            });
            laydate.render({
                elem: '#duihuantime' //指定元素
            });
            laydate.render({
                elem: '#duihuantime2' //指定元素
            });
            
            
            
            // 获取条件请求  （点击查询请求）
            var fu,time0,time1,time2,time3,status,data;
            $('.cha').click(function () {
                // fu 定义这个被点击按钮的父级，获取相应的数据
                fu = $(this).parent().parent()[0].className,
                time1 = $('.'+fu+' .condition .time1')[0].value,
                time2 = $('.'+fu+' .condition .time2')[0].value;
                
                [...$('.'+fu+' .condition .tiao-btn li')].forEach(el => {
                    if(el.className ==='li-active'){
                        time3 = el.getAttribute('num');
                    }
                });
                data = {time1:time1,time2:time2,time3:time3};
                // 当time0存在条件，就添加一个条件属性
                if($('.'+fu+' .time0')[0]){
                    [...$('.'+fu+' .time0 .tiao-btn li')].forEach(el => {
                        if(el.className ==='li-active'){
                            time0 = el.getAttribute('num');
                            data.time0=time0;
                        }
                    });
                }
                // 当状态存在的时候就添加一个属性
                if($('.'+fu+' .status')[0]){
                    status = $('.'+fu+' .status').val();
                    data.status=status;
                }
            });
            // 点击cha按钮后发送请求，向后台请求数据并渲染。通过if来判断是哪一个BOX的请求
            // 发送上面生产的data条件
            $('.cha').click(function () {
                // 赏金明细
                if(fu==='shangxibox'){
                    console.log(data);
                    wlz.tableRequsetDate({url:'https://api.github.com/repos/momodiy/sudoku/commits?per_page=2&sha=master',pagebox:'shangxifan',tablebox:'shangxibox',fn:xr,limit:2,data:data});
                } 
                // 红包明细
                if(fu==='redxibox'){
                    console.log(data);
                    wlz.tableRequsetDate({url:'https://api.github.com/repos/momodiy/sudoku/commits?per_page=2&sha=master',pagebox:'redxifan',tablebox:'redxibox',fn:xr,limit:2,data:data});
                } 
                // 兑换记录
                if(fu==='duihuanbox'){
                    console.log(data);
                    wlz.tableRequsetDate({url:'https://api.github.com/repos/momodiy/sudoku/commits?per_page=2&sha=master',pagebox:'moneyfan',tablebox:'moneybox',fn:xr,limit:2,data:data});
                }
                // 任务详情
                if(fu==='taskbox'){
                    console.log(data);
                    wlz.tableRequsetDate({url:'https://api.github.com/repos/momodiy/sudoku/commits?per_page=2&sha=master',pagebox:'moneyfan',tablebox:'moneybox',fn:xr,limit:2,data:data});
                }
                // 赏金提现
                if(fu==='shangjintibox'){
                    console.log(data);
                    wlz.tableRequsetDate({url:'https://api.github.com/repos/momodiy/sudoku/commits?per_page=2&sha=master',pagebox:'moneyfan',tablebox:'moneybox',fn:xr,limit:2,data:data});
                }
                // 红包提现
                if(fu==='redtibox'){
                    console.log(data);
                    wlz.tableRequsetDate({url:'https://api.github.com/repos/momodiy/sudoku/commits?per_page=2&sha=master',pagebox:'moneyfan',tablebox:'moneybox',fn:xr,limit:2,data:data});
                }
            });
        });
        // 表格条件选择添加样式
        $('.tiao-btn li').click(function () {
            $(this).parent().children().removeClass('li-active');
            $(this).addClass('li-active');
        });
        // 表格无数据
        function noDataShow(target,style) {
            $(target).html('<div>暂无记录</div>');
            $(target+' div').addClass(style);
            var tbody = target.replace(/fan/,'box');
            $(tbody).html('');
        }
        noDataShow('#friendsfan','fanye');
         
        // ---------------
        // 任务详情上传文件
        $('.btn2').on('click', function () {
            layer.open({
                skin: 'upload',
                resize: false,
                shadeClose: true,
                move: false,
                area: ['450px', 'auto'],
                title: '上传任务凭证',
                type: 1,
                content: $('.uploadbox') //这里content是一个DOM，注意：最好该元素要存放在body最外层，否则可能被其它的相对元素所影响
            });
        });
        $('.uploadbox #suolue').change(function () {
            wlz.showImage('.preview1', '#suolue', 'name', '请上传压缩包格式');
        });
        $('.uploadbox #original').change(function () {
            wlz.showImage('.preview2', '#original', 'name', '请上传压缩包格式');
        });
        $('.upload-btn').click(function () {
            var suolue_value = $('#suolue')[0].files[0],
                original_value = $('#original')[0].files[0];
            if (suolue_value === undefined) {
                layer.tips('请上传压缩包格式的文件 !', '.preview1', {
                    anim: 6
                });
                return false;
            } else if (original_value === undefined) {
                layer.tips('请上传压缩包格式的文件 !', '.preview2', {
                    anim: 6
                });
                return false;
            }
            var files = $('.uploadbox input[type=file]');
            var formData = new FormData();
            for (var i = 0; i < files.length; i++) {
                formData.append('file' + i, files[i].files[0]);
            }
            //ajax发送数据
            $.ajax({
                url: "https://test.php",
                method: 'POST',
                data: formData,
                contentType: false, // 注意这里应设为false
                processData: false,
                cache: false,
                success: function (data) {

                }
            });
        });
        console.log('vip-done')
    });
});
}());
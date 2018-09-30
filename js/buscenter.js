(function () {
    $(document).ready(function () {
        layui.use(['element', 'laydate','layer'], function () {
            var element = layui.element,
                laydate = layui.laydate,
                layer = layui.layer;
                $('.showimg1,.showimg2,.showimg3').click(function () {
                    var id = $(this).attr('tanImg')
                    layer.open({
                        type: 1,
                        shadeClose: true,
                        resize: false,
                        closeBtn: 0,
                        move: false,
                        shade: 0.4,
                        skin: 'tan-class',
                        title: false,
                        content: $(id)
                    });
                });     
        });

        
        // 详细资料-----------------------------------------------
        

        $('#touxiang').change(function () {
            wlz.showImage('.pic', '#touxiang');
        });
        $('#zhizhao').change(function () {
            wlz.showImage('.zhizhao', '#zhizhao','name');
        });
        $('#shenfenzheng').change(function () {
            wlz.showImage('.shenfenzheng', '#shenfenzheng','name');
        });
        $('#shenfenfan').change(function () {
            wlz.showImage('.shenfenfan', '#shenfenfan','name');
        });
        $('#wenan').change(function () {
            wlz.showImage('.wenan', '#wenan','name');
        });
        // 提交信息
        $('.form-ziliao #submit').click(function () {
            var nichen = $('#nichen').val(),
                user = $('#xingming').val(),
                shenfennum = $('#shenfennum').val(),
                phone = $('#phone').val(),
                yinyehao = $('#yinyehao').val(),
                place = $('#place').val(),
                zhizhao = $('#zhizhao')[0].files[0],
                zhizhaovalue = $('#zhizhao')[0].defaultValue,
                shenfenzheng = $('#shenfenzheng')[0].files[0],
                shenfenzhengvalue = $('#shenfenzheng')[0].defaultValue,
                shenfenfan = $('#shenfenfan')[0].files[0],
                shenfenfanvalue = $('#shenfenfan')[0].defaultValue;
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
            if (shenfennum == '') {
                layer.tips('身份证号不能为空 !', '#shenfennum', {
                    anim: 6
                });
                return false;
            }
            if (phone == '') {
                layer.tips('联系方式不能为空 !', '#phone', {
                    anim: 6
                });
                return false;
            }
            if (yinyehao == '') {
                layer.tips('营业号不能为空 !', '#yinyehao', {
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
            if (zhizhao == undefined && zhizhaovalue =='') {
                layer.tips('地址不能为空 !', '.zhizhao', {
                    anim: 6
                });
                return false;
            }
            if (shenfenzheng == undefined && shenfenzhengvalue =='') {
                layer.tips('地址不能为空 !', '.shenfenzheng', {
                    anim: 6
                });
                return false;
            }
            if (shenfenfan == undefined && shenfenfanvalue =='') {
                layer.tips('地址不能为空 !', '.shenfenfan', {
                    anim: 6
                });
                return false;
            }
            
            var files = $('#form-ziliao input[type=file]');
            var formData = new FormData();
            for(var i = 0;i<files.length;i++){
                formData.append('file'+i, files[i].files[0]);
            }
            var form = $('#form-ziliao').serializeArray();
            var data = wlz.zhuan(form);
            formData.append('data',data);
            //ajax发送数据
            $.ajax({
                url: "https://api.github.com/users",
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
        
        // 上传任务
        $('#shangchuan #submit').click(function () {
            var biaoti = $('#biaoti').val(),
                shangjin = $('#shangjin').val(),
                tasktime = $('#tasktime').val(),
                renshu = $('#renshu').val(),
                tasktext = $('#tasktext').val(),
                attention = $('#attention').val(),
                wenan = $('#wenan')[0].files[0],
                wenanvalue = $('#wenan')[0].defaultValue;
            if (biaoti == '') {
                layer.tips('标题不能为空 !', '#biaoti', {
                    anim: 6
                });
                return false;
            }
            if (shangjin == '') {
                layer.tips('预付赏金不能空 !', '#shangjin', {
                    anim: 6
                });
                return false;
            }
            if (tasktime == '') {
                layer.tips('任务时间不能为空 !', '#tasktime', {
                    anim: 6
                });
                return false;
            }
            if (renshu == '') {
                layer.tips('人数不能空 !', '#renshu', {
                    anim: 6
                });
                return false;
            }
            if (tasktext == '') {
                layer.tips('任务详情不能空 !', '#tasktext', {
                    anim: 6
                });
                return false;
            }
            if (wenan == undefined && wenanvalue =='') {
                layer.tips('地址不能为空 !', '.tishi', {
                    anim: 6
                });
                return false;
            }
            if (attention == '') {
                layer.tips('任务详情不能空 !', '#attention', {
                    anim: 6
                });
                return false;
            }
            alert('发送ajax')
            var files = $('#shangchuan input[type=file]');
            var formData = new FormData();
            for(var i = 0;i<files.length;i++){
                formData.append('file'+i, files[i].files[0]);
            }
            var form = $('#shangchuan').serializeArray();
            var data = wlz.zhuan(form);
            formData.append('data',data);
            $.ajax({
                url: "https://api.github.com/users",
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

        // 安全中心
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
                    title: '绑定支付信息',
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
            $('.tan7').click(function () {
                layer.open({
                    type: 1,
                    shadeClose: true,
                    resize: false,
                    move: false,
                    shade: 0,
                    skin: 'tan-class',
                    title: '绑定邮箱',
                    content: $('.bangmail')
                });
            });
            // 获取验证码禁用按钮
            $('.bangphone .getma,.wx-form .getma,.zfb-form .getma,.bank-form .getma,.psw-form .getma,.mail-form .getma,.bangmibao .getma,.bangtipsw .getma')
            .click(function () {
                // 调用按钮禁用
                wlz.btnTime(this,10);
            });
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
            // 邮箱提交获取数据
            $('.bang-mail-btn').click(function () {
                var mailreg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    mailnum = $('#mailnum').val(),
                    yanzmail = $('#yanzmail').val(),
                    mailmima = $('#mailmima').val();
                if(mailmima==''){
                    layer.tips('请输入登录密码 !', '#mailmima', {
                        anim: 6
                    });
                    return false;
                }   
                if(!mailreg.test(mailnum)){
                    layer.tips('请输入正确的邮箱 !', '#mailnum', {
                        anim: 6
                    });
                    return false;
                }
                if(yanzmail==''){
                    layer.tips('请输入验证码 !', '#yanzmail', {
                        anim: 6
                    });
                    return false;
                } 
                var data = $('.mail-form').serializeArray();
                console.log(data);
            });
            // 微信信息提交
            $('.bang-wx-btn').click(function () {
                var weixinnum = $('#weixinnum').val(),
                    yanzwei = $('#yanzwei').val();
                if(weixinnum == ''){
                    layer.tips('请输入微信账号 !', '#weixinnum', {
                        anim: 6
                    });
                    return false;
                }
                if(yanzwei == ''){
                    layer.tips('请输入验证码 !', '#yanzwei', {
                        anim: 6
                    });
                    return false;
                }
                
                var data = $('.wx-form').serializeArray();
                console.log(data);
            });
            // 支付宝信息提交
            $('.bang-zfb-btn').click(function () {
                var zfbnum = $('#zfbnum').val(),
                    yanzzfb = $('#yanzzfb').val();
                if(zfbnum == ''){
                    layer.tips('请输入支付宝账号 !', '#zfbnum', {
                        anim: 6
                    });
                    return false;
                }
                if(yanzzfb == ''){
                    layer.tips('请输入验证码 !', '#yanzzfb', {
                        anim: 6
                    });
                    return false;
                }
                
                var data = $('.zfb-form').serializeArray();
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
                    mida = $('#mida').val(),
                    yzfsmb = $('#yzfsmb').val(),
                    yanzmibao = $('#yanzmibao').val(),
                    fsreg = /(^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)/;
                if(mida == ''){
                    layer.tips('请输入密保答案 !', '#mida',{
                        anim: 6
                    });
                    return false;
                }
                if(yzfsmb == ''){
                    layer.tips('请输入验证方式 !', '#yzfsmb',{
                        anim: 6
                    });
                    return false;
                }
                if(!fsreg.test(yzfsmb)){
                    layer.tips('邮箱或者手机号码格式错误 !', '#yzfsmb',{
                        anim: 6
                    });
                    return false;
                }
                if(yanzmibao == ''){
                    layer.tips('请输入验证方式 !', '#yanzmibao',{
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
                    yzfsti = $('#yzfsti').val(),
                    pswtima = $('#pswtima').val(),
                    fsreg = /(^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$|^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$)/;
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
                if(!fsreg.test(yzfsti)){
                    layer.tips('手机或者邮箱格式错误 !', '#yzfsti', {
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
      
        // ------------------------------表格渲染-----------------------------------
        // 表格渲染，日期选择
        layui.use(['laypage','form', 'layer','laydate'], function () {
            var laypage = layui.laypage
                ,layer = layui.layer
                ,laydate = layui.laydate
                ,form = layui.form;
            // 财富明细-------------------------------  
            // 渲染财富明细的表格
            laydate.render({
                elem: '#tasktime3' //指定元素
            });
            laydate.render({
                elem: '#tasktime2' //指定元素
            });
            laydate.render({
                elem: '#moneytime' //指定元素
            });
            laydate.render({
                elem: '#moneytime2' //指定元素
            });
            function xr(res,curr,limit) {
                
            }
            // 任务详情第一次渲染
            wlz.tableRequsetDate({url:'https://api.github.com/users',pagebox:'taskfan',tablebox:'taskbox',fn:xr,limit:2});
            // 财富明细第一次渲染
            wlz.tableRequsetDate({url:'https://api.github.com/users',pagebox:'moneyfan',tablebox:'moneybox',fn:xr,limit:2});
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
                // 任务详情
                if(fu==='taskbox'){
                    console.log(data);
                    wlz.tableRequsetDate({url:'https://api.github.com/repos/momodiy/sudoku/commits?per_page=2&sha=master',pagebox:'moneyfan',tablebox:'moneybox',fn:xr,limit:2,data:data});
                }
                if(fu==='moneybox'){
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
    });
}());
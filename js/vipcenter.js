(function () {
    $(document).ready(function () {
        
        layui.use(['element', 'laydate','layer'], function () {
            var element = layui.element,
                laydate = layui.laydate,
                layer = layui.layer;
            laydate.render({
                elem: '#shengri' //指定元素
            });
        });

        
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
                url: "{:url('Prizeadd/prize_add')}",
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
                    phonenum = $('#phonenum').val();
                    console.log(phonenum)
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
        
    });
}());
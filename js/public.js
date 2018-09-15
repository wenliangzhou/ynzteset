(function () {
    
    if(typeof $331 !== 'undefined'){
        $ = $331;
    }
    $(document).ready(function () {
        
        layui.use(['layer'], function () {
           layer = layui.layer;
        });
        // 登陆弹出事件
        $('.sign').click(function () {
            layer.open({
                type: 1,
                skin: 'sign-class',
                shadeClose:true,
                offset: 'auto',
                resize:false,
                move: false,
                shade: 0.8,
                area:'auto',
                title:'会员登录',
                content: '<form id="login-box"><div class="form-group"><input type="text" class="form-control" name="user" id="user" placeholder="用户名/手机号/邮箱">'+
                '</div><div class="form-group"><input type="password" name="password" class="form-control" id="password" placeholder="密码"></div><div class="checkbox">'+
                '<input id="remember" name="remember" type="checkbox" value="选择"><label for="remember"> 记住用户密码</label><a>密码找回</a></div><button class = "center-block" type="button" id="login-btn" class="btn btn-default">登录</button>'+
                '<p>还没有账号? <a>立即注册</a></p><p>其他账号登录 : <span class="qq"></span><span class="wei"></span></p></form>'
            });
        });  
        $(document).on('click','#login-btn',function () {
           
            // 验证登陆表单
            if($('#user').val()===''){
                layer.tips('用户名不能为空 !', '#user',{
                    anim: 6
                });
                return false;
            }
            if($('#password').val()===''){
                layer.tips('密码不能为空 !', '#password',{
                    anim: 6
                });
                return false;
            }
            console.log($('#login-box').serializeArray());
        })
        
        // 右侧导航栏
        var qianindex;
        $('.nav-item5').click(function () {
            if($('.signin-box').css('display')=='block'){
                return false;
            }
            qianindex = layer.open({
                type: 1,
                shadeClose:true,
                resize:false,
                move: false,
                closeBtn:false,
                shade: 0.8,
                skin: 'qiandao-class',
                title:false,
                content:$('.signin-box'),
                end:function (){
                    $('.signin-box').css('display','none');            
                }
            });
        }); 
        
        // 渲染签到
        var mySchedule = new Schedule({
            el: '#schedule-box',
            // date: '2018-9-20',
            
        });
        // 关闭
        $(document).on('click','.qiandao-class .close-btn',function () {
            layer.close(qianindex);
        });
        // 监听选择
        var title,num,numtoday;
        $(document).on('click','.qiandao-class .schedule-bd li span',function (e) {
            if(e.target.className.indexOf('currentDate') > -1 && e.target.className.indexOf('qiandao') == -1){
                    title = $(this).attr('title'),
                    num = parseInt($(this).html()),
                    numtoday = $('.schedule-bd .today-flag').html();
                    
                if(title){
                    $('.today').html("日期 : " + title);
                }
                if(num <= numtoday){
                    $('.schedule-bd li span').removeClass('active');
                    $(this).addClass('active');
                }
            }
        });
        // 取值 且等服务器 返回值添加样式
        $(document).on('click','.qiandao-class .qiandao-btn,.qiandao-class .buqian-btn',function () {
            var btn = $(this)[0].className,
                date = $('.schedule-bd .active').attr('title');
                console.log(num);
                if(btn =="qiandao-btn" && num !== numtoday){
                    layer.msg('只能签到当天');
                    return false;
                }else if(btn =="buqian-btn" && num == numtoday && num !== 'undefined'){
                    layer.msg('不能补签当天');
                    return false;
                }
            // 获取数据
            console.log(date);
            if(!date){
                layer.msg('请选择签到日期');
            }
            // 添加签到样式，标记
            $('.schedule-bd .active').addClass('qiandao');
            $('.schedule-bd li span').removeClass('active');
        });
    });
})();
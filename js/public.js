(function () {
    
    if(typeof $331 !== 'undefined'){
        $ = $331;
    }
    $(document).ready(function () {
        var index; //弹框索引
        layui.use(['layer'], function () {
            var layer = layui.layer;
        });
        // 登陆弹出事件
        $('.sign').click(function () {
            if($(this).attr('open')){
                return false;
            }
            $('.sign').attr('open',true);
            index = layer.open({
                type: 1,
                
                shade: 0,
                area:'auto',
                offset: ['6%', '80%'],
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
                layer.tips('用户名不能为空 !', '#user');
                return false;
            }
            if($('#password').val()===''){
                layer.tips('密码不能为空 !', '#password');
                return false;
            }
            console.log($('#login-box').serializeArray());
        })
        //点击关闭窗口
        $(document).on('click','.layui-layer-close',function () {
            $('.sign').attr('open',false);
            layer.close(index);
        })
        
        
    });
})();
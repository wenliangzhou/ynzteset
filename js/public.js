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
        $('.nav-item5').click(function () {
            if($('.signin-box').css('display')=='block'){
                return false;
            }
            layer.open({
                type: 1,
                shadeClose:true,
                resize:false,
                move: false,
                closeBtn:false,
                shade: 0.1,
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
            clickCb: function (y,m,d) {
                document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
            },
            nextMonthCb: function (y,m,d) {
                document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
            },
            nextYeayCb: function (y,m,d) {
                document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
            },
            prevMonthCb: function (y,m,d) {
                document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
            },
            prevYearCb: function (y,m,d) {
                document.querySelector('#h3Ele').innerHTML = '日期：'+y+'-'+m+'-'+d	
            }
        });
    });
})();
(function () {
    $(document).ready(function () {
        layer.ready(function(){
            var layer = layui.layer,
            laypage = layui.laypage;
        // 定义一个全局变量，把公用方法放在这个对象上
        var arr = [];
    
        wlz = {
            timeloop:'',
            showImage:function(target,orign,type,duo='点击上传'){
                file = jQuery(orign)[0].files[0];
                console.log(file);
                // 添加图片路径到img src中进行预览
                if(!type){
                    if(!file){
                        jQuery(target).attr('src',jQuery(target).attr('data-src'));
                        return false;
                    }
                    jQuery(target).attr('src',getObjectURL(file));
                    return false;
                }
                if(type || file){
                    if(!file){
                        $(target).html(duo);
                        return false;
                    }
                    $(target).html("<div class='min'>"+file[type]+"</div>");
                }
                
                //不同浏览器下的路径不同
                 function getObjectURL(file) {
                      var url = null;
                      if (window.createObjectURL != undefined) { // basic
                        url = window.createObjectURL(file);
                      } else if (window.URL != undefined) { // mozilla(firefox)
                        url = window.URL.createObjectURL(file);
                      } else if (window.webkitURL != undefined) { // webkit or chrome
                        url = window.webkitURL.createObjectURL(file);
                      }
                      return url;
                    }
            },
            zhuan:function (x) {
                var obj = {};
                x.forEach(item => {
                    obj[item.name] = item.value;
                });
                return obj;
            },
            btnTime:function (btn,time) {
                var _this = this;
                if(time == 0) {
                    $(btn)[0].removeAttribute("disabled");
                    $(btn).html("获取验证码");
                } else {
                    $(btn)[0].setAttribute("disabled", true);
                    $(btn).html("重发("+time+")");
                    time--;
                    setTimeout(function() {
                        _this.btnTime(btn,time);
                        },1000)
                }
            },
            btnTime2:function (btn,time) {
                clearTimeout(wlz.timeloop);
                var _this = this;
                if(!arguments[2]){
                    $(btn).click(function () {
                        _this.btnTime2(btn,time,'init');
                    });
                    if(localStorage.timetext == 0 || localStorage.timetext == undefined){
                        return false;
                    }
                }
                var d = new Date();
                var dangqian = d.getTime();
                if(localStorage.time == '' || localStorage.time == undefined){
                    localStorage.time = dangqian + (time)*1000;
                }
                localStorage.timetext = parseInt((localStorage.time - dangqian)/1000);
                if(localStorage.time < dangqian+1000) {
                    localStorage.time = '';
                    $(btn)[0].removeAttribute("disabled");
                    $(btn).html("获取验证码");
                } else {
                    $(btn)[0].setAttribute("disabled", true);
                    $(btn).html("重发("+(localStorage.timetext == time?time-1:localStorage.timetext)+")");
                    
                    wlz.timeloop = setTimeout(function() {
                        _this.btnTime2(btn,time,'init');
                        },1000);
                }
            },
            tabInit:function (target) {
                var num = $(target+' .tab').length,
                tab = $(target+' .tab'),
                item = $(target+' .tabItem');
                for(var i = 0;i<num;i++){
                    $(tab[i]).attr('index',i);
                    $(item[i]).attr('index',i);
                }
                $(target+' .tab').click(function () {
                    var index = $(this).attr('index');
                    $(target+' .tab').addClass('tabhide');
                    $(this).removeClass('tabhide');
                    $(target+' .tabItem').addClass('hide');
                    $(target+' .tabItem[index = '+index+']').removeClass('hide');
                });
            },
            tableRequsetDate:function ({url,fn,curr=1,limit=5,data="",pagebox,tablebox}={}) {
                var _this = this,
                    arr = [];
                // $.ajaxSettings.async = false;
                $.getJSON(url, {
                    page: curr //向服务端传的参数，此处只是演示
                    , limit: limit //多少条
                    , can: data
                }, function (res) {
                    
                    if (res == '') {
                        $("#"+pagebox).html('<div class = "nothing">没有相关内容!!!</div>')
                        $(tablebox).html('');
                        return false;
                    }
                    fn(res, curr, limit,pagebox,tablebox);
                    //显示分页
                    
                    laypage.render({
                        elem: pagebox, //容器。值支持id名、原生dom对象，jquery对象。【如该容器为】：<div id="page1"></div>
                        // count: res['all'], //通过后台拿到的总条数
                        count:20,
                        layout: ['prev', 'page', 'next']
                        ,first: '首页'
                        ,last: '尾页'
                        , curr: curr, //当前页
                        limits: [5, 6, 7, 8, 9, 10],
                        limit: limit,
                        jump: function (obj, first) { //触发分页后的回调
                            if (!first) { //点击跳页触发函数自身，并传递当前页：obj.curr
                                _this.tableRequsetDate({url:url,fn:fn,curr:obj.curr,limit:obj.limit,data:data});
                                arr[0] = obj.curr;
                                arr[1] = obj.limit;
                            }
                        }
                    });            
                });
            },
            tabInit2:function (target,c) {
                var tab = $('.tab-'+target),
                    item = $('.item-'+target),
                    num = tab.length;
                for(var i = 0;i<num;i++){
                    $(tab[i]).attr('index',i);
                    $(item[i]).attr('index',i);
                }
                item.addClass('hide');
                if(!c){
                    $(item[0]).removeClass('hide');
                }
                tab.click(function () {
                    var index = parseInt($(this).attr('index'));
                    item.addClass('hide');
                    $(item[index]).removeClass('hide');
                    tab.removeClass('active');
                    $(this).addClass('active');
                });
            }
        }
        
        // 弹出私人导航栏
        $(document).on('click','.private-btn,.private-class .close-btn',function () {
            var key = $('.private-btn').attr('key');
            if (key === 'false') {
                $('.private-btn').attr('key',true);
                index = layer.open({
                    type: 1,
                    skin: 'private-class',
                    shadeClose: true,
                    closeBtn: false,
                    offset: 'rt',
                    resize: false,
                    move: false,
                    shade: 0,
                    area: 'auto',
                    title: false,
                    content: '<div class="private-menu"><img class="close-btn" src="img/public/private-close.png"><div class=""><img src="img/public/touxiang.png" alt=""><div><span>爱笑的兔子</span><span>ID : 153263</span></div></div>' +
                        '<ul><li data-nav-id = "5"><a href="vipcenter.html">个人中心</a></li><li data-nav-id = "5"><a class = "private-a" href="vipcenter.html#kkk">赏金余额 : <span>10M</span></a></li><li data-nav-id = "5"><a class = "private-b" href="vipcenter.html#kkk">红包余额 : 200.5元</a></li><li><a href="everyday.html">每日任务</a></li><li><a href="jionus.html">加入我们</a></li><li class = "jiaobiao" data-a = "5"><a href="private.html">私信</a></li><li class="tuichu">退出</li></ul></div>'
                });
            }else{
                $('.private-btn').attr('key',false);
                layer.close(index);
            }
        });

        //a链接 跳转到指定会员中心的位子
        $(document).on('click','.private-a',function () {
            sessionStorage.setItem('private','pageprivate-a');
            var strs = $('.nav-ul li.active').attr('data-private');
            var str = sessionStorage.getItem('private');
            if(strs =='ok'){
                layui.use('element', function () {
                    var element = layui.element;
                    if (str == 'pageprivate-a') {
                        element.tabChange('test1', 'mingxi');
                        sessionStorage.setItem("private", "");
                        $('.mingxi-item #shangjing_').click();
                    }
                });
            }
        });
        $(document).on('click','.private-b',function () {
            sessionStorage.setItem('private','pageprivate-b');
            var strs = $('.nav-ul li.active').attr('data-private');
            var str = sessionStorage.getItem('private');
            if(strs =='ok'){
                layui.use('element', function () {
                    var element = layui.element;
                    if (str == 'pageprivate-b') {
                        element.tabChange('test1', 'mingxi');
                        sessionStorage.setItem("private", "");
                        $('.mingxi-item #hongbao_').click();
                    }
                });
            }
        });
        // 页脚调到位子
        $('.footer ul li').click(function () {
            var id = $(this).attr('data-footer-id');
            sessionStorage.setItem('data-footer-id',id);
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
                '<input id="remember" name="remember" type="checkbox" value="选择"><label for="remember"> 记住用户密码</label><a href="getback.html">密码找回</a></div><button class = "center-block" type="button" id="login-btn" class="btn btn-default">登录</button>'+
                '<p>还没有账号? <a href="reg.html" target="blank">立即注册</a></p><p>其他账号登录 : <span class="qq"></span><span class="wei"></span></p></form>'
            });
        });  
        $(document).on('click','#login-btn',function () {
           
            // 验证登陆表单
            if($('#user').val()===''){
                layer.tips('用户名不能为空 !', '#user',{
                    anim: 6,
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
        
        // 反馈弹框
        $('.nav-item8').click(function () {
            if($('.fankui-box').css('display')=='block'){
                return false;
            }
            qianindex = layer.open({
                type: 1,
                shadeClose:true,
                resize:false,
                move: false,
                area:['auto'],
                shade: 0.8,
                skin: 'fankui-class',
                title:'<div>您好！以下是您对<b>找财猫</b>的意见反馈。</div>',
                content:'<div class="fankui-box"><p class="suggest"><img src="img/public/suggest.png" alt=""> 提交建议</p><p>您使用“找财猫”的过程中，总体满意程度如何？</p><div class="radio"><label><input type="radio" name="optionsRadios" value="option1" checked>非常满意</label></div><div class="radio"><label><input type="radio" name="optionsRadios" value="option2">一般</label></div><div class="radio disabled"><label><input type="radio" name="optionsRadios" value="option3" disabled>非常不满意</label></div><p>* 请留下您对“找财猫”的意见和建议！</p><textarea class="form-control" rows="3" placeholder="至少10个字，提出建议可得一定赏金哦~用心填写赏 金更多哦!"></textarea><p>联系方式：</p><input type="text" class="form-control" placeholder="请留下您的微信/QQ，以便与您联系~"><button class = "fankui-btn center">提交</button></div>',
                end:function (){
                    $('.fankui-box').css('display','none');            
                }
            });
        });
        // 反馈提交信息
        $(document).on('click','.fankui-btn',function () {
            var text = $('.fankui-box textarea').val(),
                phone = $('.fankui-box input').val();
                // ajax
                console.log(text);
                console.log(phone);
        });
        
        // 渲染签到
        if($('#schedule-box')[0]){
            var mySchedule = new Schedule({
                el: '#schedule-box',
                // date: '2018-9-20',
            });
        }
        
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
                }else{
                    num = $('.schedule-bd .active').html();
                }
            }
            console.log(num);
            console.log(numtoday);
        });
        // 取值 且等服务器 返回值添加样式
        $(document).on('click','.qiandao-class .qiandao-btn,.qiandao-class .buqian-btn',function () {
            var btn = $(this)[0].className,
                date = $('.schedule-bd .active').attr('title');
                if(!date){
                    layer.msg('请选择签到日期');
                    return false;
                }
                if(btn =="qiandao-btn" && num != numtoday){
                    layer.msg('只能签到当天');
                    return false;
                }else if(btn =="buqian-btn" && num == numtoday && num !== 'undefined'){
                    layer.msg('不能补签当天');
                    return false;
                }
            // 获取数据
            console.log(date);
            
            // 添加签到样式，标记
            $('.schedule-bd .active').addClass('qiandao');
            $('.schedule-bd li span').removeClass('active');
        });
        
        // 侧边导航栏跳转
        $('.nav-item6').click(function () {
            window.location.href="lucky.html";
        });
        $('.nav-item7').click(function () {
            window.location.href="activity.html";
        });
        $('.nav-item9').click(function () {
            window.location.href="notice.html";
        });
        // 添加导航条的active
        function nav_init() {
            $('.nav-ul li').click(function () {
                sessionStorage.setItem('data-nav-id',$(this).attr('data-nav-id'));
            });
            // 私人导航条设置data-nav-id
            $(document).on('click','.private-class ul li',function () {
                var data_nav_id = $(this).attr('data-nav-id');
                if(data_nav_id){
                    sessionStorage.setItem("data-nav-id", data_nav_id);
                }
            });
            var num = sessionStorage.getItem('data-nav-id');
            var str = '.nav-ul li[data-nav-id = "'+num+'"]';
            $('.nav-ul li').removeClass('active');
            $(str).addClass('active');
            
        }
        nav_init();
    })
    });
    
})();
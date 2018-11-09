layui.use(['element','layer'], function () {
    var element = layui.element,
        layer = layui.layer;
        $('.bangding').click(function () {
            sessionStorage.setItem("fromb","pageB");
        });
    //  进入页脚指定地方
    var id = sessionStorage.getItem('data-footer-id');
    if(id == 1){
        element.tabChange('test1', 'lianxi');
    }
    if(id == 2){
        element.tabChange('test1', 'xieyi');
    }
});


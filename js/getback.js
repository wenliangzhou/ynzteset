(function (golbal) {
    $(document).ready(function () {


        //获取元素距离页面边缘的距离
        function getOffset(box, direction) {

            var setDirection = (direction == 'top') ? 'offsetTop' : 'offsetLeft';

            var offset = box[setDirection];

            var parentBox = box.offsetParent;
            while (parentBox) {

                offset += parentBox[setDirection];
                parentBox = parentBox.offsetParent;
            }
            parentBox = null;

            return parseInt(offset);
        }

        function moveCode(code, callback) {

            var fn = { codeVluae: code };

            var box = document.querySelector("#code-box"),
                progress = box.querySelector("p"),
                codeInput = box.querySelector('.code-input'),
                evenBox = box.querySelector("span");

            //默认事件
            var boxEven = ['mousedown', 'mousemove', 'mouseup'];
            //改变手机端与pc事件类型
            if (typeof document.ontouchstart == 'object') {

                boxEven = ['touchstart', 'touchmove', 'touchend'];
            }

            var goX, offsetLeft, deviation, evenWidth, endX;

            function moveFn(e) {
                e.preventDefault();
                e = (boxEven['0'] == 'touchstart') ? e.touches[0] : e || window.event;


                endX = e.clientX - goX;
                endX = (endX > 0) ? (endX > evenWidth) ? evenWidth : endX : 0;

                if (endX > evenWidth * 0.7) {

                    progress.innerText = '松开验证';
                    progress.style.backgroundColor = "#66CC66";
                } else {

                    progress.innerText = '';
                    progress.style.backgroundColor = "#FFFF99";
                }

                progress.style.width = endX + deviation + 'px';
                evenBox.style.left = endX + 'px';
            }

            function removeFn() {

                document.removeEventListener(boxEven['2'], removeFn, false);
                document.removeEventListener(boxEven['1'], moveFn, false);

                if (endX > evenWidth * 0.7) {

                    progress.innerText = '验证成功';
                    progress.style.width = evenWidth + deviation + 'px';
                    evenBox.style.left = evenWidth + 'px'

                    codeInput.value = fn.codeVluae;
                    evenBox.onmousedown = null;

                    // 成功后移除验证监听事件
                    moveFn = null;
                    callback();
                } else {

                    progress.style.width = '0px';
                    evenBox.style.left = '0px';
                }
            }

            evenBox.addEventListener(boxEven['0'], function (e) {

                e = (boxEven['0'] == 'touchstart') ? e.touches[0] : e || window.event;

                goX = e.clientX,
                    offsetLeft = getOffset(box, 'left'),
                    deviation = this.clientWidth,
                    evenWidth = box.clientWidth - deviation,
                    endX;

                document.addEventListener(boxEven['1'], moveFn, false);

                document.addEventListener(boxEven['2'], removeFn, false);
            }, false);

            fn.setCode = function (code) {

                if (code)
                    fn.codeVluae = code;
            }

            fn.getCode = function () {

                return fn.codeVluae;
            }

            fn.resetCode = function () {

                evenBox.removeAttribute('style');
                progress.removeAttribute('style');
                codeInput.value = '';
            };

            return fn;
        }




        codeFn = new moveCode('ddd', function () {
            $('.yanzbox').removeClass('hide');
        });
        golbal.wlz.btnTime2('.btnz', 60);

        // 验证登陆表单
        // 手机号正则 邮箱正则 密码正则
        var mPattern = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/,
            pattern = /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/,
            pswreg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,21}$/;
        $('.next').click(function () {
            var user = $('#user').val(),
                yanz = $('#yanz').val();
            if (user === '') {
                layer.tips('请输入手机号或者邮箱 !', '#user', {
                    anim: 6,
                    skin: 'xiugai'
                });
                return false;
            }
            if(!mPattern.test(user) && !pattern.test(user)){
                layer.tips('格式错误 !', '#user', {
                    anim: 6,
                    skin: 'xiugai'
                });
                return false;
            }
            if (yanz === '') {
                layer.tips('请输入验证码 !', '.btnz', {
                    anim: 6,
                    skin: 'xiugai2'
                });
                return false;
            }
            // 发送ajax

            // 成功状态
            $('.userbox').addClass('hide');
            $('.setbox').removeClass('hide');
        });
        // 设置密码box
        $('.set-btn').click(function () {
            var psw = $('#psw').val(),
                pswa = $('#pswa').val();
            if(psw === ''){
                layer.tips('请输入密码 !', '#psw', {
                    anim: 6,
                    skin:'xiugai3'
                });
                return false;
            }
            if(!pswreg.test(psw)){
                layer.tips('由字母数组组成、长度6-16个字符 !', '#psw', {
                    anim: 6,
                    skin:'xiugai3'
                });
                return false;
            }
            if(pswa!==psw){
                layer.tips('密码不一致 !', '#psw', {
                    anim: 6,
                    skin:'xiugai4'
                });
                return false;
            }

            // 发送ajax

            // 成功
            $('.setbox').addClass('hide');
            $('.successbox').removeClass('hide');
        });

    });


}(this));
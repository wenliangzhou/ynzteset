(function () {
    $('.item4 .text_s').click(function () {
        sessionStorage.setItem("fromc","pageC"); 
    });

    function step(k=1) {
        var c = document.getElementById('stepprogress'),
        ctx = c.getContext('2d'),
        k = k,// 当前关卡  K 默认1
        str = ['1.商家填写资料','2.提交信息资质','3.信息审核中','4.成为商家'];
        ctx.clearRect(0,0,c.width,c.height);
        // 默认颜色
        ctx.strokeStyle = '#666666';
        ctx.fillStyle = '#666666';
        for (let i = 0; i < 4; i++) {
            ctx.strokeStyle = k>i ? "#ffe405":'#666666';
            ctx.beginPath();
            ctx.moveTo(156+i*304,53);
            ctx.arc(144+i*304,53,12,0,Math.PI*2,true);
            ctx.stroke();
            ctx.strokeStyle = k>(i+1) ? "#ffe405":'#666666';
            if(i<3){
                ctx.beginPath();           
                ctx.moveTo(156+i*304,53);
                ctx.lineTo(132+(i+1)*304,53);
                ctx.closePath();
                ctx.stroke();
            }
            ctx.fillStyle = k>i ? "#ffe405":'#666666';
            ctx.beginPath();     
            ctx.moveTo(156+i*304,53);
            ctx.arc(144+i*304,53,7,0,Math.PI*2,true);
            ctx.fill();
            ctx.fillStyle = '#000000';
            ctx.font = "16px MicrosoftYaHei";
            ctx.textAlign = "center";
            ctx.fillText(str[i], 140+i*304,100,120);
        }
    }
    step(1);
    // 预览
    $('#touxiang').change(function () {
        wlz.showImage('.pic', '#touxiang');
    });
    $('#zhizhao').change(function () {
        wlz.showImage('.zhizhao', '#zhizhao');
    });
    $('#zhengmian').change(function () {
        wlz.showImage('.zhengmian', '#zhengmian');
    });
    $('#fanmian').change(function () {
        wlz.showImage('.fanmian', '#fanmian');
    });

    // 提交信息
    $('.form-ziliao #submit').click(function () {
        var nichen = $('#nichen').val(),
            user = $('#xingming').val(),
            shenfennum = $('#shenfennum').val(),
            phone = $('#phone').val(),
            yinyehao = $('#yinyehao').val(),
            place = $('#place').val(),
            touxiang = $('#touxiang')[0].files[0],
            touxiangvalue = $('#touxiang')[0].defaultValue,
            realreg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
            phonereg = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,5-9]))\d{8}$/;
        // if (touxiang == undefined && touxiangvalue =='') {
        //     layer.tips('请上传头像 !', '.pic', {
        //         anim: 6
        //     });
        //     return false;
        // }
        // if (nichen == '') {
        //     layer.tips('昵称不能为空 !', '#nichen', {
        //         anim: 6
        //     });
        //     return false;
        // }
        // if (user == '') {
        //     layer.tips('姓名不能为空 !', '#xingming', {
        //         anim: 6
        //     });
        //     return false;
        // }
        // if (shenfennum == '' || !realreg.test(shenfennum)) {
        //     layer.tips('身份证号格式不对 !', '#shenfennum', {
        //         anim: 6
        //     });
        //     return false;
        // }
        // if (phone == '' || !phonereg.test(phone)) {
        //     layer.tips('联系方式不能为空 !', '#phone', {
        //         anim: 6
        //     });
        //     return false;
        // }
        // if (yinyehao == '') {
        //     layer.tips('营业号不能为空 !', '#yinyehao', {
        //         anim: 6
        //     });
        //     return false;
        // }
        // if (place == '') {
        //     layer.tips('地址不能为空 !', '#place', {
        //         anim: 6
        //     });
        //     return false;
        // }
        
        var form = $('#form-ziliao').serializeArray();
        var data = wlz.zhuan(form);
        //ajax发送数据
        

        // 成功后的操作
        $('.item2').removeClass('hide');
        $('.item1').addClass('hide');
        step(2);
        return false;
    });
    // 提交图片
    $('.upload-btn-pic').click(function () {
        var zhizhao = $('#zhizhao')[0].files[0],
            zhizhaovalue = $('#zhizhao')[0].defaultValue,
            zhengmian = $('#zhengmian')[0].files[0],
            zhengmianvalue = $('#zhengmian')[0].defaultValue,
            fanmian = $('#fanmian')[0].files[0],
            fanmianvalue = $('#fanmian')[0].defaultValue;
        // if (zhizhao == undefined && zhizhaovalue =='') {
        //     layer.tips('请上传营业执照 !', '.zhizhao', {
        //         anim: 6
        //     });
        //     return false;
        // }
        // if (zhengmian == undefined && zhengmianvalue =='') {
        //     layer.tips('请上传正面身份证 !', '.zhengmian', {
        //         anim: 6
        //     });
        //     return false;
        // }
        // if (fanmian == undefined && fanmianvalue =='') {
        //     layer.tips('请上传反面身份证 !', '.fanmian', {
        //         anim: 6
        //     });
        //     return false;
        // }
        var files = $('#form-ziliao input[type=file]');
        var formData = new FormData();
        for(var i = 0;i<files.length;i++){
            formData.append('file'+i, files[i].files[0]);
        }
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

        // 成功后的操作
        // $('.item3').removeClass('hide');
        $('.item2').addClass('hide');
        $('.item4').removeClass('hide');
        step(3);
        return false;
    });
}());
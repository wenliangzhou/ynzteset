
var angles,
    clickNum = 5,
    rotNum = 0,
    color = ['#e49530','#ffffff','#e49530','#ffffff','#ffeab0','#ffffff','#ffeab0','#ffffff'],
    info = ["天梭魅时男表","小米手机8","赏金","看尚电视","现金红包","谢谢参与","奔驰汽车","笔记本 MAC"],
    info1 = [],
    imgs = ['img/activity/shoubiao.png','img/activity/shouji.png','img/activity/jinbi.png','img/activity/dianshi.png','img/activity/hongbao.png','img/activity/xiexie.png','img/activity/qiche.png','img/activity/diannao.png'];
// 绘制
drawpan();
// 绑定开始事件
$('#tupBtn').bind('click',function(){
    if (clickNum >= 1) {
        //可抽奖次数减一
        clickNum = clickNum-1;
        //转盘旋转
        runCup();
        //转盘旋转过程“开始抽奖”按钮无法点击
        $('#tupBtn').attr("disabled", true);
        //旋转次数加一
        rotNum = rotNum + 1;
        //“开始抽奖”按钮无法点击恢复点击
        setTimeout(function(){
            alert(notice);
            $('#tupBtn').removeAttr("disabled", true);
        },6000);
    }
    else{
        alert("亲，抽奖次数已用光！");
    }
});
//转盘旋转
function runCup(){
    probability();
    var degValue = 'rotate('+angles+'deg'+')';
    $('.mybox').css('-o-transform',degValue);           //Opera
    $('.mybox').css('-ms-transform',degValue);          //IE浏览器
    $('.mybox').css('-moz-transform',degValue);         //Firefox
    $('.mybox').css('-webkit-transform',degValue);      //Chrome和Safari
    $('.mybox').css('transform',degValue);
}
//各奖项对应的旋转角度及中奖公告内容
function probability(){
    //获取随机数
    var num = 0;
    //概率
    if ( num == 0 ) {
        angles = 2160 * rotNum + 1800;
        notice = info[0] + info1[0];
    }
    //概率
    else if ( num == 7 ) {
        angles = 2160 * rotNum + 1845;
        notice = info[7] + info1[7];
    }
    //概率
    else if ( num == 6 ) {
        angles = 2160 * rotNum + 1890;
        notice = info[6] + info1[6];
    }
    //概率
    else if ( num == 5 ) {
        angles = 2160 * rotNum + 1935;
        notice = info[5] + info1[5];
    }
    //概率
    else if ( num == 4 ) {
        angles = 2160 * rotNum + 1980;
        notice = info[4] + info1[4];
    }
    //概率
    else if ( num == 3 ) {
        angles = 2160 * rotNum + 2025;
        notice = info[3] + info1[3];
    }
    //概率
    else if ( num == 2 ) {
        angles = 2160 * rotNum + 2070;
        notice = info[2] + info1[2];
    }
    //概率
    else if ( num == 1 ) {
        angles = 2160 * rotNum + 2115;
        notice = info[1] + info1[1];
    }
}
// 绘制转盘
function drawpan() {
    var c=document.getElementById('mycanvas');
    var ctx=c.getContext('2d');
    createCircle();
    createCirText();
    createImg();
    //外圆
		function createCircle(){
	        var startAngle = 0;//扇形的开始弧度
	        var endAngle = 0;//扇形的终止弧度
	        //画一个8等份扇形组成的圆形
	        for (var i = 0; i< 8; i++){
	            startAngle = Math.PI*(i/4-1/8);
	            endAngle = startAngle+Math.PI*(1/4);
	            ctx.save();
	            ctx.beginPath(); 
	            ctx.arc(c.width/2,c.height/2,132, startAngle, endAngle, false);
	            ctx.lineWidth = c.width/2;
                ctx.strokeStyle =  color[i];
	            ctx.stroke();
	            ctx.restore();
	        } 
        }
        //各奖项
	    function createCirText(){	 
		    ctx.textAlign='start';
		    ctx.textBaseline='middle';
		    ctx.fillStyle = color[3];
		    var step = 2*Math.PI/8;
		    for ( var i = 0; i < 8; i++) {
		    	ctx.save();
		    	ctx.beginPath();
		        ctx.translate(c.width/2,c.height/2);
		        ctx.rotate(i*step);
		        ctx.font = " 18px MicrosoftYaHei";
                ctx.fillStyle = '#623700';
                ctx.textAlign = "center";
                ctx.fillText(info[i],0,-160);
		        ctx.closePath();
				ctx.restore();
		    }
        }
        function createImg(){	 
		    var step = 2*Math.PI/8;
		    for ( var i = 0; i < 8; i++) {
                (function name(i) {
                    var img = new Image();   // 创建img元素
                    img.onload = function(){
                        ctx.save();
                        ctx.beginPath();
                        ctx.translate(c.width/2,c.height/2);
                        ctx.rotate(i*step);
                        ctx.drawImage(img,-33,-150,70,70);
                        ctx.closePath();
                        ctx.restore();
                    }
                    img.src = imgs[i]; // 设置图片源地址
                }(i));
            }
            
		}
}

$(".vertical-center-4").slick({
    dots: false,
    vertical: true,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed: 1000,
    arrows:false,
    pauseOnHover:false
});
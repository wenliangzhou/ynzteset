(function () {
    
    // 文本滚动
    function marquee(speed) {
        var pwidth = $('.marquee').width()
            ,boxwidth = $('.marqueebox').width()
            , juli = boxwidth + pwidth
            , time = juli / speed
            , percent = (juli - boxwidth)/juli*100
            , str1 = '.marquee {animation: marquee ' + time + 's linear infinite;}'
            , style = document.createElement('style');
        style.innerHTML = '@keyframes marquee {0%   { left: 0% }'+percent+'% { left: -' + pwidth + 'px;}'+(percent+0.00001)+'% { left: 100%;} 100%{left:0%}}' + str1;
        document.head.append(style);
    }
    marquee(100);
    // 物品翻页搜索等ajax请求
    // 第一次请求渲染
    $(document).ready(function () {
        // 请求数据
        // 初始条件
        var data = {data:'all',fanye:1};
        
        // 第一次渲染条件/并发出请求
        // 得到最大翻页数
        var maxfanye = Math.ceil(9/8);
        $('[data]').click(function () {
            var datavalue = $(this).attr('data');
            if(datavalue!=='leftfan'&&datavalue!=='rightfan'){
                data.data = datavalue;
                data.fanye = 1;
                // 请求条件的ajax
                
                console.log(data)
                // 重置最大翻页数
                maxfanye = Math.ceil(17/8);
                // 请求完推出函数
                return false;
            }
            if(datavalue=='leftfan'){
                data.fanye-=1;
                if(data.fanye<1){
                    data.fanye =1;
                }
            }else{
                data.fanye+=1;
                if(data.fanye>maxfanye){
                    data.fanye = maxfanye;
                }
            }
            console.log(data)
        });
    });
}());
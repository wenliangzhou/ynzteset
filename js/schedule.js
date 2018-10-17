
;(function (undefined) {
	var _global;
	//工具函数
	//配置合并
	function extend (def,opt,override) {
		for(var k in opt){
			if(opt.hasOwnProperty(k) && (!def.hasOwnProperty(k) || override)){
				def[k] = opt[k]
			}
		}
		return def;
	}
	//日期格式化
	function formartDate (y,m,d,symbol) {
		symbol = symbol || '-';
		m = (m.toString())[1] ? m : '0'+m;
		d = (d.toString())[1] ? d : '0'+d;
		return  y+symbol+m+symbol+d+'';
	}

	function Schedule (opt) {
		var def = {},
			opt = extend(def,opt,true),
			curDate = opt.date ? new Date(opt.date) : new Date(),
			year = curDate.getFullYear(),
			month = curDate.getMonth(),
			day = curDate.getDate(),	
			currentYear = curDate.getFullYear(),
			currentMonth = curDate.getMonth(),
			currentDay = curDate.getDate(),
			selectedDate = '',
			el = document.querySelector(opt.el) || document.querySelector('body'),
			_this = this;
		var bindEvent = function (){
			el.addEventListener('click',function(e){
				switch (e.target.id) {
					case 'nextMonth': 
						_this.nextMonthFun();
						break;
					case 'nextYear': 
						_this.nextYearFun();
						break;
					case 'prevMonth': 
						_this.prevMonthFun();
						break;
					case 'prevYear': 
						_this.prevYearFun();
						break;
					default:
						break;
				};
				
			},false)
		}
		var init = function () {
			var scheduleHd = '<div class="schedule-hd">'+
								'<div>'+
									'<span class="arrow icon iconfont icon-116leftarrowheads" id="prevYear" ></span>'+
									'<span class="arrow icon iconfont icon-112leftarrowhead" id="prevMonth"></span>'+
								'</div>'+
								'<div class="today">'+formartDate(year,month+1,day,'-')+'</div>'+
								'<div>'+
									'<span class="arrow icon iconfont icon-111arrowheadright" id="nextMonth"></span>'+
									'<span class="arrow icon iconfont icon-115rightarrowheads" id="nextYear"></span>'+
								'</div>'+
							'</div>'
			var scheduleWeek = '<ul class="week-ul ul-box">'+
									'<li>周日</li>'+
									'<li>周一</li>'+
									'<li>周二</li>'+
									'<li>周三</li>'+
									'<li>周四</li>'+
									'<li>周五</li>'+
									'<li>周六</li>'+
								'</ul>'
			var scheduleBd = '<ul class="schedule-bd ul-box" ></ul>'; 
			var rule = '<p class="btn-box"><button class="qiandao-btn">签到</button><button class="buqian-btn">补签</button></p><p class="rule"><span>签到规则<span></p>'+
			'<p class="guize">补签使用30000赏金进行</p><p class="guize">周连续签到，奖励金额在周一重新计算</p><p class="guize">完整签到七日（包括补签）后可额外得50000赏金</p>'+
			'<img class="cat" src="img/public/cat.png" alt=""><img class="close-btn" src="img/public/close.png" alt="">';
			el.innerHTML = scheduleHd + scheduleWeek  + scheduleBd + rule;
			bindEvent();
			render();
		}
		var render = function () {
			var arr = ['2018-10-21','2018-10-23'];
			var fullDay = new Date(year,month+1,0).getDate(), //当月总天数
				startWeek = new Date(year,month,1).getDay(), //当月第一天是周几
				total = (fullDay+startWeek)%7 == 0 ? (fullDay+startWeek) : fullDay+startWeek+(7-(fullDay+startWeek)%7),//元素总个数
				lastMonthDay = new Date(year,month,0).getDate(), //上月最后一天
				eleTemp = [];
			for(var i = 0; i < total; i++){
				if(i<startWeek){
					eleTemp.push('<li class="other-month"><span class="dayStyle">'+(lastMonthDay-startWeek+1+i)+'</span></li>')
				}else if(i<(startWeek+fullDay)){
					var nowDate = formartDate(year,month+1,(i+1-startWeek),'-');
					var addClass = '';
					var addClass2 = '';
					arr.forEach(el =>{
						if(el==nowDate){
							addClass2=' qiandao';
						}
					});
					
					selectedDate == nowDate && (addClass = 'selected-style');
					if(addClass2 ==' qiandao'&& formartDate(currentYear,currentMonth+1,currentDay,'-') == nowDate){
						addClass = 'today-flag';
					}else{
						formartDate(currentYear,currentMonth+1,currentDay,'-') == nowDate && (addClass = 'today-flag active');
					}
					
					
					eleTemp.push('<li class="current-month" ><span title='+nowDate+' class="currentDate dayStyle '+addClass+addClass2+'">'+(i+1-startWeek)+'</span></li>')
				}else{
					eleTemp.push('<li class="other-month"><span class="dayStyle">'+(i+1-(startWeek+fullDay))+'</span></li>')
				}
			}
			el.querySelector('.schedule-bd').innerHTML = eleTemp.join('');
			el.querySelector('.today').innerHTML = "日期 : "+ formartDate(year,month+1,day,'-');
		};
		this.nextMonthFun = function () {
			if(month+1 > 11){
				year += 1;
				month = 0;
			}else{
				month += 1;
			}
			render();
			opt.nextMonthCb && opt.nextMonthCb(year,month+1,day);
		},
		this.nextYearFun = function () {
			year += 1;
			render();
			opt.nextYeayCb && opt.nextYeayCb(year,month+1,day);
		},
		this.prevMonthFun = function () {
			if(month-1 < 0){
				year -= 1;
				month = 11;
			}else{
				month -= 1;
			}
			render();
			opt.prevMonthCb && opt.prevMonthCb(year,month+1,day);
		},
		this.prevYearFun = function () {
			year -= 1;
			render();
			opt.prevYearCb && opt.prevYearCb(year,month+1,day);
		}
		init();
	}
	//将插件暴露给全局对象
	_global = (function(){return this || (0,eval)('this')}());
	if(typeof module !== 'undefined' && module.exports){
		module.exports = Schedule;
	}else if (typeof define === "function" && define.amd){
		define(function () {
			return Schedule;
		})
	}else {
		!('Schedule' in _global) && (_global.Schedule = Schedule);
	}

}());
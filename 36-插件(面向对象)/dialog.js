;(function($,window,document,noGlobal){
	function Dialog(element,options){
		options = options || {};
		
		//如果传入的参数不是对象，抛出一个参数
		if(options.constructor !== Object){
			throw new Error("请传入对象");
			options = {};
		}
		
		this.defaults = {
			title:"这是一个弹框",
			content:"这是内容",
			okFn:function(){}
		};
		
		//this.element指向jq对象
		this.element = element;
		$.extend(this.defaults,options);
		
		this.init();
	}
	
	Dialog.prototype = {
		constructor:Dialog,
		init(){
			//放入结构
			this.diadiv = this.html();
			$("body").append(this.diadiv);
//			this.diadiv = this.diadiv.get(0);
//			this.diadiv.style.zindex = 100;
			this.position();
			this.addevent();
		},
		html(){
			//内容
			var oDiv = $("<div class='pos_choice'></div>");
			var html = '<header class="head"></header>\
						<h3 class="title">'+ this.defaults.title +'</h3>\
						<div class="content" >'+ this.defaults.content +'</div>\
						<div class="cue">不可以移动到当前元素的下面</div>\
						<footer class="pos_choice_foot">\
							<div class="sure">确定</div>\
							<div class="cancel">取消</div>\
						</footer>\
						<div class="cha">×</div>'
			oDiv.html(html);
			return oDiv;
		},
		position(){
			this.diadiv.css("left",($(window).width()-this.diadiv.width())/2)
			this.diadiv.css("top",($(window).height()-this.diadiv.height() + $(window).scrollTop())/2)
		}
//		addevent(){
//			var This = this;
//			$(".cancel").click(function(){
//				$(This.diadiv).remove();
//			});
//			$(".cha").click(function(){
//				$(This.diadiv).remove();
//			});
//			$(".sure").click(function(){
//				var bl = This.defaults.okFn();
////					1. return undefined 关闭
////					2. return false  关闭
////					3. return true   不关闭
//				if(!bl){
//					$(This.diadiv).remove();
//				}
//			});
//			$(window).on("resize scroll",function(){
//				This.position();
//			})
//		}
	}
	
	$.dialog = function(options){
		new	Dialog(this,options);
	}
	
})(jQuery,window,window.document)

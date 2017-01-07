;(function($,window,document,noGlobal){
	function Drag(element,obj){
		//构造函数
		this.defaults = {
			left:null
		}
		//element为jq对象，是被拖拽的元素
		this.element = element;
		//将obj添加到this.defaults上
		$.extend(true,this.defaults,obj)
		
		this.init();
	}
	
	Drag.prototype = {
		constructor:Drag,
		//proXY
		init(){
			this.element.mousedown(this.downFn.bind(this))
//			通过事件调用，this会指向触发该事件的原生的元素，所以要用bind去改变this的指向，让他指向jq包装过的实例
		},
		downFn(ev){
			this.disX = ev.pageX - this.element.offset().left;
			this.disY = ev.pageY - this.element.offset().top;
			
			$(document).on("mousemove.drag",this.moveFn.bind(this))
			$(document).on("mouseup.drag",this.upFn.bind(this))
		},
		moveFn(ev){
			this.element.css("left",ev.pageX - this.disX)
			this.element.css("top",ev.pageY - this.disY)
			//调用自定义事件
			this.element.trigger("moving")
		},
		upFn(){
			$(document).off("mousemove.drag mouseup.drag")
		}
		
	}
	
	$.fn.drag = function(obj){
//		this指向jq对象
		new Drag(this,obj);
	}
	
})(jQuery,window,window.document)

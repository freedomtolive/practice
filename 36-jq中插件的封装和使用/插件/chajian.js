;(function($,document,window,noGlobal){
	$.extend({
		//弹窗：面向过程(jq)
		dialog:function(obj){
			var defaults = {
				title:obj.title ||'这是一个弹框',
				content:obj.content || '这是一个弹框,请写内容',
				okFn:obj.okFn || function (){}
			}
			var oLogin = $('<div class="pos_choice"><h3 class="title">'+ defaults.title +'</h3><div class="content" >'+defaults.content+'</div><div class="cue">不可以移动到当前元素的下面</div><footer class="pos_choice_foot"><div class="sure">确定</div><div class="cancel">取消</div></footer><div class="cha">×</div></div>')
			$('body').append(oLogin);
			oLogin.css('left',($(window).width()-oLogin.outerWidth())/2);
			oLogin.css('top',($(window).height()-oLogin.outerHeight())/2 );
			
			$('.cancel').click(function(){
				oLogin.remove();
			});
			$('.cha').click(function(){
				oLogin.remove();
			});
			$(window).on('resize scroll',function(){
				oLogin.css('left',($(window).width() - oLogin.outerWidth())/2);
				oLogin.css('top' , ($(window).height() - oLogin.outerHeight())/2 + $(window).scrollTop() );
			})
		},
		//弹窗：面向对象(原生的写法)
		dialog2:function(options){
			function Dialog3(options){
				this.defaults = {
				title:'这是一个弹框',
				content:'这是一个弹框,请写内容',
				okFn:function (){}
			};
				
				//如果传入的opt不是一个对象时，那么默认他为一个空对象
				if(options.constructor !== Object){
					options = {};
				}
				//将opt的属性复制一份，避免修改原来的数据
				for(var attr in options){
					this.defaults[attr] = options[attr]
				}
				this.mask();
				this.init();
			}
			
			Dialog3.prototype = {
				constructor : Dialog3,
				init(){
					this.div = this.html();
					document.body.appendChild(this.div);
					this.div.zIndex = 100;
					//定位置
					this.pos();
					this.addevent();
					this.sty();
					new Drag({
						dragEle:this.div.querySelector('.title'),
						moveEle:this.div
					});
				},
				mask(){
					this.Mask = document.createElement("div")
					this.Mask.style.cssText = "width:100%;height:100%;background:#000;opacity: .5;position:fixed;left:0;top:0;z-index:99;";
					document.body.appendChild(this.Mask)
				},
				html(){
					//内容
					var oDiv = document.createElement("div");
					oDiv.className = 'pos_choice';
					var html = '<header class="head"></header>\
								<h3 class="title">'+ this.defaults.title +'</h3>\
								<div class="content" >'+ this.defaults.content +'</div>\
								<div class="cue">不可以移动到当前元素的下面</div>\
								<footer class="pos_choice_foot">\
									<div class="sure">确定</div>\
									<div class="cancel">取消</div>\
								</footer>\
								<div class="cha">×</div>'
					oDiv.innerHTML = html;
					return oDiv;
				},
				sty(){
					this.div.style.width = this.defaults.width + 'px';
					this.div.style.height = this.defaults.height + 'px';
				},
				pos(){
					this.div.style.left = (this.dWidth() - this.div.offsetWidth)/2 + 'px';
					this.div.style.top = (this.dHeight() - this.div.offsetHeight)/2 + 'px';
					
					if(this.defaults.left !== null && !isNaN(Number(this.defaults.left)) ){
						this.div.style.left = this.defaults.left + 'px';
					};
					if(this.defaults.left !== null && !isNaN(Number(this.defaults.top)) ){
						this.div.style.top = this.defaults.top + 'px';
					};
				},
				dWidth(){
					return document.documentElement.offsetWidth;
				},
				dHeight(){
					return document.documentElement.clientHeight;
				},
				//添加点击事件;
				addevent(){
					var This = this;
					//添加取消事件
					this.oClose = this.div.getElementsByClassName('cha')[0]
					this.oClose.addEventListener('click',function(){
						document.body.removeChild(This.div);
						document.body.removeChild(This.Mask);
					},false)
					
					//添加确定,取消事件绑定函数
					this.sure = this.div.querySelector('.sure');
					this.cancel = this.div.querySelector('.cancel');
					
					this.cancel.addEventListener('click',function(){
						document.body.removeChild(This.div);
						document.body.removeChild(This.Mask);
					},false)
					
					this.sure.addEventListener('click',function(){
						var bl = This.defaults.okFn(); 
		//					1. return undefined 关闭
		//					2. return false  关闭
		//					3. return true   不关闭
						if( !bl ){
							document.body.removeChild(This.div);
							document.body.removeChild(This.Mask);
						}
					},false)
				}
			}
			new Dialog3(options);
		}
	});
	
	
	$.fn.extend({
		//拖拽
		drag:function(){
			var This = this;
			this.mousedown(function(ev){
				console.log(this)
				var disX = ev.pageX - $(this).offset().left;
				var disY = ev.pageY - $(this).offset().top;
				$(document).mousemove(function(ev){
					This.css("left",ev.pageX-disX);
					This.css("top",ev.pageY-disY);
				})
				$(document).mouseup(function(){
					$(document).off("mousemove mouseup");
				})
				
				return false;
			})
		}
	})
})(jQuery,window.document,window)

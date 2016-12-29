function Dialog(opt){
		opt = opt || {};
		this.defaults = {};
		
		//如果传入的opt不是一个对象时，那么默认他为一个空对象
		if(opt.constructor !== Object){
			opt = {};
		}
		//将opt的属性复制一份，避免修改原来的数据
		for(var attr in opt){
			this.defaults[attr] = opt[attr]
		}
		this.init();
		this.mask();
		
	}
	
	Dialog.prototype = {
		constructor : Dialog,
		init(){
			this.div = this.html();
			document.body.appendChild(this.div);
			this.div.zIndex = 100;
			//定位置
			this.pos();
			this.addevent();
			this.sty();
			new Drag({
				dragEle:this.div.querySelector('.pos_head'),
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
			var html = '<header class="pos_head"></header>\
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
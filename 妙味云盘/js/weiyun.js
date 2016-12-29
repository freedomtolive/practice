window.onload = function(){
	
	//让weiyun-content自适应
	var weiyunContent = document.querySelector("#content");
	var header = document.querySelector("#tools");
	function resize(){
		var clientH = handle.view().h;
		weiyunContent.style.height = clientH - header.offsetHeight + "px";
	}
	window.onresize = resize;
	resize();
	
//·······················渲染各个区域的公共样式·································
	function createHTML(fileId){
		//生成oContentLeft的html结构；
		oContentLeft.innerHTML = html.createHtml(datas,InitId);
		
		//生成导航区域的html结构
		oContent_head_center = document.getElementById('content_head_center');
		oContent_head_center.innerHTML = html.createnav(datas,fileId);
		
	//	生成content1区域的html结构
		oContent1 = document.getElementsByClassName("content1")[0];
		oContent2 = document.getElementsByClassName("content2")[0];
		oSmall_list = document.getElementById("small_list")
		oContent1.innerHTML = html.createContent1(datas,fileId);
	//	生成content2区域的html结构
		oSmall_list.innerHTML = html.createContent2(datas,fileId);
	}
	
//···························提醒·················································
	var oCreate_great = document.getElementById("create_great");
	var span = oCreate_great.querySelector('span')

	function fullTip(className,message){

		//先拉倒-40 在过渡到0
		oCreate_great.style.transition = "none";
		oCreate_great.style.top = "-40px";
		oCreate_great.className = '';

		setTimeout(function (){
			oCreate_great.classList.add(className)
			oCreate_great.style.transition = ".3s";
			oCreate_great.style.top = "0";	
		},0)

		span.innerHTML = message;

		//延时上去的定时器只能有一个
		clearTimeout(oCreate_great.timer);
		oCreate_great.timer = setTimeout(function (){
			oCreate_great.style.top = "-40px";
		},1000)	
	}
	
	
	
//·····················渲染各个区域···················································
	var oContentLeft = document.getElementsByClassName("content_left")[0];
	var oContent_box = document.getElementById("content_box");
	var oContent_head_center = document.getElementById("content_head_center");
	var oContent1 = document.getElementsByClassName("content1")[0];
	var oContent2 = document.getElementsByClassName("content2")[0];
	var oSmall_list = document.getElementById("small_list");
	var datas = data.files;
	var arr1 = [];
	var InitId = -1;
	var navInitId = 0;
	//全局的id(点击的父id)
	var currentId = 0;
	createHTML(navInitId);
	oContentLeft.onmousedown = function(){
		return false;
	}
	document.onmousedown = function(){
		return false;
	}
	
//·······················给contentLeft添加点击事件绑定函数·························
//事件代理需要判断点击元素的源是什么
	oContentLeft.onclick = function(ev){
		var target = ev.target;
		if( target = handle.parent(target,"h3") ){
			var fileId = target.dataset.id;
			if(handle.getSelfById(datas,fileId).isOpen === 'true'){
				handle.getSelfById(datas,fileId).isOpen = 'false';
				handle.getChildrenById(datas,fileId).forEach(function(value){
					value.isOpen = 'false'
				});
			}else{
				handle.getSelfById(datas,fileId).isOpen = 'true'
			}
			currentId = fileId;
			createHTML(fileId);
			
			//点击时找到对应的元素，上一个的背景变为空，当前点击的元素背景加上颜色
			addBackground(currentId).style.background = '';
			addBackground(fileId).style.background = '#e1e8ed';
			currentId = fileId;
			//添加背景
			checkchilds(datas,fileId);
			
			//点击时清空checkAll的开关和样式
			oCheckAll.selected = false;
			oCheckAll.classList.remove("head_checked");
		}
	}
//	给每个h3添加点击事件绑定函数
	var aH3 = oContentLeft.getElementsByTagName('h3');
	//通过元素身上的id找到对应的h3；
	function addBackground(id){
		for(var i=0;i<aH3.length;i++){
			var dateId = aH3[i].dataset.id;
			if(dateId == id){
				return aH3[i];
			}
		}
	}
	addBackground(currentId).style.background = '#e1e8ed';
	
	
//	给导航中的每一个span添加点击事件绑定函数(利用时间委托，给父级添加点击)
	oContent_head_center.onclick = function(ev){
		var target = ev.target;
		//只能为标签名为div的元素添加委托
		if(target.className === 'content_title'){
			//重新渲染导航区域和content1区域
			var fileId = target.dataset.id;
			//将点击的元素的子孙级全部关掉；
			handle.getChildrenById(datas,fileId).forEach(function(value){
				value.isOpen = 'false'
			})
			//重新渲染页面
			createHTML(fileId);
			
			//重新给h3添加颜色
			addBackground(currentId).style.background = '';
			addBackground(fileId).style.background = '#e1e8ed';
			currentId = fileId;
			
			//添加背景
			checkchilds(datas,fileId);
			
			//点击时清空checkAll的开关和样式
			oCheckAll.selected = false;
			oCheckAll.classList.remove("head_checked");
			
		}
	}
	
	//根据li的开关做一下事情；
	var aLi = oContentLeft.getElementsByTagName('li');
	var aJiantou = oContentLeft.getElementsByClassName('jiantou');
	var aUl = aH3[1].parentNode.getElementsByTagName('ul');
	
	
//···················给content1里面的每个文件添加点击事件绑定函数···························
	var aDiv = oContent1.getElementsByClassName('content_div');
	var aGou = oContent1.getElementsByClassName('gou');
	//设置gou的初始状态为关闭着的
	for(var i=0;i<aGou.length;i++){
		aGou[i].selected = false;
	}
	
	
	oContent1.onclick = function(ev){
		var target = ev.target;
		
		if(target.className==='content_div'){
			var fileId = target.dataset.id;
			handle.getSelfById(datas,fileId).isOpen = 'true';
			//重新渲染页面
			createHTML(fileId);
			addBackground(currentId).style.background = '';
			addBackground(fileId).style.background = '#e1e8ed';
			currentId = fileId;
			ev.cancelBubble = true;
			
			//点击时清空checkAll的开关和样式
			oCheckAll.selected = false;
			oCheckAll.classList.remove("head_checked");
			//添加背景
			checkchilds(datas,currentId);
		}
		if(target.className==='div1'){
			var fileId = target.parentNode.dataset.id;
			handle.getSelfById(datas,fileId).isOpen = 'true';
			//重新渲染页面
			createHTML(fileId);
			
			//添加contentLeft区域的背景
			addBackground(currentId).style.background = '';
			addBackground(fileId).style.background = '#e1e8ed';
			currentId = fileId;
			ev.cancelBubble = true;
			//添加背景
			checkchilds(datas,currentId);
			//点击时清空checkAll的开关和样式
			oCheckAll.selected = false;
			oCheckAll.classList.remove("head_checked");
		}
		//点击选框时做一些事情
		if(target.nodeName.toLowerCase() === 'span'){
			if(target.classList.contains("checked")){
				target.selected = false;
				target.classList.remove('checked');
				target.parentNode.style.borderColor = '#fff';
			}else{
				target.selected = true;
				target.classList.add('checked');
				target.parentNode.style.borderColor = '#55addc';
			}
			//如果全部开关为真，则总开关为真，否则为假
			var allSelected = Array.from(aGou).every(function (value){
				return value.selected==true;
			})
			//如果总开关为真，则加class，否则去掉class；
			if(allSelected){
				oCheckAll.selected = true;
				oCheckAll.classList.add('head_checked');
			}else{
				oCheckAll.selected = false;
				oCheckAll.classList.remove("head_checked");
			}
			ev.cancelBubble = true;
		}
		//点击文字时做一些事情（重命名）
		if(target.nodeName.toLowerCase() === 'strong'){
			oReplaceName.onoff = true;
			target.classList.add('dis_n');
			target.nextElementSibling.classList.remove("dis_n");
			target.nextElementSibling.focus();
			//判断重命名
			var arrChilds = handle.getChildsById(datas,currentId)
			var num = 0;
			for(var i=0;i<arrChilds.length;i++){
				if(target.parentNode.dataset.id == arrChilds[i].id){
					num = i;
				}
			}
			arrChilds.splice(num,1)
			arrChilds = arrChilds.map(function(value){
				return value.title
			})
			
			//当回车键抬起时判断，如果输入框为空则弹出弹出框，
			//有内容时修改名字
			document.onkeyup = function(ev){
				if(ev.keyCode == 13){
					var value = target.nextElementSibling.value.trim()
					var bl = true//true对应没有重命名
					arrChilds.forEach(function(item){
						if(value == item){
							bl = false;
						}
					})
					if(target.classList.contains('dis_n')){
						if(value === ''){
							fullTip("create_succeed",'修改不成功')
						}else if(!bl){
							fullTip("create_succeed",'不能有重名')
						}else{
							target.innerHTML = target.nextElementSibling.value;
							target.nextElementSibling.value = '';
							target.classList.remove('dis_n');
							target.nextElementSibling.classList.add("dis_n");
							target.nextElementSibling.blur();
							oReplaceName.onoff = false;
						}
					}
				}
			}
			oContent_box.onmousedown = function(){
				var value = target.nextElementSibling.value.trim();
				var bl = true//true对应没有重命名
					arrChilds.forEach(function(item){
						if(value == item){
							bl = false;
						}
					});
				if(target.classList.contains('dis_n')){
					if(value === ''){
						fullTip("create_succeed",'修改不成功')
					}else if(!bl){
						fullTip("create_succeed",'不能有重名')
					}else{
						target.innerHTML = target.nextElementSibling.value;
						target.nextElementSibling.value = '';
						target.classList.remove('dis_n');
						target.nextElementSibling.classList.add("dis_n");
						target.nextElementSibling.blur();
						oReplaceName.onoff = false;
					}
				}
			}
			oContent_box.onmouseup = null;
			ev.cancelBubble = true;
		}
		ev.cancelBubble = true;
	}
	
	//给content2添加点击事件绑定函数
	oSmall_list.addEventListener('click',function(ev){ 
		var target = ev.target;
		//点击li时重新生成oContent2的html结构
		if(target.nodeName.toLowerCase() === 'li' || target.className === 'li_left' ){
			var fileId = target.dataset.id;
			handle.getSelfById(datas,fileId).isOpen = 'true';
			oSmall_list.innerHTML = html.createContent2(datas,fileId);
			//重新渲染页面
			createHTML(fileId);
			//添加contentLeft区域的背景
			addBackground(currentId).style.background = '';
			addBackground(fileId).style.background = '#e1e8ed';
			currentId = fileId;
			//判断背景
			checkchilds(datas,fileId)
		}
	},false);
	
	var oTool = document.getElementById("tools");
	var aZhanshi = oTool.getElementsByClassName('zhanshi');
	aZhanshi[0].ischecked = true;//true对应显示的是图标
	//点击按钮，使右侧内容区域在图标与小图标之间来回切换；
	aZhanshi[0].addEventListener('click',function(){
		if(aZhanshi[0].ischecked){
			oContent2.classList.remove('dis_n');
			oContent1.classList.add('dis_n');
		}else{
			oContent2.classList.add('dis_n');
			oContent1.classList.remove('dis_n');
		}
		aZhanshi[0].ischecked = !aZhanshi[0].ischecked;
	},false)
	
	var oContent_warp = document.getElementById("content_warp")
	//判断已知id数据中的是否有子数据
		//如果不存在子数据，则让oContent_warp消失；
		//否则让oContent_warp出现；
	function checkchilds(data,id){
		var arr = handle.getChildsById (data,id);
		
		if(arr.length == 0){
			oContent_warp.classList.remove('dis_n');
		}else{
			oContent_warp.classList.add('dis_n');
		}
	}
	
	//全选
	//当点击总选框，使总选框为checked时，让下面的选框全部选中；
	//当下面选框有一个未选中时，总选框未选中
	
	//获取总选框和下面所有的选框；
	var oCheckAll = document.getElementById("checkAll");
	
	
	oCheckAll.selected = false;//false代表未选中
	//定义初始的总选框和下面的开关为false
	var aHead_check = oContent2.getElementsByClassName('head_check');
	
	for(var i=0;i<aHead_check.length;i++){
		aHead_check[i].selected = false;//false代表未选中
	}
	
	//阻止冒泡
	oContent1.addEventListener("mousedown",function(ev){
		if( handle.parent(ev.target,".oContnet1") ){
			ev.stopPropagation();
		}
	},false)
//···························全选，单选············································	
	//给总选框添加点击事件绑定函数，更改总选框的开关
	//改变content1的框选情况
	oCheckAll.addEventListener('click',function(){
		if(handle.getChildsById(datas,currentId).length !== 0){
			if(!oCheckAll.selected){
				for(var i=0;i<aGou.length;i++){
					aGou[i].selected = true;
					aGou[i].classList.add('checked');
					aGou[i].parentNode.style.borderColor = '#55addc';
				}
				oCheckAll.classList.add('head_checked');
			}else{
				for(var i=0;i<aHead_check.length;i++){
					aGou[i].selected = false;
					aGou[i].classList.remove('checked');
					aGou[i].parentNode.style.borderColor = null;
				}
				oCheckAll.classList.remove('head_checked');
			}
			
			//改变缩略图的框选情况
			if(!oCheckAll.selected){
				for(var i=0;i<aHead_check.length;i++){
					aHead_check[i].selected = true;
					aHead_check[i].classList.add('head_checked');
				}
				oCheckAll.classList.add('head_checked');
			}else{
				for(var i=0;i<aHead_check.length;i++){
					aHead_check[i].selected = false;
					aHead_check[i].classList.remove('head_checked');
				}
				oCheckAll.classList.remove('head_checked');
			}
			oCheckAll.selected = !oCheckAll.selected
		}
	},false)
	
	//点击自身改变自身的开关（从而改变选框的背景颜色)
	var small_list = document.getElementById("small_list");
	
	small_list.onclick = function(ev){
		var target = ev.target;
		if(target.classList.contains('head_check')){
			if(!target.selected){
				target.classList.add('head_checked');
				target.selected = true;
			}else{
				target.classList.remove('head_checked');
				target.selected = false;
			}
			
			//根据自身的开关改变背景
			//如果每一个开关都为真，则allSelected为真，否则为假
			var allSelected = Array.from(aHead_check).every(function (value){
				return value.selected==true;
			})
			
			//如果开关为真，则总开关为真，否则为假
			if(allSelected){
				oCheckAll.selected = true;
				oCheckAll.classList.add('head_checked');
			}else{
				oCheckAll.selected = false;
				oCheckAll.classList.remove("head_checked");
			}
		}
		ev.cancelBubble = true;
	}
	
//·······························新建文件夹·······························
	var oNew_folder = document.getElementById("new_folder")
	oCreate_great.className = '';
	
	//给新建文件夹的按钮添加点击事件绑定函数
	oNew_folder.addEventListener('mouseup',function(){
		var obj = {
				"id":Math.random(),
				"pid":currentId,
				"title":'',
				"type":"div1"
		};
		//往content2里面新建一个li放入content2中的第一个位置
		if(!aZhanshi[0].ischecked){
			var oLi = document.createElement("li");
			var str = html.content2Html(obj);
			oLi.innerHTML = str;
			var oSmall_font = oLi.querySelector('.small_font');
			var oText2 = oLi.querySelector('.text2');
			oSmall_font.classList.add('dis_n');
			oText2.classList.remove('dis_n');
			small_list.insertBefore(oLi,small_list.children[0]);
			//使创建出来的元素的text显示出来，名字区域消失
			var oInp = document.getElementsByClassName('text2')[0];
			oInp.focus();
		}else{
			var oDiv = document.createElement('div');
			oDiv.className = 'content_div';
			var str1 = html.fileHtmlFn(obj);
			oDiv.innerHTML = str1;
			oContent1.insertBefore(oDiv,oContent1.children[0]);
			var oStrong = oDiv.querySelector('strong');
			var oText = oDiv.querySelector('.text');
			oStrong.classList.add('dis_n');
			oText.classList.remove('dis_n');
			oText.focus();
		}
		//点击时将对象放入数据的第一个；
		//获取当前元素的父id；
		document.addEventListener('mousedown',fn1,false);
		var timer = null;
		
		function fn1(ev){
			if(!aZhanshi[0].ischecked){
				var isExist = handle.isTitleExist(datas,oText2.value.trim(),currentId);
				//input中没有内容时清空，不新建文件夹
				if(oInp.value == ''){
					small_list.removeChild(oLi);
					fullTip("create_fail",'新建文件失败');
				}else if(isExist){
					//同一级时不能有同名的文件夹
					small_list.removeChild(oLi);
					fullTip("create_fail",'新建文件失败');
				}else{
					obj.title = oText2.value.trim();
					datas.unshift(obj);
					//重新绘制contentLeft，content1，content2的内容
					createHTML(currentId);
					fullTip("create_succeed",'新建文件成功')
				}
			}else{
				var isExist = handle.isTitleExist(datas,oText.value.trim(),currentId);
				//input中没有内容时清空，不新建文件夹
				if(oText.value.trim() == ''){
					oContent1.removeChild(oDiv);
					fullTip("create_fail",'新建文件失败');
				}else if(isExist){
					//同一级时不能有同名的文件夹
					oContent1.removeChild(oDiv);
					fullTip("create_fail",'新建文件失败');
				}else{
					obj.title = oText.value.trim();
					datas.unshift(obj);
					//重新绘制contentLeft，content1，content2的内容
					createHTML(currentId);
					//弹框
					fullTip("create_succeed",'新建文件成功')
				}
			}
			
			//判断背景
			checkchilds(datas,currentId);
			//移除鼠标按下事件
			document.removeEventListener('mousedown',fn1);
		}
	},false)
	
	oContent1.addEventListener('mousedown',function(ev){
		if( handle.parent(ev.target,".text") ){
			ev.stopPropagation();
		}
	},false)
	
//····················删除···································
	var oDelet = document.getElementById("delet");
	var delet_now = document.getElementById("delet_now")
	oDelet.onOff = false;//false对应删除的遮罩层未出现
	//点击删除按钮时让删除的遮罩层出现出现
	oDelet.addEventListener('click',function(){
		oDelet.onOff = true;
		var bl = Array.from(aGou).every(function(value){
			return value.selected == false
		})
		if(bl){
			//弹框
			fullTip("choice",'请选择文件');
		}else{
			new Dialog({
				title:" ",
				content:'<div class="delet_content"><div class="delet_img"></div><div class="delet_font"><div>确定要删除这个文件夹吗？</div><div>已删除的文件夹可以在回收站找到？</div></div></div>',
				okFn:function(){
					//点击确定按钮时让选中的数据（包括子孙数据）删掉；重新渲染页面
//					if(oDelet.onOff){
						var arr = [];
						for(var i=0;i<aGou.length;i++){
							if(aGou[i].selected){
								arr = handle.getChildrenById(datas,aGou[i].parentNode.dataset.id);
								arr.unshift(handle.getSelfById(datas,aGou[i].parentNode.dataset.id));
								for(var k=0;k<arr.length;k++){
									for(var j=0;j<datas.length;j++){
										if(arr[k].id == datas[j].id){
											datas.splice(j,1);
											break;
										}
									}
								}
							}
						}
						//提示框
						fullTip("slow",'删除文件成功')
						//重新绘制contentLeft，content1，content2的内容
							oContentLeft.innerHTML = html.createHtml(datas,InitId);	
							oContent1.innerHTML = html.createContent1(datas,currentId);
							oSmall_list.innerHTML = html.createContent2(datas,currentId);
							
						//点击时清空checkAll的开关和样式
							oCheckAll.selected = false;
							oCheckAll.classList.remove("head_checked");
						//删除完毕时让delet_now消失	
							delet_now.classList.add('dis_n')
						//判断背景
							checkchilds(datas,currentId);
					}	
//				}
			})
		}
	},false)
		

//·······················框选····································
	var aContent_div = document.getElementsByClassName('content_div');
//	生成div并进行碰撞检测
	oContent1.addEventListener('mousedown',function(ev){
		if(oReplaceName.onoff == true) return;
		//只能鼠标左键点击才会有效果
		if(ev.which !== 1) return;
		//清除浏览器的默认行为；
		ev.preventDefault();
		var target = ev.target;
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
		var oriX = ev.clientX;
		var oriY = ev.clientY;
		var oDiv = null;
		//按下时还原所有的div的样式
		if(target.nodeName.toLowerCase() === 'span') return;
		for(var i=0;i<aGou.length;i++){
			aGou[i].classList.remove('checked');
			aGou[i].parentNode.style.borderColor = '#fff';
			aGou[i].selected = false;
		}
		//找到操作的file-item 判断下面checkbox是否有class为checked
			var isChecked = false;
			if( handle.parent(ev.target,".content_div") ){
				isChecked = !!handle.parent(ev.target,".content_div").querySelector(".checked");
			}
		document.onmousemove = function(ev){
			//如果有选框选中，则不要再进行框选的鼠标移动事件
			if(isChecked){
				return;
			}
			//移动距离小于15时不会生成新的div选框
			if(Math.abs(ev.clientX-oriX)>15 || Math.abs(ev.clientY-oriY)>15){
				if(!oDiv){
					oDiv = document.createElement("div");
					oDiv.className = 'box_wrap';
					document.body.appendChild(oDiv);
				}
				
				oDiv.style.left = Math.min(oriX,ev.clientX)+'px';
				oDiv.style.top = Math.min(oriY,ev.clientY)+ scrollTop +'px';
				oDiv.style.width = Math.abs(ev.clientX-oriX)+'px';
				oDiv.style.height = Math.abs(ev.clientY-oriY)+'px';
				
				//碰撞检测
				for(var i=0;i<aGou.length;i++){
					//如果碰到改一下背景颜色和开关，没有碰到再还原
					if(handle.peng(oDiv,aContent_div[i])){
						aGou[i].classList.add('checked');
						aGou[i].parentNode.style.borderColor = '#55addc';
						aGou[i].selected = true;
					}else{
						aGou[i].classList.remove('checked');
						aGou[i].parentNode.style.borderColor = '#fff';
						aGou[i].selected = false;
					}
				}
			}
			
			
			//如果全部开关为真，则总开关为真，否则为假
			var allSelected = Array.from(aGou).every(function (value){
				return value.selected==true;
			})
			//如果总开关为真，则加class，否则去掉class；
			if(allSelected){
				oCheckAll.selected = true;
				oCheckAll.classList.add('head_checked');
			}else{
				oCheckAll.selected = false;
				oCheckAll.classList.remove("head_checked");
			}
		}
		document.onmouseup = function(ev){
			document.onmousemove = document.onmouseup = null;
			if(oDiv){
				document.body.removeChild(oDiv);
				oDiv = null;
			}
		}
	},false)

//··································重命名·······································
	var oReplaceName = document.getElementById("replaceName");
	oReplaceName.onoff = false //false对应未被点击，即不是重命名状态
	//点击重命名按钮，进入重命名的状态
	oReplaceName.onclick = function(){
		oReplaceName.onoff = true;
		var arr = [];
		//判断选中的选框
		for(var i=0;i<aGou.length;i++){
			if(aGou[i].selected){
				arr.push(aGou[i].parentNode)
			}
		}
		if(arr.length !==1){
			//弹框
			fullTip("create_succeed",'请选择单个文件')
			oReplaceName.onoff = false;
		}else{
			var oStrong = arr[0].getElementsByTagName('strong')[0];
			oStrong.classList.add('dis_n');
			oStrong.nextElementSibling.classList.remove("dis_n");
			oStrong.nextElementSibling.value = oStrong.innerHTML;
			oStrong.nextElementSibling.select();
			//删除自己那一项并把id转化为名字
			//点击其他地方的时候判断输入框中的内容，有内容修改，否则弹出
			oContent_box.onmousedown = function(){
				var isExist = handle.isTitleExist(datas,oStrong.nextElementSibling.value.trim(),currentId);
				if(oStrong.classList.contains('dis_n')){
					if(oStrong.nextElementSibling.value.trim() === ''){
						fullTip("create_succeed",'修改不成功')
						oStrong.nextElementSibling.classList.add('dis_n');
						oStrong.classList.remove("dis_n");
						arr[0].getElementsByClassName('gou')[0].classList.remove('checked');
						arr[0].style.borderColor = '#fff';
						arr[0].getElementsByClassName('gou')[0].selected = false;
					}else if(oStrong.innerHTML == oStrong.nextElementSibling.value.trim()){
						oStrong.nextElementSibling.classList.add('dis_n');
						oStrong.classList.remove("dis_n");
					}else if(isExist){
						fullTip("create_succeed",'不能有重名')
						oStrong.nextElementSibling.classList.add('dis_n');
						oStrong.classList.remove("dis_n");
						arr[0].getElementsByClassName('gou')[0].classList.remove('checked');
						arr[0].style.borderColor = '#fff';
						arr[0].getElementsByClassName('gou')[0].selected = false;
					}else{
						//修改成功时让输入框消失，div出现，并让总选框变成未被选中
						oStrong.innerHTML = oStrong.nextElementSibling.value;
						oStrong.nextElementSibling.value = '';
						oStrong.classList.remove('dis_n');
						oStrong.nextElementSibling.classList.add("dis_n");
						oStrong.nextElementSibling.blur();
						oCheckAll.selected = false;
						oCheckAll.classList.remove('head_checked');
						//还原选中的框的状态（大清洗）
						for(var i=0;i<aGou.length;i++){
							aGou[i].classList.remove('checked');
							aGou[i].parentNode.style.borderColor = '#fff';
							aGou[i].selected = false;
						}
						fullTip("create_succeed",'修改成功')
					}
				}
				oReplaceName.onoff = false;
			}
		}
	};
	
//·······················移动到································
	(function(){
		var oMove = document.getElementById("move");
		oMove.onOff = false;//false对应的是遮罩未弹出
		oMove.addEventListener('click',function(){
			var arrMove = [];
			for(var i=0;i<aGou.length;i++){
				if(aGou[i].selected){
					arrMove.push(aGou[i])
				}
			}	
			if(arrMove.length <1){
				//弹框
				fullTip("create_succeed",'请选择文件')
			}else{
				//修改弹窗的样式，生成结构
				new Dialog({
					title:"选择储存位置",
					content:'<div id="pos_list"><h3 class="zong_pos h3_1"><span class="pos_img"></span><span class="pos_font">'+ '移动到' +'</span></h3></div><div id="pos_choice_content">'+html.createMoveHtml(datas,-1)+'</div>',
					okFn:function(){
						//判断谁被选中了，并且将数组中的每一项改为id值
						var selectArr = whoSelect().map(function(value){
							return value.dataset.id;
						});
						var arr = selectArr.map(function(value){
							return handle.getSelfById(datas,value);
						})
						if(movebl){
							return true
						}else{
							for(var i=0;i<blArr2.length;i++){
								if(blArr2[i]){
									//改每一个的id
									arr[i].pid = lastId;
								}
							}
							if(!bl2){
								fullTip("create_fail",'部分移动失败')
							}
							//重新渲染页面
							createHTML(currentId);
							oMove.onOff = false;
							return false;
						}	
					}
				})
				move_tan();
			}
		},false);
			
		
	//······················给移动到的弹窗添加点击事件······················
		var lastId = 0;
		var blArr2 = [];
		var movebl = true;
		var bl2 = false//false对应可以传入
		
		function move_tan(){
			var pos_choice = document.getElementsByClassName("pos_choice")[0];
			var pos_choice_content = document.getElementById("pos_choice_content");
			var oCue = pos_choice.querySelector('.cue');
			var bl1 = false //false对应没有重命名
			var bl3 = false //false对应能移入父级
			
	//		给弹窗里面的h3添加点击事件（用事件委托的方式来写）
			pos_choice_content.addEventListener('click',function(ev){
				var target = ev.target;
				if( target = handle.parent(target,"h3") ){
					var fileId = target.dataset.id;
					//点击时找到对应的元素，上一个的背景变为空，当前点击的元素背景加上颜色
					findh3_2(lastId).style.background = '';
					findh3_2(fileId).style.background = '#e1e8ed';
					lastId = fileId
					//找到哪些元素被选中了
					var selectArr = whoSelect();
					var idArr = [];
					//将所有选入的元素的id放入到一个数组中
					for( var i = 0; i < selectArr.length; i++ ){
						idArr.push(selectArr[i].dataset.id);
					}
					//通过id找到对应的数据并放入一个数组中
					var nameArr = idArr.map(function(value){
						return handle.getSelfById(datas,value)
					})
					//将数组中的数据改为数据的名字
					var nameArr1 = nameArr.map(function(value){
						return value.title
					})
					var arr = [];
					arr = handle.getChildsAllByIdarr(datas,idArr).map(function(value){
						return value.id
					})
					//将子数据id组成的数组中的每一项把id改为名字
					var arr2 = handle.getChildsById(datas,fileId).map(function(value){
						return value.title
					});
					
					bl1 = false;
					//不能移动到自己和自己的子集下面,如果id有相等项的时候把bl1变为true；
					//否则不改变bl1的值
					for(var i=0;i<arr.length;i++){
						if(arr[i] == fileId){
							bl1 = true;
						}
					}
					
					bl3 = false;
					for(var i=0;i<nameArr.length;i++){
						if(nameArr[i].pid == fileId){
							bl3 = true;
						}
					}
					//同一级不能有重名
					//每一项都不相等时返回true；
					//有一项相等时返回false
					blArr2 = [];
					nameArr1.forEach(function(item){
						blArr2.push(arr2.every(function(value){
							return value != item
						}));
					})
					//bl2判断移入时不能在同一级出现重名的情况
					bl2 = blArr2.every(function(value){
						return value == true;
					})
					//bl1为true时，表示是他的子孙级，警告不能移入
					//bl2为true时，部分移动失败
					//bl3为true时，表示是他的父级，警告不能移入
					if(bl1){
						oCue.style.opacity = 1;
						oCue.innerHTML = '不能移动到自身和该子元素之下'
						movebl = true
					}else if(bl3){
						oCue.style.opacity = 1;
						oCue.innerHTML = '不能移动到父级元素之下'
						movebl = true
					}else{
						oCue.style.opacity = 0;
						movebl = false;
					}
					
				}
			},false)
			
			//获取点击的h3_2是h3_2的第几个~~~
			function findh3_2(id){
				var aH3_2 = pos_choice.getElementsByTagName('h3');
				for(var i=0;i<aH3_2.length;i++){
					var dateId = aH3_2[i].dataset.id;
					if(dateId == id){
						return aH3_2[i];
					}
				}
			}
		}
	})()
	
	//那些文件被选中了，将选中的的选框所在的content_div放入一个数组中(返回值为一个由content_div组成的数组)
	function whoSelect(){
		//找所有的checkboxs的class为checked
		return Array.from(aGou).filter(function (item){
			return item.selected;	
		}).map(function (item){
			return handle.parent(item,".content_div");
		})
	}
	
	//·······························拖动···················································
	
	
}
















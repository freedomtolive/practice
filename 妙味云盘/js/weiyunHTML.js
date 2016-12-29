//生成页面的结构

html = {
	//1.根据id添加content_left的html结构
	createHtml(data,id){
		var str = '';
		var ul = handle.getSelfById(data,id);
		var arr = handle.getChildsById(data,id);
		if(!arr.length){
			return '';
		}
		if(ul){
			if(ul.isOpen == 'true'){
				str += '<ul style = "display:block;">';
			}else{
				str += '<ul style = "display:none;">';
			}
		}else{
			str += '<ul>'
		}
		arr.forEach(function (value){
			//根据数据的id找到所有的父级(用来看他有几个父级，判断他是第几级菜单，从而加padding-left)
			var arrLength = handle.getFatherById(data,value.id).length;
			str += '<li class="'
			if(value.isOpen == 'true'){
				str += 'open';
			}else{
				str += 'close';
			}
			str += '"><h3 data-id="'+ value.id +'" style = "padding-left :'+ arrLength*20 +'px"><span class="jiantou" style="'
			if(handle.getChildsById (data,value.id)== 0){
				str += 'opacity:0"';
			}else{
				str += 'opacity:1"';
			}
			str += '></span><span class="wenjian"></span><i class="h3_title">'+ value.title + '</i></h3>';
			str += html.createHtml(data,value.id);
			str += '</li>';	
		})
		str += '</ul>';
		
		return str;
	},
	//2.根据数组添加content_head_center的结构
	createnav(data,id){
		var str = '';
		var arr = handle.getFatherById(data,id).reverse();
		arr.forEach(function(value,index){
			str += "<div class='content_title' data-id='"+ value.id +"'>"+ value.title +"</div>";
			if(index<arr.length-1){
				str += '<div class="bigger"></div>';
			}
		})
		return str;
	},
	
	//3.根据数据添加content_box的内容
	createContent1(data,id){
		var childs = handle.getChildsById(data,id);
		var str = '';
		
		childs.forEach(function(value){
			str += '<div class="content_div"  data-id="'+ value.id +'">';
			str += html.fileHtmlFn(value);
			str += '</div>';
		})
		return str
	},
	//4,根据数据添加content2里的内容
	createContent2(data,id){
		var childs = handle.getChildsById(data,id);
		var str = '';
		
		childs.forEach(function(value){
			str += '<li data-id="'+value.id+'">';
			str += html.content2Html(value);
			str += '</li>'
		})
		return str;
	},
	//文件的结构
	fileHtmlFn(value){
		var str = '<div class="'+ value.type +'"></div><span class="gou"></span><strong class="div1_font">'+ value.title +'</strong><input type="text" class="text dis_n" />'
	    return str;	
	},
	//绘制content2的内容区域
	content2Html(value){
		var str ='<div data-id="'+value.id+'" class="li_left"><div class="head_check"></div><span class="pos_img"></span><div class="small_font">'+value.title+'</div><input type="text" class="text2 dis_n" /></div><div class="li_center"><span></span><span></span><span></span><span></span><span></span></div><time>2016-08-22 16:08</time>'
		return str;
	},
	//绘制移动弹出框中的样式
	createMoveHtml(data,id){
		var str = '';
		var ul = handle.getSelfById(data,id);
		var arr = handle.getChildsById(data,id);
		if(!arr.length){
			return '';
		}
		str += '<ul>'
		arr.forEach(function (value){
			//根据数据的id找到所有的父级(用来看他有几个父级，判断他是第几级菜单，从而加padding-left)
			var arrLength = handle.getFatherById(data,value.id).length;
			str += '<li class="open"><h3 data-id="'+ value.id +'" style = "padding-left :'+ arrLength*20 +'px"><span class="jiantou" style="'
			if(handle.getChildsById (data,value.id)== 0){
				str += 'opacity:0"';
			}else{
				str += 'opacity:1"';
			}
			str += '></span><span class="wenjian"></span><i class="h3_title">'+ value.title + '</i></h3>';
			str += html.createMoveHtml(data,value.id);
			str += '</li>';	
		})
		str += '</ul>';
		
		return str;
	}
	
}
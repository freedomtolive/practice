var handle = {
	//可视区域的宽高
	view(){
		return {
			w: document.documentElement.clientWidth,
			h: document.documentElement.clientHeight
		}
	},
	//通过id找到对应的数据
	getSelfById(data,id){
		return data.find(function (value){
			return value.id == id;
		})
	},
	//通过id寻找所有的子数据
	getChildsById (data,id){
		return data.filter(function(value){
			return value.pid == id
		});
	},
	//通过id寻找所有的父数据
	getFatherById(data,id){
		var arr = [];
		var self = handle.getSelfById(data,id);
		if(self){
			arr.push(self);
			arr = arr.concat(handle.getFatherById(data,self.pid))
		}
		return arr;
	},
	//通过id寻找他所有的子孙数据；
	getChildrenById (data,id){
		var arr = data.filter(function(value){
			return value.pid == id
		});
		arr.forEach(function(value){
			arr = arr.concat(handle.getChildrenById(data,value.id))
		})
		return arr;
	},
	//通过指定id，找到这个id的所有的子孙数据，放在数组中
	getChildsAll(data,id){
		var arr = [];

		var self = handle.getSelfById(data,id);
		arr.push(self);
		//在子数据(找到自己的子数据)    每次都是push的自己
		var childs = handle.getChildsById(data,self.id);

		childs.forEach(function (value){
			arr = arr.concat(handle.getChildsAll(data,value.id));
		})

		return arr;
	},
	//指定多个id，找到这些多个id的每一个数据的子孙数据
	getChildsAllByIdarr(data,idArr){
		var arr = [];
		idArr.forEach(function (value){
			arr = arr.concat(handle.getChildsAll(data,value));
		})

		return arr;
	},
	//判断元素有没有该class名
	hasClass(element,className){
		var classArr = element.className.split(" ");
		for( var i = 0; i < classArr.length; i++ ){
			if( classArr[i] === className ){
				return true;
			}
		}
		return false;
	},
	//找到制定元素的制定父级
	parent(element,attr){
		//先找到attr的第一个字符
		var firstChar = attr.charAt(0);
		if( firstChar === "." ){
			while(element.nodeType !== 9 && !handle.hasClass(element,attr.slice(1))){
				//element没有指定的class，那么element就为父级，继续向上找
				element = element.parentNode;
			}
		}else if(firstChar === "#"){
			while(element.nodeType !== 9 && element.id !== attr.slice(1)){
				//element没有指定的class，那么element就为父级，继续向上找
				element = element.parentNode;
			}
		}else{
			while(element.nodeType !== 9 && element.nodeName !== attr.toUpperCase()){
				//element没有指定的class，那么element就为父级，继续向上找
				element = element.parentNode;
			}
		}
		return element.nodeType === 9 ? null : element;
	},
	//获取每个元素到页面的距离；
	getPos(obj) {
		var pos = {left:0, top:0};
		while (obj) {
			pos.left += obj.offsetLeft;
			pos.top += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return pos;
	},
	//碰撞检测
	peng(obj1,obj2){
		var pos1 = obj1.getBoundingClientRect();
		var pos2 = obj2.getBoundingClientRect();
		
		return pos1.right > pos2.left && pos1.left < pos2.right && pos1.bottom > pos2.top && pos1.top < pos2.bottom;
	},
	//在指定id的所有的子数据中，是否存在某一个title
	// 存在 true
	// 不存在 false
	isTitleExist(data,value,id){
		var childs = handle.getChildsById(data,id);  //先找到指定id的所有子级
		return childs.findIndex(function(item){
			return item.title === value;
		}) !== -1;
	}
}

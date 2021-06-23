let common = {
	//获取滚动条当前的位置
	getScrollTop() {
		let scrollTop = 0;
		if (document.documentElement && document.documentElement.scrollTop) {
			scrollTop = document.documentElement.scrollTop;
		} else if (document.body) {
			scrollTop = document.body.scrollTop;
		}
		return scrollTop;
	},
	getCookie(cname) {
		let name = cname + "=";
		let cookie = document.cookie.split(';');
		for (let i = 0, len = cookie.length; i < len; i++) {
			let c = cookie[i].trim();
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},
	//获取当前可视范围的高度
	getClientHeight() {
		let clientHeight = 0;
		if (
			document.body.clientHeight &&
			document.documentElement.clientHeight
		) {
			clientHeight = Math.min(
				document.body.clientHeight,
				document.documentElement.clientHeight
			);
		} else {
			clientHeight = Math.max(
				document.body.clientHeight,
				document.documentElement.clientHeight
			);
		}
		return clientHeight;
	},

	//获取文档完整的高度
	getScrollHeight() {
		return Math.max(
			document.body.scrollHeight,
			document.documentElement.scrollHeight
		);
	},
	msgBox(vm, msg, type) {
		let typeMsg = "";
		if (type == 1) {
			typeMsg = "success";
		} else if (type == 2) {
			typeMsg = "warning";
		} else if (type == 3) {
			typeMsg = "error";
		}
		vm.$message({
			showClose: true,
			message: msg,
			type: typeMsg,
			duration: 3000
		});
	},
	timeHour(nowTime) {
		let _miao = parseInt(nowTime);
		let hours = parseInt(_miao / 3600);
		let fen = parseInt((_miao - hours * 3600) / 60);
		let miao = _miao - hours * 3600 - fen * 60;
		return { hours: hours, fen: fen, miao: miao };
	},
	//百分数转化为小数
	toPoint(percent) {
		var str = percent.replace("%", "");
		str = str / 100;
		return str;
	},
	//
	addDouhao(num) {
		let arr = num.toString();
		let status = false;
		let t1, t2;
		if (arr.indexOf('.') != -1) {
			status = true;
			arr = num.toString().split('.');
			t1 = arr[0].toString().split('');
			t2 = arr[1].toString();
		} else {
			t1 = arr.toString().split('');
		}
		let result = [], counter = 0;
		for (let i = t1.length - 1; i >= 0; i--) {
			counter++;
			result.unshift(t1[i]);
			if ((counter % 3) == 0 && i != 0) {
				result.unshift(',');
			}
		}
		let t3 = result.join('')
		let t4 = t3 + '.' + t2
		return status ? t4 : t3;
	},
	//生成唯一标识符UUID
	generateUUID() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
		});
		return uuid;
	},
	isHalloweenTag(id) {
		let adultsIds = [345207, 345173, 345188, 113151, 345104, 345155, 345214, 345200, 345162, 345119, 345133, 343616, 345192, 345184, 345100, 345140, 345225, 345126, 345151, 345111];
		let kidIds = [345207,345173,345104,345155,345214,345200,345162,195079,195066,345119,195074,345140,345115,345126,290702];
		let petsIds = [343075,46606,343128,46611,46535,319102,343111,336954,314693,46563,79702,79727,49199,336901,49309,46742];
		let decorIds = [345180,345242,344439,346301,325886,341424,341412,346704,346513,346297,343597,345276,345283,345246,341255,325897,314532,325133];
		let accessories = [49590,45919,45880,45907,343122,343081,343070,345196,345252,345271,341254,49585,49594,45896,50087,45843,343603,45922,45847];
		let ids = [...adultsIds,...kidIds,...petsIds,...decorIds,...accessories];
		return ids.includes(id);
	},
	mul(arg1,arg2){
		var r1,r2,m;
		try{
			//取小数位长度
			r1=arg1.toString().split(".")[1].length;
			r2=arg2.toString().split(".")[1].length;
		}catch(e){
			r1=0;r2=0;
		}
		m=Math.pow(10,Math.max(r1,r2));		//计算因子
		return (arg1*m)*(arg2*m)/(m*m);
	},
	// currencySymbolToSign(currencySymbol){
	// 	let sign;
	// 	switch (currencySymbol) {
	// 		case '$':
	// 		sign = 'USD';
	// 			break;
	// 		case '£':
	// 		sign = 'GBP';
	// 			break;
	// 		case '€':
	// 		sign = 'EUR';
	// 			break;
	// 		default:
	// 			break;
	// 	}
	// 	return sign;
	// }
};


export default common

/*
 * @Author: cjq 
 * @Date: 2023-03-Th 09:55:25 
 * @Last Modified by:   cjq 
 * @Last Modified time: 2023-03-Th 09:55:25 
 */
class Qui {
	constructor(name, version) {
		this.name = name
		this.version = version
	}
	__qui() {
		return {
			name: this.name,
			version: this.version
		}
	}
	__info() {
		let obj = this.__qui()
//		this.log(obj.name + ' ' + obj.version)
	}
	__time() {
		let date = new Date(),
			Y = date.getFullYear(), // 年  
			M = date.getMonth() + 1, //月  
			D = date.getDate(), //日
			h = date.getHours(), //小时
			m = date.getMinutes(), //分钟
			s = date.getSeconds(); //秒数
		this.log("" + Y + "年" + M + "月" + D + "日" + h + "时" + m + "分" + s + "秒")
	}
	__device(devFlag) {
		if(devFlag){
//			this.log("设备信息：")
			this.log("~~~userAgent:" + window.navigator.userAgent)
			this.log("~~~设备分辨率:" + window.screen.width + "*" + window.screen.height)
			this.log("~~~浏览器有效窗口:" + window.screen.availWidth + "*" + window.screen.availHeight)
			this.log("~~~Body页面宽高:" + document.body.clientWidth + "*" + document.body.clientHeight)
		}
	}
	__listen(timeFlag,devFlag,callback) {
		let that = this
		window.addEventListener("resize",  function() {
			that.throttle(that.__reset(timeFlag,devFlag,callback),1000)
		})
	}
	__reset(timeFlag,devFlag,callback){
		console.clear()
		this.startRun(timeFlag,devFlag,callback)
	}
	//start前执行
	beforeRun(){}
	//start后执行
	endRun(){}
	//开始
	async startRun(timeFlag,devFlag,callback,debug=false) {
		this.log("Enter QUI Start Fun:")
		//开始函数执行前执行beforeRun
		this.beforeRun()
		this.__info()
		if(timeFlag){
			this.__time()
		}
		this.__device(devFlag)
		this.__listen(timeFlag,devFlag,callback)
		//执行回调
		if(callback){
			await this[callback](debug)
		}
		//开始函数执行完成后执行endRun
		this.endRun()
		this.log("Leave QUI Start Fun.")
	}
}


const Q = Object.assign(new Qui(),QUI)
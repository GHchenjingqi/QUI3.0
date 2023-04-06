/*
 * @Author: cjq 
 * @Date: 2023-03-Th 09:55:25 
 * @Last Modified by:   cjq 
 * @Last Modified time: 2023-03-Th 09:55:25 
 */
import comFun from "./comFun.js"
class QUI {
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
		if (devFlag) {
			//			this.log("设备信息：")
			this.log("~~~userAgent:" + window.navigator.userAgent)
			this.log("~~~设备分辨率:" + window.screen.width + "*" + window.screen.height)
			this.log("~~~浏览器有效窗口:" + window.screen.availWidth + "*" + window.screen.availHeight)
			this.log("~~~Body页面宽高:" + document.body.clientWidth + "*" + document.body.clientHeight)
		}
	}
	__listen(callback,opt) {
		let that = this
		window.addEventListener("resize", function () {
			that.__reset(callback,opt)
		})
	}
	async __reset( callback,opt) {
		console.clear()
		this.__setRem()
		if (callback) {
			await this[callback](opt)
		}
	}
	__setRem(){
		//重置rem单位
		let w = document.body.clientWidth
		let rem = window.innerWidth / 12 
		if(w < 768){
			rem = window.innerWidth / 4 
		}else if(w > 768 && w < 1290){
			rem = window.innerWidth / 7 
		}else if(w > 1280 && w < 1450){
			rem = window.innerWidth / 8 
		}
		else if(w > 1450 && w < 1900){
			rem = window.innerWidth / 10 
		}
		document.documentElement.style.fontSize = rem + 'px'
		
	}
	__loading(){
		let div = document.createElement("div");
        div.className = "qui-loading";
		div.innerHTML = `<img src="./css/icons/loading.gif" alt="加载中...">`;
		document.body.style.height = "100vh"
        document.body.style.overflow = "hidden"
		document.body.appendChild(div)
	}
	__removeLoading(){
		document.body.removeChild(document.getElementsByClassName("qui-loading")[0])
		document.body.style.height = "auto"
        document.body.style.overflow = "auto"
	}
	//start前执行
	async beforeRun() { }
	//start后执行
	async endRun() { }
	//开始
	async startRun(options) {
		let { callback, debug = false, timeFlag, devFlag,QRoptions } = options
		//开始函数执行前执行beforeRun
		this.__loading()
		this.__setRem()
		// 冻结数据
		await this.beforeRun()
		//执行回调
		let opt = {debug,QRoptions}
		if (callback) {
			await this[callback](opt)
		}
		this.log("Enter QUI Start Fun:")
		this.__info()
		if (timeFlag) {
			this.__time()
		}
		this.__device(devFlag)
		this.__listen(callback,opt)
		//开始函数执行完成后执行endRun
		await this.endRun()
		this.__removeLoading()
		this.log("Leave QUI Start Fun.")
	}
}
var Q = Object.assign(new QUI(), comFun)
export default Q
/** Layer.js弹窗提示插件
 *  author:cjq
 *  time: 2023-4-4
 *  options参数解析：
 * * * * title —— 弹窗标题，String，可选
 * * * * content —— 弹窗内容，String，可选
 * * * * buttons —— 弹窗按钮，String，可选。多个按钮采用“|”分割:"cancle|confirm|submit"，按钮支持回调事件，使用横线-："submit-subEvent|ok-sucessEuent"
 * * * * buttonAlign —— 弹窗按钮对齐方式，可选。值：right,left,center。 默认右对齐
 * * * * width —— 弹窗宽度，String，Number，可选。
 * * * * height —— 弹窗高度，String，Number，可选。
 * * * * radius —— 弹窗圆角，Number，可选。
 * * * * layerType —— 弹窗类型，String，可选。值：normal,image 。
 * * * * src —— 弹出类型为image时，String，必填！其他类型为空！
 * * * * position —— 弹窗位置，String，可选。值：top,bottom,center,top-left,top-right,bottom-left,bottom-right,left-center,right-center。图片弹窗仅支持top,bottom,center
 * 
 * 文字弹窗例子：
 * let popoptions = {
		title:"温馨提示",
		content:"您的会员已于23年10月1日到期，请重置！",
		width:500,
		buttons:"cancle|confirm",
		position:"center",
	}

 * 图片弹窗例子：
   let popoptions = {
		width: 800,
		position:"bottom",
		radius:"30",			
		src:"https://cdn.staticaly.com/gh/GHchenjingqi/picx-images-hosting@master/084925tI2CY.1b5fr0lah8ow.webp",
		layerType:"image"
	}
 */
class PopLayer{
    constructor(options){
        let {title, content, buttons,buttonAlign ="right", width = 300, height='auto', radius = 2,layerType="normal",src, position="center"} = {...options}
        this.title = title
        this.content = content
        this.buttons = buttons
        this.width = width == 'auto' ? width : width+'px'
        this.height = height == 'auto' ? height : height+'px'
        this.radius = radius
        this.layerType = layerType
        this.src = src
        this.position = position
        this.buttonAlign = buttonAlign
    }
    show(){
        this.creatPop()
        this.listenEvent()
    }
    listenEvent(){
        // 关闭事件监听
        let box = document.getElementsByClassName("qui-boom-layer")[0]
        let that = this
        box.addEventListener("click", function () {
            that.hide()
        });
        let close = document.getElementsByClassName("qui-boom-icon-close")[0]
        if(close){
            close.addEventListener("click", function () {
                that.hide()
            });
        }
        let cancleBtn = document.getElementById("cancle")
        if(cancleBtn){
            cancleBtn.addEventListener("click", function () {
                that.hide()
            });
        }
        //回调事件添加
        if(this.buttons){
            let btnGroup = this.buttons.split('|')
            if(btnGroup.length>0){
                btnGroup.forEach(item => {
                    let btnItem = item.split('-')
                    if(btnItem[1]){
                        //将字符串当成函数执行
                        let events = btnItem[1]+'()'
                        document.getElementById(btnItem[0]).addEventListener("click", function () {
                            eval(events);
                        });
                    }
                });
            }
        }
        
    }
    creatPop(){
        let div = document.createElement("div");
        div.className = "qui-boom"
        if(this.layerType === 'normal'){
            let startHtml = `<div class="qui-boom-layer"></div><div class="qui-boom-${this.position} bgff" style="width: ${this.width};height: ${this.height};border-radius: ${this.radius}px;">`
            let titleHtml = this.title ? `<div class="qui-boom-title">${this.title}</div>` : ''
            let contentHtml = this.content ? `<div class="qui-boom-content">${this.content}</div>` : ''
            let btnHtml = ""
            if(this.buttons){
                let btnGroup = this.buttons.split('|')
                let btnstr = ''
                if(btnGroup.length>0){
                    btnGroup.forEach(item => {
                        let btnItem = item.split('-')
                        if(btnItem[0]==='cancle'){
                            btnstr = btnstr + `<button class="white" id="${btnItem[0]}">${this.getBtnText(btnItem[0])}</button>`
                        }else{
                            btnstr = btnstr + `<button id="${btnItem[0]}">${this.getBtnText(btnItem[0])}</button>`
                        }
                    });
                }
                btnHtml =   `<div class="qui-boom-btn text-${this.buttonAlign}">${btnstr}</div>`
            }
            let endHtml =` <div class="qui-boom-icon-close"><i class="icon icon-x"></i></div></div>`
            div.innerHTML = startHtml + titleHtml + contentHtml + btnHtml + endHtml
        }
        if(this.layerType === 'image'){
            div.innerHTML = `<div class="qui-boom-layer"></div><div class="qui-boom-img qui-boom-${this.position}"><img draggable="true" style="width:${this.width};height:${this.height};border-radius:${this.radius}px" src="${this.src}" alt=""> </div>`
        }
        document.body.style.height = "100vh"
        document.body.style.overflow = "hidden"
        document.body.appendChild(div)
    }
    getBtnText(label){
        let textlist = {
            cancle:"取消",
            confirm:"确认",
            submit: "提交",
        }
        return 	textlist[label] ? textlist[label] : label
    }
    hide(){
        document.body.removeChild(document.getElementsByClassName("qui-boom")[0])
        document.body.style.height = "auto"
        document.body.style.overflow = "auto"
    }
}

export default PopLayer
/** Drawer.js 抽屉弹窗插件
 *  author:cjq
 *  time: 2023-4-6
 *  options参数解析：
 *  direction —— String 方向，默认右侧。可选
 *  width —— String | Number 宽度，方向为顶部，底部时默认100%宽度，左右抽屉时默认宽度360px。可选
 *  height —— String | Number 高度，方向为左侧，右侧时默认100%高度，上下抽屉时默认宽度360px。可选
 *  title —— String，标题内容，可选
 *  content —— String，弹框内容，必填
 *  closeIcon —— Boolean,弹框关闭按钮是否显示，可选
 * 
 *  案例：
 *  let options = {
			title:"抽屉标题",
			content:"抽屉内容",
			direction:"bottom",
			width:500,
			height:300
 *	}
 */
class Drawer{
    constructor(options){
        let {direction = "right", width , height, title, content, closeIcon = true} = options
        this.title = title
        this.content = content
        this.closeIcon = closeIcon
        this.direction = direction
        if(["top","bottom"].includes(this.direction)){
            this.width = "100%"
            this.height = height ? height+'px' : "360px"
        }
        if(["left","right"].includes(this.direction)){
            this.height = "100%"
            this.width = width ? width+'px' : "360px"
        }
        this.iconHtml =""
        if(this.closeIcon){
            this.iconHtml = `<i class="icon icon-x qui-boom-close"></i>`
        }
    }
    show(){
        this.creatPop()
        this.listenEvent()
    }
    creatPop(){
        let div = document.createElement("div");
        div.className = "qui-boom"
        let startHtml = `<div class="qui-boom-layer"></div><div class="qui-boom-${this.direction} ui-drawer" id="ui-drawer" style="width:${this.width};height:${this.height}">`
        let headerHtml = this.title ? `<div class="ui-drawer-header"><span>${this.title}</span>${this.iconHtml}</div>` : ""
        let contentHtml = `<div class="ui-drawer-content">${this.content}</div></div>`
        div.innerHTML = startHtml + headerHtml + contentHtml
        document.body.style.height = "100vh"
        document.body.style.overflow = "hidden"
        document.body.appendChild(div)
    }
    listenEvent(){
        // 关闭事件监听
        let box = document.getElementsByClassName("qui-boom-layer")[0]
        let that = this
        box.addEventListener("click", function () {
            that.hide()
        });
        let close = document.getElementsByClassName("qui-boom-close")[0]
        if(close){
            close.addEventListener("click", function () {
                that.hide()
            });
        }
    }
    hide(){
        document.body.removeChild(document.getElementsByClassName("qui-boom")[0])
        document.body.style.height = "auto"
        document.body.style.overflow = "auto"
    }
}

export default Drawer
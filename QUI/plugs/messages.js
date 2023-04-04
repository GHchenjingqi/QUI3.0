/** Messages.js消息提示插件
 *  author:cjq
 *  time: 2023-4-3
 *  options参数解析：
 *  type —— 可选字段：warn，success，error
 *  msg —— 必填字段
 */
class Messages {
    constructor(options) {
        let {type, msg } = options
        this.type = type
        this.msg = msg
    }
    async show() {
        //异步调用show才有时延效果
        await this.creatElement()
        let that = this
        setTimeout(() => {
            that.hide()
        }, 3000)
    }
    async creatElement() {
        let msgbox = document.getElementsByClassName("ui-messages")[0]
        let div = null
        if (msgbox) {
            div = msgbox
        } else {
            div = document.createElement("div");
            div.className = "ui-messages";
        }
        let startHTML = `<div class="item ${this.type}">`
        let errHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`
        let warnHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-circle"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
        let sucessHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
        let endHTML = `<span>${this.msg}</span></div>`
        // 默认不带图标
        let middleHTML = ``
        if (this.type === "warn") {
            middleHTML = warnHTML
        }
        if (this.type === "success") {
            middleHTML = sucessHTML
        }
        if (this.type === "error") {
            middleHTML = errHTML
        }
        //middleHTML 可扩展
        let itmeHtml = startHTML + middleHTML + endHTML
        if (div.childNodes && div.childNodes.length > 0) {
            let childNode = div.childNodes[div.childNodes.length]
            if (!childNode) {
                let childdiv = document.createElement("div");
                childdiv.className = `item  ${this.type}`;
                childdiv.innerHTML = middleHTML + `<span>${this.msg}</span> `;
                div.appendChild(childdiv)
            }
        } else {
            div.innerHTML = itmeHtml
            document.body.appendChild(div)
        }
        await this.sleep(1000)

    }
    hide() {
        let item = document.getElementsByClassName("ui-messages")[0].children[0]
        if (item) {
            document.getElementsByClassName("ui-messages")[0].removeChild(item)
        } else {
            document.body.removeChild(document.getElementsByClassName("ui-messages")[0])
        }
    }
    sleep(time) {
        return new Promise(resolve => {
            window.setTimeout(() => {
                resolve()
            }, time)
        })
    }
}

export default Messages
/** viewer.js图片预览插件
 *  author:cjq
 *  time: 2023-03-31
 */
class viewer {
    constructor(src) {
        this.src = src
    }
    viewer() {
        this.creatLayer()
        this.listenEvent()
    }
    creatLayer() {
        let div = document.createElement("div");
        div.className = "qui-boom";
        div.innerHTML = `<div class="qui-boom-layer"></div><div class="qui-boom-img"><img draggable="true" src="${this.src}" alt=""> </div>`;
        document.body.style.height = "100vh"
        document.body.style.overflow = "hidden"
        document.body.appendChild(div)
    }
    listenEvent() {
        let box = document.getElementsByClassName("qui-boom-layer")[0]
        let that = this
        box.addEventListener("click", function () {
            that.closeLayer()
        });
    }
    closeLayer() {
        document.body.removeChild(document.getElementsByClassName("qui-boom")[0])
        document.body.style.height = "auto"
        document.body.style.overflow = "auto"
    }
}
export default viewer
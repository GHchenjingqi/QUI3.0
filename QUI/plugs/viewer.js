/** viewer.js图片预览插件
 *  author:cjq
 *  time: 2023-03-31
 *  options参数解析：
 *  src —— 必填图片src路径
 */
class Viewer {
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
        div.innerHTML = `<div class="qui-boom-layer"></div><div class="qui-boom-img"><img draggable="true" src="${this.src}" alt=""> </div>
                <div class="viewer-oper">
                <i class="icon icon-zoom-in" id="viewerZoomIn"></i>
                <i class="icon icon-zoom-out" id="viewerZoomOut"></i>
                <i class="icon icon-x" id="viewerClose"></i>
            </div>`;
        document.body.style.height = "100vh"
        document.body.style.overflow = "hidden"
        document.body.appendChild(div)
    }
    listenEvent() {
        // 关闭事件监听
        let box = document.getElementsByClassName("qui-boom-layer")[0]
        let that = this
        box.addEventListener("click", function () {
            that.closeLayer()
        });
        let close = document.getElementById("viewerClose")
        close.addEventListener("click", function () {
            that.closeLayer()
        });

        //缩小事件
        let ZoomOut = document.getElementById("viewerZoomOut")
        ZoomOut.addEventListener("click", function () {
            that.viewZoomOut()
        });
        //放大事件
        let ZoomIn = document.getElementById("viewerZoomIn")
        ZoomIn.addEventListener("click", function () {
            that.viewZoomIn()
        });
        //鼠标滚轴事件
        window.onmousewheel=document.onmousewheel=(e)=>{
            if(e.wheelDelta<0){
                // 缩小
                that.viewZoomOut()
            }else if(e.wheelDelta>0){
                // 放大
                that.viewZoomIn()
            }
            
        }
    }
    closeLayer() {
        document.body.removeChild(document.getElementsByClassName("qui-boom")[0])
        window.imger = null
        document.body.style.height = "auto"
        document.body.style.overflow = "auto"
    }
    viewZoomIn(){
        let scale = window.scale || 1
        let imgbox = document.getElementsByClassName("qui-boom-img")[0]
        if(imgbox && scale<4){
            scale=scale+0.6
            window.scale  = scale
            imgbox.childNodes[0].style.transform = `scale(${scale})`
        }
    }
    viewZoomOut(){
        let scale = window.scale || 1
        let imgbox = document.getElementsByClassName("qui-boom-img")[0]
        if(imgbox && scale>0.6){
            scale=scale-0.6
            window.scale  = scale
            imgbox.childNodes[0].style.transform = `scale(${scale})`
        }
    }
}
export default Viewer
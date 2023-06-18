# QUI
QUI插件整合了前端常用的JS方法及CSS基础样式

## QUI.js
QUI.js是一款开源的前端轻量UI插件，能与JQuery,Swiper,Vue,Bootstraps,小程序,Wordpress等框架轻松耦合，尽量减少前端造轮子。QUI集成了ES6，HTML5，AJAX,QRcode等JS常用API方法。

### 公共方法

### 初始化函数
options参数：
- loadingSrc:"./css/icons/loading.gif",  //全局加载loading图片路径  
// 二维码参数
- QRoptions:  
{  
	text: window.location.href,  //页面路径作为内容  
	id: 'qrcode',  //渲染到指定id  
	color: '#333'  //二维码颜色  
}

### JS数据类型判断
isNumber()  
isString()  
isBoolean()  
isFunction()  
isObject()  
isArray()  
isDate()  
isNull()  
isUndefined()  

### 获取数据类型
getType(obj)

### 对象转数组
objToArr()

### 合并对象
combineObject(obj1,obj2)
### 判断对象是否包含某个元素
isHas(obj,param)
#### 获取盒子大小位置
getBoxRect()

### 获取指定长度随机字符串
romCode(n)

### 判断是否是微信内置浏览器
isWeiXin()

### 获取url中指定参数
getQuery(param)

### 生成二维码
createQRcode(options)

### 图片灯箱效果调用
loadViewer()

### ajax
ajax()
### Cookie使用
Cookie.set()  
Cookie.get()  
Cookie.del()  
Cookie.clear()  

### LocalStorage使用 
LocalStg.set()  
LocalStg.get()  
LocalStg.del()  
LocalStg.clear()  

### SessionStorage使用
SessionStg.set()  
SessionStg.get()  
SessionStg.del()  
SessionStg.clear()  

...  
以及时间格式的处理等方法，后续也会继续扩展常用正则等好玩的api。
/*
 * @Author: cjq 
 * @Date: 2023-03-Th 10:00:37 
 * @Last Modified by:   cjq 
 * @Last Modified time: 2023-03-Th 10:00:37 
 */
import { QRCode, Viewer, Messages, PopLayer, Drawer} from './plugs/index.js'
let QUI = {
    title: "QUI插件",
    name: "QUI",
    des: "QUI.js是一款开源的前端轻量UI插件，能与JQuery,Swiper,Vue,Bootstraps,小程序,Wordpress等框架轻松耦合，尽量减少前端造轮子。QUI集成了ES6，HTML5，AJAX,QRcode等JS常用API方法",
    version: "1.0",
    data: {
        titleInPage: "期待下次再见到你，EMO~", //进入页面提示语
        titleOutPage: "哦豁，终于等到你！", //进入页面提示语
        resourcePath: "https://cdn.jsdelivr.net/gh/GHchenjingqi/resources/"
    },
    // 功能数据
    dataBase: {
        // 主题背景
        themes: [{
            id: "t3",
            name: "机车靓妹",
            files: "images/bz03.jpg",
        }],
        // 音频路径
        voices: [],
    },
    // 是否开启调试模式
    debugs: ["debug", "log", "warn", "info"],
    // 设备分辨率
    screen: {
        width: 0,
        height: 0
    }
};
/**
 * 初始化必须数据
 * @param {*} debugShow 
 */
QUI.init = async function (options) {
    let { debug = true, QRoptions } = options
    //禁用调试
    if (!debug) {
        this.debugs.forEach((item) => {
            console[item] = function () { return null }
        })
    }
    this.error(this.title + ' 版本：' + this.version)
    this.error(this.des)
    //正式环境下开启
    this.windowSize();
    //Dom宽度
    this.getPageSize()
    this.dataBase.route = this.getUrl()
    //音效扩展
    await this.setAudios()
    //二维码插件
    if (QRoptions) {
        window.QRCode = QRCode
        if (!this.isEmpty(QRoptions)) {
            this.createQRcode(QRoptions)
        }
    }
    //图片预览
    this.loadViewer()
    //消息提示
    window.Messages = Messages
    window.Layer = PopLayer
    window.Drawer = Drawer
    //测试打印
    this.error(this)
}

/**
 * 设备分辨率
 */
QUI.windowSize = function () {
    let h = window.screen.height;
    let w = window.screen.width;
    this.screen = {
        width: w,
        height: h
    }
}

/**
 * 获取当前页面DOM宽度
 */
QUI.getPageSize = function () {
    const body = document.body.getBoundingClientRect();
    this.dom = { width: body.width, height: body.height };
}

/**
 * 动态标题
 */
QUI.titleChange = function () {
    let OriginTitile = document.title, titleTime;
    document.addEventListener("visibilitychange", function () {
        if (document.hidden) {
            document.title = QUI.data.titleInPage;
            clearTimeout(titleTime)
        } else {
            document.title = QUI.data.titleOutPage;
            titleTime = setTimeout(function () {
                document.title = OriginTitile
            },
                1000)
        }
    });
}
QUI.titleChange = function () {
    const { titleInPage, titleOutPage } = QUI.data;
    let originTitle = document.title, titleTime;
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            [document.title, titleTime] = [titleInPage, clearTimeout(titleTime)];
        } else {
            [document.title, titleTime] = [titleOutPage, new Promise(resolve => setTimeout(resolve, 1000)).then(() => document.title = originTitle)];
        }
    });
}
// 常用方法归档：
/**
 * Log打印
 * @param {*} val 
 * @returns 
 */
QUI.log = function (val) {
    return console.log(val)
}
QUI.log = function (val) {
    if (window.console && window.console.log) {
        return console.log(val)
    }
}
/**
 * Error打印
 * @param {*} val 
 * @returns 
 */
QUI.error = function (val) {
    if (window.console && window.console.error) {
        return console.error(val)
    }
}

/**
 * 获取域名地址
 * @returns 
 */
QUI.getUrl = function () {
    let webSite = {}
    try {
        this.log("进入获取url模块")
        webSite.url = window.location.href
        webSite.domain = window.location.host
        webSite.port = window.location.port
        webSite.search = window.location.search
        webSite.hash = window.location.hash
        webSite.pathname = window.location.pathname
        this.log("退出获取url模块")
    }
    catch {
        this.error("Url初始化失败，请求获取失败！")
    }
    return webSite;
}

/**
 * 判断参数是否为空
 * @param {*} obj 
 * @returns 布尔
 */
QUI.isEmpty = function (obj) {
    const conditions = [undefined, null, '', {}];
    if (Array.isArray(obj) && obj.length === 0) {
        return true;
    }
    if (conditions.some(condition => obj === condition)) {
        return true;
    }
    return false;
}

/**
 * 判断参数类型
 * @param {*} obj 
 * @returns 布尔
 */
QUI.getType = function (obj) {
    let res = Object.prototype.toString.call(obj).slice(8, -1);
    return res;
}

/**
 * 判断数组类型
 * @param {*} arrays 
 * @returns 布尔
 */
QUI.isArray = function (arrays) {
    return Array.isArray(arrays)
}

/**
 * 判断对象类型
 * @param {*} obj 
 * @returns  布尔
 */
QUI.isObject = function (obj) {
    return "Object" === this.getType(obj)
}

/**
 * 判断时间类型
 * @param {*} dates 
 * @returns  布尔
 */
QUI.isDate = function (dates) {
    return "Date" === this.getType(dates)
}

/**
 * 判断字符串类型
 * @param {*} str 
 * @returns 
 */
QUI.isString = function (str) {
    return "String" === this.getType(str)
}

/**
 * 判断数字类型
 * @param {*} num 
 * @returns 
 */
QUI.isNumber = function (num) {
    return "Number" === this.getType(num)
}

/**
 * 判断布尔类型
 * @param {*} bl 
 * @returns 
 */
QUI.isBoolean = function (bl) {
    return "Boolean" === this.getType(bl)
}

/**
 * 判断函数类型
 * @param {*} fn 
 * @returns 
 */
QUI.isFunction = function (fn) {
    return "Function" === this.getType(fn)
}

/**
 * 判断Null
 * @param {*} val 
 * @returns 
 */
QUI.isNull = function (val) {
    return "Null" === this.getType(val)
}

/**
 * 判断Undefined
 * @param {*} val 
 * @returns 
 */
QUI.isUndefined = function (val) {
    return "Undefined" === this.getType(val)
}

/**
 * 断言
 * @param {*} condition 
 * @param {*} msg 
 */
QUI.assert = function (condition, msg) {
    if (!condition) {
        throw new Error((msg))
    }
}

/**
 * 判断是否含有某个字符
 * @param {*} obj 
 * @param {*} param 
 * @returns 
 */
QUI.isHas = function (obj, param) {
    if (this.isObject(obj) && Object.hasOwn(obj, param)) {
        return true
    }
    if (this.isArray(obj)) {
        for (let i in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, i)) {
                if (obj[i] === param || Object.hasOwn(obj[i], param)) {
                    return true
                }
            }
        }
        return true
    }
    if (this.isString(obj && obj.indexOf(param) > -1)) {
        return true;
    }
    return false;
}

/**
 * 是否是微信内置浏览器
 * @returns 
 */
QUI.isWeiXin = function isWeiXin() {
    let ua = window.navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}

/**
 * 获取div盒子尺寸属性
 * @param {*} id 盒子唯一id，没有ID的时候取body的属性
 * @returns 
 */
QUI.getBoxRect = function (id = "") {
    return (document.getElementById(id) ?? document.body).getBoundingClientRect();
}

/**
 * 对象转数组 多参数字符串转数组  —— objToArr(a,b,c)
 * @param  {...any} obj 
 * @returns array
 */
QUI.objToArr = function (...obj) {
    let arr = []
    if (this.isObject(obj)) {
        arr.push(obj)
    } else if (this.isArray(obj)) {
        arr = obj
    }

    return arr
}

/**
 * 冻结对象属性
 * @param {*} obj 对象
 * @param {*} arr 需要冻结属性集合，可省略
 */
QUI.objectFreeze = async function (obj, arr) {
    if (this.isEmpty(obj)) { return }
    if (this.isEmpty(arr)) {
        //冻结全部对象
        Object.freeze(obj)
        return
    }
    if (this.isArray(arr)) {
        arr.forEach(item => {
            Object.freeze(obj[item])
        })
        return
    }
}

/**
 * 动态创建js
 * @param {*} src 
 */
QUI.createScript = function (src) {
    let el = document.createElement('script');
    el.src = src;
    el.async = true;
    el.defer = true;
    document.body.appendChild(el);
}

/**
 * 动态加载js后，调用回调函数
 * @param {*} url 
 * @param {*} callback 
 */
QUI.loadScript = function (url, callback) {
    let script = document.createElement("script");
    script.type = "text/javascript";
    if (typeof (callback) != "undefined") {
        if (script.readyState) {
            script.onreadystatechange = function () {
                if (script.readyState == "loaded" || script.readyState == "complete") {
                    script.onreadystatechange = null;
                    callback();
                }
            };
        } else {
            script.onload = function () {
                callback();
            };
        }
    }
    script.src = url;
    document.body.appendChild(script);
}

/**
 * 防抖
 * @param {*} func 
 * @param {*} delay 
 * @returns 
 */
QUI.debounce = function (func, delay) {
    let timer;
    return function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            func.apply(this, arguments);
        }, delay);
    }
}

/**
 * 节流
 * @param {*} func 
 * @param {*} delay 
 * @returns 
 */
QUI.throttle = function (func, delay) {
    let timer;
    return function () {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, arguments);
                timer = null;
            }, delay);
        }
    }
}

/**
 * 节流+防抖
 * @param {*} func 
 * @param {*} delay 
 * @returns 
 */
QUI.debounceAndThrottle = function (func, delay) {
    let timer;
    let lastExecTime = 0;
    return function () {
        const context = this;
        const args = arguments;
        const currentTime = Date.now();
        if (currentTime - lastExecTime > delay) {
            lastExecTime = currentTime;
            func.apply(context, args);
        } else {
            clearTimeout(timer);
            timer = setTimeout(() => {
                lastExecTime = currentTime;
                func.apply(context, args);
            }, delay - (currentTime - lastExecTime));
        }
    }.bind(this); // 绑定函数的this指向
}

/**
 * 时间格式化
 * @param {*} date Date类型不能是时间戳
 * @param {*} formatStr str
 * @returns 
 */
QUI.dateFormat = function (date, formatStr) {
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() %
        100));
    var month = date.getMonth() + 1;
    str = str.replace(/MM/, month > 9 ? month.toString() : '0' + month);
    str = str.replace(/M/g, month);

    str = str.replace(/w|W/g, Week[date.getDay()]);

    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/d|D/g, date.getDate());

    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes());

    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    str = str.replace(/s|S/g, date.getSeconds());
    return str;
}

/**
 * 获取当前时间戳
 * @returns date
 */
QUI.getTimeHCuo = function () {
    return new Date().getTime()
}

/**
 * 更新时间是否过期：6小时更新一次 —— 参数均为时间戳
 * @param {*} time 时间戳
 * @param {*} oldTime 时间戳
 * @returns  小时
 */
QUI.getTimeHour = function (time, oldTime) {
    let newTime = (time - oldTime) / 1000 / 60 / 60;// 转换为 小时
    return newTime
}

/**
 * 当前时间段欢迎语
 * @returns string
 */
QUI.getTimeWord = function () {
    let str = ""
    let hour = new Date().getHours()
    if (hour < 6) {
        str = "凌晨好！"
    } else if (hour < 9) {
        str = "早上好！"
    } else if (hour < 12) {
        str = "上午好！"
    } else if (hour < 14) {
        str = "中午好！"
    } else if (hour < 17) {
        str = "下午好！"
    } else if (hour < 19) {
        str = "傍晚好！"
    } else if (hour < 22) {
        str = "晚上好！"
    } else {
        str = "夜里好！"
    }
    return str
}

/**
 * 时间戳转换成时间
 * @param {*} timestamp 
 * @returns string 2022-01-28 10:34:21
 */
QUI.timeStampToDate = function (timestamp) {
    var time = new Date(timestamp) //先将时间戳转为Date对象，然后才能使用Date的方法
    var year = time.getFullYear();
    var month = time.getMonth() + 1; //月份是从0开始的
    month = month < 10 ? '0' + month : month;
    var day = time.getDate();
    day = day < 10 ? '0' + day : day;
    var hour = time.getHours();
    hour = hour < 10 ? '0' + hour : hour;
    var minute = time.getMinutes();
    minute = minute < 10 ? '0' + minute : minute;
    var second = time.getSeconds();
    second = second < 10 ? '0' + second : second;
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

/**
 * 计算日期时间差，返回单位（天）
 * @param {*} startDate  2022-03-16  
 * @param {*} endDate 2022-03-16  
 * @returns number 天
 */
QUI.diffDate = function (startDate, endDate) {
    let diftime = Date.parse(endDate) - Date.parse(startDate)
    let day = 24 * 60 * 60 * 1000
    return Math.floor(diftime / day)
}

/**
 * 获取url对应参数
 * @param {*} name 
 * @returns string
 */
QUI.getQuery = function (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

/**
 * 返回对应天气类型的index序号
 * @param {*} arr 
 * @param {*} val 
 * @returns number
 */
QUI.filterWeatherType = function (arr, val) {
    let n = 0
    arr.forEach((item, index) => {
        if (item.state.indexOf(val) > -1) {
            n = index
        }
    })
    return n
}

/**
 * 生成全局唯一标识符 ，36进制：8位随机数
 * @returns 8位随机数
 */
QUI.getGuid = function () {
    return Number(Math.random().toString().substr(3, length) + Date.now()).toString(36)
}

/**
 * 睡眠函数
 * @param {*} time 
 * @returns 
 */
QUI.sleep = function (time) {
    return new Promise(resolve => {
        window.setTimeout(() => {
            resolve()
        }, time)
    })
}

/**
 * 获取当前ip路径两个自定字符串之前的字符串
 * @param {*} param1 
 * @param {*} param2 
 * @returns string
 */
QUI.getABc = function (param1, param2) {
    let urls = window.location.pathname;
    let start = urls.indexOf(param1);
    let end = urls.indexOf(param2);
    let str;
    if (start > -1 && end > -1) {
        str = urls.slice(start + param1.length, end);
    }
    return str;
}

/**
 * 清空指定字符串
 * @param {*} str 
 * @param {*} param 
 * @returns 
 */
QUI.emptyStr = function (str, param) {
    let reg = new RegExp(param, 'gm');
    return str.replace(reg, "");
}

/**
 * 替换指定字符串,sign不存在为清空,等同于emptyStr
 * @param {*} str 
 * @param {*} param 
 * @param {*} sign 
 * @returns 
 */
QUI.repStr = function (str, param, sign) {
    let reg = new RegExp(param, 'gm');
    sign = sign || '';
    return str.replace(reg, sign);
}


/**
 * 获取n个随机数
 * @param {*} n 
 * @returns 
 */
QUI.romCode = function (n) {
    //将数字、小写字母及大写字母输入
    var str = "1234567890qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    //给一个空字符串
    var res = '';
    //循环4次，得到4个字符
    for (var i = 0; i < n; i++) {
        //将得到的结果给字符串，调用随机函数，0最小数，62表示数字加字母的总数
        res += str[QUI.Random(0, 62)];
    }
    return res;
}

/**
 * 二维码生成
 * @param {*} options 
 */
QUI.createQRcode = function (options) {
    let { id, text, width = 88, height = 88, color } = options
    document.getElementById(id).innerHTML = ""
    new QRCode(id, {
        //文字内容
        text: text,
        //宽度
        width: width,
        //高度
        height: height,
        //颜色
        colorDark: color,
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}

/**
 *  图片预览加载调用
 *  仅对父级盒子className = "viewer-img-box" 里面的图片生效
 */
QUI.loadViewer = function () {
    document.body.addEventListener('click', function (e) {
        let type = e.target.tagName
        let parent = e.target.parentNode
        // 保证只允许一个插件运行
        if(!window.imger){
            if(type === 'IMG' && parent.className === 'viewer-img-box' ){
                let src = e.target.src
                window.imger = new Viewer(src)
                window.imger.viewer()
            }
        }        
    }, true)
}

/**
 * 获取指定区间随机数
 * @param {*} max 
 * @param {*} min 
 * @returns 
 */
QUI.random = function (max, min) {
    return Math.round(Math.random() * (max - min) + min);
}

/**
 * 合并对象
 * @param {*} obj1 
 * @param {*} obj2 
 * @returns Object
 */
QUI.combineObject = function (obj1, obj2) {
    if (isObject(obj1) && isObject(obj2)) {
        return { ...obj1, ...obj2 }
    }
}

/**
 * 记录清除
 * @param {*} obj1 
 * @returns 
 */
QUI.destroy = async function (obj) {
    this.Cookie.clear()
    this.LocalStg.clear()
    this.SessionStg.clear()
}

/**
 * ajax请求
 * @param {*} options 
 * @returns 
 */
QUI.ajax = function (options) {
    //如果options参数没有传递，直接返回。
    if (!options || typeof options !== "object") {
        return;
    }
    //处理默认参数
    //如果参数不是post，那就默认为get
    var type = options.type == "post" ? "post" : "get";
    //如果没有传url，那就传当前地址
    var url = options.url || location.pathname;
    //如果参数不是false，那就默认是true，发异步请求
    var async = options.async == false ? false : true;
    var params = options.data;
    var xhr = new XMLHttpRequest();
    //设置请求行
    if (type == "get") {
        url = url + "?" + params;
    }
    xhr.open(type, url, async);
    //设置请求头
    if (type == "post") {
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    }
    //设置请求参数
    xhr.send(params);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                /*根据响应头的content-type属性指定方法接收到的内容*/
                var contentType = xhr.getResponseHeader('content-type');
                var data = null;
                if (contentType.indexOf('json') > -1) {
                    data = JSON.parse(xhr.responseText);
                } else if (contentType.indexOf('xml') > -1) {
                    data = xhr.responseXML;
                } else {
                    data = xhr.responseText;
                }
                /*执行成功函数*/
                options.success && options.success(data);
            } else {
                options.error && options.error(xhr.responseText);
            }
        }
    }
}


/**
 * cookie使用:增删改查
 */
QUI.Cookie = {
    /**
     * 根据key值获取对应的cookie
     * @param {*} key 
     * @returns 
     */
    get: function (key) {
        //获取cookie
        let data = document.cookie;
        //获取key第一次出现的位置    pwd=
        let startIndex = data.indexOf(key + '=');
        //  name=123;pwd=abc
        //如果开始索引值大于0表示有cookie
        if (startIndex > -1) {
            //key的起始位置等于出现的位置加key的长度+1
            startIndex = startIndex + key.length + 1;
            //结束位置等于从key开始的位置之后第一次;号所出现的位置
            let endIndex = data.indexOf(';', startIndex);
            //如果未找到结尾位置则结尾位置等于cookie长度，之后的内容全部获取
            endIndex = endIndex < 0 ? data.length : endIndex;
            return decodeURIComponent(data.substring(startIndex, endIndex));
        } else {
            return '';
        }
    },
    /**
     * 设置cookie
     * @param {*} key 
     * @param {*} value 
     * @param {*} time 
     */
    set: function (key, value, time) {
        //默认保存时间
        time = time || 7; //默认七天
        //获取当前时间
        let cur = new Date();
        let undefined;
        //设置指定时间
        cur.setTime(cur.getTime() + time * 24 * 3600 * 1000);
        //创建cookie  并且设置生存周期为GMT时间
        document.cookie = key + '=' + encodeURIComponent(value) + ';expires=' + (time === undefined ? '' : cur.toGMTString());
    },
    /**
     * 删除指定cookie
     * @param {*} key 
     */
    del: function (key) {
        //获取cookie
        let data = this.get(key);
        //如果获取到cookie则重新设置cookie的生存周期为过去时间
        if (data !== false) {
            this.set(key, data, -1);
        }
    },
    /**
     * 清空全部cookie
     */
    clear: function () {
        let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--;) {
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            }
        }
    }
}

/** 
 * localStorage
 * H5存储:增删改查
 */
class Storage {
    constructor(type) {
        this.type = type || 'localStorage'; //设置默认缓存类型为localStorage
        this.options = {
            startTime: 0, // 开始时间(ms)
            duration: 0,  // 有效持续时间(ms)
        };
    }
    /**
     * 存储数据
     * @param {*} name 数据名称
     * @param {*} data 数据内容
     * @param {*} duration 有效期-天
     */
    set(name, data, duration) {
        this.options.startTime = new Date();
        this.options.duration = duration || 1; // 默认一天有效 单位 天,默认一天
        let value = null;
        if (typeof data !== 'object' || data == null) {
            value = data;
        } else {
            value = JSON.stringify(data);
        }
        if (this.type === "localStorage") {
            localStorage.setItem(name, value);
        } else {
            sessionStorage.setItem(name, value);
        }
    }
    /**
     * 获取存储数据
     * @param {*} name 
     * @returns 
     */
    get(name) {
        let item = this.type === "localStorage" ? localStorage.getItem(name) : sessionStorage.getItem(name);
        try {
            item = JSON.parse(item);
        } catch (e) {
            item = item;
        }
        if (this.options.startTime) {
            let start = this.options.startTime
            let now = new Date();
            let diff = QUI.diffDate(start, now)
            if (diff > this.options.duration) {
                this.del(name);
                return null;
            }
        }
        return item;
    }
    /**
     * 删除数据
     * @param {*} name 
     */
    del(name) {
        if (this.type === "localStorage") {
            localStorage.removeItem(name);
        } else {
            sessionStorage.removeItem(name);
        }
    }
    /**
     * 清空存储数据
     */
    clear() {
        localStorage.clear();
        sessionStorage.clear();
    }
}

QUI.LocalStg = new Storage("localStorage");
QUI.SessionStg = new Storage("sessionStorage");


//扩展函数
QUI.setAudios = async function () {
    await this.setPianoAudio()
}
/**
 * 添加钢琴音效
 */
QUI.setPianoAudio = async function () {
    if (this.isEmpty(this.dataBase.voices)) {
        let piano = {
            id: "v0",
            title: "钢琴C大调",
            lists: []
        };
        [1, 2, 3, 4, 5, 6, 7].forEach(item => {
            let obj = {
                id: `v0_0${item}`,
                name: `C${item}`,
                files: `musics/piano/c${item}.mp3`
            }
            piano.lists.push(obj)
        })
        this.dataBase.voices.push(piano)
    }
}


export default QUI
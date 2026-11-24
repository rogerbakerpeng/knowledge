import weexos from './weexos';
/**
 * 加入系统判断功能
 * @param {Object} hybrid hybrid对象
 */
export default function osMixin(hybrid: EJSNamespace.EJSType) {
    const hybridJs = hybrid;

    hybridJs.os = {};

    const detect = function detect(this: any, ua) {
        const android = ua.match(/(Android);?[\s/]+([\d.]+)?/);

        if (android) {
            this.os.android = true;
            this.os.version = android[2];
            this.os.isBadAndroid = !/Chrome\/\d/.test(ua);
        }

        const harmonyOs = ua.match(/Harmony(OS)?/);

        if (harmonyOs) {
            this.os.harmonyOs = true;
        }

        const iphone = ua.match(/(iPhone\sOS)\s([\d_]+)/);

        if (iphone) {
            this.os.ios = true;
            this.os.iphone = true;
            this.os.version = iphone[2].replace(/_/g, '.');
        }

        const mac = ua.match(/Mac/i);

        if (mac) {
            this.os.ios = true;
        }

        const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);

        if (ipad) {
            this.os.ios = true;
            this.os.ipad = true;
            this.os.version = ipad[2].replace(/_/g, '.');
        }
        const isFireFox = /Firefox/.test(ua);
        const isTablet =
            /(iPad|PlayBook)/.test(ua) || (android && !/Mobile/.test(ua)) || (isFireFox && /Tablet/.test(ua));

        if (isTablet) {
            this.os.isTablet = true;
        }

        // epoint的容器
        const ejs = ua.match(/EpointEJS/i);

        if (ejs) {
            this.os.ejs = true;
        }

        // epoint小程序容器
        const miniH5 = ua.match(/EpointMiniH5/i);

        if (miniH5) {
            this.os.ejs = true;
            this.os.miniH5 = true;
        }

        // 卡片加载环境是否是原生门户
        const primordial = ua.match(/primordial/i);

        if (primordial) {
            this.os.ejs = true;
            this.os.ejsCard = true;
        }

        // 政务微信容器
        const wxWorkLocal = ua.match(/wxworklocal/i);

        if (wxWorkLocal) {
            this.os.wxWorkLocal = true;
        }

        // 企业微信容器
        const wxWork = ua.match(/wxwork/i);

        if (!wxWorkLocal && wxWork) {
            this.os.wxWork = true;
        }

        // 微信容器
        const wechat = ua.match(/MicroMessenger/i);

        if (!wxWork && !wxWorkLocal && wechat) {
            this.os.wechat = true;
        }

        // welink容器
        const welink = ua.match(/welink/i);
        const cloudlink = ua.match(/cloudlink/i);

        if (welink || cloudlink) {
            this.os.welink = true;
        }

        // 讯盟容器
        const xm = ua.match(/hwminiapp/i);

        if (xm) {
            this.os.xm = true;
        }

        // 政务钉钉容器
        const ddGov = ua.match(/mPaaSClient/i);

        if (!wxWorkLocal && !wxWork && !wechat && !welink && !cloudlink && !xm && ddGov) {
            this.os.ddGov = true;
        }

        // 优化鸿蒙环境下钉钉和政务钉钉的环境区分
        const dd = ua.match(/DingTalk/i);

        if (!ddGov && dd) {
            this.os.dd = true;
        }

        // 支付宝容器
        const alipay = ua.match(/alipay/i);

        if (!ddGov && alipay) {
            this.os.alipay = true;
        }

        // 如果ejs和钉钉都不是，则默认为h5
        if (!ejs && !this.os.dd) {
            this.os.h5 = true;
            // this.os.xm = true;
        }
    };

    // 支持的os放在全局，数组的顺序很重要，不能随便修改
    const supportOsArray = [
        'dd',
        'xm',
        'wxWorkLocal',
        'wxWork',
        'wechat',
        'welink',
        'ddGov',
        'alipay',
        'miniH5',
        'primordial',
        'ejs',
        'h5'
    ];

    hybridJs.supportOsArray = supportOsArray;

    // 在这里新增拓展os的方法
    const extendOS = function (os, cb) {
        if (hybridJs.supportOsArray.indexOf(os) === -1) {
            // 新增支持的os，在头部添加
            hybridJs.supportOsArray.unshift(os);
            // 回调函数中判断并添加os
            cb && cb(hybridJs.os);
        }
    };

    hybridJs.extendOS = extendOS;

    if (typeof weex === 'undefined') {
        window && window.navigator.userAgent && detect.call(hybridJs, window.navigator.userAgent);
    } else {
        // 根据是否存在weex对象判断weex环境
        hybridJs.os.weex = true;
        // weex页面添加os变量
        weexos(hybridJs);
    }
}

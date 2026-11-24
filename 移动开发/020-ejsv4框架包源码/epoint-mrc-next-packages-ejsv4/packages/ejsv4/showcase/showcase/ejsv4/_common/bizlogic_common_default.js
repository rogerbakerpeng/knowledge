/**
 * 作者: 戴荔春
 * 创建时间: 2017/05/24
 * 版本: [3.0, 2017/05/24 ]
 * 版权: 移动研发部
 * 描述: 页面通用模板
 */
(function(exports) {
    "use strict";
    /**
     * API环境对应的storage的key值
     */
    var API_EVIRONMENT = 'EJS_3X_API_EVIRONMENT';

    var defaultLitemplate = Util.Clazz.extend({
        /**
         * @description 初始化业务模板时,对象创建时会默认执行
         */
        init: function(options) {

            var self = this;
            options = options || {};
            self.options = options;
            var title = options.title || '';
            self.appDom = document.getElementById(options.contentDom || 'ejs-app');
            // ejs系统
            if (!Util.os.ejs) {
                self.generateHeader(title);
            } else {
                if (title) {
                    ejs.navigator && ejs.navigator.setTitle(title);
                }
            }
            // 初始化默认业务
            self.initBiz();
        },
        /**
         * @description 基于title生成头部
         * @param {Strings} title
         */
        generateHeader: function(title) {
            var self = this;
            var html = '';
            var leftBackClass = !self.options.isIndex ? 'mui-icon-left-nav' : '';
            html += '<header id="header" class="mui-bar mui-bar-nav ">' +
                '<a class="mui-action-back mui-icon ' + leftBackClass + '  mui-pull-left">' +
                '</a>' +
                '<h1 id="title" class="mui-title">' +
                title +
                '</h1>' +
                '<a id="info" class="mui-icon mui-icon-more icon-white mui-pull-right">' +
                '</a>' +
                '</header>';

            var headerDom = document.createElement("div");
            headerDom.innerHTML = html;
            document.body.insertBefore(headerDom, self.appDom);
            self.appDom.style.marginTop = '44px';

        },
        /**
         * @description 初始化
         */
        initBiz: function() {
            var self = this;
            var selectEvn = function() {
                ejs.ui.actionSheet({
                    items: ['default', 'h5', 'dd', 'ejs', 'ejs、dd', 'ejs、h5', 'ejs、dd、h5'],
                    success: function(result) {
                        // 当前选中的环境
                        var currEv = result.content;
                        var items = {};
                        
                        items[API_EVIRONMENT] = currEv;
                        ejs.storage.setItem(items);
                        self.refresh(currEv);
                    }
                });
            };
            // info监听，默认的info监听
            mui('#header').on('tap', '#info', function() {
                selectEvn();
            });
            if (Util.os.ejs) {
                // ejs下设置右侧按钮
                ejs.navigator.setRightBtn({
                    text: '设置',
                    imageUrl: '',
                    success: function(result) {
                        selectEvn();
                    }
                });
            }
            self.refresh('default');
            // 先获取默认的环境，然后刷新
            ejs.storage.getItem({
                key: API_EVIRONMENT,
                success: function(result) {
                    self.refresh(result[API_EVIRONMENT]);
                }
            });
        },
        /**
         * @description 刷新整个页面，因为对应的API环境改变了
         * 需要被ejs 页面重新
         * @param {String} evn
         */
        refresh: function(evn) {

        }
    });

    window.Util = window.Util || {};
    Util.litemplate = Util.litemplate || {};
    Util.litemplate.defaultLitemplate = defaultLitemplate;
})({});

var HandleControls = function (dom) {
  HandleControls.super.constructor.call(this, dom);
};

MControl.extend(HandleControls, MControl.control, {
  type: "handlecontrols",
  _init: function () {
    var self = this;
    self.action = self.getAttribute("action");
    self.workflowPageUrl = self.getAttribute("workflowpageurl") || "";
    self.submitBefore = self.getAttribute("submitbefore");
    self.hide = self.getAttribute("hide") === 'true' || false;
    self.submitName = self.getAttribute("submitName") || 'submit';
    self.notWorkflow = parseInt(self.getAttribute("notWorkflow") || "0");
    self.notOpinion = parseInt(self.getAttribute("notOpinion") || "0");
    self.maxBtnNum = parseInt(self.getAttribute("maxBtnNum") || "1");
    self.completeCallBack = self.getAttribute("completeCallBack") || null;
    self.pviGuid = "";
    self.operationGuid = "";
    self.transitionGuid = "";
    self.workitemGuid = "";
    self.afterbtn = null;
    self.btns = [];

    var messageitemguid = Util.getExtraDataByKey("MessageItemGuid") || "";

    self.insertHTML();
    // 插入流程锁定hash，用于触发popstate事件
    //self.insertHistory("lockhash", "#lockhash");
//    epm.addHookBackEvent({
//      id: this.id,
//      event: "backEvent",
//    });

    // ios页面禁止页面回弹
//    ejs.device.setBounce({
//      isEnable: 0,
//      success: function (result) {},
//      error: function (error) {},
//    });
  },
  // 拦截返回
  backEvent: function (event) {
    var self = this;
    return new Promise(function(resolve, reject){
      if (self.isShowWorkflow) {
        // 关闭审批页面
        self.triggerWorkflow(false);
        reject('关闭了流程处理页面');
      }else if(!self.lockStatus){
        // 如果退出表单页，此时流程仍然锁定的话，自动解锁
        self.beforeUnlock(function(){
          resolve();
        });
        if(epm.isMock){
          resolve();
        }
        self.lockStatus = false;
      }else{
        resolve();
      }
    });
  },
  // 根据接口获取工作流按钮
  setData: function (data) {
    data = typeof data === "string" ? JSON.parse(data) : data;
    data.btn=data.btn.filter((currentValue) => {
    	return currentValue.operationType !== "0";
    });
    this.data =data;
    this.lockStatus = false; // 流程是否被锁定，锁定则无法点击右上角
    this.workitemGuid =
      data.workitemguid || Util.getExtraDataByKey("WorkItemGuid");
    this.pviGuid =
      data.pviguid || Util.getExtraDataByKey("ProcessVersionInstanceGuid");
    this.messageitemguid = Util.getExtraDataByKey("MessageItemGuid") || "";
    var canhandle = Util.getExtraDataByKey("canhandle") || "1";
    var self = this;

    this.acthtml = data.acthtml || "提交";

    if (data.lockdttm && this.el.getAttribute("lockdttm") !== "1") {
      this.el.setAttribute("lockdttm", "1");
      Util.ejs.ui.confirm({
        title: "当前流程已锁定",
        message: data.lockdttm,
        buttonLabels: ["取消", "解除锁定"],
        cancelable: 0,
        h5UI: false,
        success: function (result) {
          if (result.which == 1) {
            // 解除锁定
            self.lockStatus = false;
            self.beforeUnlock();
          } else {
            self.lockStatus = true;
            self.setControlsDisabled();
          }
        },
        error: function (err) {},
      });
    } else {
      if (data.btn && data.btn.length > 0 && parseInt(canhandle) === 1) {
        // 工作流，此步骤是否可处理
        this.canhandle = 1;
        // 底部按钮整合
        this.btns = data.btn || [];
        this.workflowBtns = this.btns.slice(0);
        if (this.workflowBtns.length > 2) {
          // 多于一个的流程操作按钮都放在更多里面
          this.btns = this.workflowBtns.slice(0, this.maxBtnNum);
          this.moreBtn = this.workflowBtns.slice(this.maxBtnNum);
        }
        self.bottomBtn();
      }

      if (data && data.message) {
        Util.ejs.ui.toast(data.message);
        return;
      }
    }
  },
  // 混入其他
  mixin: function (options) {
    if (options.btns && options.btns.length > 0) {
      this.btns = this.btns || [];
      this.workflowBtns = this.workflowBtns || [];
      this.dealOptionsBtns(options);
      this.bottomBtn();
    }
    if (options.tabs && options.tabs.length > 0) {
      this.tabs = this.tabs || [];
      this.tabs = this.tabs.concat(options.tabs);
      this.tabwrapper.classList.remove("hidden");
      this.refreshBodyH();
      this.renderTabs();
    }
  },
  // 新增需求，普通按钮想要动态设置
  refresh: function (isShowWorkflowBtns, options) {
    this.btns = [];
    this.moreBtn = [];
    this.workflowBtns = this.workflowBtns || [];
    if (options && options.btns && options.btns.length > 0) {
      // 若传了options，则刷新底部普通按钮
      if (isShowWorkflowBtns && this.workflowBtns.length > 1) {
        // 多于一个的流程操作按钮都放在更多里面
        this.btns = this.workflowBtns.slice(0, 1);
        this.moreBtn = this.workflowBtns.slice(1);
      }
      this.dealOptionsBtns(options);
    } else if (isShowWorkflowBtns) {
      // 展示流程操作按钮
      if (this.workflowBtns.length > 1) {
        // 多于一个的流程操作按钮都放在更多里面
        this.btns = this.workflowBtns.slice(0, 1);
        this.moreBtn = this.workflowBtns.slice(1);
      }
      if (this.mixinBtns && this.mixinBtns.length > 0) {
        this.btns = this.mixinBtns.concat(this.btns);
      }
    } else {
      // 隐藏流程操作按钮
      if (this.mixinBtns && this.mixinBtns.length > 0) {
        this.btns = this.mixinBtns.concat(this.btns);
      }
    }

    this.bottomBtn();

    if (options && options.tabs && options.tabs.length > 0) {
      this.tabs = options.tabs;
      this.tabwrapper.classList.remove("hidden");
      this.refreshBodyH();
      this.renderTabs();
    }
  },
  // 处理传参的btns
  dealOptionsBtns: function (options) {
    var hasicon = [];
    var noicon = [];

    options.btns.forEach(function (e, i) {
      e.ismixin = "1";
      e.isactive = e.isactive || 0;
      e.icon = e.iconurl;
      e.inactivetext = e.inactivetext || e.text;
      if (parseInt(e.isactive) === 1) {
        e.icon = e.activeiconurl;
        e.text = e.activetext;
      }

      if (e.iconurl) {
        hasicon.push(e);
      } else {
        noicon.push(e);
      }
    });
    this.mixinBtns = hasicon.concat(noicon);
    this.btns = hasicon.concat(noicon, this.btns);
  },
  // 设置通用样式
  commonClassName: function () {
    var style = document.createElement("style");
    style.textContent = `
        .handlecontrols-host{
            position: fixed;
            bottom: 0;
            width: 100vw;
            z-index: 999;
            bottom: constant(safe-area-inset-bottom);
            bottom: env(safe-area-inset-bottom);
        }
        #bottombtns{
          position: relative;
          z-index: 1;
        }
        #tabwrapper{
          position: relative;
          border-top: 1px solid #fff;
          border-radius: 10px 10px 0 0;
          background-color: #fff;
          box-shadow: 0 -1px 10px -3px #dde0e4;
          z-index: -1;
        }
        #tabwrapper .drawerbar{
          margin: 6px auto 3px auto;
          height: 4px;
          width: 44px;
          border-radius: 2px;
          background-color: #c0c0c1;
        }
        #tabcontainer .van-tab{
          font-size: 15px;
        }
        #tabcontainer .van-hairline--top-bottom::after{
          border-top: none;
          border-color: #ccd0d5;
        }
        #tabcontainer .van-tabs__line{
          transform: skewX(45deg);
        }
        #tabcontainer .van-info{
          padding: 1px 4px;
          top: -7px;
          right: -10px;
          min-width: 18px;
          background-color: #2e6be5;
          border-radius: 4px 4px 4px 0;
        }
        #tabcontainer .van-info:after{
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 0;
          border-color: #2e6be5 transparent transparent #2e6be5;
          border-right-width: 1px;
          border-top-width: 1px;
          border-style: solid;
        }
        #tabcontainer .van-tabs--line .van-tabs__wrap{
          height: 50px;
        }
        #btnsWrapper{
          display: flex;
          justify-content: space-between;
          padding: 8px 0 8px 20px;
          box-sizing: border-box;
          height: 63px;
          text-align: center;
          border-top: 1px solid #dde0e4;
          background-color: #fff;
        }
        .em-normal-btn{
          margin-right: 24px;
          max-width: 60px;
          font-size: 10px;
        }
        .em-btn-icon{
          margin: 0 auto;
          width: 28px;
          height: 28px;
        }
        .em-btn-text{
          display: inline-block;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .em-normal-btn:last-child,
        .em-normal-btn.blue-btn{
          display: flex;
          align-items: center;
          padding: 0 5px;
          margin: auto 20px auto 0;
          flex: auto;
          max-width: none;
          min-width: 22%;
          height: 40px;
          font-size: 17px;
          color: #fff;
          background-color: #2e6be5;
          border-radius: 20px;
        }
        .em-normal-btn:last-child .em-btn-icon{
          display: none;
        }
        #popover{
          position: absolute;
          bottom: 76px;
          left: 21px;
          max-width: 112.5px;
          font-size: 14px;
          text-align: center;
          border-radius: 0;
          box-shadow: none;
        }
        #popover ul{
          border-radius: 2px 2px 2px 0;
          background-color: #fff;
        }
        #popover .mui-table-view-cell:after{
          right: 15px;
          background-color: #dde0e4;
        }
        #popover .popover-arrow{
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0;
          height: 0;
          border-color: #fff transparent transparent #fff;
          border-right-width: 6px;
          border-top-width: 6px;
          border-style: solid;
        }
        .hidden{
          display: none;
        }
        .popover-mask{
          position: fixed;
          left: 0;
          top: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, .6);
          z-index: -1;
        }
        #workflow{
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100vw;
          height: 0;
          transition: height .5s;
          z-index: 1;
        }
        #workflow.popworkflow{
          height: 100%;
          height: calc(100% - constant(safe-area-inset-bottom));
          height: calc(100% - env(safe-area-inset-bottom));
        }
        `;

    return style;
  },
  // 插入主结构
  insertHTML: function () {
    // 创建影子DOM
    var shadowEL = document.createElement("div");
    shadowEL.classList.add("handlecontrols-host");
    document.body.appendChild(shadowEL);
    // 添加按钮组件样式
    var style = this.commonClassName();
    shadowEL.appendChild(style);

    var wrapper = document.createElement("div");
    wrapper.id = "bottombtns";

    wrapper.innerHTML = `<div id="tabwrapper" class="hidden">
    <div class="drawerbar"></div>
    </div>
    <div id="btnsWrapper" class="hidden"></div>
    <div class="popover-mask hidden"></div>`;
    shadowEL.appendChild(wrapper);

    // this.shadowRoot = shadowEL.shadowRoot;
    this.shadowRoot = shadowEL;

    this.btnswrapper = this.shadowRoot.querySelector("#btnsWrapper");
    this.tabwrapper = this.shadowRoot.querySelector("#tabwrapper");
    window.shadowRoot = this.shadowRoot;

    if(this.hide){
      $(this.shadowRoot).hide();
    }
  },
  show: function () {
    $(this.shadowRoot).show();
  },
  hide: function () {
    $(this.shadowRoot).hide();
  },
  // 渲染Tabs
  renderTabs: function () {
    var _self = this;
    var _createTabs = function () {
      var vnode = new Vue({
        data: function () {
          return {
            activeIndex: 0,
            tabs: _self.tabs,
            conHeight: "0",
          };
        },
        render: function (h) {
          var self = this;

          return h(
            "div",
            {
              attrs: { id: "tabcontainer" },
            },
            [
              h(
                vant.Tabs,
                {
                  attrs: {
                    id: "tabs",
                  },
                  props: {
                    value: self.activeIndex,
                    color: "#2e6be5",
                    lineWidth: "28px",
                    titleActiveColor: "#000",
                    titleInactiveColor: "#8a8f99",
                    swipeThreshold: "4",
                    border: true,
                  },
                },
                [
                  self.tabs.map(function (ele, index) {
                    return h(
                      vant.Tab,
                      {
                        props: {
                          title: ele.tabname,
                          name: index,
                          badge: parseInt(ele.isshownum) ? ele.num : "",
                        },
                        style: {
                          height: self.conHeight,
                        },
                        on: {
                          click: self.clickTab,
                        },
                      },
                      [
                        h("iframe", {
                          attrs: {
                            src: ele.taburl,
                            width: "100%",
                            height: "100%",
                            frameborder: "0",
                          },
                        }),
                      ]
                    );
                  }),
                ]
              ),
            ]
          );
        },
        methods: {
          clickTab: function (name, title) {
            this.activeIndex = name;
          },
        },
      }).$mount();

      _self.tabwrapper.appendChild(vnode.$el);
      return vnode;
    };

    if (!_self.shadowRoot.querySelector("#tabcontainer")) {
      Vue.prototype.$tabs = _createTabs();
      _self.dragEvent();
    } else {
      Vue.prototype.$tabs.activeIndex = 0;
      Vue.prototype.$tabs.tabs = _self.tabs;
    }
  },
  // 点击弹出tab页
  dragEvent: function () {
    var self = this;
    // 需要判断手机是否iphone全面屏
    var isNewIphone = window && ejs.os.ios && window.screen.height >= 812 && window.devicePixelRatio >= 2;
    var move = function (ev) {
      ev.preventDefault();
      self.curY = ev.touches[0].pageY;
      Vue.prototype.$tabs.conHeight =
        "calc(100vh - 63px - 64px - " + self.curY + "px)";
    };
    var up = function (ev) {
      var total = document.documentElement.clientHeight;
      if (self.curY <= 100) {
        if(isNewIphone){
          Vue.prototype.$tabs.conHeight = "calc(100vh - 63px - 64px - 35px)";
        }else{
          Vue.prototype.$tabs.conHeight = "calc(100vh - 63px - 64px)";
        }
      } else if (self.curY >= total - 127 - 100) {
        Vue.prototype.$tabs.conHeight = "0";
      }
      // 鼠标抬起，将move和up的方法绑定的方法移除
      document.body.removeEventListener("touchmove", move, { passive: false });
      document.body.ontouchend = null;
    };
    var down = function (ev) {
      document.body.addEventListener("touchmove", move, { passive: false });
      document.body.ontouchend = up.bind(this);
    };
    self.shadowRoot.querySelector(".drawerbar").ontouchstart = down;
    self.shadowRoot.querySelector(".van-tabs__nav").ontouchstart = down;
    // self.shadowRoot.querySelector(".drawerbar").onclick = function (e) {
    //   if (Vue.prototype.$tabs.conHeight === "0") {
    //     Vue.prototype.$tabs.conHeight = "calc(100vh - 63px - 64px)";
    //   } else {
    //     Vue.prototype.$tabs.conHeight = "0";
    //   }
    // };
  },
  // 按钮模板
  btnsTpl: `<div class="em-normal-btn {{^icon}}blue-btn{{/icon}} {{class}}"
  operationguid="{{operationguid}}"
  transitionguid="{{transitionguid}}"
  operationtype="{{operationtype}}"
  beforeact="{{beforeact}}"
  afteract="{{afteract}}"
  isrequireopinion="{{isrequireopinion}}"
  ismixin="{{ismixin}}"
  order="{{order}}"
  activeiconurl="{{activeiconurl}}"
  activetext="{{activetext}}"
  inactivetext="{{inactivetext}}"
  iconurl="{{iconurl}}"
  isactive="{{isactive}}"
  >
  {{#icon}}<div class="em-btn-icon" style="background: url({{icon}}) center center no-repeat;background-size: 28px 28px;"></div>{{/icon}}
  <span class="em-btn-text">{{text}}</span>
  </div>`,
  moreBtnsTmp: `<li class="mui-table-view-cell {{class}}"
  operationguid="{{operationguid}}"
  transitionguid="{{transitionguid}}"
  operationtype="{{operationtype}}"
  beforeact="{{beforeact}}"
  afteract="{{afteract}}"
  isrequireopinion="{{isrequireopinion}}"
  ismixin="{{ismixin}}"
  order="{{order}}"
  activeiconurl="{{activeiconurl}}"
  activetext="{{activetext}}"
  inactivetext="{{inactivetext}}"
  iconurl="{{iconurl}}"
  isactive="{{isactive}}"
  >
  {{text}}
  </li>`,
  // 设置底部按钮
  bottomBtn: function () {
    var self = this;

    self.btnswrapper.innerHTML = "";

    self.compBtns();
    // 渲染送下一步按钮
    var jsonstr = self.btns.slice(0);
    var template = self.btnsTpl; //HTML 模板
    var output = "";
    if (self.moreBtn && self.moreBtn.length > 0) {
      // 如果有更多按钮，渲染更多按钮
      jsonstr.unshift({
        icon:
          SrcBoot.getProjectBasePath() +
          Config.bizRootPath +
          "showcase/comdto/images/icon_morebtn.png",
        text: "更多",
        class: "moreBtn",
      });
      self.setPopover();
    }

    if (jsonstr.length > 0) {
      mui.each(jsonstr, function (key, value) {
        output += Mustache.render(template, value);
      });

      self.btnswrapper.innerHTML = output;
      self.btnswrapper.classList.remove("hidden");

      // 添加按钮点击事件
      self.btnEvent();
    } else {
      self.btnswrapper.classList.add("hidden");
    }
    self.refreshBodyH();
  },
  // 处理按钮
  compBtns: function () {
    var self = this;
    self.moreBtn = self.moreBtn || [];

    if (self.btns.length >= 4) {
      self.moreBtn = self.moreBtn.concat(
        self.btns.splice(0, self.btns.length - 3)
      );
    }

    self.btns.forEach(function (e, i) {
      // 给每个按钮加一个索引，方便回调
      e.order = i;
    });

    self.moreBtn.forEach(function (e, i) {
      // 给每个按钮加一个索引，方便回调
      e.order = i;
    });
  },
  // 设置更多按钮
  setPopover: function () {
    var self = this;
    var bottomBtns = this.shadowRoot.querySelector("#bottombtns");

    if (!bottomBtns.querySelector("#popover")) {
      var popover = document.createElement("div");
      popover.id = "popover";
      popover.classList.add("mui-popover");
      popover.innerHTML =
        "<ul class='mui-table-view'></ul><span class='popover-arrow'></span>";
      bottomBtns.appendChild(popover);

      // 按钮增加点击事件
      mui(bottomBtns).off("click", "li");
      mui(bottomBtns).on("click", "li", function () {
        self.diffBtnEvent(this, "moreBtn");
        mui("#popover").popover("hide");
        bottomBtns.querySelector(".popover-mask").classList.add("hidden");
      });

      // 点击遮罩关闭popover
      mui(bottomBtns).off("click", ".popover-mask");
      mui(bottomBtns).on("click", ".popover-mask", function () {
        mui("#popover").popover("hide");
        this.classList.add("hidden");
      });
    }

    var moreBtnsTmp = this.moreBtnsTmp;
    var output = "";
    mui.each(this.moreBtn, function (key, value) {
      output += Mustache.render(moreBtnsTmp, value);
    });
    bottomBtns.querySelector("#popover ul").innerHTML = output;
  },
  // 底部按钮点击事件
  btnEvent: function () {
    var self = this;
    // 按钮增加点击事件
    mui(self.btnswrapper).off("click", ".em-normal-btn");
    mui(self.btnswrapper).on("click", ".em-normal-btn", function () {
      //点击按钮时，失焦所有input，防止安卓软键盘弹起
      var inputs = document.querySelectorAll("input");

      if (inputs) {
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].blur();
        }
      }

      if (!this.classList.contains("moreBtn")) {
        self.diffBtnEvent(this, "btns");
      } else {
        mui("#popover").popover("toggle");
        var popoverMask = self.shadowRoot.querySelector(".popover-mask");
        if (popoverMask.classList.contains("hidden")) {
          popoverMask.classList.remove("hidden");
        } else {
          popoverMask.classList.add("hidden");
        }
      }
    });
  },
  diffBtnEvent: function (dom, type) {
    var ismixin = dom.getAttribute("ismixin");

    if (ismixin === "1") {
      // 页面按钮，直接回调
      var order = parseInt(dom.getAttribute("order"));
      this.bindSwitchFunc(dom);
      this[type][order].click && this[type][order].click(dom);
    } else {
      // 工作流按钮
      this.normalBtnEvent(dom);
    }
  },
  bindSwitchFunc: function (dom) {
    if (!dom.switchStatus) {
      // 添加切换状态的方法
      dom.switchStatus = function (flag) {
        var activeiconurl = this.getAttribute("activeiconurl") || "";
        var activetext = this.getAttribute("activetext") || "";
        var inactivetext = this.getAttribute("inactivetext") || "";
        var iconurl = this.getAttribute("iconurl") || "";

        if (flag) {
          this.setAttribute("isactive", "1");
          if (this.tagName === "DIV") {
            if (activeiconurl) {
              this.querySelector(".em-btn-icon").style.background =
                "url(" + activeiconurl + ") center center no-repeat";
              this.querySelector(".em-btn-icon").style.backgroundSize =
                "28px 28px";
            }
            if (activetext) {
              this.querySelector(".em-btn-text").innerHTML = activetext;
            }
          } else {
            if (activetext) {
              this.innerHTML = activetext;
            }
          }
        } else {
          this.setAttribute("isactive", "0");
          if (this.tagName === "DIV") {
            if (iconurl) {
              this.querySelector(".em-btn-icon").style.background =
                "url(" + iconurl + ") center center no-repeat";
              this.querySelector(".em-btn-icon").style.backgroundSize =
                "28px 28px";
            }
            if (inactivetext) {
              this.querySelector(".em-btn-text").innerHTML = inactivetext;
            }
          } else {
            if (inactivetext) {
              this.innerHTML = inactivetext;
            }
          }
        }
      };
    }
  },
  // 点击送下一步按钮
  normalBtnEvent: function (dom, domData) {
    var self = this;
    var operationguid = "";
    var transitionguid = "";
    var operationtype = "";
    var beforeact = "";
    var afteract = "";
    var isrequireopinion = "";

    if (dom) {
      operationguid = dom.getAttribute("operationguid");
      transitionguid = dom.getAttribute("transitionguid");
      operationtype = dom.getAttribute("operationtype");
      beforeact = dom.getAttribute("beforeact");
      afteract = dom.getAttribute("afteract");
      isrequireopinion = dom.getAttribute("isrequireopinion");
    } else if (domData) {
      operationguid = domData.operationguid;
      transitionguid = domData.transitionguid;
      operationtype = domData.operationtype;
      beforeact = domData.beforeact;
      afteract = domData.afteract;
      isrequireopinion = domData.isrequireopinion;
    }
    // 此处pc后端接收有大小写区分，所以此处改动下
    self.btn = {
      OperationGuid: operationguid,
      TransitionGuid: transitionguid,
      OperationType: operationtype,
      beforeAct: beforeact,
      afterAct: afteract,
      isrequireopinion: isrequireopinion,
    };

    if (epm.isMock) {
      var pageUrl =
        Util.getProjectBasePath() +
        self.workflowPageUrl.substring(self.workflowPageUrl.indexOf("frame"));
      self.initWorkflow(pageUrl);
      self.triggerWorkflow(true, pageUrl);
    } else {
      var submitBefore = window[self.submitBefore];
      if (submitBefore && typeof submitBefore === "function") {
        submitBefore(function () {
          epointm.execute(self.submitName, "", function () {
            var formData = arguments[2];
            self.submitFormData = JSON.parse(formData.commonDto);
            self.AjaxOperation(
              operationguid,
              transitionguid,
              operationtype,
              beforeact,
              afteract,
              isrequireopinionff
            );
          });
        }, self.btn);
      } else {
    	  ztbphone.openActionsheetHandlePage('op' + operationtype, self.btn);	
        /*epointm.execute(self.submitName, "", function () {
          var formData = arguments[2];
          self.submitFormData = JSON.parse(formData.commonDto);
          self.AjaxOperation(
            operationguid,
            transitionguid,
            operationtype,
            beforeact,
            afteract,
            isrequireopinion
          );
        });*/
      }
    }
  },
  initWorkflow: function (url) {
    if (!this.shadowRoot.querySelector("#workflow") && url) {
      var workflowIframe = document.createElement("iframe");
      workflowIframe.id = "workflow";
      workflowIframe.setAttribute("frameborder", "0");
      // var workflowIframe = document.createElement("div");
      // workflowIframe.id = "workflow";
      this.shadowRoot.appendChild(workflowIframe);
      this.workflowIframe = this.shadowRoot.querySelector("#workflow");

      // this.loadPageModule({
      //   templ: url,
      //   css: [
      //     "http://192.168.210.29:8086/dztportalrest/frame/fmui/showcase/comdto/css/workflow.css",
      //   ],
      //   js: [
      //     "http://192.168.210.29:8086/dztportalrest/frame/fmui/showcase/comdto/js/workflow.js",
      //   ],
      // });
    }
  },
  // 触发审批页面显隐
  triggerWorkflow: function (flag, url) {
    var self = this;
    if (flag) {
      this.isShowWorkflow = true;
      $(this.workflowIframe).replaceWith(
        '<iframe id="workflow" frameborder="0" class="popworkflow" src="' +
          url +
          '"></iframe>'
      );
      this.workflowIframe = this.shadowRoot.querySelector("#workflow");
      // 触发popstate事件需要手动插入历史记录
      this.insertHistory("workflow", "#workflow");
      setTimeout(function () {
        self.workflowIframe.style.transition = "none";
      }, 1000);
    } else {
      this.isShowWorkflow = false;
      this.workflowIframe.style.transition = "height .5s";
      this.workflowIframe &&
        this.workflowIframe.classList.remove("popworkflow");
    }
  },
  // 触发工作流按钮点击(默认触发右数第一个按钮)
  triggerNextStep: function () {
    console.log(this.btnswrapper.lastElementChild.innerText);
    this.btnswrapper.lastElementChild.click();
  },
  // 执行按钮配置的操作前按钮事件
  AjaxOperation: function (
    OperationGuid,
    TransitionGuid,
    OperationType,
    btnbefore,
    btnafter,
    isrequireopinion
  ) {
    this.operationGuid = OperationGuid;
    this.transitionGuid = TransitionGuid;
    this.afterbtn = btnafter;

    var batchHandleGuid = null;

    try {
      batchHandleGuid = document.getElementById("hidIsBatchHandle").value;
    } catch (error) {}

    if (btnbefore) {
      // 执行按钮配置的操作前按钮事件
      try {
        var btnSubmit = null;

        if (batchHandleGuid) {
          btnSubmit = this.getButton(batchHandleGuid);
        } else {
          btnSubmit = getButton(btnbefore);
        }

        if (btnSubmit) {
          btnSubmit.click();
        }
      } catch (error) {
        this.HandleNextStep(
          OperationGuid,
          TransitionGuid,
          OperationType,
          btnbefore,
          btnafter
        );
      }
    } else {
      this.HandleNextStep(
        OperationGuid,
        TransitionGuid,
        OperationType,
        btnbefore,
        btnafter
      );
    }
  },
  // 根据按钮类型处理操作
  HandleNextStep: function (
    OperationGuid,
    TransitionGuid,
    OperationType,
    btnbefore,
    btnafter
  ) {
    var batchHandleGuid = null;
    var self = this;

    try {
      batchHandleGuid = document.getElementById("hidIsBatchHandle").value;
    } catch (error) {}

    if (OperationType === "Save" || OperationType == 60) {
      var btnId = "btnSaveFrom";
      // 点击保存按钮不隐藏操作按钮，仍可留在此页面进行其他操作
      this.ShowTdOperate(true);

      if (batchHandleGuid != null && batchHandleGuid != "") {
        btnId = "btnSaveBatchHandle";
      }
      try {
        var saveBtn = this.getButton(btnId);
        if (saveBtn != null) {
          saveBtn.click();
        } else {
          this.HeaderSubmit();
        }
      } catch (er) {
        this.HeaderSubmit();
      }
    } else if (OperationType == "Custom" || OperationType == 1) {
      // 执行按钮配置的操作后事件
      Util.safeEval(btnafter);
    } else if (
      OperationType == "Pass" ||
      OperationType == "Pass_Transition" ||
      OperationType == 10 ||
      OperationType == 15
    ) {
      // 先执行个性化的业务逻辑
      var btnId = "btnSubmit";
      if (batchHandleGuid) {
        btnId = "btnSubmitBatchHandle";
      }

      try {
        var btnSubmit = this.getButton(btnId);
        if (btnSubmit != null) {
          btnSubmit.click();
        } else {
          this.HeaderSubmit();
        }
      } catch (err) {
        this.HeaderSubmit();
      }
    } else if (OperationType == "DrawBack" || OperationType == 50) {
      Util.ejs.ui.confirm({
        message: "确认收回已发待办事项？",
        buttonLabels: ["取消", "确定"],
        success: function (result) {
          // 点击确定
          if (result.which == 1) {
            self.HeaderSubmit();
          } else {
            self.ShowTdOperate(true);
          }
        },
      });
    } else {
      this.HeaderSubmit();
    }
  },
  // 请求处理页面URL
  HeaderSubmit: function () {
    var self = this;

    this.transitionGuid = this.transitionGuid || "";

    var params = {
      transitionguid: this.transitionGuid,
      operationguid: this.operationGuid,
      pviguid: this.pviGuid,
      workitemguid: this.workitemGuid,
    };

    epointm.execute(
      "getPageUrlOfOperate",
      "@none",
      epm.encodeUtf8(epm.encodeJson(params)),
      self.AjaxOperationHd.bind(self)
    );
  },
  // 通用的ajax方法返回结果处理
  AjaxOperationHd: function (response) {
    var self = this;

    if (response) {
      var response = epm.decodeJson(response);
      if (response.isdefoperation) {
        var operationname = "送下一步";

        if (response.operationname) {
          operationname = response.operationname;
        }

        // 弹出带签署意见框的确认框
        var prompt = function () {
          ejs.ui.prompt({
            title: "执行" + operationname + "操作",
            hint: "这里可以签署意见",
            buttonLabels: ["取消", "确定"],
            cancelable: 0,
            success: function (result) {
              if (result.which == 1) {
                if (self.btn.isrequireopinion === "true" && !result.content) {
                  setTimeout(function () {
                    ejs.ui.alert({
                      title: "提示",
                      message: "请签署意见！",
                      buttonName: "确定",
                      cancelable: 0,
                      h5UI: false, // 是否强制使用H5-UI效果，默认false
                      success: function (result) {
                        // 点击 alert的按钮后回调
                        setTimeout(function () {
                          prompt();
                        }, 100);
                      },
                      error: function (err) {},
                    });
                  }, 100);
                  return;
                } else if (result.content) {
                  // 如果有意见
                  response.opinion = result.content;
                }
                epointm.execute(
                  "getoperate",
                  "@none",
                  epm.encodeUtf8(epm.encodeJson(response)),
                  self.AjaxOperationHd.bind(self)
                );
              }
            },
          });
        };

        // 弹出确认框直接送下一步
        var confirm = function () {
          Util.ejs.ui.confirm({
            title: "执行" + operationname + "操作",
            message: "是否继续？",
            buttonLabels: ["取消", "确定"],
            cancelable: 0,
            h5UI: false, // 是否强制使用H5-UI效果，默认false
            success: function (result) {
              if (result.which == 1) {
                epointm.execute(
                  "getoperate",
                  "@none",
                  epm.encodeUtf8(epm.encodeJson(response)),
                  self.AjaxOperationHd.bind(self)
                );
              }
            },
            error: function (err) {},
          });
        };

        if (self.notOpinion) {
          confirm();
        } else {
          prompt();
        }
      } else if (response.url) {
        // 返回url需要打开操作处理页面
        // url: frame/pages/epointworkflow/client/commonoperationhandlepassopinion?workItemGuid=e45d1a78-de8e-4c41-a448-679463efd049&operationGuid=7327f758-4f81-4c34-bb20-919bf795e653&processVersionInstanceGuid=a85eb358-03c7-4cce-957a-6173bdb857fd&stepguid=e01ae006-76bb-448a-855f-a31a874666e8&transitionGuid=
        var url = "";
        var pageUrl = "";

        if (response.mobileurl) {
          url = response.mobileurl;
          pageUrl =
            Util.getProjectBasePath() +
            url +
            "&operationtype=" +
            self.btn.operationtype +
            "&MessageItemGuid=" +
            self.messageitemguid +
            "&ID=" +
            self.id;
        } else {
          url = response.url;
          pageUrl =
            Util.getProjectBasePath() +
            this.workflowPageUrl.substring(
              this.workflowPageUrl.indexOf("frame")
            );
          pageUrl =
            pageUrl +
            url.substring(url.indexOf("?")) +
            "&operationtype=" +
            self.btn.operationtype +
            "&MessageItemGuid=" +
            self.messageitemguid +
            "&ID=" +
            self.id;
        }

        self.initWorkflow(pageUrl);

        self.triggerWorkflow(true, pageUrl);
      } else if (
        response.operationtype &&
        (response.operationtype == 25 ||
          response.operationtype == "SendToSign") &&
        (!response.message || response.message == "Success")
      ) {
        this.AfterClick();
        this.ShowTdOperate(true);
      } else if (!response.message || response.message == "Success") {
        this.AfterClick();

        ejs.ui.alert({
          title: "流程处理",
          cancelable: 0,
          message:
            response.operationtype &&
            (parseInt(response.operationtype) === 60 ||
              response.operationtype === "Save")
              ? "保存成功！"
              : "流程处理完成！",
          success: function (result) {
            ejs.ui.closeWaiting();
            var messageitemguid =
              Util.getExtraDataByKey("MessageItemGuid") || "";

            self.CloseMe({
              messageitemguid: messageitemguid,
            });
          },
        });
      } else if (response.message) {
        Util.ejs.ui.alert(response.message);
        this.ShowTdOperate(true);
      }
    } else {
      this.ShowTdOperate(true);
    }
  },
  getDataFromWorkflow: function (result) {
    var self = this;
    setTimeout(function () {
      window.history.go(-1);
      if (result && result.resultData.message) {
        self.ShowTdOperate(false);
        self.DefaultOperateHd(result.resultData.message);
      } else {
        self.ShowTdOperate(true);
      }
    }, 10);
  },
  DefaultOperateHd: function (json) {
    var self = this;
    epointm.execute(
      "getoperate",
      "@none",
      epm.encodeUtf8(epm.encodeJson(json)),
      function(res){
        if(self.completeCallBack && window[self.completeCallBack]){
          if(window[self.completeCallBack](self.submitFormData, json)){
            self.AjaxOperationHd(res);
          }
        }else{
          self.AjaxOperationHd(res);
        }
      }
    );
  },
  // 解除锁定
  beforeUnlock: function (cb) {
    var workitemGuid = this.workitemGuid;
    var pviGuid = this.pviGuid;
    var self = this;
    // 点击按钮解锁，其他为关闭窗口解锁
    var tag = "norm";

    if(cb){
      tag = "";
    }

    if (workitemGuid && pviGuid) {
      epointm.execute(
        "workItem_Unlock",
        "@none",
        [pviGuid, workitemGuid, tag],
        function(msg){
          try {
            if (msg && msg == "refresh") {
              epointm.refresh();
            }
            if (msg.message && msg.message == "refresh") {
              epointm.refresh();
            }
            self.el.removeAttribute("lockdttm");
          } catch (err) {}
          cb && cb();
        }
      );
    }
  },
  AfterClick: function () {
    var afterbtn = this.afterbtn;

    if (afterbtn) {
      try {
        var btnSubmit = this.getButton(afterbtn);
        if (btnSubmit != null) {
          btnSubmit.click();
        }
      } catch (err) {}
    }
  },
  // 工作流按钮区域的显隐控制
  ShowTdOperate: function (Is_Show) {
    // TODO: 如果当前流程被锁定或者无权限处理，直接返回
    if (this.lockStatus || this.canhandle != "1") {
      return;
    }

    var opt = {
      btns: this.mixinBtns,
    };
    if (this.workflowBtns.length > 0) {
      if (Is_Show) {
        this.refresh(true, opt);
      } else {
        this.refresh(false, opt);
      }
    }
  },
  // 流程已锁定，控件禁用
  setControlsDisabled: function () {
    var controls = mui('[class*="ep-mui-"]');

    $.each(controls, function (i, e) {
      var tagName = e.tagName;

      switch (tagName) {
        case "INPUT":
        case "TEXTAREA":
          e.disabled = true;
          break;

        case "DIV":
          e.style.cssText = "pointer-events: none;";
          break;
        default:
          break;
      }
    });
  },
  // 关闭页面
  CloseMe: function (data) {
    ejs.page.close({
      resultData: data || {},
    });
  },
  getButton: function (id) {
    return document.querySelector("#" + id);
  },
  insertHistory: function (tit, Url) {
    const state = {
      title: tit,
      url: Url,
    };
    window.history.pushState(state, state.title, state.url);
  },
  getModule: function () {
    return {
      id: this.id,
      type: this.type,
      action: this.action,
    };
  },
  loadPageModule: function (paths) {
    var self = this;
    Util.ajax({
      type: "GET",
      dataType: "html",
      url: paths.templ,
      data: {},
      beforeSend: function () {
        paths.css && self.loadCss(paths.css, self.shadowRoot);
      },
      success: function (html) {
        $(html).appendTo(self.workflowIframe);
        paths.js && Util.loadJs(paths.js);
      },
    });
  },
  loadCss: function (cssPath, shadow) {
    if (cssPath.length > 0) {
      cssPath.forEach(function (ele) {
        var linkElem = document.createElement("link");
        linkElem.setAttribute("rel", "stylesheet");
        linkElem.setAttribute("href", cssPath);
        shadow.appendChild(linkElem);
      });
    }
  },
  refreshBodyH: function () {
    var isShowBtns = !this.btnswrapper.classList.contains("hidden");
    var isShowTabs = !this.tabwrapper.classList.contains("hidden");
    var height = 0;
    if (isShowBtns && isShowTabs) {
      height = 127;
    } else if (!isShowBtns && isShowTabs) {
      height = 64;
    } else if (isShowBtns && !isShowTabs) {
      height = 63;
    }
    document.querySelector(".mui-content").style.height =
    "calc(100vh - " + height + "px)";
    // document.querySelector(".mui-content").style.paddingBottom =
    //   height + "px";
  },
  setShow: function(flag){
    var bottomBtns = this.shadowRoot.querySelector("#bottombtns");
    if (flag) {
      bottomBtns.style.display = "block";
    } else {
      bottomBtns.style.display = "none";
    }
  }
});

MControl.register(HandleControls, "ep-mui-handlecontrols");
MControl.init();

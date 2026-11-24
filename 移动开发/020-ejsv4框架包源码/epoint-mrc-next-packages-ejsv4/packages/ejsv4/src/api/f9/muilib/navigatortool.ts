const parseHtml = (strHtml) => {
    if (!strHtml || typeof strHtml !== 'string') {
        return null;
    }
    // 创一个灵活的div
    const a = document.createElement('div');
    const b = document.createDocumentFragment();

    a.innerHTML = strHtml;

    const i = a.firstChild;

    b.appendChild(i);

    return b;
};
let once = 0;
const commonClassName = (cb) => {
    if (once === 0) {
        once = 1;
        document.querySelector('html').insertAdjacentHTML(
            'beforeend',
            `
        <style>
        .mui-bar-nav~.mui-content {
            padding-top: 0px;
            margin-top: 44px;
        }
        .mui-focusin>.mui-bar-nav,
        .mui-focusin>.mui-bar-header-secondary {
            position: fixed;
        }
        .ejs-tab {
            border: 1px solid #3c80e6;
            border-radius: 20px;
            width: 100px;
        }
        .ejs-tab0 {
            margin-right: -12px;
        }
        .ejs-tab1 {
            margin-left: -12px;
        }
        .ejs-tab-active{
            background: #3c80e6;
                color: #fff;
                z-index: 9;
        }
        .ejs-f9-content #header {
            padding-right: 0px;
        }
        .ejs-f9-content #header .ejs-right-a-0,
        .ejs-f9-content #header .ejs-right-a-1 {
            font-size: 14px;
            line-height: 44px;
            color: #007aff;
            min-width: 44px;
            min-height: 44px;
            background-size: auto 35px;
            background-position: 50%,50%;
            background-repeat: no-repeat;
            z-index: 9;
            position: relative;
            text-align: center;
        }
        .ejs-f9-content #header .ejs-right-a-1 {
            margin-right: 0px;
        }
        </style>`
        );
        const f9Div = document.querySelector('.ejs-f9-content');

        if (!f9Div) {
            console.error('缺少ejs-f9-content样式，请在需要调试ejs的页面body加入class="ejs-f9-content"');

            return;
        }
        document.querySelector('header#header') && document.querySelector('header#header').remove();
        const divNav = `<header id="header" class="mui-bar mui-bar-nav ">
                            <a class="ejs-action-back mui-icon mui-icon-left-nav  mui-pull-left ${Util.os.dd ? 'mui-hidden' : ''}"></a>
                            <span id="title" class="mui-title">
                                <div class="ejs-title">${document.title}</div>
                                <div class="ejs-sub-title"></div>
                            </span>
                            <a id="info" class="mui-pull-right mui-hidden ejs-right-a-0"></a>
                            <a id="info" class="mui-pull-right mui-hidden ejs-right-a-1"></a>
                        </header>`;

        f9Div.insertBefore(parseHtml(divNav), f9Div.childNodes[0]);
        cb && cb();
    } else {
        cb && cb();
    }
};
const hasNavDiv = (cb) => {
    commonClassName(() => {
        mui('.ejs-f9-content').on('click', '.ejs-action-back', () => {
            if (parent && parent.delIframe) {
                parent.delIframe();
            } else {
                window.history.back();
            }
        });
        cb && cb();
    });
};

export function setTitle(opt) {
    hasNavDiv(() => {
        const titleDiv = document.querySelector('.ejs-title') as HTMLElement;
        const subTitleDiv = document.querySelector('.ejs-sub-title') as HTMLElement;
        const muiTitle = document.querySelector('.mui-bar .mui-title .ejs-title') as HTMLElement;
        const muiSubTitle = document.querySelector('.mui-bar .mui-title .ejs-sub-title') as HTMLElement;
        muiTitle.innerText = opt.title;
        if (opt.subTitle) {
            muiSubTitle.innerText = opt.subTitle;
            titleDiv.style.height = '30px';
            titleDiv.style.lineHeight = '30px';
            subTitleDiv.style.height = '14px';
            subTitleDiv.style.lineHeight = '14px';
            subTitleDiv.style.fontSize = '16px';
        } else {
            muiSubTitle.innerText = '';
            titleDiv.style.height = '';
            titleDiv.style.lineHeight = '';
            subTitleDiv.style.height = '0';
            subTitleDiv.style.lineHeight = '';
            subTitleDiv.style.fontSize = '';
        }
    });
}

export function setMultiTitle(opt, cb) {
    hasNavDiv(() => {
        const tab0 = opt.titles[0];
        const tab1 = opt.titles[1];
        const titleDiv = document.querySelector('.mui-title') as HTMLElement;

        titleDiv.style.display = 'flex';
        titleDiv.style.justifyContent = 'center';
        titleDiv.style.height = '44px';
        titleDiv.style.alignItems = 'center';
        const multDiv = `
        <button class="ejs-tab ejs-tab0 ejs-tab-active">${tab0}</button>
        <button class="ejs-tab ejs-tab1">${tab1}</button>`;

        document.querySelector('.mui-title').innerHTML = multDiv;
        const callback = (num) => {
            cb &&
                cb({
                    which: num
                });
        };

        mui('#header').off('click', '.ejs-tab');
        mui('#header').on('click', '.ejs-tab', (el) => {
            document.querySelector('.ejs-tab-active').classList.remove('ejs-tab-active');
            el.target.classList.add('ejs-tab-active');
            if (el.target.classList.contains('ejs-tab0')) {
                callback(0);
            } else {
                callback(1);
            }
        });
    });
}

export function setRightBtn(opt, cb) {
    hasNavDiv(() => {
        const text = opt.text;
        const imageUrl = opt.imageUrl;
        const isShow = opt.isShow;
        const which = opt.which;
        const textleDiv = document.querySelector(`.ejs-right-a-${which}`) as HTMLElement;

        if (isShow === 1) {
            textleDiv.classList.remove('mui-hidden');
            if (!imageUrl) {
                textleDiv.innerText = text;
                textleDiv.style.backgroundImage = '';
            } else {
                textleDiv.innerText = '';
                textleDiv.style.backgroundImage = `url(${imageUrl})`;
            }
        } else {
            textleDiv.classList.add('mui-hidden');
        }

        const callback = (num) => {
            cb &&
                cb({
                    which: num
                });
        };

        mui('#header').off('click', `.ejs-right-a-${which}`);
        mui('#header').on('click', `.ejs-right-a-${which}`, () => {
            callback(which);
        });
    });
}

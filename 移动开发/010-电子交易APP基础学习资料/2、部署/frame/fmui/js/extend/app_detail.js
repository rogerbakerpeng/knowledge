(function (doc, Config, Util) {
    'use strict';
    var currtType = 'base',
        pastType = '';
    
    (function initListeners() {
    	if(typeof ConfigDetail != 'undefined' && ConfigDetail.detailcssversion == 'blue_v2'){
    		$(".card-head").append('<span class="circle"><i class="mui-icon mui-icon-arrowdown"></i><i class="mui-icon mui-icon-arrowup mui-hidden"></i></span>');
        	// 收起
            $('.circle').on('tap', function () {
                var $self = $(this),
                    icon0 = $self.children('i:first-child'),
                    icon1 = $self.children('i:last-child'),
                    content = $self.parent().nextAll();

                // 箭头向上时 icon0为上箭头, icon1为下箭头
                if (icon1.hasClass('mui-hidden')) {
                    icon0.addClass('mui-hidden');
                    icon1.removeClass('mui-hidden');
                    content.addClass('mui-hidden');
                } else {
                    // 箭头向下时
                    icon0.removeClass('mui-hidden');
                    icon1.addClass('mui-hidden');
                    content.removeClass('mui-hidden');
                }

            });
    	}else{
    		if(doc.getElementById('tapheader')){
        		// 大标题切换
        		doc.getElementById('tapheader').addEventListener('tap', function (e) {
                    var target = e.target;

                    if (target.tagName === 'SPAN') {
                        var val = target.dataset.target,
                            selfCss = target.classList;
                    	doc.getElementsByClassName('checked')[0].classList.remove('checked');
                        selfCss.add('checked');

                        // 获取当前模块、上一个模块，进行切换
                        pastType = currtType;
                        currtType = val;
                        doc.getElementById(pastType).classList.add('hidden');
                        doc.getElementById(currtType).classList.remove('hidden');
                    }
                });

                
        	}
        	// 监听-基本信息-标题切换
            $('#base').on('tap', '.base-tit', function () {
                var parentElem = this.parentNode,
                    self = this.classList;

                self.contains('arrowup') ? self.remove('arrowup') : self.add('arrowup');

                //  请保证 .base-tit 标题是在父元素的第一个子元素
                for (var i = 1; i < parentElem.children.length; i++) {
                    var itemsCss = parentElem.children[i].classList;

                    itemsCss.contains('hidden') ? itemsCss.remove('hidden') : itemsCss.add('hidden');
                }
            });
    	}

    })()
})(document, window.Config, window.Util);

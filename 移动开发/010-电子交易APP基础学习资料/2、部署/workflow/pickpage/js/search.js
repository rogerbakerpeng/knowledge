(function () {
    'use strict';

    Util.loadJs(
        'js/utils/util.charset.js',
        function () {
            var str = '你好，世界！';

            document.body.innerHTML += Util.charset.strToBinary(str);
        });
}());
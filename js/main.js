'use strict';
require.config({
    paths: {
        'jQuery': 'libs/jquery'
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    }
});

require(['demo'], function (demo) {
    var amCool = 'I am so cool!';
    demo.updateText(amCool);
});

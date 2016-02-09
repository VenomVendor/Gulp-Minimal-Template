'use strict';
define(['jQuery'], function ($) {
    if ($ !== undefined) {
        console.log('jQuery is now accessible');
    }
    var desc = document.getElementsByClassName('desc')[0];
    var updateText = function (moreText) {
        desc.innerText = desc.innerText + '\n' + moreText;
    };
    return {
        updateText: updateText
    };
});

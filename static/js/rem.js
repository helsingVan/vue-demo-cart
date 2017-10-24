'use strict';

var win = window;
win.flex = function () {
    var doc = win.document;
    var ua = navigator.userAgent;
    var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
    var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
    var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
    var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
    var dpr = win.devicePixelRatio || 1;
    if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
        // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
        dpr = 1;
    }
    var scale = 1 / dpr;

    var metaEl = doc.querySelector('meta[name="viewport"]');
    if (!metaEl) {
        metaEl = doc.createElement('meta');
        metaEl.setAttribute('name', 'viewport');
        doc.head.appendChild(metaEl);
    }
    metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
    var width = document.documentElement.clientWidth;
    if (width / dpr > 540) {
        width = 540 * dpr;
    }
    var rem = width / 10;
    win.rem = rem;
    doc.documentElement.style.fontSize = rem + 'px';
};

win.onresize = flex;

flex();
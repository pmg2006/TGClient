/**
 * 发起网络请求 POST/GET
 * @param url 链接地址
 * @param params 上传参数
 * @param timeout 超时时间
 * @param method 请求方法POST/GET
 * @param callback 回调
 */
function sendRequest(url, params, timeout, method, callback) {

    if (method == 'POST') sendXHRPOST(url, params, timeout,callback);
    if (method == 'GET') sendXHRGET(url, params, timeout, callback);

}


function  sendXHRGET (url, params, timeout, callback) {

    if (!params || params == undefined) params = {};

    url = url + '?';

    for (var key in params){
        url = url + key + '=' + params[key] + '&';
    }

    var xhr = cc.loader.getXMLHttpRequest();
    streamXHREvents(xhr, 'GET', callback);
    xhr.open("GET", url, true);
    if (cc.sys.isNative) {
        xhr.setRequestHeader("Accept-Encoding","gzip,deflate");
    }

    // note: In Internet Explorer, the timeout property may be set only after calling the open()
    // method and before calling the send() method.
    xhr.timeout = timeout;// 5 seconds for timeout

    xhr.send();
}

function sendXHRPOST(url, params, timeout, callback) {

    if (!params || params == undefined) params = {};

    var xhr = cc.loader.getXMLHttpRequest();
    streamXHREvents(xhr, "POST", callback);

    xhr.open("POST", url);
    //set Content-type "text/plain" to post ArrayBuffer or ArrayBufferView
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.timeout = timeout;
    // Uint8Array is an ArrayBufferView
    xhr.send(params);
}

function streamXHREvents ( xhr,  method, responseHandler ) {

    var handler = responseHandler || function (response) {
        return method + " Response (30 chars): " + response.substring(0, 30) + "...";
    };

    // Simple events
    ['loadstart', 'abort', 'error', 'load', 'loadend', 'timeout'].forEach(function (eventname) {
        xhr["on" + eventname] = function () {

            console.log('普通请求响应' + eventname);

        };
    });

    // Special event
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && (xhr.status >= 200 && xhr.status < 300)) {
            // label.string = handler(xhr.responseText);
            handler(xhr.responseText);
        }
    };
}

var qhttp = cc.qhttp || {};

qhttp.request = sendRequest;
qhttp.postRequest = sendXHRPOST;
qhttp.getRequest = sendXHRGET;

cc.qhttp = qhttp;


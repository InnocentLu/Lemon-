/**
 * ImageAssistant
 * Project Home: http://www.pullywood.com/ImageAssistant/
 * Author: Joey
 * Copyright (C) 2013-2024 普利坞(Pullywood.com)
**/
"use strict";
if (typeof _o_com_key == "undefined") {
    window._o_com_key = "_o_dbjbempljhcmhlfpfacalomonjpalpko"
}
if (document.querySelector("input#" + window._o_com_key) == null && typeof chrome != "undefined" && typeof chrome.runtime != "undefined" && typeof chrome.runtime.id != "undefined" && typeof chrome.runtime.getURL != "undefined") {
    (async function() {
        const _w_lode = (await chrome.runtime.sendMessage(chrome.runtime.id, {
            type: "readSetting",
            key: "_w_lien"
        })).value;
        let _w_aInput = document.createElement("input");
        _w_aInput.type = "hidden";
        _w_aInput.id = _o_com_key;
        _w_aInput.dataset.inspectConfig = _w_lode;
        (document.head || document.documentElement).appendChild(_w_aInput);
        let _w_aScript = document.createElement("script");
        _w_aScript.type = "text/javascript";
        _w_aScript.src = chrome.runtime.getURL("/scripts/inspector.js");
        (document.head || document.documentElement).appendChild(_w_aScript)
    }
    )()
} else if (!window._o_content_and_xhr_sniffer) {
    let _w_acuity = false;
    let _w_skunk = false;
    let _w_gamble = false;
    let _w_virago = document.querySelector(`#${window._o_com_key}`);
    if (_w_virago && _w_virago.dataset && _w_virago.dataset.inspectConfig) {
        let _w_attic = parseInt(_w_virago.dataset.inspectConfig);
        if (!isNaN(_w_attic) && (_w_attic & 1) > 0) {
            _w_acuity = true
        }
        if (!isNaN(_w_attic) && (_w_attic & 2) > 0) {
            _w_skunk = true
        }
        if (!isNaN(_w_attic) && (_w_attic & 4) > 0) {
            _w_gamble = true
        }
    }
    window._o_content_and_xhr_sniffer = function() {
        let _o_content_src_list = [];
        let _o_url_container = {};
        function _w_closet(url) {
            if (url.startsWith("data:")) {
                return url
            }
            const link = document.createElement("a");
            link.href = url;
            return link.href
        }
        const _o_uri_regexp = /(['"\s\n\r])(data:image\/[a-zA-Z0-9+\/]+;base64,[a-zA-Z0-9+/=]+|[^'"\s\n\r]*?\.(apng|bmp|gif|ico|cur|jpg|jpeg|jfif|pjpeg|pjp|png|svg|tif|tiff|webp|pnj)(\?[^'"\s\n\r]*)?)(?=['"\s\n\r])/gi;
        let _o_items_fun = function(_o_items) {
            _o_items && _o_items.forEach((function(item) {
                let _w_src = item.replace(/[\\'"\s\n\r]+/gi, "");
                let absoluteSrc = _w_closet(_w_src);
                if (!_o_url_container[absoluteSrc]) {
                    _o_url_container[absoluteSrc] = true;
                    _o_content_src_list.push(absoluteSrc)
                }
            }
            ))
        };
        function processResponseText(responseText) {
            const items = responseText.replace(/[<>]/gi, '"').match(_o_uri_regexp);
            if (items) {
                _o_items_fun(items)
            }
        }
        function handleResponse(contentType, responseTextPromise, responseUrl) {
            if (contentType.startsWith("text/") || ["application/json", "application/xml", "application/xhtml+xml", "application/ld+json", "application/atom+xml", "application/rss+xml"].some((type => contentType.includes(type)))) {
                responseTextPromise.then(processResponseText).catch((error => console.error("Error processing response text:", error)))
            } else if (/^image\/[a-z]+/.test(contentType)) {
                _o_items_fun([responseUrl])
            }
        }
        if (_w_acuity) {
            (function() {
                const originalSend = XMLHttpRequest.prototype.send;
                XMLHttpRequest.prototype.send = function(data) {
                    this.addEventListener("load", (function() {
                        try {
                            const contentType = (this.getResponseHeader("Content-Type") || "").toLowerCase();
                            handleResponse(contentType, Promise.resolve(this.responseText), this.responseURL)
                        } catch (error) {
                            console.error("Error processing XMLHttpRequest response:", error)
                        }
                    }
                    ), false);
                    return originalSend.call(this, data)
                }
            }
            )()
        }
        if (_w_skunk) {
            const _o_fetch = window.fetch;
            window.fetch = function() {
                return _o_fetch.apply(this, arguments).then((response => {
                    const clonedResponse = response.clone();
                    const contentType = (clonedResponse.headers.get("content-type") || "").toLowerCase();
                    handleResponse(contentType, clonedResponse.text(), response.url);
                    return response
                }
                )).catch((error => {
                    console.error("Fetch request failed:", error);
                    throw error
                }
                ))
            }
        }
        if (_w_gamble) {
            const OriginalImage = window.Image;
            window.Image = function() {
                const img = new OriginalImage;
                Object.defineProperty(img, "src", {
                    set: function(value) {
                        const _w_broker = _w_closet(value);
                        console.log(`Image URL being set: ${_w_broker}`);
                        if (!_o_url_container[_w_broker]) {
                            _o_url_container[_w_broker] = true;
                            _o_content_src_list.push(_w_broker)
                        }
                        img.setAttribute("src", _w_broker)
                    },
                    get: function() {
                        return img.getAttribute("src")
                    },
                    configurable: true,
                    enumerable: true
                });
                return img
            }
            ;
            window.Image.prototype = OriginalImage.prototype
        }
        setInterval((function() {
            let _w_aInput = document.getElementById(_o_com_key);
            if (_w_aInput && _w_aInput.value && _w_aInput.value.length > 0 && _w_aInput.value == _o_com_key && _o_content_src_list.length > 0) {
                _w_aInput.value = JSON.stringify(_o_content_src_list);
                _o_content_src_list = []
            }
        }
        ), 512);
        return {
            _o_getLeftUrl: function() {
                return _o_content_src_list.length
            }
        }
    }()
}

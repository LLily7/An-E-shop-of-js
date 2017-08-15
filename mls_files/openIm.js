/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	
	var iframe = __webpack_require__(5);
	var shopInfo = {};
	
	var _getShopOwner = function (shopId, callback) {
	  return $.ajax({
	    url: 'http://webim.meilishuo.com/jsonp/getshopowner/1', // 不支持https
	    data: {
	      shopId: shopId
	    },
	    type: 'GET',
	    dataType: 'jsonp',
	    jsonp: 'callback',
	    success: callback
	  });
	};
	var _showIm = function(userId, goodsId) {
	  // 请求触发是防止一个页面有多个不同的唤醒im逻辑
	  iframe(userId, goodsId);
	  var dom = $('#J-imContainer');
	  dom.show();
	  dom.contents().focus();
	};
	
	var openIm = function(userId, shopId, goodsId){
	  if (!window.$) {
	    var log = console.error || console.log;
	    return log('no jquery find! can not open webim');
	  }
	  // 获取goodsId
	  var reg_ushop = /com\/detail\/(1[a-z0-9]+)/;
	  var match = decodeURIComponent(location.href).match(reg_ushop);
	  if (match && match[1]) {
	    goodsId = match[1];
	  }
	  // 获取店主的userId
	  if(!userId && shopId) {
	    if(shopInfo[shopId]){
	      userId = shopInfo[shopId];
	      _showIm(userId, goodsId);
	      return;
	    }
	    // 请求获取
	    _getShopOwner(shopId, function(resp){
	      if (resp.success && resp.data) {
	        userId = resp.data.userId;
	        shopInfo[shopId] = userId; // 防止一个页面多次请求
	        _showIm(userId, goodsId);
	      }
	    });
	    return;
	  }
	  _showIm(userId, goodsId);
	};
	
	window._openIm = openIm;
	module.exports = openIm;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./style.less", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/less-loader/index.js!./style.less");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, ".im-frame-container {\n  width: 580px;\n  height: 430px;\n  position: fixed;\n  z-index: 1000;\n  display: none;\n  left: 10px;\n  top: 10px;\n}\n.im-frame-container .im-frame-box {\n  width: 100%;\n  height: 100%;\n  border: none;\n}\n.im-frame-container .im-frame-drag {\n  width: 470px;\n  height: 32px;\n  position: absolute;\n  z-index: 3;\n  left: 75px;\n  top: 24px;\n}\n.im-frame-container .im-frame-btn {\n  width: 32px;\n  height: 32px;\n  position: absolute;\n  right: 0;\n  top: 24px;\n  z-index: 2;\n  cursor: pointer;\n  opacity: 0;\n  background-color: rgba(255, 102, 153, 0);\n}\n", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function bind(fn, ctx) {
		var bindArgs = Array.prototype.slice.call(arguments, 2);
		return function () {
			var args = Array.prototype.slice.call(arguments);
			fn.apply(ctx, bindArgs.concat(args));
		}
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = bind(applyToSingletonTag, null, styleElement, styleIndex, false);
			remove = bind(applyToSingletonTag, null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = bind(updateLink, null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = bind(applyToTag, null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			var filtered = [];
			textStore[index] = replacement;
			for(var i = 0; i < textStore.length; i++) {
				if(textStore[i]) {
					filtered.push(textStore[i]);
				}
			}
	
			return filtered.join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* global $ */
	
	// 默认加载iframe
	__webpack_require__(6);
	var pos;
	var Timer;
	
	function getDefaultPos() {
	  return {
	    x: $(window).width() - 590,
	    y: $(window).height() - 440
	  };
	}
	
	var position = {
	  getPos: function() {
	    var posStr;
	    if (pos) {
	      return pos;
	    }
	    pos = getDefaultPos();
	    if (window.localStorage) {
	      posStr = window.localStorage.getItem('IM_POSITION');
	      if (posStr) {
	        try {
	          pos = JSON.parse(posStr);
	        } catch (e) {
	        }
	      }
	    }
	    return pos;
	  },
	  setPos: function (x, y) {
	    pos = {
	      x: x,
	      y: y
	    };
	    if (window.localStorage) {
	      window.localStorage.setItem('IM_POSITION', JSON.stringify(pos));
	    }
	  }
	};
	
	
	module.exports = function(userId, goodsId) {
	  var src = 'http://webim.meilishuo.com/pc';
	  var imDom = $('#J-imContainer');
	  if (!imDom || imDom.length < 1) {
	    var style = 'left:'+position.getPos().x+'px; top:'+position.getPos().y+'px';
	    var dom =[
	      '<div id="J-imContainer" class="im-frame-container" style="'+style+'">',
	        '<div id="J-closeImFrameBtn" class="im-frame-btn"></div>',
	        '<div id="J-dragImHandle" class="im-frame-drag"></div>',
	        '<iframe id="J-openImFrame" class="im-frame-box" frameborder="no" allowtransparency="true">',
	        '</iframe>',
	      '</div>'];
	    dom = dom.join('');
	    $('body').append(dom);
	    $('#J-closeImFrameBtn').on('click', function(){
	      $('#J-imContainer').hide();
	    });
	
	    // 绑定拖动
	    $("#J-imContainer").drag({
	      midX: 40,
	      midY: 40,
	      handler:'#J-dragImHandle',
	      resize: function(pos){
	        position.setPos(pos.x, pos.y);
	      },
	      dragEnd: function(pos){
	        position.setPos(pos.x, pos.y);
	      }
	    });
	  }
	  // 设置连接
	  $('#J-openImFrame').attr('src', src+'#userId='+userId+'&goodsId='+goodsId);
	};


/***/ },
/* 6 */
/***/ function(module, exports) {

	var touchSuport = !!('ontouchstart' in document.documentElement);
	var touchEvent = {
	  start: 'touchstart',
	  move: 'touchmove',
	  end: 'touchend'
	};
	var mouseEvent = {
	  start: 'mousedown',
	  move: 'mousemove',
	  end: 'mouseup'
	};
	var events = touchSuport ? touchEvent : mouseEvent;
	$.fn.drag = function(data){
	  var $this = $(this),
	    maxX,
	    maxY,
	    minX,
	    minY,
	    Timer,
	    eventHandler = null,
	    pos={},
	    _default={
	      midX: 0,
	      midY: 0,
	      axis: 'both',
	      handler: null
	    };
	  var opts = $.extend({}, _default, data);
	  var handler= opts.handler; //拖动的对象
	  if(typeof handler === 'string'){
	    handler = $this.find(handler);
	  } else if(!handler){
	    handler = $this;
	  }
	  function unbind(){
	    if (!eventHandler) return this;
	    handler.off(events.start, eventHandler);
	    return this;
	  }
	  function setMax(){
	    maxX = opts.maxX > 0 ? opts.maxX : $(window).width();
	    maxY = opts.maxY > 0 ? opts.maxY : $(window).height();
	    maxX = maxX - current('width') - opts.midX;
	    maxY = maxY - current('height') - opts.midY;
	    minX = opts.midX;
	    minY = opts.midY;
	  }
	  function current(prop, val) {
	    if(val){
	      // 有valu的时候是设置
	      $this.css(prop, val);
	      return;
	    }
	    return (parseFloat($this.css(prop)));
	  }
	  function getPos(){
	    pos.x = current('left');
	    pos.y = current('top');
	  }
	  function setPos(newX, newY){
	    if (maxX) {
	      if (newX < minX) {
	        newX = minX;
	      } else if (newX > maxX) {
	        newX = maxX;
	      }
	    }
	    if (maxY) {
	      if (newY < minY) {
	        newY = minY;
	      } else if (newY > maxY) {
	        newY = maxY;
	      }
	    }
	
	    if (opts.axis === 'x') {
	      current('left', newX +'px');
	    } else if (opts.axis === 'y') {
	      current('top', newY +'px');
	    } else {
	      // 默认定位方式
	      current('left', newX +'px');
	      current('top', newY +'px');
	    }
	    getPos();
	  }
	  function start(){
	    unbind();
	    setMax();
	    if(typeof opts.dragStart === 'function') opts.dragStart.call(this,pos);
	    function eventHandler(e){
	      var posX = current('left') || 0;
	      var posY = current('top') || 0;
	      function moveHandler(e2){
	        var offsetX,
	          offsetY,
	          newX,
	          newY;
	        if (!touchSuport) {
	          offsetX = e2.clientX - e.clientX;
	          offsetY = e2.clientY - e.clientY;
	        } else {
	          if (e.touches.length === 1) {
	            offsetX = e2.touches[0].clientX - e.touches[0].clientX;
	            offsetY = e2.touches[0].clientY - e.touches[0].clientY;
	          }
	        }
	        newX = posX + offsetX;
	        newY = posY + offsetY;
	        setPos(newX,newY);
	        prevDef(e2);
	      }
	      function endHandler() {
	        if(typeof opts.dragEnd === 'function') {
	          opts.dragEnd.call(this, pos);
	        }
	        cleanup();
	      }
	      function prevDef (e3) {
	        if (e3.preventDefault) {
	          e3.preventDefault();
	          e3.stopPropagation();
	        } else {
	          e3.returnValue = false;
	          e3.cancelBubble = true;
	        }
	      }
	      function cleanup() {
	        $(document).off(events.move, moveHandler);
	        $(document).off(events.end,endHandler);
	        $(document).off( 'selectstart',prevDef);
	        handler.off( 'dragstart',prevDef);
	      }
	      document.body.focus();
	      $(document).on('selectstart', prevDef);
	      handler.on('dragstart', prevDef);
	      $(document).on(events.move, moveHandler);
	      $(document).on(events.end, endHandler);
	    }
	    handler.on(events.start, eventHandler);
	  }
	
	  $(window).resize(function() {
	    if (Timer) {
	      window.clearTimeout(Timer);
	    }
	    Timer = setTimeout(function() {
	      setMax();
	      setPos(pos.x, pos.y);
	      if(typeof opts.resize === 'function') {
	        opts.resize.call(this,pos);
	      }
	    }, 300);
	  });
	  // 初始化
	  start();
	};


/***/ }
/******/ ]);
//# sourceMappingURL=openIm.js.map
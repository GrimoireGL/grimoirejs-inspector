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

	"use strict";
	
	var _MessageManager = __webpack_require__(1);
	
	var _MessageManager2 = _interopRequireDefault(_MessageManager);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var mm = new _MessageManager2.default();
	console.log("background script");
	chrome.runtime.onConnect.addListener(function (port) {
	    // devTools側からのリスナー
	    var devtoolListener = function devtoolListener(message, sender, sendResponse) {
	        if (mm.verifyDevtoolMessage(message)) {
	            if (message.type === "connection-establish") {
	                mm.establish(port);
	            } else {
	                mm.toContent(message);
	            }
	        }
	    };
	
	    // Listen to messages sent from the DevTools page
	    port.onMessage.addListener(devtoolListener);
	    port.onDisconnect.addListener(function (port) {
	        port.onMessage.removeListener(devToolsListener);
	        mm.disconnect();
	    });
	});
	
	// Receive message from content script and relay to the devTools page for the
	// current tab
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	    // Messages from content scripts should have sender.tab set
	    mm.toDevTool(request, sender);
	    return true;
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var MessageManager = function () {
	  function MessageManager() {
	    _classCallCheck(this, MessageManager);
	  }
	
	  _createClass(MessageManager, [{
	    key: "establish",
	    value: function establish(port) {
	      this.devToolPort = port;
	      console.log("connection established to");
	      console.log(port);
	    }
	  }, {
	    key: "disconnect",
	    value: function disconnect() {
	      if (this.devToolPort) {
	        this.devToolPort = null;
	      }
	    }
	  }, {
	    key: "toDevTool",
	    value: function toDevTool(request, sender, fromBackground) {
	      var tabId = sender ? sender.tab.id : null;
	      if (request.$source === "grimoire-inspector" && tabId === this.tabId || fromBackground) {
	        if (this.devToolPort) {
	          this.devToolPort.postMessage(request);
	          console.log("Background -> DevTool");
	          console.log(request);
	        }
	      }
	    }
	  }, {
	    key: "toContent",
	    value: function toContent(message) {
	      if (this.verifyDevtoolMessage(message)) {
	        chrome.tabs.sendMessage(message.$tabId, message);
	        this.tabId = message.$tabId;
	        console.log("Background -> ContentScript:" + message.$tabId);
	        console.log(message);
	      }
	    }
	  }, {
	    key: "verifyDevtoolMessage",
	    value: function verifyDevtoolMessage(message) {
	      return message.$source === "grimoire-inspector-dev-tool";
	    }
	  }]);
	
	  return MessageManager;
	}();
	
	exports.default = MessageManager;

/***/ }
/******/ ]);
//# sourceMappingURL=background.js.map
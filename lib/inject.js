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
/***/ function(module, exports) {

	'use strict';
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function injectScript(file, node) {
	  var s, th;
	  th = document.getElementsByTagName(node)[0];
	  s = document.createElement('script');
	  s.setAttribute('type', 'text/javascript');
	  s.setAttribute('src', file);
	  s.setAttribute('x-injectedBy', "GrimoireJS Inspector");
	  return th.appendChild(s);
	};
	
	window.addEventListener('message', function (event) {
	  // Only accept messages from the same frame
	  if (event.source !== window) {
	    return;
	  }
	  var message = event.data;
	
	  if ((typeof message === 'undefined' ? 'undefined' : _typeof(message)) !== 'object' || message === null || !message.source === 'grimoire-inspector') {
	    return;
	  }
	  chrome.runtime.sendMessage(message);
	});
	
	window.addEventListener("DOMContentLoaded", function () {
	  injectScript(chrome.extension.getURL('../lib/embed.js'), "body");
	});
	
	chrome.runtime.onMessage.addListener(function (message) {
	  if (message.$source === "grimoire-inspector-dev-tool") {
	    window.postMessage(message, "*");
	  }
	});

/***/ }
/******/ ]);
//# sourceMappingURL=inject.js.map
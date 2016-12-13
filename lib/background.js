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

	"use strict";
	
	var connections = {};
	chrome.runtime.onConnect.addListener(function (port) {
	
	    // devTools側からのリスナー
	    var devtoolListener = function devtoolListener(message, sender, sendResponse) {
	        if (message.name == "init") {
	            connections[message.tabId] = port;
	            return;
	        } else {
	            if (message.$source === "grimoire-inspector-dev-tool") {
	                chrome.tabs.sendMessage(message.$tabId, message);
	            }
	        }
	    };
	
	    // Listen to messages sent from the DevTools page
	    port.onMessage.addListener(devtoolListener);
	    port.onDisconnect.addListener(function (port) {
	        port.onMessage.removeListener(extensionListener);
	
	        var tabs = Object.keys(connections);
	        for (var i = 0, len = tabs.length; i < len; i++) {
	            if (connections[tabs[i]] == port) {
	                delete connections[tabs[i]];
	                break;
	            }
	        }
	    });
	});
	
	// Receive message from content script and relay to the devTools page for the
	// current tab
	chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	    // Messages from content scripts should have sender.tab set
	    if (sender.tab) {
	        var tabId = sender.tab.id;
	        if (tabId in connections) {
	            connections[tabId].postMessage(request);
	        }
	    } else {
	        console.log("sender.tab not defined.");
	    }
	    return true;
	});

/***/ }
/******/ ]);
//# sourceMappingURL=background.js.map
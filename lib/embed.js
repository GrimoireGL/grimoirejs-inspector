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
	
	_MessageManager2.default.on("sync-devtool", function () {
	    if (!!window.GrimoireJS) {
	        (function () {
	            var elementToObject = function elementToObject(element, noRecursive) {
	                var children = void 0;
	                if (!noRecursive) {
	                    children = [];
	                    for (var i = 0; i < element.children.length; i++) {
	                        children.push(elementToObject(element.children[i]));
	                    }
	                }
	                return {
	                    key: element.getAttribute("x-gr-id"),
	                    className: element.className,
	                    tagName: element.tagName,
	                    id: element.id,
	                    children: children
	                };
	            };
	
	            var attributeToObject = function attributeToObject(attr) {
	                try {
	                    var converter = attr.declaration.converter;
	                    switch (converter) {
	                        case "Number":
	                        case "String":
	                        case "Angle2D":
	                        case "Boolean":
	                            return {
	                                name: attr.name.name,
	                                value: attr.Value
	                            };
	                        case "Color3":
	                        case "Color4":
	                            return {
	                                name: attr.name.name,
	                                value: attr.Value.rawElements,
	                                isColor: true
	                            };
	                        case "Vector2":
	                        case "Vector3":
	                        case "Vector4":
	                            return {
	                                name: attr.name.name,
	                                value: attr.Value.rawElements,
	                                isVector: true,
	                                length: ["Vector2", "Vector3", "Vector4"].indexOf(converter) + 2
	                            };
	                        case "Rotation3":
	                            return {
	                                name: attr.name.name,
	                                value: attr.Value.eularAngles.rawElements,
	                                isVector: true,
	                                length: 3
	                            };
	                        default:
	                            return {
	                                name: attr.name.name,
	                                value: !!attr.Value ? "(Object)[Non Editable]" : "(null or undefined)[Non Editable]"
	                            };
	                    }
	                } catch (e) {
	                    return {
	                        name: attr.name.name,
	                        value: e.toString()
	                    };
	                }
	            };
	
	            var componentToObject = function componentToObject(component) {
	                return {
	                    name: component.name.name,
	                    attributes: component.attributes.toArray().map(function (m) {
	                        return attributeToObject(m);
	                    })
	                };
	            };
	
	            var observeRoot = function observeRoot(element) {
	                var observer = new MutationObserver(function (mutations) {
	                    mutations.forEach(function (mutation) {
	                        if (mutation.type === "childList") {
	                            for (var i = 0; i < mutation.addedNodes.length; i++) {
	                                var addedNode = mutation.addedNodes[i];
	                                _MessageManager2.default.post({
	                                    type: "node-added",
	                                    parent: elementToObject(addedNode.parentElement),
	                                    addedNode: elementToObject(addedNode),
	                                    root: elementToObject(element)
	                                });
	                            }
	                        }
	                    });
	                });
	                observer.observe(element, {
	                    attributes: true,
	                    childList: true,
	                    characterData: true,
	                    subtree: true
	                });
	            };
	
	            _MessageManager2.default.on("fetch-node", function (m) {
	                var node = window.GrimoireJS.nodeDictionary[m.key];
	                if (!node) {
	                    return;
	                }
	                var components = node._components;
	                var arr = new Array(components.length);
	                for (var i = 0; i < arr.length; i++) {
	                    arr[i] = componentToObject(components[i]);
	                }
	                _MessageManager2.default.post({
	                    type: "node-info",
	                    nodeName: node.name.name,
	                    className: node.element.className,
	                    id: node.element.id,
	                    components: arr
	                });
	            });
	
	            for (var key in window.GrimoireJS.rootNodes) {
	                var root = window.GrimoireJS.rootNodes[key];
	                _MessageManager2.default.post({
	                    type: "new-tree",
	                    result: {
	                        key: key,
	                        rootNode: elementToObject(root.element),
	                        scriptElement: elementToObject(root.companion.get("scriptElement"), true)
	                    }
	                });
	                observeRoot(root.element);
	            }
	        })();
	    }
	});
	_MessageManager2.default.post({
	    type: "initialize"
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
	
	    this.handlers = {};
	    window.addEventListener("message", this.onRecieve.bind(this));
	  }
	
	  _createClass(MessageManager, [{
	    key: "onRecieve",
	    value: function onRecieve(message) {
	      if (message.data.$source !== "grimoire-inspector-dev-tool") {
	        return;
	      }
	      if (this.handlers[message.data.type]) {
	        this.handlers[message.data.type](message.data);
	      } else {
	        throw new Error("No handler found");
	      }
	    }
	  }, {
	    key: "post",
	    value: function post(message) {
	      var packet = Object.assign({
	        $source: "grimoire-inspector"
	      }, message);
	      if (packet.type === void 0) {
	        throw new Error("Type must be specified");
	      }
	      window.postMessage(packet, "*");
	    }
	  }, {
	    key: "on",
	    value: function on(type, handler) {
	      this.handlers[type] = handler;
	    }
	  }]);
	
	  return MessageManager;
	}();
	
	exports.default = new MessageManager();

/***/ }
/******/ ]);
//# sourceMappingURL=embed.js.map
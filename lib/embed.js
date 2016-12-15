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
	
	var _ObjectConverter = __webpack_require__(2);
	
	var _ObjectConverter2 = _interopRequireDefault(_ObjectConverter);
	
	var _AttributeWatcher = __webpack_require__(3);
	
	var _AttributeWatcher2 = _interopRequireDefault(_AttributeWatcher);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_MessageManager2.default.on("sync-devtool", function () {
	    if (!!window.GrimoireJS) {
	        var observeRoot = function observeRoot(element) {
	            var observer = new MutationObserver(function (mutations) {
	                mutations.forEach(function (mutation) {
	                    if (mutation.type === "childList") {
	                        for (var i = 0; i < mutation.addedNodes.length; i++) {
	                            var addedNode = mutation.addedNodes[i];
	                            _MessageManager2.default.post({
	                                type: "node-added",
	                                parent: _ObjectConverter2.default.fromElement(addedNode.parentElement),
	                                addedNode: _ObjectConverter2.default.fromElement(addedNode),
	                                root: _ObjectConverter2.default.fromElement(element)
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
	            _AttributeWatcher2.default.removeHandlers();
	            var node = window.GrimoireJS.nodeDictionary[m.key];
	            if (!node) {
	                return;
	            }
	            var components = node._components.map(function (m) {
	                return _ObjectConverter2.default.fromComponent(m);
	            });
	            _MessageManager2.default.post({
	                type: "node-info",
	                nodeName: node.name.name,
	                className: node.element.className,
	                id: node.element.id,
	                components: components
	            });
	            _AttributeWatcher2.default.watch(node);
	        });
	
	        for (var key in window.GrimoireJS.rootNodes) {
	            var root = window.GrimoireJS.rootNodes[key];
	            _MessageManager2.default.post({
	                type: "new-tree",
	                result: {
	                    key: key,
	                    rootNode: _ObjectConverter2.default.fromElement(root.element),
	                    scriptElement: _ObjectConverter2.default.fromElement(root.companion.get("scriptElement"), true)
	                }
	            });
	            observeRoot(root.element);
	        }
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
	        throw new Error("No handler found for " + message.data.type);
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ObjectConverter = function () {
	    function ObjectConverter() {
	        _classCallCheck(this, ObjectConverter);
	    }
	
	    _createClass(ObjectConverter, [{
	        key: "fromElement",
	        value: function fromElement(element, noRecursive) {
	            var children = void 0;
	            if (!noRecursive) {
	                children = [];
	                for (var i = 0; i < element.children.length; i++) {
	                    children.push(this.fromElement(element.children[i]));
	                }
	            }
	            return {
	                key: element.getAttribute("x-gr-id"),
	                className: element.className,
	                tagName: element.tagName,
	                id: element.id,
	                children: children
	            };
	        }
	    }, {
	        key: "fromComponent",
	        value: function fromComponent(component) {
	            var _this = this;
	
	            return {
	                name: component.name.name,
	                attributes: component.attributes.toArray().map(function (m) {
	                    return _this.fromAttribute(m);
	                })
	            };
	        }
	    }, {
	        key: "fromAttribute",
	        value: function fromAttribute(attr) {
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
	        }
	    }]);
	
	    return ObjectConverter;
	}();
	
	exports.default = new ObjectConverter();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _MessageManager = __webpack_require__(1);
	
	var _MessageManager2 = _interopRequireDefault(_MessageManager);
	
	var _ObjectConverter = __webpack_require__(2);
	
	var _ObjectConverter2 = _interopRequireDefault(_ObjectConverter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var AttributeWatcher = function () {
	    function AttributeWatcher() {
	        var _this = this;
	
	        _classCallCheck(this, AttributeWatcher);
	
	        this.watching = [];
	        this.components = {};
	        _MessageManager2.default.on("attribute-manual-change", function (m) {
	            _this.components[m.cName][m.attrName].Value = m.value;
	        });
	    }
	
	    _createClass(AttributeWatcher, [{
	        key: "watch",
	        value: function watch(node) {
	            var _this2 = this;
	
	            this.node = node;
	            node._components.forEach(function (c) {
	                _this2.components[c.name.name] = {};
	                c.attributes.toArray().forEach(function (a) {
	                    _this2.components[c.name.name][a.name.name] = a;
	                });
	            });
	            node._components.forEach(function (c) {
	                return c.attributes.toArray().forEach(function (a) {
	                    return _this2.addHandler(a, _this2.onChanged.bind(_this2));
	                });
	            });
	        }
	    }, {
	        key: "onChanged",
	        value: function onChanged() {
	            var components = this.node._components.map(function (m) {
	                return _ObjectConverter2.default.fromComponent(m);
	            });
	            _MessageManager2.default.post({
	                type: "attribute-update",
	                components: components
	            });
	        }
	    }, {
	        key: "addHandler",
	        value: function addHandler(attr, func) {
	            this.watching.push({
	                attr: attr,
	                handler: func
	            });
	            attr.watch(func);
	        }
	    }, {
	        key: "removeHandlers",
	        value: function removeHandlers() {
	            for (var i = 0; i < this.watching.length; i++) {
	                var target = this.watching[i];
	                target.attr.removeObserver(target.handler);
	            }
	            this.watching.splice(0, this.watching.length);
	        }
	    }]);
	
	    return AttributeWatcher;
	}();
	
	exports.default = new AttributeWatcher();

/***/ }
/******/ ]);
//# sourceMappingURL=embed.js.map
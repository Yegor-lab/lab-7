(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by chaika on 09.02.16.
 */
var API_URL = "http://localhost:5050";

function backendGet(url, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'GET',
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

function backendPost(url, data, callback) {
    $.ajax({
        url: API_URL + url,
        type: 'POST',
        contentType : 'application/json',
        data: JSON.stringify(data),
        success: function(data){
            callback(null, data);
        },
        error: function() {
            callback(new Error("Ajax Failed"));
        }
    })
}

exports.getPizzaList = function(callback) {
    backendGet("/api/get-pizza-list/", callback);
};

exports.createOrder = function(order_info, callback) {
    backendPost("/api/create-order/", order_info, callback);
};

},{}],2:[function(require,module,exports){
var basil	=	require('basil.js');
basil	=	new	basil();
exports.get =	function(key)	{
return	basil.get(key);
};
exports.set =	function(key,	value)	{
return	basil.set(key,	value);
};
},{"basil.js":5}],3:[function(require,module,exports){
/**
 * Created by chaika on 02.02.16.
 */

var ejs = require('ejs');


exports.PizzaMenu_OneItem = ejs.compile("<%\n\nfunction getIngredientsArray(pizza) {\n    //Отримує вміст піци\n    var content = pizza.content;\n    var result = [];\n\n    //Object.keys повертає масив ключів в об’єкті JavaScript\n\n    Object.keys(content).forEach(function(key){\n\n        //a.concat(b) створює спільний масив із масивів a та b\n        result = result.concat(content[key]);\n    });\n\n    return result;\n}\n\n   %>\n<div class=\"col-md-6 col-lg-4 pizza-card\">\n    <div class=\"thumbnail\">\n\n        <% if(pizza.is_new) { %>\n            <span class=\"badge badge-danger badge-status\">Нова</span>\n        <% } if(pizza.is_popular) { %>\n            <span class=\"badge badge-success badge-status\">Популярна</span>\n        <% } if(!pizza.is_new&&pizza.is_popular) %> \n            <br style=\"height: 10px;\">\n\n        <img class=\"pizza-icon\" src=\"<%= pizza.icon %>\" alt=\"Pizza\">\n\n        <div class=\"caption\">\n            <h3 class=\"title orange-heading\"><%= pizza.title %></h3>\n            <div class=\"type\"><b><%= pizza.type %></b></div>\n            <div class=\"description font-weight-lighter font-small font-italic\">\n                <%= getIngredientsArray(pizza).join(\", \") %>\n            </div>\n        </div>\n\n        <!-- Перед тим щоб показати кнопку необхідно переконатися, що піца має великий розмір -->\n        \n        <div class=\"col-12 row\">\n            <% if(pizza.small_size) { %>\n            <div class=\"col-6 diaweightprice\">\n                <div class=\"row justify-content-center\">\n                    <p class=\"font-small\"><img src=\"assets/images/size-icon.svg\"><%= pizza.small_size.size %></p>\n                    <p class=\"font-small\"><img src=\"assets/images/weight.svg\"><%= pizza.small_size.weight %></p>\n                </div>\n                <p class=\"font-large\"><b><%= pizza.small_size.price %></b></p>\n                <p class=\"font-small\">грн.</p>\n                <div class=\"text-center\"><button class=\"btn btn-orange buy-small\">Купити</button></div>\n            </div>\n            <% } %>\n            <% if(pizza.big_size) { %>\n            <div class=\"col-6 diaweightprice\">\n                <div class=\"row justify-content-center\">\n                    <p class=\"font-small\"><img src=\"assets/images/size-icon.svg\"><%= pizza.big_size.size %> </p>\n                    <p class=\"font-small\"><img src=\"assets/images/weight.svg\"><%= pizza.big_size.weight %></p>\n                </div>\n                <p class=\"font-large\"><b><%= pizza.big_size.price %></b></p>                    \n                <p class=\"font-small\">грн.</p>\n                <div class=\"text-center\"><button class=\"btn btn-orange buy-big\">Купити</button></div>    \n            </div> \n            <% } %>\n        </div>\n    </div>\n</div>");
exports.PizzaCart_OneItem = ejs.compile("<div class=\"bg-light row border-bottom\">\n    <div class=\"col-9 \">\n        <h4 class=\"col-12 orange-heading\" style=\"padding: 0px;\"><%= pizza.title %><p class=\"font-small\">(<%= size == \"big_size\" ? \"Велика\" : \"Мала\" %>)</p></h4>\n        <div class=\"col-12 row diameter-weight\">\n            <div class=\"col-3 no_padding\"><img src=\"assets/images/size-icon.svg\"><%= pizza[size].size %></div><div class=\"col-3 no_padding\"><img src=\"assets/images/weight.svg\"><%= pizza[size].weight %></div>\n        </div> \n        <div class=\" col-12 btn-group mr-2 align-items-center items_number\" style=\"padding:0px;\" role=\"group\" aria-label=\"Second group\">                        \n            <div class=\"col-3 no_padding\"><%= pizza[size].price %><p> UAH</p></div>\n            <div class=\"col-9 justify-content-center cart-price-container\">\n                <button class=\"btn btn-danger minus\">-</button>\n                <span class=\"label label-default\" id=\"OneTypePizzaNumber\"><%= quantity %></span>\n                <button class=\"btn btn-success plus\">+</button>\n                <button class=\"btn btn-secondary rounded-circle delete\">x</button>\n            </div>\n        </div>\n    </div>\n    <div class=\"col-3\">\n        <img class=\"pizza-icon\" src=\"<%= pizza.icon %>\" alt=\"Pizza\">\n    </div>\n</div>");
exports.LiqPayWidget = ejs.compile("<div class=\"col-md-12 psevdo_header no_padding\"></div>\r\n<div class=\"col-12 col-sm-12 col-md-12 gap\"></div>\r\n\r\n<div class=\"col-9 col-sm-8 col-md-6 col-lg-5 mx-auto form-group\">\r\n    <label class=\"font-large\">2. Оплата</label>\r\n    <div id=\"form-container\" class=\"row\">\r\n        <div id=\"liqpay\" class=\"col-12\"></div>\r\n        <div id=\"liqpay-result\" class=\"col-12\">\r\n            <div class=\"alert alert-success\" id=\"done\">\r\n                Замовлення прийняте! Очікуйте доставку.\r\n            </div>\r\n            <button class=\"btn float-right\" onclick=\"window.location.href = '/'\"\">На головну</button>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n<div class=\"col-md-9 gap\"></div>\r\n\r\n<div class=\"col-md-12 footer border-bottom border-top\">\r\n    <p class=\"text-center\">Проект PIZZA KMA - студентський проект НаУКМА.</p>\r\n</div>        ");

},{"ejs":7}],4:[function(require,module,exports){
var Storage = require("../LocalStorage");
var Templates = require("../Templates");

var Cart = [];
var $cart = $("#cart");

function initializeCart() {
    var cart = Storage.get("cart");
    if(cart) Cart = cart;

    Storage.set("cart", Cart);
    $cart.html("");
    var totprice = 0;

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);
        totprice = totprice + cart_item.pizza[cart_item.size].price*cart_item.quantity;

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    $(".total-price").text(totprice +" грн");
    $("#pizzaNumber").text(Cart.length);
}


$(".home-img").click(function(){window.location.href = "/";});

function getCartItems() {
    return Cart;
}

var $name = $("#i-name");
var $phone = $("#i-phone");
var $address = $("#i-address");

var $nameLabel = $("#label-name");
var $phoneLabel = $("#label-phone");
var $addressLabel = $("#label-address");

var NAME_REGEX = /^([А-я]|[І,і,Ї,ї,Є,є]){3,12}\s([А-я]|[І,і,Ї,ї,Є,є]){2,16}$/;
var PHONE_REGEX = /^(\+38)?0[3-9]\d\d{7}$/;
var ADDRESS_REGEX = /[\s\S]{10,50}/;

function initializeValidators() {
    initializeValidator($name, NAME_REGEX, $nameLabel);
    initializeValidator($phone, PHONE_REGEX, $phoneLabel);
    initializeValidator($address, ADDRESS_REGEX, $addressLabel);
}

function initializeValidator(input, regex, label) {
    input.focusout(() => {
        validate();
    });

    function validate() {
        if (!regex.test(input.val().trim())) {
            input.removeClass("success");
            input.addClass("fail");
            label.removeClass("success");
            label.addClass("fail");
        } else {
            input.removeClass("fail");
            input.addClass("success");
            label.removeClass("fail");
            label.addClass("success");
        }
    }

    validate();
}

function isOk() {
    return (
        !$name.hasClass("fail") &&
        !$phone.hasClass("fail") &&
        !$address.hasClass("fail")
    );
}

function getFormData() {
    return {
        name: $name.val().trim(),
        phone: $phone.val(),
        address: $address.val().trim()
    };
}

$(document).ready(() => {
    var API = require("../API");

    initializeCart();
    if (!getCartItems() || getCartItems().length == 0) {
        alert("Корзина порожня!");
        window.location.href = "/";
    }

    initMap();

    $("#next").click(function() {
        initializeValidators();
        if (isOk()) {
            var data = { 
                customerData: getFormData(), 
                cart: getCartItems() 
            };

            var $container = $(".left_block");
            $container.html("");
            var htmlCode = Templates.LiqPayWidget();            

            API.createOrder(data, function(err, result) {
                initLiqPay(result);
            });

            $(htmlCode).appendTo($container);
        }
    });
});

function initLiqPay(requestResult) {
    var data = JSON.parse(requestResult);
    LiqPayCheckout.init({
        data: data.data,
        signature: data.signature,
        embedTo: "#liqpay",
        mode: "embed", //	embed	||	popup
        language: "uk"
    })
        .on("liqpay.callback", result =>
            processPaymentResult(result.status)
        )
        .on("liqpay.close", () => (window.location.href = "/"));
}

function processPaymentResult(paymentStatus) {
    if (paymentStatus === "success" || paymentStatus === "sandbox") {
        $("#done").addClass("visible");
        $cart.html("");
        $("#pizzaNumber").html(0);
        Cart = [];
        Storage.set("cart", Cart);
    }
}

//MAPS

var map;
var store	=	new	google.maps.LatLng(50.464379,30.519131);
var duration;
var markerTo;
var dirRenderer = new google.maps.DirectionsRenderer();

function addMarker(loc, map_) {
    markerTo	=	new	google.maps.Marker({
        position:	loc,
        //map	- це змінна карти створена за допомогою new	
        //google.maps.Map(...)
        map:	map_,
        icon:	"assets/images/home-icon.png"
    });
}

function initMap()	{
    //Тут починаємо працювати з картою
    var mapProp =	{
        center:	store,
        zoom:	13
    };
    var html_element =	document.getElementById('googleMap');
    map	=	new	google.maps.Map(html_element, mapProp);
    //Карта створена і показана

    var marker	=	new	google.maps.Marker({
        position:	store,
        map:	map,
        icon:	"assets/images/map-icon.png"
    });

    google.maps.event.addListener(map,	
        'click',function(me){
            if(markerTo)  {markerTo.setMap(null);}
            dirRenderer.setMap(null);

            var coordinates	=	me.latLng;
            addMarker(coordinates, map);

            geocodeLatLng(coordinates);
            calculateRoute(store,	 coordinates);
            
    });
}

function oper(a, thisDuration) {
    duration = thisDuration;
}

function	geocodeLatLng(latlng){ //, callback
    //Модуль за роботу з адресою
    var geocoder	=	new	google.maps.Geocoder();
    geocoder.geocode({'location':	latlng},	function(results,	status)	{
        if	(status	===	google.maps.GeocoderStatus.OK&&	results[1])	{
            var address =	results[1].formatted_address;
            $("#i-address").val(address);
            //callback(null,	adress);
        }	else	{
            //callback(new	Error("Can't	find	adress"));
        }
    });
}

function	calculateRoute(A_latlng,	 B_latlng)	{ //, callback
    var directionService =	new	google.maps.DirectionsService();
    directionService.route({
        origin:	A_latlng,
        destination:	B_latlng,
        travelMode:	google.maps.TravelMode["DRIVING"]
    },	function(response,	status)	{
        if	(	status	==	google.maps.DirectionsStatus.OK )	{
            var leg	=	response.routes[	0	].legs[	0	];
            drawRoute(response);
            duration = leg.duration;
            /*callback(null,	{
            duration:	leg.duration
        });*/
        }	else	{
           // callback(new	Error("Can'	not	find	direction"));
        }
    });
}

function drawRoute(route) {
    dirRenderer.setMap(map);
    dirRenderer.setOptions({ suppressMarkers: true });
    dirRenderer.setDirections(route);
}

function	geocodeAddress(adress,	 callback)	{
    var geocoder	=	new	google.maps.Geocoder();
    geocoder.geocode({'address':	address},	function(results,	status)	{
        if	(status	===	google.maps.GeocoderStatus.OK&&	results[0])	{
            var coordinates	=	results[0].geometry.location;
            callback(null,	coordinates);
        }	else	{
            callback(new	Error("Can	not	find	the	adress"));
        }
    });
}

},{"../API":1,"../LocalStorage":2,"../Templates":3}],5:[function(require,module,exports){
(function () {
	// Basil
	var Basil = function (options) {
		return Basil.utils.extend({}, Basil.plugins, new Basil.Storage().init(options));
	};

	// Version
	Basil.version = '0.4.2';

	// Utils
	Basil.utils = {
		extend: function () {
			var destination = typeof arguments[0] === 'object' ? arguments[0] : {};
			for (var i = 1; i < arguments.length; i++) {
				if (arguments[i] && typeof arguments[i] === 'object')
					for (var property in arguments[i])
						destination[property] = arguments[i][property];
			}
			return destination;
		},
		each: function (obj, fnIterator, context) {
			if (this.isArray(obj)) {
				for (var i = 0; i < obj.length; i++)
					if (fnIterator.call(context, obj[i], i) === false) return;
			} else if (obj) {
				for (var key in obj)
					if (fnIterator.call(context, obj[key], key) === false) return;
			}
		},
		tryEach: function (obj, fnIterator, fnError, context) {
			this.each(obj, function (value, key) {
				try {
					return fnIterator.call(context, value, key);
				} catch (error) {
					if (this.isFunction(fnError)) {
						try {
							fnError.call(context, value, key, error);
						} catch (error) {}
					}
				}
			}, this);
		},
		registerPlugin: function (methods) {
			Basil.plugins = this.extend(methods, Basil.plugins);
		}
	};
  	// Add some isType methods: isArguments, isBoolean, isFunction, isString, isArray, isNumber, isDate, isRegExp.
	var types = ['Arguments', 'Boolean', 'Function', 'String', 'Array', 'Number', 'Date', 'RegExp']
	for (var i = 0; i < types.length; i++) {
		Basil.utils['is' + types[i]] = (function (type) {
			return function (obj) {
				return Object.prototype.toString.call(obj) === '[object ' + type + ']';
			};
		})(types[i]);
	}

	// Plugins
	Basil.plugins = {};

	// Options
	Basil.options = Basil.utils.extend({
		namespace: 'b45i1',
		storages: ['local', 'cookie', 'session', 'memory'],
		expireDays: 365
	}, window.Basil ? window.Basil.options : {});

	// Storage
	Basil.Storage = function () {
		var _salt = 'b45i1' + (Math.random() + 1)
				.toString(36)
				.substring(7),
			_storages = {},
			_toStoragesArray = function (storages) {
				if (Basil.utils.isArray(storages))
					return storages;
				return Basil.utils.isString(storages) ? [storages] : [];
			},
			_toStoredKey = function (namespace, path) {
				var key = '';
				if (Basil.utils.isString(path) && path.length)
					path = [path];
				if (Basil.utils.isArray(path) && path.length)
					key = path.join('.');
				return key && namespace ? namespace + '.' + key : key;
			},
			_toKeyName = function (namespace, key) {
				if (!namespace)
					return key;
				return key.replace(new RegExp('^' + namespace + '.'), '');
			},
			_toStoredValue = function (value) {
				return JSON.stringify(value);
			},
			_fromStoredValue = function (value) {
				return value ? JSON.parse(value) : null;
			};

		// HTML5 web storage interface
		var webStorageInterface = {
			engine: null,
			check: function () {
				try {
					window[this.engine].setItem(_salt, true);
					window[this.engine].removeItem(_salt);
				} catch (e) {
					return false;
				}
				return true;
			},
			set: function (key, value, options) {
				if (!key)
					throw Error('invalid key');
				window[this.engine].setItem(key, value);
			},
			get: function (key) {
				return window[this.engine].getItem(key);
			},
			remove: function (key) {
				window[this.engine].removeItem(key);
			},
			reset: function (namespace) {
				for (var i = 0, key; i < window[this.engine].length; i++) {
					key = window[this.engine].key(i);
					if (!namespace || key.indexOf(namespace) === 0) {
						this.remove(key);
						i--;
					}
				}
			},
			keys: function (namespace) {
				var keys = [];
				for (var i = 0, key; i < window[this.engine].length; i++) {
					key = window[this.engine].key(i);
					if (!namespace || key.indexOf(namespace) === 0)
						keys.push(_toKeyName(namespace, key));
				}
				return keys;
			}
		};

		// local storage
		_storages.local = Basil.utils.extend({}, webStorageInterface, {
			engine: 'localStorage'
		});
		// session storage
		_storages.session = Basil.utils.extend({}, webStorageInterface, {
			engine: 'sessionStorage'
		});

		// memory storage
		_storages.memory = {
			_hash: {},
			check: function () {
				return true;
			},
			set: function (key, value, options) {
				if (!key)
					throw Error('invalid key');
				this._hash[key] = value;
			},
			get: function (key) {
				return this._hash[key] || null;
			},
			remove: function (key) {
				delete this._hash[key];
			},
			reset: function (namespace) {
				for (var key in this._hash) {
					if (!namespace || key.indexOf(namespace) === 0)
						this.remove(key);
				}
			},
			keys: function (namespace) {
				var keys = [];
				for (var key in this._hash)
					if (!namespace || key.indexOf(namespace) === 0)
						keys.push(_toKeyName(namespace, key));
				return keys;
			}
		};

		// cookie storage
		_storages.cookie = {
			check: function () {
				return navigator.cookieEnabled;
			},
			set: function (key, value, options) {
				if (!this.check())
					throw Error('cookies are disabled');
				options = options || {};
				if (!key)
					throw Error('invalid key');
				var cookie = encodeURIComponent(key) + '=' + encodeURIComponent(value);
				// handle expiration days
				if (options.expireDays) {
					var date = new Date();
					date.setTime(date.getTime() + (options.expireDays * 24 * 60 * 60 * 1000));
					cookie += '; expires=' + date.toGMTString();
				}
				// handle domain
				if (options.domain && options.domain !== document.domain) {
					var _domain = options.domain.replace(/^\./, '');
					if (document.domain.indexOf(_domain) === -1 || _domain.split('.').length <= 1)
						throw Error('invalid domain');
					cookie += '; domain=' + options.domain;
				}
				// handle secure
				if (options.secure === true) {
					cookie += '; secure';
				}
				document.cookie = cookie + '; path=/';
			},
			get: function (key) {
				if (!this.check())
					throw Error('cookies are disabled');
				var encodedKey = encodeURIComponent(key);
				var cookies = document.cookie ? document.cookie.split(';') : [];
				// retrieve last updated cookie first
				for (var i = cookies.length - 1, cookie; i >= 0; i--) {
					cookie = cookies[i].replace(/^\s*/, '');
					if (cookie.indexOf(encodedKey + '=') === 0)
						return decodeURIComponent(cookie.substring(encodedKey.length + 1, cookie.length));
				}
				return null;
			},
			remove: function (key) {
				// remove cookie from main domain
				this.set(key, '', { expireDays: -1 });
				// remove cookie from upper domains
				var domainParts = document.domain.split('.');
				for (var i = domainParts.length; i >= 0; i--) {
					this.set(key, '', { expireDays: -1, domain: '.' + domainParts.slice(- i).join('.') });
				}
			},
			reset: function (namespace) {
				var cookies = document.cookie ? document.cookie.split(';') : [];
				for (var i = 0, cookie, key; i < cookies.length; i++) {
					cookie = cookies[i].replace(/^\s*/, '');
					key = cookie.substr(0, cookie.indexOf('='));
					if (!namespace || key.indexOf(namespace) === 0)
						this.remove(key);
				}
			},
			keys: function (namespace) {
				if (!this.check())
					throw Error('cookies are disabled');
				var keys = [],
					cookies = document.cookie ? document.cookie.split(';') : [];
				for (var i = 0, cookie, key; i < cookies.length; i++) {
					cookie = cookies[i].replace(/^\s*/, '');
					key = decodeURIComponent(cookie.substr(0, cookie.indexOf('=')));
					if (!namespace || key.indexOf(namespace) === 0)
						keys.push(_toKeyName(namespace, key));
				}
				return keys;
			}
		};

		return {
			init: function (options) {
				this.setOptions(options);
				return this;
			},
			setOptions: function (options) {
				this.options = Basil.utils.extend({}, this.options || Basil.options, options);
			},
			support: function (storage) {
				return _storages.hasOwnProperty(storage);
			},
			check: function (storage) {
				if (this.support(storage))
					return _storages[storage].check();
				return false;
			},
			set: function (key, value, options) {
				options = Basil.utils.extend({}, this.options, options);
				if (!(key = _toStoredKey(options.namespace, key)))
					return false;
				value = options.raw === true ? value : _toStoredValue(value);
				var where = null;
				// try to set key/value in first available storage
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage, index) {
					_storages[storage].set(key, value, options);
					where = storage;
					return false; // break;
				}, null, this);
				if (!where) {
					// key has not been set anywhere
					return false;
				}
				// remove key from all other storages
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage, index) {
					if (storage !== where)
						_storages[storage].remove(key);
				}, null, this);
				return true;
			},
			get: function (key, options) {
				options = Basil.utils.extend({}, this.options, options);
				if (!(key = _toStoredKey(options.namespace, key)))
					return null;
				var value = null;
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage, index) {
					if (value !== null)
						return false; // break if a value has already been found.
					value = _storages[storage].get(key, options) || null;
					value = options.raw === true ? value : _fromStoredValue(value);
				}, function (storage, index, error) {
					value = null;
				}, this);
				return value;
			},
			remove: function (key, options) {
				options = Basil.utils.extend({}, this.options, options);
				if (!(key = _toStoredKey(options.namespace, key)))
					return;
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage) {
					_storages[storage].remove(key);
				}, null, this);
			},
			reset: function (options) {
				options = Basil.utils.extend({}, this.options, options);
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage) {
					_storages[storage].reset(options.namespace);
				}, null, this);
			},
			keys: function (options) {
				options = options || {};
				var keys = [];
				for (var key in this.keysMap(options))
					keys.push(key);
				return keys;
			},
			keysMap: function (options) {
				options = Basil.utils.extend({}, this.options, options);
				var map = {};
				Basil.utils.tryEach(_toStoragesArray(options.storages), function (storage) {
					Basil.utils.each(_storages[storage].keys(options.namespace), function (key) {
						map[key] = Basil.utils.isArray(map[key]) ? map[key] : [];
						map[key].push(storage);
					}, this);
				}, null, this);
				return map;
			}
		};
	};

	// Access to native storages, without namespace or basil value decoration
	Basil.memory = new Basil.Storage().init({ storages: 'memory', namespace: null, raw: true });
	Basil.cookie = new Basil.Storage().init({ storages: 'cookie', namespace: null, raw: true });
	Basil.localStorage = new Basil.Storage().init({ storages: 'local', namespace: null, raw: true });
	Basil.sessionStorage = new Basil.Storage().init({ storages: 'session', namespace: null, raw: true });

	// browser export
	window.Basil = Basil;

	// AMD export
	if (typeof define === 'function' && define.amd) {
		define(function() {
			return Basil;
		});
	// commonjs export
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = Basil;
	}

})();

},{}],6:[function(require,module,exports){

},{}],7:[function(require,module,exports){
/*
 * EJS Embedded JavaScript templates
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

'use strict';

/**
 * @file Embedded JavaScript templating engine. {@link http://ejs.co}
 * @author Matthew Eernisse <mde@fleegix.org>
 * @author Tiancheng "Timothy" Gu <timothygu99@gmail.com>
 * @project EJS
 * @license {@link http://www.apache.org/licenses/LICENSE-2.0 Apache License, Version 2.0}
 */

/**
 * EJS internal functions.
 *
 * Technically this "module" lies in the same file as {@link module:ejs}, for
 * the sake of organization all the private functions re grouped into this
 * module.
 *
 * @module ejs-internal
 * @private
 */

/**
 * Embedded JavaScript templating engine.
 *
 * @module ejs
 * @public
 */

var fs = require('fs');
var path = require('path');
var utils = require('./utils');

var scopeOptionWarned = false;
var _VERSION_STRING = require('../package.json').version;
var _DEFAULT_OPEN_DELIMITER = '<';
var _DEFAULT_CLOSE_DELIMITER = '>';
var _DEFAULT_DELIMITER = '%';
var _DEFAULT_LOCALS_NAME = 'locals';
var _NAME = 'ejs';
var _REGEX_STRING = '(<%%|%%>|<%=|<%-|<%_|<%#|<%|%>|-%>|_%>)';
var _OPTS_PASSABLE_WITH_DATA = ['delimiter', 'scope', 'context', 'debug', 'compileDebug',
  'client', '_with', 'rmWhitespace', 'strict', 'filename', 'async'];
// We don't allow 'cache' option to be passed in the data obj for
// the normal `render` call, but this is where Express 2 & 3 put it
// so we make an exception for `renderFile`
var _OPTS_PASSABLE_WITH_DATA_EXPRESS = _OPTS_PASSABLE_WITH_DATA.concat('cache');
var _BOM = /^\uFEFF/;

/**
 * EJS template function cache. This can be a LRU object from lru-cache NPM
 * module. By default, it is {@link module:utils.cache}, a simple in-process
 * cache that grows continuously.
 *
 * @type {Cache}
 */

exports.cache = utils.cache;

/**
 * Custom file loader. Useful for template preprocessing or restricting access
 * to a certain part of the filesystem.
 *
 * @type {fileLoader}
 */

exports.fileLoader = fs.readFileSync;

/**
 * Name of the object containing the locals.
 *
 * This variable is overridden by {@link Options}`.localsName` if it is not
 * `undefined`.
 *
 * @type {String}
 * @public
 */

exports.localsName = _DEFAULT_LOCALS_NAME;

/**
 * Promise implementation -- defaults to the native implementation if available
 * This is mostly just for testability
 *
 * @type {Function}
 * @public
 */

exports.promiseImpl = (new Function('return this;'))().Promise;

/**
 * Get the path to the included file from the parent file path and the
 * specified path.
 *
 * @param {String}  name     specified path
 * @param {String}  filename parent file path
 * @param {Boolean} isDir    parent file path whether is directory
 * @return {String}
 */
exports.resolveInclude = function(name, filename, isDir) {
  var dirname = path.dirname;
  var extname = path.extname;
  var resolve = path.resolve;
  var includePath = resolve(isDir ? filename : dirname(filename), name);
  var ext = extname(name);
  if (!ext) {
    includePath += '.ejs';
  }
  return includePath;
};

/**
 * Get the path to the included file by Options
 *
 * @param  {String}  path    specified path
 * @param  {Options} options compilation options
 * @return {String}
 */
function getIncludePath(path, options) {
  var includePath;
  var filePath;
  var views = options.views;
  var match = /^[A-Za-z]+:\\|^\//.exec(path);

  // Abs path
  if (match && match.length) {
    includePath = exports.resolveInclude(path.replace(/^\/*/,''), options.root || '/', true);
  }
  // Relative paths
  else {
    // Look relative to a passed filename first
    if (options.filename) {
      filePath = exports.resolveInclude(path, options.filename);
      if (fs.existsSync(filePath)) {
        includePath = filePath;
      }
    }
    // Then look in any views directories
    if (!includePath) {
      if (Array.isArray(views) && views.some(function (v) {
        filePath = exports.resolveInclude(path, v, true);
        return fs.existsSync(filePath);
      })) {
        includePath = filePath;
      }
    }
    if (!includePath) {
      throw new Error('Could not find the include file "' +
          options.escapeFunction(path) + '"');
    }
  }
  return includePath;
}

/**
 * Get the template from a string or a file, either compiled on-the-fly or
 * read from cache (if enabled), and cache the template if needed.
 *
 * If `template` is not set, the file specified in `options.filename` will be
 * read.
 *
 * If `options.cache` is true, this function reads the file from
 * `options.filename` so it must be set prior to calling this function.
 *
 * @memberof module:ejs-internal
 * @param {Options} options   compilation options
 * @param {String} [template] template source
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `options.client`, either type might be returned.
 * @static
 */

function handleCache(options, template) {
  var func;
  var filename = options.filename;
  var hasTemplate = arguments.length > 1;

  if (options.cache) {
    if (!filename) {
      throw new Error('cache option requires a filename');
    }
    func = exports.cache.get(filename);
    if (func) {
      return func;
    }
    if (!hasTemplate) {
      template = fileLoader(filename).toString().replace(_BOM, '');
    }
  }
  else if (!hasTemplate) {
    // istanbul ignore if: should not happen at all
    if (!filename) {
      throw new Error('Internal EJS error: no file name or template '
                    + 'provided');
    }
    template = fileLoader(filename).toString().replace(_BOM, '');
  }
  func = exports.compile(template, options);
  if (options.cache) {
    exports.cache.set(filename, func);
  }
  return func;
}

/**
 * Try calling handleCache with the given options and data and call the
 * callback with the result. If an error occurs, call the callback with
 * the error. Used by renderFile().
 *
 * @memberof module:ejs-internal
 * @param {Options} options    compilation options
 * @param {Object} data        template data
 * @param {RenderFileCallback} cb callback
 * @static
 */

function tryHandleCache(options, data, cb) {
  var result;
  if (!cb) {
    if (typeof exports.promiseImpl == 'function') {
      return new exports.promiseImpl(function (resolve, reject) {
        try {
          result = handleCache(options)(data);
          resolve(result);
        }
        catch (err) {
          reject(err);
        }
      });
    }
    else {
      throw new Error('Please provide a callback function');
    }
  }
  else {
    try {
      result = handleCache(options)(data);
    }
    catch (err) {
      return cb(err);
    }

    cb(null, result);
  }
}

/**
 * fileLoader is independent
 *
 * @param {String} filePath ejs file path.
 * @return {String} The contents of the specified file.
 * @static
 */

function fileLoader(filePath){
  return exports.fileLoader(filePath);
}

/**
 * Get the template function.
 *
 * If `options.cache` is `true`, then the template is cached.
 *
 * @memberof module:ejs-internal
 * @param {String}  path    path for the specified file
 * @param {Options} options compilation options
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `options.client`, either type might be returned
 * @static
 */

function includeFile(path, options) {
  var opts = utils.shallowCopy({}, options);
  opts.filename = getIncludePath(path, opts);
  return handleCache(opts);
}

/**
 * Get the JavaScript source of an included file.
 *
 * @memberof module:ejs-internal
 * @param {String}  path    path for the specified file
 * @param {Options} options compilation options
 * @return {Object}
 * @static
 */

function includeSource(path, options) {
  var opts = utils.shallowCopy({}, options);
  var includePath;
  var template;
  includePath = getIncludePath(path, opts);
  template = fileLoader(includePath).toString().replace(_BOM, '');
  opts.filename = includePath;
  var templ = new Template(template, opts);
  templ.generateSource();
  return {
    source: templ.source,
    filename: includePath,
    template: template
  };
}

/**
 * Re-throw the given `err` in context to the `str` of ejs, `filename`, and
 * `lineno`.
 *
 * @implements RethrowCallback
 * @memberof module:ejs-internal
 * @param {Error}  err      Error object
 * @param {String} str      EJS source
 * @param {String} filename file name of the EJS file
 * @param {String} lineno   line number of the error
 * @static
 */

function rethrow(err, str, flnm, lineno, esc){
  var lines = str.split('\n');
  var start = Math.max(lineno - 3, 0);
  var end = Math.min(lines.length, lineno + 3);
  var filename = esc(flnm); // eslint-disable-line
  // Error context
  var context = lines.slice(start, end).map(function (line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;

  throw err;
}

function stripSemi(str){
  return str.replace(/;(\s*$)/, '$1');
}

/**
 * Compile the given `str` of ejs into a template function.
 *
 * @param {String}  template EJS template
 *
 * @param {Options} opts     compilation options
 *
 * @return {(TemplateFunction|ClientFunction)}
 * Depending on the value of `opts.client`, either type might be returned.
 * Note that the return type of the function also depends on the value of `opts.async`.
 * @public
 */

exports.compile = function compile(template, opts) {
  var templ;

  // v1 compat
  // 'scope' is 'context'
  // FIXME: Remove this in a future version
  if (opts && opts.scope) {
    if (!scopeOptionWarned){
      console.warn('`scope` option is deprecated and will be removed in EJS 3');
      scopeOptionWarned = true;
    }
    if (!opts.context) {
      opts.context = opts.scope;
    }
    delete opts.scope;
  }
  templ = new Template(template, opts);
  return templ.compile();
};

/**
 * Render the given `template` of ejs.
 *
 * If you would like to include options but not data, you need to explicitly
 * call this function with `data` being an empty object or `null`.
 *
 * @param {String}   template EJS template
 * @param {Object}  [data={}] template data
 * @param {Options} [opts={}] compilation and rendering options
 * @return {(String|Promise<String>)}
 * Return value type depends on `opts.async`.
 * @public
 */

exports.render = function (template, d, o) {
  var data = d || {};
  var opts = o || {};

  // No options object -- if there are optiony names
  // in the data, copy them to options
  if (arguments.length == 2) {
    utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA);
  }

  return handleCache(opts, template)(data);
};

/**
 * Render an EJS file at the given `path` and callback `cb(err, str)`.
 *
 * If you would like to include options but not data, you need to explicitly
 * call this function with `data` being an empty object or `null`.
 *
 * @param {String}             path     path to the EJS file
 * @param {Object}            [data={}] template data
 * @param {Options}           [opts={}] compilation and rendering options
 * @param {RenderFileCallback} cb callback
 * @public
 */

exports.renderFile = function () {
  var args = Array.prototype.slice.call(arguments);
  var filename = args.shift();
  var cb;
  var opts = {filename: filename};
  var data;
  var viewOpts;

  // Do we have a callback?
  if (typeof arguments[arguments.length - 1] == 'function') {
    cb = args.pop();
  }
  // Do we have data/opts?
  if (args.length) {
    // Should always have data obj
    data = args.shift();
    // Normal passed opts (data obj + opts obj)
    if (args.length) {
      // Use shallowCopy so we don't pollute passed in opts obj with new vals
      utils.shallowCopy(opts, args.pop());
    }
    // Special casing for Express (settings + opts-in-data)
    else {
      // Express 3 and 4
      if (data.settings) {
        // Pull a few things from known locations
        if (data.settings.views) {
          opts.views = data.settings.views;
        }
        if (data.settings['view cache']) {
          opts.cache = true;
        }
        // Undocumented after Express 2, but still usable, esp. for
        // items that are unsafe to be passed along with data, like `root`
        viewOpts = data.settings['view options'];
        if (viewOpts) {
          utils.shallowCopy(opts, viewOpts);
        }
      }
      // Express 2 and lower, values set in app.locals, or people who just
      // want to pass options in their data. NOTE: These values will override
      // anything previously set in settings  or settings['view options']
      utils.shallowCopyFromList(opts, data, _OPTS_PASSABLE_WITH_DATA_EXPRESS);
    }
    opts.filename = filename;
  }
  else {
    data = {};
  }

  return tryHandleCache(opts, data, cb);
};

/**
 * Clear intermediate JavaScript cache. Calls {@link Cache#reset}.
 * @public
 */

/**
 * EJS template class
 * @public
 */
exports.Template = Template;

exports.clearCache = function () {
  exports.cache.reset();
};

function Template(text, opts) {
  opts = opts || {};
  var options = {};
  this.templateText = text;
  this.mode = null;
  this.truncate = false;
  this.currentLine = 1;
  this.source = '';
  this.dependencies = [];
  options.client = opts.client || false;
  options.escapeFunction = opts.escape || opts.escapeFunction || utils.escapeXML;
  options.compileDebug = opts.compileDebug !== false;
  options.debug = !!opts.debug;
  options.filename = opts.filename;
  options.openDelimiter = opts.openDelimiter || exports.openDelimiter || _DEFAULT_OPEN_DELIMITER;
  options.closeDelimiter = opts.closeDelimiter || exports.closeDelimiter || _DEFAULT_CLOSE_DELIMITER;
  options.delimiter = opts.delimiter || exports.delimiter || _DEFAULT_DELIMITER;
  options.strict = opts.strict || false;
  options.context = opts.context;
  options.cache = opts.cache || false;
  options.rmWhitespace = opts.rmWhitespace;
  options.root = opts.root;
  options.outputFunctionName = opts.outputFunctionName;
  options.localsName = opts.localsName || exports.localsName || _DEFAULT_LOCALS_NAME;
  options.views = opts.views;
  options.async = opts.async;
  options.destructuredLocals = opts.destructuredLocals;
  options.legacyInclude = typeof opts.legacyInclude != 'undefined' ? !!opts.legacyInclude : true;

  if (options.strict) {
    options._with = false;
  }
  else {
    options._with = typeof opts._with != 'undefined' ? opts._with : true;
  }

  this.opts = options;

  this.regex = this.createRegex();
}

Template.modes = {
  EVAL: 'eval',
  ESCAPED: 'escaped',
  RAW: 'raw',
  COMMENT: 'comment',
  LITERAL: 'literal'
};

Template.prototype = {
  createRegex: function () {
    var str = _REGEX_STRING;
    var delim = utils.escapeRegExpChars(this.opts.delimiter);
    var open = utils.escapeRegExpChars(this.opts.openDelimiter);
    var close = utils.escapeRegExpChars(this.opts.closeDelimiter);
    str = str.replace(/%/g, delim)
      .replace(/</g, open)
      .replace(/>/g, close);
    return new RegExp(str);
  },

  compile: function () {
    var src;
    var fn;
    var opts = this.opts;
    var prepended = '';
    var appended = '';
    var escapeFn = opts.escapeFunction;
    var ctor;

    if (!this.source) {
      this.generateSource();
      prepended +=
        '  var __output = "";\n' +
        '  function __append(s) { if (s !== undefined && s !== null) __output += s }\n';
      if (opts.outputFunctionName) {
        prepended += '  var ' + opts.outputFunctionName + ' = __append;' + '\n';
      }
      if (opts.destructuredLocals && opts.destructuredLocals.length) {
        var destructuring = '  var __locals = (' + opts.localsName + ' || {}),\n';
        for (var i = 0; i < opts.destructuredLocals.length; i++) {
          var name = opts.destructuredLocals[i];
          if (i > 0) {
            destructuring += ',\n  ';
          }
          destructuring += name + ' = __locals.' + name;
        }
        prepended += destructuring + ';\n';
      }
      if (opts._with !== false) {
        prepended +=  '  with (' + opts.localsName + ' || {}) {' + '\n';
        appended += '  }' + '\n';
      }
      appended += '  return __output;' + '\n';
      this.source = prepended + this.source + appended;
    }

    if (opts.compileDebug) {
      src = 'var __line = 1' + '\n'
        + '  , __lines = ' + JSON.stringify(this.templateText) + '\n'
        + '  , __filename = ' + (opts.filename ?
        JSON.stringify(opts.filename) : 'undefined') + ';' + '\n'
        + 'try {' + '\n'
        + this.source
        + '} catch (e) {' + '\n'
        + '  rethrow(e, __lines, __filename, __line, escapeFn);' + '\n'
        + '}' + '\n';
    }
    else {
      src = this.source;
    }

    if (opts.client) {
      src = 'escapeFn = escapeFn || ' + escapeFn.toString() + ';' + '\n' + src;
      if (opts.compileDebug) {
        src = 'rethrow = rethrow || ' + rethrow.toString() + ';' + '\n' + src;
      }
    }

    if (opts.strict) {
      src = '"use strict";\n' + src;
    }
    if (opts.debug) {
      console.log(src);
    }
    if (opts.compileDebug && opts.filename) {
      src = src + '\n'
        + '//# sourceURL=' + opts.filename + '\n';
    }

    try {
      if (opts.async) {
        // Have to use generated function for this, since in envs without support,
        // it breaks in parsing
        try {
          ctor = (new Function('return (async function(){}).constructor;'))();
        }
        catch(e) {
          if (e instanceof SyntaxError) {
            throw new Error('This environment does not support async/await');
          }
          else {
            throw e;
          }
        }
      }
      else {
        ctor = Function;
      }
      fn = new ctor(opts.localsName + ', escapeFn, include, rethrow', src);
    }
    catch(e) {
      // istanbul ignore else
      if (e instanceof SyntaxError) {
        if (opts.filename) {
          e.message += ' in ' + opts.filename;
        }
        e.message += ' while compiling ejs\n\n';
        e.message += 'If the above error is not helpful, you may want to try EJS-Lint:\n';
        e.message += 'https://github.com/RyanZim/EJS-Lint';
        if (!opts.async) {
          e.message += '\n';
          e.message += 'Or, if you meant to create an async function, pass `async: true` as an option.';
        }
      }
      throw e;
    }

    // Return a callable function which will execute the function
    // created by the source-code, with the passed data as locals
    // Adds a local `include` function which allows full recursive include
    var returnedFn = opts.client ? fn : function anonymous(data) {
      var include = function (path, includeData) {
        var d = utils.shallowCopy({}, data);
        if (includeData) {
          d = utils.shallowCopy(d, includeData);
        }
        return includeFile(path, opts)(d);
      };
      return fn.apply(opts.context, [data || {}, escapeFn, include, rethrow]);
    };
    returnedFn.dependencies = this.dependencies;
    if (opts.filename && typeof Object.defineProperty === 'function') {
      var filename = opts.filename;
      var basename = path.basename(filename, path.extname(filename));
      try {
        Object.defineProperty(returnedFn, 'name', {
          value: basename,
          writable: false,
          enumerable: false,
          configurable: true
        });
      } catch (e) {/* ignore */}
    }
    return returnedFn;
  },

  generateSource: function () {
    var opts = this.opts;

    if (opts.rmWhitespace) {
      // Have to use two separate replace here as `^` and `$` operators don't
      // work well with `\r` and empty lines don't work well with the `m` flag.
      this.templateText =
        this.templateText.replace(/[\r\n]+/g, '\n').replace(/^\s+|\s+$/gm, '');
    }

    // Slurp spaces and tabs before <%_ and after _%>
    this.templateText =
      this.templateText.replace(/[ \t]*<%_/gm, '<%_').replace(/_%>[ \t]*/gm, '_%>');

    var self = this;
    var matches = this.parseTemplateText();
    var d = this.opts.delimiter;
    var o = this.opts.openDelimiter;
    var c = this.opts.closeDelimiter;

    if (matches && matches.length) {
      matches.forEach(function (line, index) {
        var opening;
        var closing;
        var include;
        var includeOpts;
        var includeObj;
        var includeSrc;
        // If this is an opening tag, check for closing tags
        // FIXME: May end up with some false positives here
        // Better to store modes as k/v with openDelimiter + delimiter as key
        // Then this can simply check against the map
        if ( line.indexOf(o + d) === 0        // If it is a tag
          && line.indexOf(o + d + d) !== 0) { // and is not escaped
          closing = matches[index + 2];
          if (!(closing == d + c || closing == '-' + d + c || closing == '_' + d + c)) {
            throw new Error('Could not find matching close tag for "' + line + '".');
          }
        }
        // HACK: backward-compat `include` preprocessor directives
        if (opts.legacyInclude && (include = line.match(/^\s*include\s+(\S+)/))) {
          opening = matches[index - 1];
          // Must be in EVAL or RAW mode
          if (opening && (opening == o + d || opening == o + d + '-' || opening == o + d + '_')) {
            includeOpts = utils.shallowCopy({}, self.opts);
            includeObj = includeSource(include[1], includeOpts);
            if (self.opts.compileDebug) {
              includeSrc =
                  '    ; (function(){' + '\n'
                  + '      var __line = 1' + '\n'
                  + '      , __lines = ' + JSON.stringify(includeObj.template) + '\n'
                  + '      , __filename = ' + JSON.stringify(includeObj.filename) + ';' + '\n'
                  + '      try {' + '\n'
                  + includeObj.source
                  + '      } catch (e) {' + '\n'
                  + '        rethrow(e, __lines, __filename, __line, escapeFn);' + '\n'
                  + '      }' + '\n'
                  + '    ; }).call(this)' + '\n';
            }else{
              includeSrc = '    ; (function(){' + '\n' + includeObj.source +
                  '    ; }).call(this)' + '\n';
            }
            self.source += includeSrc;
            self.dependencies.push(exports.resolveInclude(include[1],
              includeOpts.filename));
            return;
          }
        }
        self.scanLine(line);
      });
    }

  },

  parseTemplateText: function () {
    var str = this.templateText;
    var pat = this.regex;
    var result = pat.exec(str);
    var arr = [];
    var firstPos;

    while (result) {
      firstPos = result.index;

      if (firstPos !== 0) {
        arr.push(str.substring(0, firstPos));
        str = str.slice(firstPos);
      }

      arr.push(result[0]);
      str = str.slice(result[0].length);
      result = pat.exec(str);
    }

    if (str) {
      arr.push(str);
    }

    return arr;
  },

  _addOutput: function (line) {
    if (this.truncate) {
      // Only replace single leading linebreak in the line after
      // -%> tag -- this is the single, trailing linebreak
      // after the tag that the truncation mode replaces
      // Handle Win / Unix / old Mac linebreaks -- do the \r\n
      // combo first in the regex-or
      line = line.replace(/^(?:\r\n|\r|\n)/, '');
      this.truncate = false;
    }
    if (!line) {
      return line;
    }

    // Preserve literal slashes
    line = line.replace(/\\/g, '\\\\');

    // Convert linebreaks
    line = line.replace(/\n/g, '\\n');
    line = line.replace(/\r/g, '\\r');

    // Escape double-quotes
    // - this will be the delimiter during execution
    line = line.replace(/"/g, '\\"');
    this.source += '    ; __append("' + line + '")' + '\n';
  },

  scanLine: function (line) {
    var self = this;
    var d = this.opts.delimiter;
    var o = this.opts.openDelimiter;
    var c = this.opts.closeDelimiter;
    var newLineCount = 0;

    newLineCount = (line.split('\n').length - 1);

    switch (line) {
    case o + d:
    case o + d + '_':
      this.mode = Template.modes.EVAL;
      break;
    case o + d + '=':
      this.mode = Template.modes.ESCAPED;
      break;
    case o + d + '-':
      this.mode = Template.modes.RAW;
      break;
    case o + d + '#':
      this.mode = Template.modes.COMMENT;
      break;
    case o + d + d:
      this.mode = Template.modes.LITERAL;
      this.source += '    ; __append("' + line.replace(o + d + d, o + d) + '")' + '\n';
      break;
    case d + d + c:
      this.mode = Template.modes.LITERAL;
      this.source += '    ; __append("' + line.replace(d + d + c, d + c) + '")' + '\n';
      break;
    case d + c:
    case '-' + d + c:
    case '_' + d + c:
      if (this.mode == Template.modes.LITERAL) {
        this._addOutput(line);
      }

      this.mode = null;
      this.truncate = line.indexOf('-') === 0 || line.indexOf('_') === 0;
      break;
    default:
      // In script mode, depends on type of tag
      if (this.mode) {
        // If '//' is found without a line break, add a line break.
        switch (this.mode) {
        case Template.modes.EVAL:
        case Template.modes.ESCAPED:
        case Template.modes.RAW:
          if (line.lastIndexOf('//') > line.lastIndexOf('\n')) {
            line += '\n';
          }
        }
        switch (this.mode) {
        // Just executing code
        case Template.modes.EVAL:
          this.source += '    ; ' + line + '\n';
          break;
          // Exec, esc, and output
        case Template.modes.ESCAPED:
          this.source += '    ; __append(escapeFn(' + stripSemi(line) + '))' + '\n';
          break;
          // Exec and output
        case Template.modes.RAW:
          this.source += '    ; __append(' + stripSemi(line) + ')' + '\n';
          break;
        case Template.modes.COMMENT:
          // Do nothing
          break;
          // Literal <%% mode, append as raw output
        case Template.modes.LITERAL:
          this._addOutput(line);
          break;
        }
      }
      // In string mode, just add the output
      else {
        this._addOutput(line);
      }
    }

    if (self.opts.compileDebug && newLineCount) {
      this.currentLine += newLineCount;
      this.source += '    ; __line = ' + this.currentLine + '\n';
    }
  }
};

/**
 * Escape characters reserved in XML.
 *
 * This is simply an export of {@link module:utils.escapeXML}.
 *
 * If `markup` is `undefined` or `null`, the empty string is returned.
 *
 * @param {String} markup Input string
 * @return {String} Escaped string
 * @public
 * @func
 * */
exports.escapeXML = utils.escapeXML;

/**
 * Express.js support.
 *
 * This is an alias for {@link module:ejs.renderFile}, in order to support
 * Express.js out-of-the-box.
 *
 * @func
 */

exports.__express = exports.renderFile;

// Add require support
/* istanbul ignore else */
if (require.extensions) {
  require.extensions['.ejs'] = function (module, flnm) {
    console.log('Deprecated: this API will go away in EJS v2.8');
    var filename = flnm || /* istanbul ignore next */ module.filename;
    var options = {
      filename: filename,
      client: true
    };
    var template = fileLoader(filename).toString();
    var fn = exports.compile(template, options);
    module._compile('module.exports = ' + fn.toString() + ';', filename);
  };
}

/**
 * Version of EJS.
 *
 * @readonly
 * @type {String}
 * @public
 */

exports.VERSION = _VERSION_STRING;

/**
 * Name for detection of EJS.
 *
 * @readonly
 * @type {String}
 * @public
 */

exports.name = _NAME;

/* istanbul ignore if */
if (typeof window != 'undefined') {
  window.ejs = exports;
}

},{"../package.json":9,"./utils":8,"fs":6,"path":10}],8:[function(require,module,exports){
/*
 * EJS Embedded JavaScript templates
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/

/**
 * Private utility functions
 * @module utils
 * @private
 */

'use strict';

var regExpChars = /[|\\{}()[\]^$+*?.]/g;

/**
 * Escape characters reserved in regular expressions.
 *
 * If `string` is `undefined` or `null`, the empty string is returned.
 *
 * @param {String} string Input string
 * @return {String} Escaped string
 * @static
 * @private
 */
exports.escapeRegExpChars = function (string) {
  // istanbul ignore if
  if (!string) {
    return '';
  }
  return String(string).replace(regExpChars, '\\$&');
};

var _ENCODE_HTML_RULES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&#34;',
  "'": '&#39;'
};
var _MATCH_HTML = /[&<>'"]/g;

function encode_char(c) {
  return _ENCODE_HTML_RULES[c] || c;
}

/**
 * Stringified version of constants used by {@link module:utils.escapeXML}.
 *
 * It is used in the process of generating {@link ClientFunction}s.
 *
 * @readonly
 * @type {String}
 */

var escapeFuncStr =
  'var _ENCODE_HTML_RULES = {\n'
+ '      "&": "&amp;"\n'
+ '    , "<": "&lt;"\n'
+ '    , ">": "&gt;"\n'
+ '    , \'"\': "&#34;"\n'
+ '    , "\'": "&#39;"\n'
+ '    }\n'
+ '  , _MATCH_HTML = /[&<>\'"]/g;\n'
+ 'function encode_char(c) {\n'
+ '  return _ENCODE_HTML_RULES[c] || c;\n'
+ '};\n';

/**
 * Escape characters reserved in XML.
 *
 * If `markup` is `undefined` or `null`, the empty string is returned.
 *
 * @implements {EscapeCallback}
 * @param {String} markup Input string
 * @return {String} Escaped string
 * @static
 * @private
 */

exports.escapeXML = function (markup) {
  return markup == undefined
    ? ''
    : String(markup)
      .replace(_MATCH_HTML, encode_char);
};
exports.escapeXML.toString = function () {
  return Function.prototype.toString.call(this) + ';\n' + escapeFuncStr;
};

/**
 * Naive copy of properties from one object to another.
 * Does not recurse into non-scalar properties
 * Does not check to see if the property has a value before copying
 *
 * @param  {Object} to   Destination object
 * @param  {Object} from Source object
 * @return {Object}      Destination object
 * @static
 * @private
 */
exports.shallowCopy = function (to, from) {
  from = from || {};
  for (var p in from) {
    to[p] = from[p];
  }
  return to;
};

/**
 * Naive copy of a list of key names, from one object to another.
 * Only copies property if it is actually defined
 * Does not recurse into non-scalar properties
 *
 * @param  {Object} to   Destination object
 * @param  {Object} from Source object
 * @param  {Array} list List of properties to copy
 * @return {Object}      Destination object
 * @static
 * @private
 */
exports.shallowCopyFromList = function (to, from, list) {
  for (var i = 0; i < list.length; i++) {
    var p = list[i];
    if (typeof from[p] != 'undefined') {
      to[p] = from[p];
    }
  }
  return to;
};

/**
 * Simple in-process cache implementation. Does not implement limits of any
 * sort.
 *
 * @implements Cache
 * @static
 * @private
 */
exports.cache = {
  _data: {},
  set: function (key, val) {
    this._data[key] = val;
  },
  get: function (key) {
    return this._data[key];
  },
  remove: function (key) {
    delete this._data[key];
  },
  reset: function () {
    this._data = {};
  }
};

},{}],9:[function(require,module,exports){
module.exports={
  "_from": "ejs@^2.4.1",
  "_id": "ejs@2.7.4",
  "_inBundle": false,
  "_integrity": "sha512-7vmuyh5+kuUyJKePhQfRQBhXV5Ce+RnaeeQArKu1EAMpL3WbgMt5WG6uQZpEVvYSSsxMXRKOewtDk9RaTKXRlA==",
  "_location": "/ejs",
  "_phantomChildren": {},
  "_requested": {
    "type": "range",
    "registry": true,
    "raw": "ejs@^2.4.1",
    "name": "ejs",
    "escapedName": "ejs",
    "rawSpec": "^2.4.1",
    "saveSpec": null,
    "fetchSpec": "^2.4.1"
  },
  "_requiredBy": [
    "/"
  ],
  "_resolved": "https://registry.npmjs.org/ejs/-/ejs-2.7.4.tgz",
  "_shasum": "48661287573dcc53e366c7a1ae52c3a120eec9ba",
  "_spec": "ejs@^2.4.1",
  "_where": "D:\\Egor_\\Навчання\\JS HTML CSS\\hw5\\JS-Pizza-2-master",
  "author": {
    "name": "Matthew Eernisse",
    "email": "mde@fleegix.org",
    "url": "http://fleegix.org"
  },
  "bugs": {
    "url": "https://github.com/mde/ejs/issues"
  },
  "bundleDependencies": false,
  "dependencies": {},
  "deprecated": false,
  "description": "Embedded JavaScript templates",
  "devDependencies": {
    "browserify": "^13.1.1",
    "eslint": "^4.14.0",
    "git-directory-deploy": "^1.5.1",
    "jake": "^10.3.1",
    "jsdoc": "^3.4.0",
    "lru-cache": "^4.0.1",
    "mocha": "^5.0.5",
    "uglify-js": "^3.3.16"
  },
  "engines": {
    "node": ">=0.10.0"
  },
  "homepage": "https://github.com/mde/ejs",
  "keywords": [
    "template",
    "engine",
    "ejs"
  ],
  "license": "Apache-2.0",
  "main": "./lib/ejs.js",
  "name": "ejs",
  "repository": {
    "type": "git",
    "url": "git://github.com/mde/ejs.git"
  },
  "scripts": {
    "postinstall": "node ./postinstall.js",
    "test": "mocha"
  },
  "version": "2.7.4"
}

},{}],10:[function(require,module,exports){
(function (process){
// .dirname, .basename, and .extname methods are extracted from Node.js v8.11.1,
// backported and transplited with Babel, with backwards-compat fixes

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (typeof path !== 'string') {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(filter(paths, function(p, index) {
    if (typeof p !== 'string') {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function (path) {
  if (typeof path !== 'string') path = path + '';
  if (path.length === 0) return '.';
  var code = path.charCodeAt(0);
  var hasRoot = code === 47 /*/*/;
  var end = -1;
  var matchedSlash = true;
  for (var i = path.length - 1; i >= 1; --i) {
    code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        if (!matchedSlash) {
          end = i;
          break;
        }
      } else {
      // We saw the first non-path separator
      matchedSlash = false;
    }
  }

  if (end === -1) return hasRoot ? '/' : '.';
  if (hasRoot && end === 1) {
    // return '//';
    // Backwards-compat fix:
    return '/';
  }
  return path.slice(0, end);
};

function basename(path) {
  if (typeof path !== 'string') path = path + '';

  var start = 0;
  var end = -1;
  var matchedSlash = true;
  var i;

  for (i = path.length - 1; i >= 0; --i) {
    if (path.charCodeAt(i) === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          start = i + 1;
          break;
        }
      } else if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // path component
      matchedSlash = false;
      end = i + 1;
    }
  }

  if (end === -1) return '';
  return path.slice(start, end);
}

// Uses a mixed approach for backwards-compatibility, as ext behavior changed
// in new Node.js versions, so only basename() above is backported here
exports.basename = function (path, ext) {
  var f = basename(path);
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};

exports.extname = function (path) {
  if (typeof path !== 'string') path = path + '';
  var startDot = -1;
  var startPart = 0;
  var end = -1;
  var matchedSlash = true;
  // Track the state of characters (if any) we see before our first dot and
  // after any path separator we find
  var preDotState = 0;
  for (var i = path.length - 1; i >= 0; --i) {
    var code = path.charCodeAt(i);
    if (code === 47 /*/*/) {
        // If we reached a path separator that was not part of a set of path
        // separators at the end of the string, stop now
        if (!matchedSlash) {
          startPart = i + 1;
          break;
        }
        continue;
      }
    if (end === -1) {
      // We saw the first non-path separator, mark this as the end of our
      // extension
      matchedSlash = false;
      end = i + 1;
    }
    if (code === 46 /*.*/) {
        // If this is our first dot, mark it as the start of our extension
        if (startDot === -1)
          startDot = i;
        else if (preDotState !== 1)
          preDotState = 1;
    } else if (startDot !== -1) {
      // We saw a non-dot and non-path separator before our dot, so we should
      // have a good chance at having a non-empty extension
      preDotState = -1;
    }
  }

  if (startDot === -1 || end === -1 ||
      // We saw a non-dot character immediately before the dot
      preDotState === 0 ||
      // The (right-most) trimmed path component is exactly '..'
      preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
    return '';
  }
  return path.slice(startDot, end);
};

function filter (xs, f) {
    if (xs.filter) return xs.filter(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}

// String.prototype.substr - negative index don't work in IE8
var substr = 'ab'.substr(-1) === 'b'
    ? function (str, start, len) { return str.substr(start, len) }
    : function (str, start, len) {
        if (start < 0) start = str.length + start;
        return str.substr(start, len);
    }
;

}).call(this,require('_process'))
},{"_process":11}],11:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}]},{},[4]);

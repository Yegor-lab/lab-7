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

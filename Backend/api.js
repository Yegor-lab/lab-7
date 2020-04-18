/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');

exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = (req, res) => {
    var orderInfo = req.body;
    var price = totalPrice(orderInfo.cart);
    var order = {
        version: 3,
        public_key: puk,
        action: "pay",
        amount: price,
        currency: "UAH",
        description: orderDescription(
            orderInfo.customerData.name,
            orderInfo.customerData.phone,
            orderInfo.customerData.address,
            orderInfo.cart,
            price
        ),
        order_id: Math.random(),
        sandbox: 1
    };

    var order_base64 = new Buffer(JSON.stringify(order)).toString("base64");
    var result = JSON.stringify({
        data: order_base64,
        signature: sha1(prk + order_base64 + prk)
    });
    res.send(result);
};

var crypto = require("crypto");
var puk = "sandbox_i45601628212";
var prk = "sandbox_MUGSHG2mI74leV7AiZLl5aTjgJ2JsRoGM3C5CUFD";

function sha1(string) {
    var sha1 = crypto.createHash("sha1");
    sha1.update(string);
    return sha1.digest("base64");
}

function totalPrice(cart) {
    var price = 0;
    cart.forEach(item => price += item.quantity * item.pizza[item.size].price);
    return price;
}

function orderDescription(name, phone, address, cart, price) {
    var description = "";
    description += "Замовлення піци: " + name + "\n";
    description += "Адреса доставки: " + address + "\n";
    description += "Телефон: " + phone + "\n";
    description += "Замовлення:\n";
    cart.forEach(item => {
        description += "- " + item.quantity + "шт. [" + item.size.string + "] " + item.pizza.title + ";\n";
    });
    description += "\nРазом " + price + " UAH.";
    return description;
}
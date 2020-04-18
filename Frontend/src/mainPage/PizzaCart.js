/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('../LocalStorage');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    var exists = false;
    Cart.forEach(function(item){
        console.log(item.pizza === pizza);
        if(item.pizza==pizza&&item.size==size){
            item.quantity += 1;
            exists = true;
        }
    });
    //Приклад реалізації, можна робити будь-яким іншим способом
    if(!exists) {
        Cart.push({
            pizza: pizza,
            size: size,
            quantity: 1
        });
    }
    //Оновити вміст кошика на сторінці
    updateCart();
}

$(".clear-all").click(function(){
    //Видалямо усі піци
    removeAllFromCart();

    //Оновлюємо відображення
    updateCart();
});

function removeAllFromCart() {
    Cart.splice(Cart.indexOf(0),Cart.indexOf(Cart.length));
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    Cart.splice(Cart.indexOf(cart_item),1);
    $().html(function(i, val) { if(val*1>1)return val*1-1 });

    //Після видалення оновити відображення
    updateCart();
}

function initialiseCart() {
    var cart = Storage.get("cart");
    if(cart) Cart = cart;

    $(".clear-all").click(function(){
        Cart=[];
        $("#pizzaNumber").html(function(i, val) { return 0; });
        updateCart();
    })
    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    Storage.set("cart", Cart);
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage

    //Очищаємо старі піци в кошику
    $cart.html("");
    var totprice = 0;

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);
        totprice = totprice + cart_item.pizza[cart_item.size].price*cart_item.quantity;

        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function(){
            if(cart_item.quantity>1) {
                //Збільшуємо кількість замовлених піц
                cart_item.quantity -= 1;
            }
            else {
                removeFromCart(cart_item);
            }
            
            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".delete").click(function(){
            removeFromCart(cart_item);
            var numPizzasOneType = $("#OneTypePizzaNumber").html(function(i, val) { return val*1 });
            $("#pizzaNumber").html(function(i, val) { return val*1 - numPizzasOneType });
            updateCart();
        });

        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);
    $(".total-price").text(totprice +" грн");
    $("#pizzaNumber").text(Cart.length);
}

exports.updateCart = updateCart;
exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;
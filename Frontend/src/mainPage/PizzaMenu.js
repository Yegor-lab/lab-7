/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var API = require('../API');

var Pizza_List;

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function() {
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
            $(".total-price").html(function(i, val) { val*1+pizza[size].price; })
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}


$(".home-img").click(function(){window.location.href = "/";});

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    Pizza_List.forEach(function(pizza){
        if(filter=="meat"&&pizza.content.meat) pizza_shown.push(pizza);
        else if(filter=="mushroom"&&pizza.content.mushroom) pizza_shown.push(pizza);
        else if(filter=="pineapple"&&pizza.content.pineapple) pizza_shown.push(pizza);
        else if(filter=="ocean"&&pizza.content.ocean) pizza_shown.push(pizza);
        else if(filter=="vega"&&!pizza.content.meat&&!pizza.content.chicken&&!pizza.content.ocean) pizza_shown.push(pizza);
        //TODO: зробити фільтри
    });

    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    //Показуємо усі піци
    API.getPizzaList((err, list) => {
        Pizza_List = list;
        showPizzaList(Pizza_List);
    });

    $(".all").click(function(){showPizzaList(Pizza_List)});
    $(".meat").click(function(){filterPizza("meat")});
    $(".mushroom").click(function(){filterPizza("mushroom")});
    $(".pineapple").click(function(){filterPizza("pineapple")});
    $(".ocean").click(function(){filterPizza("ocean")});
    $(".vega").click(function(){filterPizza("vega")});
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;
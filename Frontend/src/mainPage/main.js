/**
 * Created by chaika on 25.01.16.
 */

$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./PizzaMenu');
    var PizzaCart = require('./PizzaCart');

    PizzaCart.initialiseCart();
    PizzaMenu.initialiseMenu();


});
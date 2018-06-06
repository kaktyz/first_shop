"use strict";

$('document').ready(function(){
	let addToCart = $('.add_to_cart');
	let cart = $('.backet');
	let numberOfGoods = 0;
	addToCart.on('click', (event) =>{
		//Отменяет переход по ссылке
		event.preventDefault();
		numberOfGoods++;
		let linkWithNumber = $('<a />', {
			href: "numberOfGoods",
			text: numberOfGoods,
			style: 'color: red; border: 1px solid red; border-radius: 20px; width:5px; height: 5px;'
		});
		linkWithNumber.appendTo(cart);
	})
});
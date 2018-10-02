class Basket {
	constructor(idBasket) {
			this.id = idBasket;
			this.countGoods = 0; //Общее кол-во товаров в корзине
			this.amount = 0; //Общая стоимость товаров
			this.basketItems = []; //Массив для хранения товаров
			//Получаем уже добавленные в корзину товары
			this.getBasket();
		}

    /**
	 * Отрисовывает корзину
     * @param $jQueryElement
     */
	render($jQueryElement) {
			let $basketDiv = $('<div />', {
				id: this.id
				, text: 'Корзина'
			});
			let $basketItemsDiv = $('<div />', {
				id: `${this.id}_items`
			});
			let $basketByBtn = $('<button />', {
				text: 'Купить все товары',
				id: 'basketByBtn'
			})
			
			$basketItemsDiv.appendTo($basketDiv);
			$basketByBtn.appendTo($basketDiv);
			$basketDiv.appendTo($jQueryElement);
		}
	//	Достаем содержимое из JSON-a
	getBasket() {
			let appendId = `#${this.id}_items`;
			//let self = this;
			$.ajax({
				type: 'GET'
				, url: './json/basket_get.json'
				, context: this
				, success: function (data) {
					let $basketData = $('<div />', {
						id: 'basket_data'
					});
					this.countGoods = data.basket.length;
					this.amount = data.amount;
					for (let key in data.basket) {
						this.basketItems.push(data.basket[key]);
					}
					$basketData.append(`<p>Всего товаров: ${this.countGoods}</p>`);
					$basketData.append(`<p>Общая сумма: ${this.amount}</p>`);
					$basketData.appendTo(appendId);
				}
				, error: function (error) {
					console.log('Произошла ошибка при получении данных', error);
				}
				, dataType: 'json'
			});
		}

    /**
	 * Добавляем товар в карзину
     * @param id_product id добавляемого товара
     * @param price цена добавляемого товара
     */
	add(id_product, price) {
			let basketNewItem = {
				id_product, price //price: price
			};
			this.basketItems.push(basketNewItem);
			this.countGoods++;
			this.amount += price; //this.amount = this.amount + price;
			this.refresh(); //Перерисовываем корзину
		}

    /**
	 * Удаляет вещь из крзины по пришедшему id
     * @param idProduct  id удаляемого продукта
     */
	remove(idProduct) {
			for (let arrInd in this.basketItems) {
				if (this.basketItems[arrInd].id_product === idProduct) {
					this.amount -= this.basketItems[arrInd].price;
					this.basketItems.splice(arrInd, 1);
					this.countGoods--;
					this.refresh();
					break;
				}
			}
		}

    /**
	 * Обновляем корзину для актуального отображеия данных в корзине
     */
	refresh() {
		let $basketData = $('#basket_data');
		$basketData.empty(); //Очищаем содержимое контейнера
		$basketData.append(`<p>Всего товаров: ${this.countGoods}</p>`);
		$basketData.append(`<p>Общая сумма: ${this.amount}</p>`);
		//TODO: добавить проверку на нуль, чтобы возвращалась SVG корзинки
		if(this.countGoods === 0){
			$('.backet').empty();
			$('.backet').append(`<a href="basket.html"><img src="img/basket.svg" alt="basket"></a>`);
		}else{
			$('.backet').empty();
			$('.backet').append(`<div class="backetNumbersOfGoods"><p>${this.countGoods}</p>`);
		}

	}
}


$(document).ready(function () {
	let basket = new Basket('basket');
    basket.render($('#basket_wrapper'));
	$('.add_to_cart_link').on('click', function (event) {
		event.preventDefault();
		//		Находим цену и ID продукта
		let productPrice = parseInt($(this).attr('data-price'));
		let productId = parseInt($(this).attr('data-id'));
		basket.add(productId, productPrice);
	})
	$('.remove_from_cart_link').on('click', function (event) {
		event.preventDefault();
		//		Находим цену и ID продукта
		let productPrice = parseInt($(this).attr('data-price'));
		let productId = parseInt($(this).attr('data-id'));
		basket.remove(productId);
	})
	$('.backet').on('click', function(event){
		event.preventDefault();
		$('#basket_wrapper').toggle();
	})
	
//	Прикрепляем корзинку
	$(window).scroll(function () {
		let $basketScroll = $(window).scrollTop();
        if ($basketScroll > 146) {
            $('#basket').addClass('gluingBasket conteiner');
        } else {
            $('#basket').removeClass('gluingBasket conteiner');
        }
    });
});
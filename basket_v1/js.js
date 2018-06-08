class Basket {
    constructor(idBasket) {
        this.id = idBasket;
        this.countGoods = 0; //Общее кол-во товаров в корзине
        this.amount = 0; //Общая стоимость товаров
        this.basketItems = []; //Массив для хранения товаров
        //Получаем уже добавленные в корзину товары
        this.getBasket();
    }
    render($jQueryElement) {
        let $basketDiv = $('<div />', {
            id: this.id
            , text: 'Корзина'
        });
        let $basketItemsDiv = $('<div />', {
            id: `${this.id}_items`
        });
        $basketItemsDiv.appendTo($basketDiv);
        $basketDiv.appendTo($jQueryElement);
    }
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
    add(id_product, price) {
            let basketNewItem = {
                id_product, price //price: price
            };
            this.basketItems.push(basketNewItem);
            this.countGoods++;
            this.amount += price; //this.amount = this.amount + price;
            this.refresh(); //Перерисовываем корзину
        }
        //TODO - удаление товара из корзины
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

    refresh() {
        let $basketData = $('#basket_data');
        $basketData.empty(); //Очищаем содержимое контейнера
        $basketData.append(`<p>Всего товаров: ${this.countGoods}</p>`);
        $basketData.append(`<p>Общая сумма: ${this.amount}</p>`);
    }
}
class Good {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
    render($jQueryElement) {
        let $goodContainer = $('<div />', {
            class: 'good'
        });
        let $goodTitle = $('<p />', {
            text: this.title
        });
        let $goodPrice = $(`<p>Цена: <span class="product-price">${this.price}</span> руб.</p>`);
        let $goodBuyBtn = $('<button />', {
            class: 'buygood'
            , 'data-id': this.id
            , text: 'Купить'
        });
        //TODO: Добавить кнопку для удаления
        let goodDelBtn = $('<button />', {
            class: 'delgood'
            , 'data-id': this.id
            , text: 'Удалить'
        });
        //Объединяем элементы для получения структуры
        $goodTitle.appendTo($goodContainer);
        $goodPrice.appendTo($goodContainer);
        $goodBuyBtn.appendTo($goodContainer);
        goodDelBtn.appendTo($goodContainer);
        $jQueryElement.append($goodContainer);
    }
}
$(document).ready(function () {
    let $goods = $('.goods');
    //Создаем товары
    let good1 = new Good(123, 'Коврик для мыши', 300);
    good1.render($goods);
    let good2 = new Good(124, 'Клавиатура', 1000);
    good2.render($goods);
    let good3 = new Good(125, 'Мышь для ПК', 700);
    good3.render($goods);
    //Создаем экземпляр корзины
    let basket = new Basket('basket');
    basket.render($('#basket_wrapper'));
    //Добавление товара в корзину
    $('button.buygood').on('click', function () {
        let idProduct = parseInt($(this).attr('data-id'));
        let price = parseInt($(this).parent().find('span.product-price').text());
        basket.add(idProduct, price);
    });
    //Удаление товара из корзины
    //TODO: ДЗ
    $('button.delgood').click(function () {
        let idProduct = parseInt($(this).attr('data-id'));
        basket.remove(idProduct);
    });
});
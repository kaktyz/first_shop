"use strict";

$(document).ready(function() {
    let addToCart = $('.add_to_cart');
    let cart = $('.backet');
    let numberOfGoods = 0;
    addToCart.on('click', (event) => {
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
            //Форма регистрации 
            const btn = document.getElementById('registrationBtn');
            $( "#datepicker" ).datepicker({
                dayNamesMin: [ "ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ" ],
                dateFormat: "dd.mm.yy",
                firstDay: 1                
            });
            btn.addEventListener('click', (event) => {
                const inpName = document.getElementById('name').value;
                const inpNumber = document.getElementById('number').value;
                const inpEmail = document.getElementById('eMail').value;
                const inpDatepicker = document.getElementById('datepicker').value;
                let name = document.getElementById('name');
                let email = document.getElementById('eMail');
                let number = document.getElementById('number');
                let datepicker = document.getElementById('datepicker');
                if (inpName.match(/^[а-яА-ЯёЁa-zA-Z]+$/g)) {
                    name.setAttribute('style', 'border: 2px solid green');
                } else {
                    name.setAttribute('style', 'border: 2px solid red');
                    $('#name').effect( "bounce", "slow" );
                    $( "#dialogName" ).dialog();
                }
                if (inpNumber.match(/\+\d\(\d{3}\)\d{3}-\d{4}/)) {
                    number.setAttribute('style', 'border: 2px solid green');
                } else {
                    number.setAttribute('style', 'border: 2px solid red');
                    $('#number').effect( "bounce", "slow" );
                    $( "#dialogTel" ).dialog();
                }
                if (inpEmail.match(/\w+@[a-zA-Z_]+\.[a-zA-Z]{2,3}/)) {
                    eMail.setAttribute('style', 'border: 2px solid green');
                } else {
                    eMail.setAttribute('style', 'border: 2px solid red');
                    $('#eMail').effect( "bounce", "slow" );
                    $( "#dialogEmail" ).dialog();
                }
                
                if (inpDatepicker != 0) {
                    datepicker.setAttribute('style', 'border: 2px solid green');
                } else {
                    datepicker.setAttribute('style', 'border: 2px solid red');
                    $('#datepicker').effect( "bounce", "slow" );
                    $( "#datepickerDialog" ).dialog();
                }
            })
});
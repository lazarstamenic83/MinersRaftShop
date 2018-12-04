function hideCookiePolicy() {
    $("#cookiePolicy").hide();
}

function alertEmptyBasket() {
    if (getCookie() == null) {
        $('.basketWrapper').hide();
        $('.total').hide();
        $('#orderPopup').hide();
        $('.basketHolder').append('<p class="emptyBasketParagrapf">VAŠA KORPA JE TRENUTNO PRAZNA</p>');
    }
}

function getOrderInformation() {
    if (getCookie() !== null) {
        var orderInfoString = '';
        var idArray = fromString2numberArray(getCookie());
        if (idArray != null && !NaN) {
            for (var i = 0; i < idArray.length; i++) {
                orderInfoString +=
                    $("#productName" + idArray[i]).text() + ' x ' +
                    $("#inputId" + idArray[i].toString()).val() + ' ; ';
            }
            return orderInfoString;
        }
        return null;
    }
}




function orderPopUp() {
    $('.popUpHolder').show();
}

function closeOrderPopUp() {
    $('.popUpHolder').hide();
}

function orderSubmit() {
    $.ajax({
        type: "POST",
        url: "sendemail.php",
        data: {
            firstnameInput: $("#firstnameInput").val().trim(),
            phoneNumberInput: $("#phoneNumberInput").val().trim(),
            adressInput: $("#adressInput").val().trim(),
            noteInput: $("#noteInput").val().trim(),
            order: getOrderInformation(),
            captcha: grecaptcha.getResponse()
        },
        success: function(data) {
            if (data == 'not') {
                if (confirm('Poštovani korisniče, da bi ste uspešno završili porudžbinu, neophodno je da opcija "Нисам робот" bude čekirana')) {} else {}
            } else {
                if (data.indexOf(" u validaciji,") > 0) {
                    if (confirm(data + '. Molimo Vas ispravno popunite polja')) {} else {}
                } else {
                    if (confirm('vaša porudžbina je primljena, vidimo se uskoro! Vaša korpa će biti ispražnjena.')) {
                        setCookie(null);
                        window.location.replace("http://www.minersraft.com");
                    } else {
                        closeOrderPopUp();
                    }
                }
            }
        },
        error: function(data) {
            if (confirm('ERROR! zao nam je, servis trenutno nije dostupan, uvek mozete naruciti telefonom ;)')) {} else {}
        }
    })
};




function calculateTotal() {
    var idArray = fromString2numberArray(getCookie());
    var total = 0;
    if (idArray != null && !NaN) {
        for (var i = 0; i < idArray.length; i++) {
            total += Number($("#sumPerRow" + idArray[i]).text());
        }
        $('#sumTotalParagraph').text('SVE UKUPNO:  ' + total + ',00');
    }
}




function setCookie(cvalue) {
    var d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = "minersRaftC" + "=" + cvalue + ";" + expires + ";path=/";
}


function getCookie() {
    var name = "minersRaftC=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            if (c.substring(name.length, c.length) == 'null') {
                return null;
            } else {
                return c.substring(name.length, c.length);
            }
        }
    }
    return null;
}


function fromString2numberArray(e) {
    if (e != null) {
        return e.split(',');
    } else {
        return null;
    }
}


function add2basket(id) {
    if (getCookie() != null) {
        var cookieString = getCookie();
        var arr = fromString2numberArray(cookieString);
        if (arr.indexOf(id.toString()) == -1) {
            arr.push(id);
            setCookie(arr);
        }
    } else {
        setCookie(id);
    }
    $('#h4id' + id).text('proizvod je u korpi')
}




function removeFromBasket(id) {
    var cookieString = getCookie();
    if (getCookie() != null) {
        var arr = fromString2numberArray(cookieString);
        var index = arr.indexOf(id.toString());
        if (index !== -1) {
            arr.splice(index, 1);
        }
        if (arr.length === 0) {
            setCookie(null);
        } else {
            setCookie(arr);
        }
    }
    alertEmptyBasket();
}




$(document).ready(function() {
    //smooth scroll
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });
    //smooth scroll

    // burger
    $(".burger_container img").click(function() {
        $(".menu").stop().slideToggle('2000', "swing", function() {
            // Animation complete.

        });
    });
    // burger


    //Json
    var foods = [{
        "id": 1,
        "ime": "Burger classic 170gr",
        "cena": 320,
        "picUrl": "img/food/burger.png",
        "alt": 'burger',
        "name": 'burger',
        "silderImgUrl": "img/imagesHD/burger-big02.jpg"
    }, {
        "id": 2,
        "ime": "Burger classic 120gr",
        "cena": 280,
        "picUrl": "img/food/burger.png",
        "alt": 'burger',
        "name": 'burger',
        "silderImgUrl": "img/imagesHD/burger-small02.jpg"
    }, {
        "id": 3,
        "ime": "Onion burger 170gr",
        "cena": 340,
        "picUrl": "img/food/onionb.png",
        "alt": 'onion burger',
        "name": 'onion',
        "silderImgUrl": "img/imagesHD/Onion-burger.jpg"
    }, {
        "id": 4,
        "ime": "Onion burger 120gr",
        "cena": 310,
        "picUrl": "img/food/onionb.png",
        "alt": 'onion burger',
        "name": 'onion',
        "silderImgUrl": "img/imagesHD/onion-small02.jpg"
    }, {
        "id": 5,
        "ime": "Pulled pork 150gr",
        "cena": 290,
        "picUrl": "img/food/drpano.png",
        "alt": 'drpano prase',
        "name": 'drpano',
        "silderImgUrl": "img/imagesHD/Drpano-burger.jpg"
    }, {
        "id": 6,
        "ime": "Kobasice 250gr",
        "cena": 390,
        "picUrl": "img/food/kobaje.png",
        "alt": 'kobasice',
        "name": 'kobaje',
        "silderImgUrl": "img/imagesHD/kobaje.jpg"
    }, {
        "id": 7,
        "ime": "Pileca Krilca 500gr",
        "cena": 360,
        "picUrl": "img/food/krilca.png",
        "alt": 'pileca krilca',
        "name": 'krilca',
        "silderImgUrl": "img/imagesHD/krilca.jpg"
    }];




    var supplements = [{
        "id": 8,
        "ime": "SPICY KROMPIRIĆI",
        "cena": 150,
        "picUrl": "img/food/spicy_krompirici.png",
        "name": "spicy"


    }, {
        "id": 9,
        "ime": "ONION RINGS",
        "cena": 150,
        "picUrl": "img/food/Onion-Rings.png",
        "name": "onionRings"
    }, {
        "id": 10,
        "ime": "POMFRIT",
        "cena": 120,
        "picUrl": "img/food/pomfrit.png",
        "name": "pomfrit"
    }];


    var beers = [{
        "id": 11,
        "ime": "Svetionik pa 0,33l",
        "cena": 270,
        "picUrl": "img/beers/svetionik.png",
        "name": "beer1"
    }, {
        "id": 12,
        "ime": "Hoptopod Ipa 0,33l",
        "cena": 290,
        "picUrl": "img/beers/hoptopod.png",
        "name": "beer2"
    }, {
        "id": 13,
        "ime": "Brka Apa 0,33l",
        "cena": 270,
        "picUrl": "img/beers/brka.png",
        "name": "beer3"
    }, {
        "id": 14,
        "ime": "Olga 0,33l",
        "cena": 310,
        "picUrl": "img/beers/olga.png",
        "name": "beer4"
    }, {
        "id": 15,
        "ime": "Bernard 0,5l",
        "cena": 340,
        "picUrl": "img/beers/Bernard.png",
        "name": "beer5"
    }, {
        "id": 16,
        "ime": "Primator 0,5l",
        "cena": 310,
        "picUrl": "img/beers/Promator.png",
        "name": "beer6"
    }];
    //Json
    function displayProductInBasket() {


        if (getCookie() != null) {
            var productIds = fromString2numberArray(getCookie()); //"1,2,3,4,5"
            for (var i = 0; i < productIds.length; i++) {
                //food
                $(foods).each(function(index, food) {
                    if (food.id == productIds[i]) {
                        //row wrapper
                        $('<div>').attr({
                            class: ' basketContent',
                            id: 'product' + productIds[i]
                        }).appendTo('.basketWrapper');
                        //row wrapper


                        //product picture div
                        $('<div>').attr({
                            class: 'productInBasket',
                            id: 'productInBasket' + productIds[i]
                        }).appendTo('#product' + productIds[i]);


                        $('<img>').attr({
                            class: 'picturesInBasket',
                            // id: 'productInBasket' + productIds[i] 
                            src: food.picUrl,
                            height: '100',
                            width: '100'
                        }).appendTo('#productInBasket' + productIds[i]);

                        $('<p>').attr({
                            id: 'productName' + productIds[i],
                            class: 'productName'
                        }).text(food.ime.toUpperCase()).appendTo('#productInBasket' + productIds[i]);


                        //product picture div


                        //quantity with input priceDivv
                        $('<div>').attr({
                            class: 'quantityInBasket',
                            id: 'quantityInBasket' + productIds[i]
                        }).appendTo('#product' + productIds[i]);




                        $('<input>').attr({
                                class: 'inputInBasket',
                                type: 'number',
                                id: 'inputId' + food.id,
                                min: 1,
                                value: 1,
                            })
                            .on('input', function() {
                                $('#sumPerRow' + food.id).text(this.value * food.cena);
                                calculateTotal();


                            })
                            .appendTo('#quantityInBasket' + productIds[i]);
                        //quantity with input div




                        //price tag div
                        $('<div>').attr({
                            class: 'priceInBasket',
                            id: 'priceDiv' + productIds[i]
                        }).appendTo('#product' + productIds[i]);


                        $('<p>').attr({
                            id: 'pricePerRow' + productIds[i],
                            class: 'pricePerRow'
                        }).text(food.cena).appendTo('#priceDiv' + productIds[i]);


                        $('<p>').attr({
                            // id: 'remove' +  productIds[i],
                            class: 'twoZeros'
                        }).text(',00').appendTo('#priceDiv' + productIds[i]);
                        //price tag div


                        //sum per row div
                        $('<div>').attr({
                            class: 'sumInBasket',
                            id: 'sumInBasket' + productIds[i]
                        }).appendTo('#product' + productIds[i]);


                        $('<p>').attr({
                            id: 'sumPerRow' + productIds[i],
                            class: 'sumPerRow'
                        }).text(food.cena).appendTo('#sumInBasket' + productIds[i]);


                        $('<p>').attr({
                            // id: 'remove' +  productIds[i],
                            class: 'twoZeros'
                        }).text(',00').appendTo('#sumInBasket' + productIds[i]);




                        $('<p>').attr({
                            id: 'remove' + productIds[i],
                            class: 'removeFromRow'
                        }).on('click', function() {
                            removeFromBasket(food.id);
                            $('#product' + food.id).empty();
                            $('#product' + food.id).remove();
                            calculateTotal();
                        }).text('OBRIŠI IZ KORPE').appendTo('#sumInBasket' + productIds[i]);


                        $('<i>').attr({
                            // id: 'remove' +  productIds[i],
                            class: 'fa fa-times'
                        }).appendTo('#remove' + productIds[i]);

                        //sum per row div



                    }
                });
                //food


                //suplements


                $(supplements).each(function(index, supplement) {
                    if (supplement.id == productIds[i]) {
                        //row wrapper
                        $('<div>').attr({
                            class: ' basketContent',
                            id: 'product' + productIds[i]
                        }).appendTo('.basketWrapper');
                        //row wrapper


                        //product picture div
                        $('<div>').attr({
                            class: 'productInBasket',
                            id: 'productInBasket' + productIds[i]
                        }).appendTo('#product' + productIds[i]);


                        $('<img>').attr({
                            class: 'picturesInBasket',
                            // id: 'productInBasket' + productIds[i] 
                            src: supplement.picUrl,
                            height: '100',
                            width: '100'
                        }).appendTo('#productInBasket' + productIds[i]);

                        $('<p>').attr({
                            id: 'productName' + productIds[i],
                            class: 'productName'
                        }).text(supplement.ime.toUpperCase()).appendTo('#productInBasket' + productIds[i]);


                        //product picture div


                        //quantity with input priceDivv
                        $('<div>').attr({
                            class: 'quantityInBasket',
                            id: 'quantityInBasket' + productIds[i]
                        }).appendTo('#product' + productIds[i]);




                        $('<input>').attr({
                                class: 'inputInBasket',
                                type: 'number',
                                id: 'inputId' + supplement.id,
                                min: 1,
                                value: 1,
                            })
                            .on('input', function() {
                                $('#sumPerRow' + supplement.id).text(this.value * supplement.cena);
                                calculateTotal();


                            })
                            .appendTo('#quantityInBasket' + productIds[i]);
                        //quantity with input div




                        //price tag div
                        $('<div>').attr({
                            class: 'priceInBasket',
                            id: 'priceDiv' + productIds[i]
                        }).appendTo('#product' + productIds[i]);


                        $('<p>').attr({
                            id: 'pricePerRow' + productIds[i],
                            class: 'pricePerRow'
                        }).text(supplement.cena).appendTo('#priceDiv' + productIds[i]);


                        $('<p>').attr({
                            // id: 'remove' +  productIds[i],
                            class: 'twoZeros'
                        }).text(',00').appendTo('#priceDiv' + productIds[i]);
                        //price tag div


                        //sum per row div
                        $('<div>').attr({
                            class: 'sumInBasket',
                            id: 'sumInBasket' + productIds[i]
                        }).appendTo('#product' + productIds[i]);


                        $('<p>').attr({
                            id: 'sumPerRow' + productIds[i],
                            class: 'sumPerRow'
                        }).text(supplement.cena).appendTo('#sumInBasket' + productIds[i]);


                        $('<p>').attr({
                            // id: 'remove' +  productIds[i],
                            class: 'twoZeros'
                        }).text(',00').appendTo('#sumInBasket' + productIds[i]);




                        $('<p>').attr({
                            id: 'remove' + productIds[i],
                            class: 'removeFromRow'
                        }).on('click', function() {
                            removeFromBasket(supplement.id);
                            $('#product' + supplement.id).empty();
                            $('#product' + supplement.id).remove();
                            calculateTotal();
                        }).text('OBRIŠI IZ KORPE').appendTo('#sumInBasket' + productIds[i]);


                        $('<i>').attr({
                            // id: 'remove' +  productIds[i],
                            class: 'fa fa-times'
                        }).appendTo('#remove' + productIds[i]);

                        //sum per row div



                    }
                });
                //suplements




                //beers


                $(beers).each(function(index, beer) {
                    if (beer.id == productIds[i]) {
                        //row wrapper
                        $('<div>').attr({
                            class: ' basketContent',
                            id: 'product' + productIds[i]
                        }).appendTo('.basketWrapper');
                        //row wrapper


                        //product picture div
                        $('<div>').attr({
                            class: 'productInBasket',
                            id: 'productInBasket' + productIds[i]
                        }).appendTo('#product' + productIds[i]);


                        $('<img>').attr({
                            class: 'beersInBasket',
                            // id: 'productInBasket' + productIds[i] 
                            src: beer.picUrl,
                            height: '100',
                            width: '100'
                        }).appendTo('#productInBasket' + productIds[i]);

                        $('<p>').attr({
                            id: 'productName' + productIds[i],
                            class: 'productName'
                        }).text(beer.ime.toUpperCase()).appendTo('#productInBasket' + productIds[i]);


                        //product picture div


                        //quantity with input priceDivv
                        $('<div>').attr({
                            class: 'quantityInBasket',
                            id: 'quantityInBasket' + productIds[i]
                        }).appendTo('#product' + productIds[i]);




                        $('<input>').attr({
                                class: 'inputInBasket',
                                type: 'number',
                                id: 'inputId' + beer.id,
                                min: 1,
                                value: 1,
                            })
                            .on('input', function() {
                                $('#sumPerRow' + beer.id).text(this.value * beer.cena);
                                calculateTotal();


                            })
                            .appendTo('#quantityInBasket' + productIds[i]);
                        //quantity with input div




                        //price tag div
                        $('<div>').attr({
                            class: 'priceInBasket',
                            id: 'priceDiv' + productIds[i]
                        }).appendTo('#product' + productIds[i]);


                        $('<p>').attr({
                            id: 'pricePerRow' + productIds[i],
                            class: 'pricePerRow'
                        }).text(beer.cena).appendTo('#priceDiv' + productIds[i]);


                        $('<p>').attr({
                            // id: 'remove' +  productIds[i],
                            class: 'twoZeros'
                        }).text(',00').appendTo('#priceDiv' + productIds[i]);
                        //price tag div


                        //sum per row div
                        $('<div>').attr({
                            class: 'sumInBasket',
                            id: 'sumInBasket' + productIds[i]
                        }).appendTo('#product' + productIds[i]);


                        $('<p>').attr({
                            id: 'sumPerRow' + productIds[i],
                            class: 'sumPerRow'
                        }).text(beer.cena).appendTo('#sumInBasket' + productIds[i]);


                        $('<p>').attr({
                            // id: 'remove' +  productIds[i],
                            class: 'twoZeros'
                        }).text(',00').appendTo('#sumInBasket' + productIds[i]);




                        $('<p>').attr({
                            id: 'remove' + productIds[i],
                            class: 'removeFromRow'
                        }).on('click', function() {
                            removeFromBasket(beer.id);
                            $('#product' + beer.id).empty();
                            $('#product' + beer.id).remove();
                            calculateTotal();
                        }).text('OBRIŠI IZ KORPE').appendTo('#sumInBasket' + productIds[i]);


                        $('<i>').attr({
                            // id: 'remove' +  productIds[i],
                            class: 'fa fa-times'
                        }).appendTo('#remove' + productIds[i]);

                        //sum per row div

                    }
                });
                //beers
            }
        } else {
            alertEmptyBasket();
        }
    }
    // foods 


    $(foods).each(function(index, food) {
    

        	var foodcontainer = $('<div>').attr({
                class: 'foodcontainer'
            });

            var imageLink= $('<a>').attr({
                class: 'image-link',
                href: food.silderImgUrl
            });

            var foodImg = $('<img>').attr({
                src: food.picUrl,
                alt: food.ime,
                id: food.name
            });

            var fooddescript = $('<div>').attr({
                class: 'fooddescript'
            });

            var foodName = $('<h2>').attr({
                class: 'foodName'
            }).text(food.ime.toUpperCase());


            var foodPrice = $('<h4>').attr({
                class: 'foodPrice'
            }).text(food.cena + ',00 RSD');

            var shoppingButton = $('<h4>').attr({
                class: 'shoppingButton',
                id: 'h4id' + food.id,
                onclick: "add2basket(" + food.id + ")"
            }).text('DODAJ U KORPU');


            var indexCart =   $('<i>').attr({
                class: 'fa fa-shopping-cart indexCart'
            });

            foodcontainer.appendTo('.foodwraper');
            imageLink.appendTo(foodcontainer);
            foodImg.appendTo(imageLink);
            fooddescript.appendTo(foodcontainer);
            foodName.appendTo(fooddescript);	
			foodPrice.appendTo(fooddescript);
         	shoppingButton.appendTo(fooddescript);
         	indexCart.appendTo(shoppingButton);
         
    });
    // foods


    // suplements


    $(supplements).each(function(index, supplements) {
        
        	var prilozicontainer = $('<div>').attr({
                class: 'prilozicontainer'
            });

            var supplementsImg = $('<img>').attr({
                src: supplements.picUrl,
                alt: supplements.name,
                id: supplements.name
            });

            var prilozidescript = $('<div>').attr({
                class: 'prilozidescript'
            });

            var supplementsName = $('<h2>').text(supplements.ime.toUpperCase());


            var priloziPrice = $('<h3>').attr({
                class: 'prilozi_price'
            }).text(supplements.cena + ',00 RSD');

            var spanPrice = $('<span>').attr({
                style: 'color: #cc9933'
            }).text('200g /');
            
            var shoppingButton = $('<h4>').attr({
                class: 'shoppingButton',
                id: 'h4id' + supplements.id,
                onclick: "add2basket(" + supplements.id + ")"
            }).text('DODAJ U KORPU');


            var indexCart =   $('<i>').attr({
                class: 'fa fa-shopping-cart indexCart'
            });

            prilozicontainer.appendTo('.priloziwraper');
            supplementsImg.appendTo(prilozicontainer);
            prilozidescript.appendTo(prilozicontainer);
            supplementsName.appendTo(prilozidescript);	
			priloziPrice.appendTo(prilozidescript);
			spanPrice.prependTo(priloziPrice);
         	shoppingButton.appendTo(prilozidescript);
         	indexCart.appendTo(shoppingButton);
         


    });


    // suplements


    // beers
    $(beers).each(function(index, beers) {
        
        	var beercontainer = $('<div>').attr({
                class: 'beercontainer'
            });

            var beersImg = $('<img>').attr({
                src: beers.picUrl,
                alt: beers.name,
                id: beers.name
            });

            var beerdescript = $('<div>').attr({
                class: 'beerdescript'
            });

            var beersName = $('<h2>').text(beers.ime.toUpperCase());


            var beerPrice = $('<p>').text(beers.cena + ',00 RSD');

            var shoppingButton = $('<h4>').attr({
                class: 'shoppingButton',
                id: 'h4id' + beers.id,
                onclick: "add2basket(" + beers.id + ")"
            }).text('DODAJ U KORPU');


            var indexCart =   $('<i>').attr({
                class: 'fa fa-shopping-cart indexCart'
            });

            beercontainer.appendTo('.beerwraper');
            beersImg.appendTo(beercontainer);
            beerdescript.appendTo(beercontainer);
            beersName.appendTo(beerdescript);	
			beerPrice.appendTo(beerdescript);
			shoppingButton.appendTo(beerdescript);
         	indexCart.appendTo(shoppingButton);



    });
    // beers


    displayProductInBasket();


    $('.basketWrapper').append(' <div class="Total">' +
        '<div class="inTotal"><p id="sumTotalParagraph"> SVE UKUPNO 0 rsd</p><button id="popUpButton" onclick="orderPopUp()">NARUČI</button></div>' +
        '</div>');

    calculateTotal();
});
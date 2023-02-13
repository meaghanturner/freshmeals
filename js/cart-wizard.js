$(document).ready(function () {
    $.getJSON("data/product-data.json", function (data) {
        var template = $('#meal-selection').html();
        var html = Mustache.render(template, data);
        $('.product-list').html(html);
        
        for (var i = 0; i < data.products.length; i++) {
            var product = data.products[i];
        }
    });
    
    // Cart
    var cartCount = $('.cart-wizard-main .cart-wizard-item').length;
    var checkoutBtn = $('#submit').prop("disabled", true).addClass("disabled");
    var mealSelected = $('.meals-selected');
    let current = 0;
    let maxAllowed = 12;
    mealSelected.text(`${current} of ${maxAllowed} meals selected`);
    
    $(document).on('click', '.add-qty', function () {
        if (cartCount >= 12) {
            alert("You have reached the maximum limit of 12 items.");
            return;
        }
        
        var product = $(this).closest('.product-card-item');
        var title = product.find('h3').text();
        var img = product.find('img').attr('src');
        var mealId = title.toLowerCase().replace(/ /g, "-");
        
        if (!$('.cart-wizard-item').find('[data-meal-id="' + mealId + '"]').length > 0) {
            // Create a new HTML element to represent the product in the cart
            var cartProduct = $('<li class="cart-wizard-item">');
            cartProduct.append('' +
                '<img src="' + img + '" />',
                '<h3 class="title" data-meal-id="' + mealId + '">' + title + '</h3>',
                '<button class="remove remove-item">Remove</button>',
                '<div class="add-meal">' +
                '<div class="quantity-selectors">' +
                '<button class="remove-qty button">-</button>' +
                '<p class="current-qty">1</p>' +
                '<button class="add-qty">+</button>' +
                '</div>' +
                '</div>');
            // Append the new element to the cart container
            $('.cart-wizard-main').append(cartProduct);
        } else {
            var currentQty = $(this).siblings('.current-qty');
            $(currentQty).text(parseInt($(currentQty).text()) + 1);
        }
        
        cartCount++;
        
        var remainingItems = $('.remaining-items');
        if (cartCount <= 11) {
            remainingItems.text('Add ' + (12 - cartCount) + ' more meal' + (cartCount === 11 ? '' : 's') + '!');
            mealSelected.text(cartCount + ' ' + 'of' + ' ' + 12 + ' meals selected');
        } else if (cartCount === 12) {
            remainingItems.text("All meals selected!");
            mealSelected.text(12 + ' ' + 'of' + ' ' + 12 + ' meals selected')
            checkoutBtn.prop("disabled", false).removeClass("disabled");
        }
    });
    
    $(document).on('click', '.remove-qty', function () {
        var productId = $(this).closest('.product-card-item').attr('data-meal-id');
        var cartItem = $('.cart-wizard-main .cart-item-title:contains("' + productId + '")').closest('.cart-item');
        cartItem.remove();
    })
    
    // Remove Single Item
    $(document).on('click', '.remove-item', function () {
        if (confirm("Are you sure you want to remove this item?")) {
            $(this).parent().remove();
        }
    });
    
    // Remove All Items
    var cart = $(".cart-wizard-main");
    var removeButton = $(".remove-all");
    var toggleRemoveButton = function () {
        removeButton.prop("disabled", !cart.children().length).toggleClass('disabled', !cart.children().length > 0);
    };
    
    removeButton.click(function () {
        if (!cart.children().length > 0) {
            return;
        }
        
        if (confirm("Are you sure you want to delete all meals?")) {
            cart.empty();
            cartCount.text(parseInt(cartCount.text()) - cart.children().length);
            toggleRemoveButton();
        }
    });

    toggleRemoveButton();
    cart.on("DOMSubtreeModified", toggleRemoveButton);
});

// TODO: update cart value after remove/add button
// TODO: add/remove qty selectors add to cart section on each product item
// TODO: If they click on minus and its on 1 qty it should remove the item from cart

$(document).ready(function () {
    var mealTitle;
    var imgSource;

    $.getJSON("data/product-data.json", function (data) {
        var template = $('#meal-selection').html();
        var html = Mustache.render(template, data);
        $('.product-list').html(html);

        for (var i = 0; i < data.products.length; i++) {
            var product = data.products[i];
            mealTitle = product.title;
            imgSource = product.image.src;
        }
    });

    // Cart
    var cartCount = $('.cart-wizard-main .cart-wizard-item').length;
    var checkoutBtn = $('#submit').prop("disabled", true).addClass("disabled");
    var mealsSelected = $('.meals-selected');
    mealsSelected.text(0 + ' ' + 'of' + ' ' + 12 + ' meals selected');


    // Add QTY Button
    $(document).on('click', '.add-qty', function () {
        if (cartCount >= 12) {
            alert("You have reached the maximum limit of 12 items.");
            return;
        }

        var product = $(this).closest('.product-card-item');
        var title = product.find('h3').text();

        var img = product.find('img').attr('src');
        var mealId = title.toLowerCase().replace(/ /g, "-");

        // Check if product is already in the cart
        if ($('.cart-wizard-item[data-product-id="' + mealId + '"]').length) {
            // Product is already in the cart, show an error message or take other action as desired
            alert("Product already in the cart");
            return;
        }

        product.find('h3').attr("data-meal-id", mealId);

        // Create a new HTML element to represent the product in the cart
        var cartProduct = $('<li class="cart-wizard-item">');
        cartProduct.append('<img src="' + img + '" />', '<h3 class="title" data-meal-id="' + mealId + '">' + title + '</h3>', '<button class="remove remove-item">Remove</button>');

        // Append the new element to the cart container
        $('.cart-wizard-main').append(cartProduct);
        cartCount++;

        var remainingItems = $('.remaining-items');
        if (cartCount <= 11) {
            remainingItems.text('Add ' + (12 - cartCount) + ' more meal' + (cartCount === 11 ? '' : 's') + '!');
            mealsSelected.text(cartCount + ' ' + 'of' + ' ' + 12 + ' meals selected');
        } else if (cartCount === 12) {
            remainingItems.text("All meals selected!");
            mealsSelected.text(12 + ' ' + 'of' + ' ' + 12 + ' meals selected')
            checkoutBtn.prop("disabled", false).removeClass("disabled");
        }
    });

    $(document).on('click', '.remove-qty', function () {

        var productId = $(this).closest('.product-card-item').find('id');
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
        removeButton.prop("disabled", !cart.children().length).toggleClass('disabled', !cart.children().length);
    };

    removeButton.click(function () {
        if (!cart.children().length) {
            return;
        }

        if (confirm("Are you sure you want to delete all meals?")) {
            cart.empty();
            toggleRemoveButton();
        }
    });

    toggleRemoveButton();
    cart.on("DOMSubtreeModified", toggleRemoveButton);
});

// TODO: update cart value after remove/add button
// TODO: items within cart
// TODO: add/remove qty selectors add to cart section on each product item
// TODO: The item should only be added once to the cart, shouldn't be added again if it exists already. The quantity value should update instead.
// TODO: If they click on minus and its on 1 qty it should remove the item


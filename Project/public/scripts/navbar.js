
function loadCart(){

    let storedCart = $.cookie('cart');
   let cart = [];


if (storedCart) {
    cart = JSON.parse(storedCart);
}

cartCode(cart)
}

function cartCode(cart){
    total = 0
   
    let uniqueItemIds = new Set();

// Iterate over the cart array
cart.forEach(element => { 
    total +=  Number.parseInt(element.price)
    // Check if the current item's ID is already in the set
    if (!uniqueItemIds.has(element.id)) {
        // If not, add the item's ID to the set and append the cart card
        uniqueItemIds.add(element.id);
        let count = findItemFrequency(cart, element.id)
        var newCartItem = `
            <div class="cart-card d-flex justify-content-between w-100 gap-4">
                <img src="${element.image_url}" alt="" class="w-25 h-100">
                <div class="d-flex flex-column w-75">
                    <div class="fs-6 fw-medium">${element.title}</div>
                    <div class="fs-6 fw-light text-secondary">
                        ${count} x <span class="text-danger">Rs ${element.price * count}</span>
                    </div>
                </div>
                <button class="delete-item-cart btn border-0 align-self-start" data-product-id="${element.id}">
                    <i class="fa-solid fa-circle-xmark text-secondary"></i>
                </button>
            </div>
        `;
        $('.cart-card-list').append(newCartItem);
    }
});
console.log(total)
$("#totalPrice").text(total)

}

$(document).ready(function(){

    loadCart()

    $('#toggleBtn').click(function(){
        $('#sidebar').toggleClass('show-sidebar');
        $('#overlay').toggle(); 
    });

    $('#close-sidebox').click(function(){
        $('#sidebar').toggleClass('show-sidebar');
        $('#overlay').toggle(); 
    });
    
    $(document).on('click', function(e){
        if (!$(e.target).closest('#sidebar, #toggleBtn').length) {
            if ($('#sidebar').hasClass('show-sidebar')) {
                $('#sidebar').removeClass('show-sidebar');
                $('#overlay').hide();
            }
        }
    });
    
  
    $(document).on('click', '.delete-item-cart', function(e){
       
        e.stopPropagation();
        
    var productId = $(this).attr('data-product-id');
    
    let storedCart = $.cookie('cart');
    let total = 0 
    let cart = [];
    if (storedCart) {
        cart = JSON.parse(storedCart);
        console.log("Before filtering:", cart);
        cart = cart.filter(item => {
            console.log("Item ID:", item.id);
            console.log("Product ID:", productId);
            return item.id !== productId;
        });
        console.log("After filtering:", cart);
    }
    cart.forEach(element =>  total +=  Number.parseInt(element.price))
    $("#totalPrice").text(total)

    $.cookie('cart', JSON.stringify(cart), { path: '/' });
    
    $(this).closest('.cart-card').remove();
    });

    $(document).on('click', '.add-to-cart', function(e){
        e.preventDefault();
        let count = 1 
        var productImage = $(this).attr('data-product-image');
        var productTitle = $(this).attr('data-product-title');
        var productPrice =   $(this).attr('data-product-price');
        var productBrand =   $(this).attr('data-product-brand');
        var productId =   $(this).attr('data-product-id');

        let item = {
            "id":productId,
            "title": productTitle,
            "image_url": productImage,
            "price": productPrice,
            "brand": productBrand
        };
    
       // Retrieve cart from cookie
// Retrieve cart from cookie
let storedCart = $.cookie('cart');
let cart = [];
if (storedCart) {
    cart = JSON.parse(storedCart);
}

    cart.push(item);

$.cookie('cart', JSON.stringify(cart),{ path: '/' });
$('.cart-card-list').empty();

cartCode(cart)// Create a new cart card
       
    });

});


function findItemFrequency(cart, itemToFind) {
    let frequency = 0;
    for (let i = 0; i < cart.length; i++) {
        const currentItem = cart[i];
        // Check if the current item matches the itemToFind
        if (currentItem.id === itemToFind ) {
            frequency++;
        }
    }
    return frequency;
}


function loadCart(){

    let storedCart = $.cookie('cart');
    let cart = [];
    
    // Parse the stored JSON back into an array
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
    // Save the updated cart back to localStorage
    $.cookie('cart', JSON.stringify(cart));
    
    
    cart.forEach(element => {
        console.log(element)
        var newCartItem = `
        <div class="cart-card d-flex justify-content-between  w-100 gap-4  ">
        <img src="${element.image_url}" alt="" class="w-25 h-100  ">
        <div class="d-flex flex-column w-75 ">
            <div class="fs-6 fw-medium     ">
            ${element.title}
            </div>
            <div class="fs-6 fw-light text-secondary ">
                1 x <span class="text-danger ">Rs ${element.price}</span>
            </div>
           
        </div>
        
        <button  class="delete-item-cart btn border-0 align-self-start  ">  <i class="fa-solid fa-circle-xmark text-secondary"></i></button>
      </div>
          
        `;
    
        // Append the new cart item to the cart card list
        $('.cart-card-list').append(newCartItem);
  
});
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
        
        $(this).closest('.cart-card').remove();
    });

    $(document).on('click', '.add-to-cart', function(e){
        e.preventDefault();
       
        
        var productImage = $(this).attr('data-product-image');
        var productTitle = $(this).attr('data-product-title');
        var productPrice =   $(this).attr('data-product-price');
        var productBrand =   $(this).attr('data-product-brand');
        var productId =   $(this).attr('data-product-id');
        let item = {
            "id": productId,
            "title": productTitle,
            "image_url": productImage,
            "price": productPrice,
            "brand": productBrand
        };
    
       // Retrieve cart from cookie
// Retrieve cart from cookie
let storedCart = $.cookie('cart');
let cart = [];

// Parse the stored JSON back into an array
if (storedCart) {
    cart = JSON.parse(storedCart);
}
// Add the item to the cart array
cart.push(item);
console.log(cart)

// Save the updated cart back to localStorage
$.cookie('cart', JSON.stringify(cart));


cart.forEach(element => {
    console.log(element)
    var newCartItem = `
    <div class="cart-card d-flex justify-content-between  w-100 gap-4  ">
    <img src="${element.image_url}" alt="" class="w-25 h-100  ">
    <div class="d-flex flex-column w-75 ">
        <div class="fs-6 fw-medium     ">
        ${element.title}
        </div>
        <div class="fs-6 fw-light text-secondary ">
            1 x <span class="text-danger ">Rs ${element.price}</span>
        </div>
       
    </div>
    
    <button  class="delete-item-cart btn border-0 align-self-start  ">  <i class="fa-solid fa-circle-xmark text-secondary"></i></button>
  </div>
      
    `;

    // Append the new cart item to the cart card list
    $('.cart-card-list').append(newCartItem);
});
        // Create a new cart card
       
    });

});


function loadCart(){
   
    let storedCart = $.cookie('cart');
   let cart = [];

  
if (storedCart) {
   
    cart = JSON.parse(storedCart);
}
let cartlen =0
cart.forEach(item => cartlen += item.quantity)
$(".badge").text(cartlen)

cartCode(cart)
}

function cartCode(cart){
    if (cart.length == 0) {
        $("#chkoutbtn").addClass("disabled")
    }
    else{
        $("#chkoutbtn").removeClass("disabled")
    }
    $('.cart-card-list').empty();
    total = 0
// Iterate over the cart array
cart.forEach(element => { 
    total +=  Number.parseInt(element.price * element.quantity)
        var newCartItem = `
            <div class="cart-card d-flex justify-content-between w-100 gap-4">
                <img src="${element.image_url}" alt="" class="w-25 h-100">
                <div class="d-flex flex-column w-75">
                    <div class="fs-6 fw-medium">${element.title}</div>
                    <div class="fs-6 fw-light text-secondary">
                        ${element.quantity} x <span class="text-danger">Rs ${element.price}</span>
                    </div>
                </div>
                <button class="delete-item-cart btn border-0 align-self-start" data-product-id="${element.id}">
                    <i class="fa-solid fa-circle-xmark text-secondary"></i>
                </button>
            </div>
        `;
        $('.cart-card-list').append(newCartItem);
  
});
$("#totalPrice").text(total)

}

$(document).ready(function(){
    $("#chkoutbtn").on('click', function() {
        window.location.href = "http://localhost:3000/checkout";
    });


    loadCart()
    $('#userBtn').on('click', function() {
        $('#userInfoBox').toggleClass('active'); // Toggle the active class
    });

    // Close the user info box when clicking outside of it
    $(document).on('click', function(event) {
        if (!$(event.target).closest('#userBtn, #userInfoBox').length) {
            $('#userInfoBox').removeClass('active'); // Hide the user info box
        }
    });

    // Handle logout
    $('#logoutBtn').on('click', function() {
        // Add your logout logic here
        alert('Logging out...');
        // Redirect to logout route if needed
        window.location.href = '/auth/logout'; // Example logout route
    });
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
    } let cartlen =0
    cart.forEach(item => cartlen += item.quantity)
    $(".badge").text(cartlen)
    cart.forEach(element =>{  total +=  Number.parseInt(element.price * element.quantity)})
    $("#totalPrice").text(total)

    $.cookie('cart', JSON.stringify(cart), { path: '/' });
  
    $(this).closest('.cart-card').remove();
    });




$(document).on('click', '.add-to-cart', function(e){
        e.preventDefault();
       
        var productImage = $(this).attr('data-product-image');
        var productTitle = $(this).attr('data-product-title');
        var productPrice =   $(this).attr('data-product-price');
        var productBrand =   $(this).attr('data-product-brand');
        var productId =   $(this).attr('data-product-id');

let storedCart = $.cookie('cart');
let cart = [];
if (storedCart) {
    cart = JSON.parse(storedCart);
}


let index = cart.findIndex(item => item.id === productId);
if (index !== -1) { 
    cart[index] = {
        ...cart[index],
        "quantity": cart[index].quantity + 1 
    };
} else { 
    cart.push({
        "id": productId,
        "title": productTitle,
        "image_url": productImage,
        "price": productPrice,
        "brand": productBrand,
        "quantity": 1 
    });
}

$.cookie('cart', JSON.stringify(cart),{ path: '/' });
$('.cart-card-list').empty();
let cartlen =0
cart.forEach(item => cartlen += item.quantity)
$(".badge").text(cartlen)
cartCode(cart)// Create a new cart card
       
    });


   
});

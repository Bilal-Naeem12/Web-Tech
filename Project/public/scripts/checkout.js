

$(document).ready(function () {

  $("#chkoutBtn").on("click", function(e) {
   
    let valid = true;

    // Check all input fields
    $(".input").each(function() {
        if ($(this).val() === "") {
            $(this).css("border", "2px solid red");
            valid = false;
        } else {
            $(this).css("border", ""); // Reset border if filled
        }
    });

    // If all fields are valid, proceed with AJAX request
    if (valid) {
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/checkout", // Replace with your actual endpoint
            data: {
                state: $("input[placeholder='State/Country']").val(),
                city: $("input[placeholder='City']").val(),
                postalcode: $("input[placeholder='Postalcode / Zip']").val(),
            },
            success: function(response) {
          
            
                    window.location.href = "http://localhost:3000/products/page";
               
            },
            error: function(error) {
                // Handle error response
                console.log(error);
            }
        });
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

$(this).closest('.tbody-data').remove();
cartCode(cart)
});


  updateTotal()
  $(".add").on("click", function (e) {
    var productImage = $(this).attr('data-product-image');
    var productTitle = $(this).attr('data-product-title');
    var productPrice =   $(this).attr('data-product-price');
    var productBrand =   $(this).attr('data-product-brand');
    var productId =   $(this).attr('data-product-id');
    var quantity =   $(this).attr('data-product-quantity');

 product =   {
      "id": productId,
      "title": productTitle,
      "image_url": productImage,
      "price": productPrice,
      "brand": productBrand,
      "quantity": quantity 
    };
    e.preventDefault();
    let totalquantity =  updateCart(true,product)
    $(this).closest('.tbody-data').find('.subtotalValue').text(totalquantity * productPrice);
   
    $(this).closest('.quantity').find('.q-input').text(totalquantity);
    updateTotal()
});



 
 
 
 
  $(".substract").on("click", function (e) {
    e.preventDefault();
    var productImage = $(this).attr('data-product-image');
    var productTitle = $(this).attr('data-product-title');
    var productPrice =   $(this).attr('data-product-price');
    var productBrand =   $(this).attr('data-product-brand');
    var productId =   $(this).attr('data-product-id');
    var quantity =   $(this).attr('data-product-quantity');

 product =   {
      "id": productId,
      "title": productTitle,
      "image_url": productImage,
      "price": productPrice,
      "brand": productBrand,
      "quantity": quantity 
    }
    let totalquantity =  updateCart(false,product)
    $(this).closest('.tbody-data').find('.subtotalValue').text(totalquantity * productPrice);
    $(this).closest('.quantity').find('.q-input').text(totalquantity );
    updateTotal()
  })





})




function updateTotal(){
  var total = 0;
    

  
  $(".subtotalValue").each(function() {


    var value = parseFloat($(this).text());
    if (!isNaN(value)) {
        total += value;
    }

  });
  $("#subTotalR").text(total );
  $("#TotalR").text(total+ 1500 );
}

function updateCart(isAdd,product){
 
       
 
  // Retrieve cart from cookie
 // Retrieve cart from cookie
 let storedCart = $.cookie('cart');
 let cart = [];
 if (storedCart) {
 cart = JSON.parse(storedCart);
 }
 
 
 let index = cart.findIndex(item => item.id === product.id);
 let totalQuantity = isAdd? cart[index]?.quantity + 1 :  cart[index]?.quantity - 1
 
 if (index !== -1) { 
 cart[index] = {
 ...cart[index],
   "quantity": totalQuantity
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
 cartCode(cart)
 return totalQuantity// Create a new cart card
 }
  
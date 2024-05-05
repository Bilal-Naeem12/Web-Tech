$(document).ready(function(){
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
    
    // Event delegation for dynamically added elements
    $(document).on('click', '.delete-item-cart', function(e){
        // Prevent the click event from bubbling up to the document
        e.stopPropagation();
        // Remove the cart card
        $(this).closest('.cart-card').remove();
    });

    $(document).on('click', '.add-to-cart', function(e){
        e.preventDefault();
        // Get product details from the clicked button's parent element
 
        var productImage = $(this).attr('data-product-image');
        var productTitle = $(this).attr('data-product-title');
        var productPrice =   $(this).attr('data-product-price');
       
      
        // Create a new cart card
        var newCartItem = `
        <div class="cart-card d-flex justify-content-between  w-100 gap-4  ">
        <img src="${productImage}" alt="" class="w-25 h-100  ">
        <div class="d-flex flex-column w-75 ">
            <div class="fs-6 fw-medium     ">
            ${productTitle}
            </div>
            <div class="fs-6 fw-light text-secondary ">
                1 x <span class="text-danger ">Rs ${productPrice}</span>
            </div>
           
        </div>
        
        <button  class="delete-item-cart btn border-0 align-self-start  ">  <i class="fa-solid fa-circle-xmark text-secondary"></i></button>
      </div>
          
        `;

        // Append the new cart item to the cart card list
        $('.cart-card-list').append(newCartItem);
    });

});

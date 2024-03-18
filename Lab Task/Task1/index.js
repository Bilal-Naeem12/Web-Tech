
    var inputs =  $("input")
    var textarea =  $("textarea")

console.log("connected")
function handle_error(){

    if(  $("textarea").val() == ""){
        $(textarea).addClass("error")
    }else{
        $(textarea).removeClass("error")
    }
    $.each(inputs, function (index, input) {
     
        if(input.value  == "")
        {
            $(input).addClass("error")
        }
        else{
            $(input).removeClass("error")
        }

  })
  
}
$(document).ready(function (){

    $("#send-btn").click(handle_error);
    
})
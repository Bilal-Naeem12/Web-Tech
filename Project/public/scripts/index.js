
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

function truncateTitle(title) {
    const words = title.split(' ');
    if (words.length > 20) {
      return words.slice(0, 20).join(' ') + '...';
    }
    return title;
  }
$(document).ready(function (){

    $("#send-btn").click(handle_error);
  
  

 
})
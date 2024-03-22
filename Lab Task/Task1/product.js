// https://image.tmdb.org/t/p/original

const isValidUrl = urlString=> {
  var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
  '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
return !!urlPattern.test(urlString);
}



function dummyfunc(){
  var photos = $("#photos");
  console.log("hello")
  $.each(dummy_data?.results, function (index, movie) {
      console.log(movie?.poster_path)
      photos.append(
      ` <div class="responsive  ">
      <div class="gallery">
          
          <img src="https://image.tmdb.org/t/p/original${movie?.poster_path}" alt="Forest">
        
        <div class="desc">${movie?.overview.slice(0,40)}</div>
      </div>
        `
    );
  });
}



function displayPhotosBytmdb() {
    $.ajax({
      url: "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=2",
      method: "GET",
      dataType: "json",
      success: function (data) {
        var photos = $("#photos");
      
        console.log("hello")
        $.each(data?.results, function (index, movie) {
            photos.append(
            `
            <div class="responsive">
            <div class="gallery position-relative ">
              <img src="https://image.tmdb.org/t/p/original${movie?.poster_path}" alt="Forest">
              <div class="desc">${movie?.overview.slice(0,50)}</div>
            </div>
          </div>
            
            
              `
          );
        });
      },
      error: function (error) {
        console.error("Error fetching stories:", error);
      },
    });
  }

  function displayPhotosBySirApi() {
    $.ajax({
      url: "https://usmanlive.com/wp-json/api/stories",
      method: "GET",
      dataType: "json",
      success: function (data) {
        var photos = $("#photos");
        
        $.each(data, function (index, movie) {
          if (isValidUrl(movie?.title)) {
            console.log(movie.id)
            photos.prepend(
              `
              <div class="responsive" ">
              <div class="gallery position-relative ">
                  <div id="edit-btn" class="edit-btn position-absolute p-2 text-bg-secondary      fs-6 rounded-circle  " data-bs-toggle="modal" movie-id="${movie.id}" data-bs-target="#exampleModal"><i class="fa-solid fa-pencil"></i></div>
                  <button id="delete-btn" class="delete-btn position-absolute p-2  text-bg-danger border-0    fs-6 rounded-circle  " movie-id="${movie.id}" ><i class="fa-solid fa-trash"></i></button>
                  <img src="${movie?.title}">
                <div class="desc">${movie?.content}</div>
              </div>
            </div>
              
              
                `
            );
          } 
    
        });
      },
      error: function (error) {
        console.error("Error fetching stories:", error);
      },
    });
  }


function deleteHandleFunc(){
  let storyId = $(this).attr("movie-id");
  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories/" + storyId,
    method: "DELETE",
    success: function () {
    callApi()
    },
    error: function (error) {
      console.error("Error deleting story:", error);
    },
  });
  $("#alert").append(` <div class="alert alert-success alert-dismissible fade show collapse position-absolute w-100" role="alert">
  <strong>Record Deleted!</strong> Successfully yahooo!!.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`)

setTimeout(()=>{
  $(".btn-close").click()
},2000)


}

function callApi(){
  $("#photos").empty();
  displayPhotosBySirApi()
  displayPhotosBytmdb() 

}

let selected_data = {}

function editHandleFunc(event){
  event.preventDefault();
  let storyId = $(this).attr("movie-id");
  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories/" + storyId,
    method: "GET",
    success: function (data) {
      selected_data = data
      console.log(data);
      $("#update-text-area").val(data.content);
      $("#edit-btn").attr("movie-id", data.id);
    },
    error: function (error) {
      console.error("Error fetching moive:", error);
    },
  });
}

function updateHandleFunc(event)
{
  event.preventDefault();
  let content = $("#update-text-area").val();
  let title = selected_data.title
 console.log(title,content)
  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories/" + selected_data.id,
    method: "PUT",
    data: {title,content},
    success: function () {
      callApi()
    },
    error: function (error) {
      console.error("Error updating moive:", error);
    },
  });
}
function createHandleFunc(event)
{
  event.preventDefault();
  let title = $("#createUrl").val();
  let content = $("#createDesc").val();
 console.log(title,content)
  $.ajax({
    url: "https://usmanlive.com/wp-json/api/stories" ,
    method: "POST",
    data: {title,content},
    success: function () {
      callApi()
    },
    error: function (error) {
      console.error("Error creating moive:", error);
    },
  });
}

$(document).ready(
    function (){
  
      callApi()
   
      $(document).on("click","#createBtn",createHandleFunc)
      $(document).on("click","#delete-btn",deleteHandleFunc)
      $(document).on("click","#edit-btn",editHandleFunc)
      $(document).on("click","#update-btn",updateHandleFunc)
     
    }
)


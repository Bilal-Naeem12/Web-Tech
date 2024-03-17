// https://image.tmdb.org/t/p/original

function displayStories() {
    $.ajax({
      url: "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&page=2",
      method: "GET",
      dataType: "json",
      success: function (data) {
        var photos = $("#photos");
        photos.empty();
        console.log("hello")
        $.each(data?.results, function (index, movie) {
            console.log(movie?.poster_path)
            photos.append(
            ` <div class="responsive mb-4 ">
            <div class="gallery">
          
                <img src="https://image.tmdb.org/t/p/original${movie?.poster_path}" alt="Forest">
              
              <div class="desc">${movie?.overview.slice(0,50)}</div>
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

$(document).ready(
    function (){


        displayStories();



    }
)
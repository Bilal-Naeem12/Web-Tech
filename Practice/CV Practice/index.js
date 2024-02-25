let innerProgress = document.querySelectorAll(".inner-progress")

console.log(innerProgress)


innerProgress.forEach((e)=>
{
incremental(e)
}
);
function updateProgress(progress,progressBar) {
    progressBar.style.width = progress + '%';
  
  }

function incremental(e){
    

const cssPropertyValue =  e.attributes[1].textContent;
const numericValue = parseFloat(cssPropertyValue.match(/\d+/)[0]);
console.log(numericValue)

let progress = 0;
    let interval = setInterval(function() {
      progress += 1;
      updateProgress(progress,e);

      if (progress >= numericValue) {
        clearInterval(interval);
      }
    }, 10);

}


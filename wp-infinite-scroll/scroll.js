window.onload= function (){
  //handle effect
  initScroll();
};

function initScroll(){
  if(document.getElementById('infinite-scroll')){
    document.addEventListener('scroll', checkPosition);
  }
}

function checkPosition(){
  if(inViewPort(document.getElementById('infinite-scroll'))){
    document.removeEventListener('scroll', checkPosition);
    url = document.getElementById('infinite-scroll').getAttribute('data-href');
    console.log(url);
    downloadPage(url);
  }
}

function inViewPort (el) {
  if (typeof jQuery === "function" && el instanceof jQuery) {
      el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
  ); 
}

async function downloadPage(url){
   fetch(url).then(response => response.text())
   .then(text => {
     const parser = new DOMParser();
     const htmlDocument = parser.parseFromString(text, "text/html");
     //this is de only line that need to be updated
     // contains content of post without title and so on... 
     dom = htmlDocument.documentElement.querySelector(".entry-content");
     div = document.getElementById('infinite-scroll');
     div.id = 'temp';
     //element = document.getElementById('temp');
     //update url
     window.history.pushState("", "", url);
     div.parentNode.insertBefore(dom,div);
     div.remove();
     initScroll();
   })
  }
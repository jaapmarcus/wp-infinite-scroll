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
    console.log('New content loading');
    const parser = new DOMParser();
    const htmlDocument = parser.parseFromString(text, "text/html");
    div = document.getElementById('infinite-scroll');
    div.id = 'temp';
    dom = htmlDocument.documentElement.querySelector(".td-post-content");
    dom.childNodes.forEach(function (node) {
      if (node.nodeName != '#text' && node.nodeName != 'STYLE') {
     console.log(node.nodeName);
        console.log(document.getElementById('temp').parentNode);
        document.getElementById('temp').parentNode.parentNode.appendChild(node);
        console.log(node);
      }
    });
    console.log('New content loaded');
    div.remove();
    window.history.pushState("", "", url);
    initScroll();
  })
 }
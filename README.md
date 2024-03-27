# wp-infinite-scroll

How to call new functions after update is present

```js
let previousUrl = location.href;
let observer = new MutationObserver(function (mutations) {
    if (location.href !== previousUrl) {
        previousUrl = location.href;
        //here your code
    }
});
const config = {subtree: true, childList: true};
observer.observe(document, config);
```
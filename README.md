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

## Manually changes required:

On line 42 on scroll.js edit the div where the post content is from for example:
```
  dom = htmlDocument.documentElement.querySelector(".td-post-content");
```

## Notes

When using incombination with AdSight rename previousUrl to something else
/**
 * Created by jiangzhou on 2016/9/5.
 */
require.config({
    paths : {
        "jquery" : ["http://libs.baidu.com/jquery/2.0.3/jquery"]
    }
})
require([
    'dist/photoswipe.js',
    'dist/photoswipe-ui-default.js'
],function(PhotoSwipe, PhotoSwipeUI_Default){
    var pswpElement = document.querySelectorAll('.pswp')[0];

// build items array
    var items = [
        {
            src: 'https://placekitten.com/600/400',
            w: 600,
            h: 600
        },
        {
            src: 'https://placekitten.com/1200/900',
            w: 1200,
            h: 900
        }
    ];

// define options (if needed)
    var options = {
        // optionName: 'option value'
        // for example:
        index: 0 // start at first slide
    };

// Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe( pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
});
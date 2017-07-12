/**
 * Created by Administrator on 2015/11/10.
 */
$(function(){
    var runPage,
        runPage2,
        interval,
        autoPlay;

    autoPlay = function(to) {
        clearTimeout(interval);
        interval = setTimeout(function() {
            runPage.go(to);
        }, 5000);

    }

    runSection = new FullPage({
        id : 'article',                            // id of contain
        slideTime : 800,                               // time of slide
        effect : {                                     // slide effect
            transform : {
                translate : 'X',					   // 'X'|'Y'|'XY'|'none'
                scale : [0, 1],					   // [scalefrom, scaleto]
                rotate : [0, 360]					   // [rotatefrom, rotateto]
            },
            opacity : [0, 1]                           // [opacityfrom, opacityto]
        },
        mode : 'touch,wheel',               // mode of fullpage
        easing : [0, .93, .39, .98],
        continuous:true,
        beforeChange:function(index,thisPage) {
        },
        callback : function(index, thisPage) {     // callback when pageChange

        }
    });
});



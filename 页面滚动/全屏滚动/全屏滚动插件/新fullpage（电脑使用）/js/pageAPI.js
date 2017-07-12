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
    runPage = new FullPage({
        id : 'pageContain',                            // id of contain
        slideTime : 1000,                               // time of slide
        effect : {                                     // slide effect
            transform : {
                translate : 'X',					   // 'X'|'Y'|'XY'|'none'
                scale : [0, 1],					   // [scalefrom, scaleto]
                rotate : [60, 0]					   // [rotatefrom, rotateto]
            },
            opacity : [0, 1]                           // [opacityfrom, opacityto]
        },
        mode : 'touch,nav:navBar',               // mode of fullpage
        easing : [0, .93, .39, .98],                                // easing('ease','ease-in','ease-in-out' or use cubic-bezier like [.33, 1.81, 1, 1] )
        callback : function(index, thisPage) {     // callback when pageChange

            index = index + 1 > 3 ? 0 : index + 1;
            autoPlay(index);
        }
    });

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

            //切换对应的小菜单
            $('.sectionNav li').each(function(){
                $(this).css({'background':'#f0ad4e','color':'#ffffff'})
            })
            $('.sectionNav li').eq(index).css({'background':'#ffffff','color':'#f0ad4e'});
            //切换对应的小菜单结束


            if (index === 0) {
                autoPlay(runPage.thisPage() + 1);
            } else {
                clearTimeout(interval);
            }
        }
    });

    interval = setTimeout(function() {
        runPage.go(runPage.thisPage() + 1);
    }, 5000);

    var prev = document.getElementById('prev'),
        next = document.getElementById('next');
    prev.onclick = function() {
        runPage.go(runPage.thisPage() - 1);
    };
    next.onclick = function() {
        runPage.go(runPage.thisPage() + 1);
    }
});


$(function(){
    //全滚屏小菜单
    //上下居中
    var client_height=document.body.clientHeight;//窗口可视区域的宽
    $('.sectionNav').css('top',(client_height-$('.sectionNav').height())/2);
    $('.sectionNav li').click(function(){
        runSection.go($(this).index());
    });
    //设置全滚屏小菜单上下居中结束


})

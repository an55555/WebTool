/**
 * Created by jiangzhou on 2016/6/26.
 */
//选择图片
//$("#localImg").uploadPreview({ Img: "ImgPr"});
//drawArc(3000);

//var drawArc=new drawArc();
var idRecord=true;
var saveTime;
$('.isPublish').click(function(e){
    e.stopPropagation()
})
//录音按钮
$('.recording-btn').on('click',function(e){
    return
    if(idRecord){
        $('.cueTime').text('正在录音');
        drawArc.starDraw(60);
        idRecord=!idRecord
    }else{
        drawArc.end();
        idRecord=!idRecord;
        if(saveTime<5){
            $('.cueTime').text('录音时间至少要为5秒')
        }else{
            mySwiper.slideTo(3);
        }
    }
    e.stopPropagation();
    e.preventDefault()
});
//开始播放按钮
$('.startPlay').on('click',function(e){
    $(this).css('padding-left',0);
    $(this).html('&#xe607;');
    var runT=0;
    var endT=saveTime;
    console.log(endT);
    var playTime=setInterval(function(){
        runT++;
        $('.runingTime').text(setTimeFormat(runT));
        $('.runingDot').css('width',(runT/endT)*100+'%');
        if(runT>=endT){
            clearInterval(playTime);
        }
    },1000)
});
//扫描动画
function drawArc(time){
    var c=document.getElementById("drawArc");
    var _w=$('.recording-btn').outerHeight(true);
    c.width=_w;
    var _h=$('.recording-btn').outerHeight(true);
    c.height=_h;
    var cxt=c.getContext("2d");
    cxt.strokeStyle="#00c37f";
    cxt.lineWidth=4;
    var loading=0,loaded=0;
    var loadTime;
    var second;//记录秒

    this.starDraw=function(time){
        var _this=this;
        loadTime=setInterval(function(){
            cxt.clearRect(0,0,200,200);
            loading+=1;
            loaded=1.5+(loading/time)*2;
            cxt.beginPath();
            cxt.arc(_w/2,_h/2,_w/2,Math.PI*1.5,Math.PI*loaded,false);
            cxt.stroke();
            second=(60-loading)>=10?(60-loading):"0"+(60-loading);
            if(second<10){
                $('.timeOut').addClass("warning-color");
            }
            $('.timeOut').text('00:'+second);
            if(loading>=time){
                _this.end();
            }
        },1000);
    };
    this.end=function(){
        clearInterval(loadTime);
        saveTime=loading;
        console.log('录了'+saveTime);
        cxt.clearRect(0,0,200,200);
        $('.timeOut').text('01:00');
        $('.timeOut').removeClass("warning-color");
        //将时间传到播放器
        var showT=setTimeFormat(saveTime);
        console.log(showT);
        $('.totalTime').text(showT);
        loaded=0;
        loading=0;

    }
}
//调整时间格式
function setTimeFormat(str){
    var thisT=str;
    thisT=(thisT==60)?"01:00":"00:"+thisT;
    thisT=str<10? "00:0"+str:thisT;
    return thisT;
}
function scan_ani(img){
    this.left=$(img).offset().left;
    this.top=$(img).offset().top;
    this.width=$(img).width();
    this.height=$(img).height();
    this.showAni=function(img){
        if($('.scan').length!=0){
            return;
        }
        var  scan=$('<div></div>');
        scan.addClass('scan');
        scan.css({
            width: this.width,
            height:this.height,
            top:this.top,
            left:this.left
        });
        scan.appendTo($('body'));
        var scan_bg=$('<div></div>');
        scan_bg.addClass('shortLine_LT');
        for(var i=0;i<4;i++){
            scan_bg.clone(true).appendTo(scan);
        }
    };
    this.remove=function(){
        if($('.scan').length==0){
            return;
        }else {
            $('.scan').remove();
            return false;
        }
        scan=null;
    }
}

//.查看表格里的事件
$('body').delegate('.table .img-full-responsive','click',function(){
    $('.lookEvent textarea').addClass('hidden');
    $('.rated').removeClass('rated-operated');
    $('.rated-show').removeClass('hidden');
    $('.toRated-show').addClass('hidden');
    $('.lookEvent, .mark-bg').removeClass('hidden');
});
$('.exit-mark , .rated-btn').click(function(){
    $('.lookEvent, .mark-bg').addClass('hidden');
});

//待评价
$('body').delegate('table .toRated','click',function(){
    $('.rated i').removeClass('avtStar');
    $('.rated-show').addClass('hidden');
    $('.toRated-show').removeClass('hidden');
    $('.lookEvent, .mark-bg').removeClass('hidden');
    $('.rated').addClass('rated-operated');
});

//评价
$('body').delegate('.rated-operated i','click',function(){
    $('.rated-operated i').removeClass('avtStar');
    for(var a=0;a<$(this).index()+1;a++){
        $('.rated-operated i').eq(a).addClass('avtStar');
    };
    if($('.lookEvent textarea').hasClass('hidden')){
        $('.lookEvent textarea').removeClass('hidden');
    };
    return
});
/**
 * Created by jiangzhou on 2016/10/24.
 */
//    时间戳与时分秒的转换
function   formatDate(now)   {
    var   year=now.getFullYear();
    var   month=now.getMonth()+1;
    var   date=now.getDate();
    var   hour=now.getHours();
    var   minute=now.getMinutes();
    var   second=now.getSeconds();
    return   year+"-"+showT(month)+"-"+showT(date)+" "+showT(hour)+":"+showT(minute)+":"+showT(second);
}
//格式时间
function showT(t){
    return  t>9?t:'0'+t;
}
//获取时
function  getHour(now)   {
    var   hour=now.getHours();
    return  hour>9?hour+':00':'0'+hour+':00';
}
//获取分+秒
function   getMinSec(now)   {
    var   minute=now.getMinutes();
    var   second=now.getSeconds();
    return  minute*60+second;
}

var newDate = new Date();
var endDate = new Date();

// 获取当前时间戳
var opTimestamp=1477099800;
opTimestamp = Date.parse(new Date())/1000;
// 测试数据 时间轴的 有效时间段
var startTimeAry=[opTimestamp*1-1000,opTimestamp*1+2000]
var stopTimeAry=[opTimestamp*1+1000,opTimestamp*1+3000]

var timeBar_W=$('.TimeBar').width();
var timeBar_H=$('.TimeBar').height();
var maxTimestamp = Date.parse(new Date());
//    先获取默认时间戳
newDate.setTime(opTimestamp * 1000);
$('.choseTime').attr('time',opTimestamp);
//$('.choseTime').text(formatDate(newDate));


var down_x;  //记录当鼠标按下的时候坐标
var move_x;  //移动距离坐标
var rate_dot_x=$('.slideRadioCanvas').position().left;  //时间轴的位置
var isMove;
$('.slideRadioCanvas').on("mousedown",function(e){
    isMove= e.pageX;
    down_x= e.pageX;
    nowTime=parseInt($('.choseTime').attr('time'));
    $(document).on("mousemove",getTimer);
    $(document).on("mouseup",stopDraw);
    rate_dot_x= $('.slideRadioCanvas').position().left;
    e.stopPropagation()
});

$('.slideRadioCanvas').on("mouseup",function(e){
	  newDate.setTime($('.choseTime').attr('time') * 1000);
	  var timestamp = Date.parse(new Date()); 
	  endDate.setTime(timestamp);
	  
	beginTime =  formatDate(newDate);
	endTime = formatDate(endDate);
	
	
    $(document).off("mousemove",getTimer);
    $('#isPlay').removeClass('played');
    $('#isPlay').click();
    e.stopPropagation();
    if((e.pageX-isMove)==0){goTime(e)} //鼠标按下没移动视为点击事件
});

//鼠标移动时间轴结束
function stopDraw(e){
	 $(document).off("mousemove",getTimer);
	    $('#isPlay').removeClass('played');
	    $('#isPlay').click();
	   
	    e.stopPropagation();
}
//绘制时间轴
//    绘制
var canvas=document.getElementById("timeCanvas");
$('.slideRadioCanvas').attr('width',timeBar_W)
$('.slideRadioCanvas').attr('height',timeBar_H)
var cxt=canvas.getContext("2d");
cxt.lineWidth='1';
cxt.strokeStyle = "#eee";
cxt.fillStyle = '#eee';
var drawStart=45;
var drawEnd=55;


drawT(opTimestamp,drawStart,drawEnd);
function  drawT(opTime,drawStart,drawEnd){
    $('.choseTime').attr('time',opTime)
    newDate.setTime(opTime * 1000);
    var centerW=timeBar_W/2;
    var getSec=getMinSec(new Date(opTime*1000));   //获取分+秒
    var timescaleToR=parseInt(getSec/20),timescaleCenter=parseInt(getSec/20),timescaleToL=parseInt(getSec/20);//当前时间属于一该度的哪个时间（位置）
    var timescaleHourR=opTime,timescaleHourL=opTime;
    cxt.clearRect(0,0,timeBar_W,timeBar_H);
    cxt.beginPath();
    cxt.font="14px Arial";
    cxt.fillText(formatDate(newDate),centerW-78,20);
 
    cxt.font="12px Arial";
    // 绘制右边刻度
    for(timescaleToR;timescaleToR<centerW+180;timescaleToR+=1,timescaleHourR+=20){
    	for(var i=0;i<startTimeAry.length;i++){
            // 时间在时间片段中说有片断  则画红线
    		 var curtime2 =startTimeAry[i]
    		 var curtime4 = stopTimeAry[i]
    		 if(timescaleHourR>curtime2&&timescaleHourR<curtime4){
    	            cxt.beginPath()
    	            cxt.strokeStyle = "red";
    	            cxt.moveTo(centerW+timescaleToR-timescaleCenter,drawStart);
    	            cxt.lineTo(centerW+timescaleToR-timescaleCenter,drawStart+4);
    	            cxt.stroke();
    	            cxt.closePath();
    	        }
    	}

        cxt.beginPath()
        cxt.strokeStyle = "#eee";
        if(timescaleToR%180==0){ //180px=1小时    1px=20秒
            cxt.fillText(getHour(new Date(timescaleHourR*1000)),centerW+timescaleToR-timescaleCenter-16,drawStart-3);
            cxt.moveTo(centerW+timescaleToR-timescaleCenter,drawStart);
            cxt.lineTo(centerW+timescaleToR-timescaleCenter,drawEnd);
            cxt.stroke();
            cxt.closePath();
        }
    }
    // 绘制左边刻度
    for(timescaleToL;timescaleToL>parseInt(-centerW);timescaleToL-=1,timescaleHourL-=20){
    	for(var i=0;i<startTimeAry.length;i++){
    	    // 时间在时间片段中说有片断  则画红线
   		 var curtime2 = startTimeAry[i]
   		 var curtime4 =stopTimeAry[i]
   		 if(timescaleHourL>curtime2&&timescaleHourL<curtime4){
   	            cxt.beginPath()
   	            cxt.strokeStyle = "red";
   	            cxt.moveTo(centerW+timescaleToL-timescaleCenter,drawStart);
   	            cxt.lineTo(centerW+timescaleToL-timescaleCenter,drawStart+4);
   	            cxt.stroke();
   	            cxt.closePath();
   	        }
   	}
        cxt.beginPath()
        cxt.strokeStyle = "#eee";
        if((Math.abs(timescaleToL))%180==0) {
            cxt.fillText(getHour(new Date(timescaleHourL * 1000)), centerW + timescaleToL - timescaleCenter-16, drawStart-3);
            cxt.moveTo(centerW + timescaleToL - timescaleCenter, drawStart);
            cxt.lineTo(centerW + timescaleToL - timescaleCenter, drawEnd);
            cxt.stroke();
            cxt.closePath()
        }
    }
    cxt.stroke();
}
//移动时执行的函数
function getTimer(e){
    move_x=(e.pageX-down_x)*8;
    drawT(nowTime-move_x,drawStart,drawEnd);
    newDate.setTime((nowTime-move_x) * 1000);
    $('.nowTime').click(function(){
        $(".slideRadioCanvas").bind("click", goTime)
    })
    $(".slideRadioCanvas").unbind("click", goTime);
    e.preventDefault()
}
//如果是点击执行的函数
function  goTime(e){
    var dis=e.pageX-$('.slideRadioCanvas').offset().left-timeBar_W/2;
    drawT(nowTime+dis*20,drawStart,drawEnd);
    e.stopPropagation();
}



//当改变窗口
    window.onresize = function(){
        resizeCanvas();
    };

function  resizeCanvas(){
    timeBar_W=$('.TimeBar').width();
    timeBar_H=$('.TimeBar').height();
    $('.slideRadioCanvas').attr('width',timeBar_W)
    $('.slideRadioCanvas').attr('height',timeBar_H)
    cxt.lineWidth='1';
    cxt.strokeStyle = "#eee";
    cxt.fillStyle = '#eee';
    nowTime=parseInt($('.choseTime').attr('time'));
    drawT(nowTime,drawStart,drawEnd);
}
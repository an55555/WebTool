/**
 * Created by jiangzhou on 2016/4/25.
 */
var POINT=35;
var canvasW= window.innerWidth;
var canvasH=window.innerHeight;
var maxR=20;
var speed=0.01;
var lineOpacity=1;
var circleArr=[];
var net_cannvas=document.getElementById("canvas_network");
var net_context=net_cannvas.getContext("2d");
net_cannvas.width = canvasW;
net_cannvas.height = canvasH;
//    边框的颜色
//     net_context.strokeStyle="rgba(0,0,0,0.6)";
//    边框的粗细
net_context.strokeWidth=1;
//    圆的填充颜色
net_context.fillStyle="#e5e3e3";

//    随机位置
var random=function(num){
    return Math.floor(Math.random()*num);
};
//    随机半径
var randomR=function(num){
    var r=Math.floor(Math.random()*num);
    return r>5?r:5;
};

//    速度随机
var dir=function(d){
    var num=Math.floor(0.5-(Math.random()));
    return num==0?d+Math.random()/10:-(d+Math.random()/10);
};

//    计算两点的距离
function lineLen(x1,y1,x2,y2){
    return Math.floor(Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2)));
}


//点：圆心x y坐标，r半径，每帧移动_x _y的距离
function circle (x, y, r,_x,_y) {
    this.x = x;
    this.y = y;
    this.r = r;
    this._x=_x;
    this._y=_y;
}
//    确定圆点
function drawPoint(x,y,r,_x,_y){
    var thisPoint=new circle(x,y,r,_x,_y);
    return thisPoint
}


//    具体绘制圆的方法
function drawCricle(x,y,r){
    net_context.beginPath();
    net_context.arc(x,y,r,0,Math.PI*2,false);
    net_context.closePath();
    net_context.fill();
}

//    具体绘制线的方法
function drawLine(x,y,_x,_y,o){
    net_context.beginPath();
    net_context.strokeStyle="rgba(229,227,227,"+o+")";
    net_context.moveTo(x,y);
    net_context.lineTo(_x,_y);
    net_context.closePath();
    net_context.stroke();
}

//    绘制
function draw(){
    net_context.clearRect(0,0,canvasW, canvasH);
    for(var i=0;i<POINT;i++){
        drawCricle(circleArr[i].x, circleArr[i].y, circleArr[i].r);
    };

//        画线
    for(var a=0;a<POINT;a++){
        for(var b=0;b<POINT;b++){
//                if((a+b)<POINT){
            var minLen=lineLen(circleArr[a].x,circleArr[a].y,circleArr[b].x,circleArr[b].y);
            if(minLen<300){
                lineOpacity=1-minLen/300;
                drawLine(circleArr[a].x,circleArr[a].y,circleArr[b].x,circleArr[b].y,lineOpacity/2)
            }
//                }
        }
    }
}

//   初始化
function init(){
    circleArr = [];
    for(var i=0;i<POINT;i++){
        circleArr.push(drawPoint(random(canvasW),random(canvasH),randomR(maxR),dir(speed),dir(speed)));
    };
    draw();
};


function load() {
    canvasW= window.innerWidth;
    canvasH=window.innerHeight;
    net_cannvas.width = canvasW;
    net_cannvas.height = canvasH;
    net_context.fillStyle="#e5e3e3";
    init();
    setInterval(function(){
        for(var i=0;i<POINT;i++){
            var cir = circleArr[i];
            cir.x += cir._x;
            cir.y += cir._y;
            if (cir.x >canvasW) cir.x = 0;
            else if (cir.x < 0) cir.x = canvasW;
            if (cir.y > canvasH) cir.y = 0;
            else if (cir.y < 0) cir.y = canvasH;
        }
        draw();
    },16);

//        添加一个以鼠标为圆心的点
    document.onmousemove=function(e){
        e=e? e:window.event;
        circleArr.splice(circleArr.length-1,1,drawPoint(e.clientX,e.clientY,2,0,0));
    }
}
window.onload=function(){
    load()
};
window.onresize=function () {
    load()
}
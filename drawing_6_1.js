let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
let old_x=0;
let old_y=0;

let size=4;

let rotDig; //講義資料外の変数宣言

let color_var;



// 色関数
function black_fnc(){
    color_var=0;
}
function white_fnc(){
    color_var=1;
}
function red_fnc(){
    color_var=2;
}
function orange_fnc(){
    color_var=3;
}
function yellow_fnc(){
    color_var=4;
}
function green_fnc(){
    color_var=5;
}
function blue_fnc(){
    color_var=6;
}
function navy_fnc(){
    color_var=7;
}
function purple_fnc(){
    color_var=8;
}


























function init(){
    canvas.addEventListener("touchstart", touchStart, false);
    canvas.addEventListener("touchmove", touchMove, false);
    window.addEventListener("orientationchange", oChange, true);
    //for(rotDig=0; rotDig<360; rotDig+=45){
        //ctx.save();
        //ctx.translate(canvas.width/2, canvas.height/2);
        //ctx.rotate(rotDig/180*Math.PI);
        //drawRct(0*32, 0*32, 32*2, 32*2, "red", true);
        //drawRct(2*32, 2*32, 32*2, 32*2, "red", false);
        //drawCcl(2*32, 2*32, 32, "green");
        //drawTri(4*32, 4*32, 32*2, 32*2, "blue");
        //drawImg(6*32, 6*32, 32*2, 32*2);
        //drawImgA(6*32, 6*32, 32*2, 32*2, 0);
        //drawImgA(8*32, 8*32, 32*2, 32*2, 1);
        //drawImgA(10*32, 10*32, 32*2, 32*2, 2);
        //ctx.restore();
    //}
}

function oChange()
{
    var flag=confirm("絵を消去しますか？");
    if(flag==false){
        return;
    }
    ctx=canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function touchStart(event)
{
    if(event.touches.length>1){
        size=event.touches.length*2;
    }
    //x=event.touches[0].pageX;
    //y=event.touches[0].pageY;
    //drawCcl(x, y, 4, "green");
    old_x=event.touches[0].pageX;
    old_y=event.touches[0].pageY;
}

function touchMove(event){
    let c_x;
    let c_y;
    event.preventDefault();
    c_x=event.touches[0].pageX;
    c_y=event.touches[0].pageY;
    drawCcl(old_x, old_y, 4, color_var);///描画1,変更
    drawLine(old_x, old_y, c_x, c_y, size, color_var);///描画2,変更
    old_x=c_x;
    old_y=c_y;
}

function drawLine(x1, y1, x2, y2, psize, color_v)///引数変更
{
    ///以下のif処理,else if処理の追加
    if(color_v==0){
        ctx.fillStyle="black";
    } else if(color_v==1){
        ctx.fillStyle="white";
    } else if(color_v==2){
        ctx.fillStyle="red";
    } else if(color_v==3){
        ctx.fillStyle="orange";
    } else if(color_v==4){
        ctx.fillStyle="yellow";
    } else if(color_v==5){
        ctx.fillStyle="green";
    } else if(color_v==6){
        ctx.fillStyle="blue";
    } else if(color_v==7){
        ctx.fillStyle="navy";
    } else if(color_v==8){
        ctx.fillStyle="purple";
    }
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.lineWidth=psize;
    ctx.strokeStyle=color_v;
    ctx.stroke();
}

function drawRct(x, y, w, h, color, isfill)
{
    if(isfill==true){
        ctx.fillStyle=color;
        ctx.fillRect(x, y, w, h);
    } else if(isfill==false) {
        ctx.strokeStyle=color;
        ctx.strokeRect(x, y, w, h);
    }
}

function drawTri(x, y, w, h, color)
{
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.moveTo(x+w/2, y);
    ctx.lineTo(x, y+h);
    ctx.lineTo(x+w, y+h);
    ctx.closePath();
    ctx.fill();
}

function drawCcl(x, y, r, color_v)///引数変更
{
    ///以下のif処理,else if処理の追加
    if(color_v==0){
        ctx.fillStyle="black";
    } else if(color_v==1){
        ctx.fillStyle="white";
    } else if(color_v==2){
        ctx.fillStyle="red";
    } else if(color_v==3){
        ctx.fillStyle="orange";
    } else if(color_v==4){
        ctx.fillStyle="yellow";
    } else if(color_v==5){
        ctx.fillStyle="green";
    } else if(color_v==6){
        ctx.fillStyle="blue";
    } else if(color_v==7){
        ctx.fillStyle="navy";
    } else if(color_v==8){
        ctx.fillStyle="purple";
    }
    ctx.beginPath();
    ctx.arc(x+r, y+r, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

//let img=new Image();
//img.src="button_r.png";

//function drawImg(x, y, w, h)
//{
    //ctx.drawImage(img, x, y, w, h);
//}

let img=new Array();
for(i=0; i<3; i++){
    img[i]=new Image();
    img[i].src="button"+i+".png";
}

function drawImgA(x, y, w, h, i)
{
    ctx.drawImage(img[i], x, y, w, h);
}
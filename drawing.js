let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
let old_x=0;
let old_y=0;

let size=4;

let rotDig; //講義資料外の変数宣言

/// 自作変数
let color_var; //自作色変数
let type_var; //自作図形変数
let size_var; //大きさ指定変数

let check1_var=false; //色変更の完了変数
let check2_var=false; //図形変更の完了変数
let check3_var=false; //大きさ変更の完了変数

let my_w_var; //幅指定変数
let my_h_var; //高さ指定変数
let my_r_var; //半径指定変数



/// 色関数,自作
function black_fnc(){ //黒
    color_var=0;
    check1_var=true;
    draw_check_fnc();
    console.log("color_var="+color_var);
    console.log("check1_var="+check1_var);
    console.log();
}
function white_fnc(){ //白
    color_var=1;
    check1_var=true;
    draw_check_fnc();
    console.log("color_var="+color_var);
    console.log("check1_var="+check1_var);
    console.log();
}
function red_fnc(){ //赤
    color_var=2;
    check1_var=true;
    draw_check_fnc();
    console.log("color_var="+color_var);
    console.log("check1_var="+check1_var);
    console.log();
}
function orange_fnc(){ //オレンジ
    color_var=3;
    check1_var=true;
    draw_check_fnc();
    console.log("color_var="+color_var);
    console.log("check1_var="+check1_var);
    console.log();
}
function yellow_fnc(){ //黄
    color_var=4;
    check1_var=true;
    draw_check_fnc();
    console.log("color_var="+color_var);
    console.log("check1_var="+check1_var);
    console.log();
}
function green_fnc(){ //緑
    color_var=5;
    check1_var=true;
    draw_check_fnc();
    console.log("color_var="+color_var);
    console.log("check1_var="+check1_var);
    console.log();
}
function blue_fnc(){ //青
    color_var=6;
    check1_var=true;
    draw_check_fnc();
    console.log("color_var="+color_var);
    console.log("check1_var="+check1_var);
    console.log();
}
function navy_fnc(){ //紺
    color_var=7;
    check1_var=true;
    draw_check_fnc();
    console.log("color_var="+color_var);
    console.log("check1_var="+check1_var);
    console.log();
}
function purple_fnc(){ //紫
    color_var=8;
    check1_var=true;
    draw_check_fnc();
    console.log("color_var="+color_var);
    console.log("check1_var="+check1_var);
    console.log();
}



/// 図形関数,自作
function Ccl_fnc(){ //円
    type_var=0;
    check2_var=true;
    draw_check_fnc();
    console.log("type_var="+type_var);
    console.log("check2_var="+check2_var);
    console.log();
}
function Line_fnc(){ //直線
    type_var=1;
    check2_var=true;
    draw_check_fnc();
    console.log("type_var="+type_var);
    console.log("check2_var="+check2_var);
    console.log();
}
function Rct_fnc(){ //長方形
    type_var=2;
    check2_var=true;
    draw_check_fnc();
    console.log("type_var="+type_var);
    console.log("check2_var="+check2_var);
    console.log();
}
function Tri_fnc(){ //三角形
    type_var=3;
    check2_var=true;
    draw_check_fnc();
    console.log("type_var="+type_var);
    console.log("check2_var="+check2_var);
    console.log();
}
function Squ_fnc(){ //正方形
    type_var=4;
    check2_var=true;
    draw_check_fnc();
    console.log("type_var="+type_var);
    console.log("check2_var="+check2_var);
    console.log();
}
function Ccl_H_fnc(){ //半円
    type_var=5;
    check2_var=true;
    draw_check_fnc();
    console.log("type_var="+type_var);
    console.log("check2_var="+check2_var);
    console.log();
}




/// 大きさ関数,自作
function small_fnc(){ //小さめ
    size_var=0;
    check3_var=true;
    draw_check_fnc();
    console.log("size_var="+size_var);
    console.log("check3_var="+check3_var);
    console.log();
}
function normal_fnc(){ //普通
    size_var=1;
    check3_var=true;
    draw_check_fnc();
    console.log("size_var="+size_var);
    console.log("check3_var="+check3_var);
    console.log();
}
function big_fnc(){ //大きめ
    size_var=2;
    check3_var=true;
    draw_check_fnc();
    console.log("size_var="+size_var);
    console.log("check3_var="+check3_var);
    console.log();
}
function my_size_fnc(){ //自分で指定
    size_var=3;
    check3_var=true;
    draw_check_fnc();
    my_size_sup_fnc();
    console.log("size_var="+size_var);
    console.log("check3_var="+check3_var);
    console.log();
}




/// リセット関数,自作
function reset_fnc(){
    oChange();
    check1_var=false;//色変更の初期化
    check2_var=false;//図形変更の初期化
    check3_var=false;//大きさ変更の初期化

    //メッセージ用idの初期化(計8つ)
    document.getElementById("mess_id").innerHTML="";
    document.getElementById("my_w_id").innerHTML="";
    document.getElementById("my_h_id").innerHTML=""
    document.getElementById("my_r_id").innerHTML=""
    document.getElementById("my_w_mess_id").innerHTML="";
    document.getElementById("my_h_mess_id").innerHTML=""
    document.getElementById("my_r_mess_id").innerHTML=""
    
    //w(幅),h(高さ),r(半径)の初期化
    my_w_var=0;
    my_h_var=0;
    my_r_var=0;
}

/// w,h,rの入力補助関数,自作
function my_size_sup_fnc(){
    //値の入力位置の補助を行う
    document.getElementById("my_w_mess_id").innerHTML="wの値=";
    document.getElementById("my_h_mess_id").innerHTML="hの値=";
    document.getElementById("my_r_mess_id").innerHTML="rの値=";
}

/// 絵を描けるかどうか確認する関数,自作
function draw_check_fnc(){
    if(check1_var==true && check2_var==true && check3_var==true){ //三項目のボタンが入力されていた時
        document.getElementById("mess_id").innerHTML="絵の書いてみよう";
    } else { //いずれかのボタンが未入力時
        document.getElementById("mess_id").innerHTML="「色」,「図形」,「大きさ」の三つのボタンを入力してください";
    }
}

/// ok関数,大きさ変更の反映を行う,自作
function ok_fnc(){
    if(size_var==3){
        my_w_var=document.getElementById("my_w_id").value;
        my_h_var=document.getElementById("my_h_id").value;
        my_r_var=document.getElementById("my_r_id").value;
    } else {
        my_w_var=0;
        my_h_var=0;
        my_r_var=0;
    }
}

// 通常時の処理関数,講義資料
function init(){
    canvas.addEventListener("touchstart", touchStart, false);
    canvas.addEventListener("touchmove", touchMove, false);
    window.addEventListener("orientationchange", oChange, true);
}

// 端末の傾きに応じた絵のリセット関数,講義資料
function oChange()
{
    var flag=confirm("絵を消去しますか？");
    if(flag==false){
        return;
    }
    ctx=canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 端末のタッチに反応する関数,講義資料
function touchStart(event)
{
    if(event.touches.length>1){
        size=event.touches.length*2;
    }
    old_x=event.touches[0].pageX;
    old_y=event.touches[0].pageY;
}

// 動きに反応する関数,講義資料+一部変更
function touchMove(event){
    let c_x;
    let c_y;
    event.preventDefault();
    c_x=event.touches[0].pageX;
    c_y=event.touches[0].pageY;
    //if,else ifでボタンに応じた処理の分岐(=大きさ,図形,値の指示の有無の変更)
    if(check1_var==true && check2_var==true && check3_var==true){
        if(type_var==0){
            if(size_var==0){
                drawCcl(old_x, old_y, 5, color_var);///描画1-1,変更,円,小
            } else if(size_var==1){
                drawCcl(old_x, old_y, 10, color_var);///描画1-2,変更,円,中
            } else if(size_var==2){
                drawCcl(old_x, old_y, 15, color_var);///描画1-3,変更,円,大
            } else if(size_var==3){
                drawCcl(old_x, old_y, my_r_var, color_var);///描画1-4,変更,円,大きさ指定
            }
        } else if(type_var==1){
            if(size_var==0){
                drawLine(old_x, old_y, c_x, c_y, size-2, color_var);///描画2-1,変更,線,小
            } else if(size_var==1){
                drawLine(old_x, old_y, c_x, c_y, size, color_var);///描画2-2,変更,線,中
            } else if(size_var==2){
                drawLine(old_x, old_y, c_x, c_y, size+2, color_var);///描画2-3,変更,線,大
            }
        } else if(type_var==2){
            if(size_var==0){
                drawRct(old_x, old_y, 15, 5, color_var, true);///描画3-1,変更,長方形,小
            } else if(size_var==1){
                drawRct(old_x, old_y, 20, 10, color_var, true);///描画3-2,変更,長方形,中
            } else if(size_var==2){
                drawRct(old_x, old_y, 25, 15, color_var, true);///描画3-3,変更,長方形,大
            } else if(size_var==3){
                drawRct(old_x, old_y, my_w_var, my_h_var, color_var, true);///描画3-4,変更,長方形,大きさ指定
            }
        } else if(type_var==3){
            if(size_var==0){
                drawTri(old_x, old_y, 5, 5, color_var);///描画4-1,変更,三角形,小
            } else if(size_var==1){
                drawTri(old_x, old_y, 10, 10, color_var);///描画4-2,変更,三角形,中
            } else if(size_var==2){
                drawTri(old_x, old_y, 15, 15, color_var);///描画4-3,変更,三角形,大
            } else if(size_var==3){
                drawTri(old_x, old_y, my_w_var, my_h_var, color_var);///描画4-4,変更,三角形,大きさ指定
            }
        } else if(type_var==4){
            if(size_var==0){
                drawSqu(old_x, old_y, 5, 5, color_var, true);///描画5-1,変更,正方形,小
            } else if(size_var==1){
                drawSqu(old_x, old_y, 10, 10, color_var, true);///描画5-2,変更,正方形,中
            } else if(size_var==2){
                drawSqu(old_x, old_y, 15, 15, color_var, true);///描画5-3,変更,正方形,大
            } else if(size_var==3 && my_w_var==my_h_var){
                drawSqu(old_x, old_y, my_w_var, my_h_var, color_var, true);///描画5-4,変更,正方形,大きさ指定
            }
        } else if(type_var==5){
            if(size_var==0){
                drawCcl_H(old_x, old_y, 5, color_var);///描画6-1,変更,半円,小
            } else if(size_var==1){
                drawCcl_H(old_x, old_y, 10, color_var);///描画6-2,変更,半円,中
            } else if(size_var==2){
                drawCcl_H(old_x, old_y, 15, color_var);///描画6-3,変更,半円,大
            } else if(size_var==3){
                drawCcl_H(old_x, old_y, my_r_var, color_var);///描画6-4,変更,半円,大黄さ指定
            }
        }
    }
    old_x=c_x;
    old_y=c_y;
}

// 直線関数,講義資料+一部変更
function drawLine(x1, y1, x2, y2, psize, color_v)///引数変更
{
    ///以下のif処理,else if処理の追加,色への対応
    if(color_v==0){
        ctx.strokeStyle="black";
    } else if(color_v==1){
        ctx.strokeStyle="white";
    } else if(color_v==2){
        ctx.strokeStyle="red";
    } else if(color_v==3){
        ctx.strokeStyle="orange";
    } else if(color_v==4){
        ctx.strokeStyle="yellow";
    } else if(color_v==5){
        ctx.strokeStyle="green";
    } else if(color_v==6){
        ctx.strokeStyle="blue";
    } else if(color_v==7){
        ctx.strokeStyle="navy";
    } else if(color_v==8){
        ctx.strokeStyle="purple";
    }
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.lineWidth=psize;
    ctx.stroke();
}

// 長方形関数,講義資料+一部変更
function drawRct(x, y, w, h, color_v, isfill)
{
    if(isfill==true){
        ///以下のif処理,else if処理の追加,色への対応
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
        ctx.fillRect(x, y, w, h);
    } else if(isfill==false) {
        ///以下のif処理,else if処理の追加,色への対応
        if(color_v==0){
            ctx.strokeStyle="black";
        } else if(color_v==1){
            ctx.strokeStyle="white";
        } else if(color_v==2){
            ctx.strokeStyle="red";
        } else if(color_v==3){
            ctx.strokeStyle="orange";
        } else if(color_v==4){
            ctx.strokeStyle="yellow";
        } else if(color_v==5){
            ctx.strokeStyle="green";
        } else if(color_v==6){
            ctx.strokeStyle="blue";
        } else if(color_v==7){
            ctx.strokeStyle="navy";
        } else if(color_v==8){
            ctx.strokeStyle="purple";
        }
        ctx.strokeRect(x, y, w, h);
    }
}

// 三角形関数,講義資料+一部変更
function drawTri(x, y, w, h, color_v)
{
    ///以下のif処理,else if処理の追加,色への対応
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
    ctx.moveTo(x+w/2, y);
    ctx.lineTo(x, y+h);
    ctx.lineTo(x+w, y+h);
    ctx.closePath();
    ctx.fill();
}

// 円関数,講義資料+一部変更
function drawCcl(x, y, r, color_v)///引数変更
{
    ///以下のif処理,else if処理の追加,色への対応
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

/// 自作図形関数
/// 正方形関数,講義資料+一部変更
function drawSqu(x, y, w, h, color_v, isfill)
{
    if(isfill==true){
        ///以下のif処理,else if処理の追加,色への対応
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
        ctx.fillRect(x, y, w, h);
    } else if(isfill==false) {
        ///以下のif処理,else if処理の追加,色への対応
        if(color_v==0){
            ctx.strokeStyle="black";
        } else if(color_v==1){
            ctx.strokeStyle="white";
        } else if(color_v==2){
            ctx.strokeStyle="red";
        } else if(color_v==3){
            ctx.strokeStyle="orange";
        } else if(color_v==4){
            ctx.strokeStyle="yellow";
        } else if(color_v==5){
            ctx.strokeStyle="green";
        } else if(color_v==6){
            ctx.strokeStyle="blue";
        } else if(color_v==7){
            ctx.strokeStyle="navy";
        } else if(color_v==8){
            ctx.strokeStyle="purple";
        }
        ctx.strokeRect(x, y, w, h);
    }
}

// 半円関数,講義資料+一部変更
function drawCcl_H(x, y, r, color_v)///引数変更
{
    ///以下のif処理,else if処理の追加,色への対応
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
    ctx.arc(x+r, y+r, r, 0, Math.PI, true);///Math.PI*2⇔Math.PI
    ctx.closePath();
    ctx.fill();
}
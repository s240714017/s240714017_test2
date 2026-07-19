//第十二回講義
let ctx;
let timer=NaN;

const FW=6;
const FH=13;
const DELETE=3;

let field=[
    [0,0,0,0,0,0,0,0,0,1,2,2,1],
    [0,0,0,0,0,0,0,0,3,1,1,1,3],
    [0,0,0,0,0,0,0,0,0,1,3,3,2],
    [0,0,0,0,0,0,0,0,0,0,0,0,3],
    [0,0,0,0,0,0,0,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,2],
];

let n=0;

let d_flag=false;
let f=flag=false;

//ゲームフィールドを描く
function paint(){
    for(y=1; y<FH; y++){ //一番上の行は表示しない
        ctx.fillStyle="brown";
        ctx.fillRect(0, (y+1)*44, 42, 42);
        for(x=0; x<FW; x++){
            switch(field[x][y]){
                case 0: ctx.fillStyle="white"; break;
                case 1: ctx.fillStyle="red"; break;
                case 2: ctx.fillStyle="green"; break;
                case 3: ctx.fillStyle="blue"; break;
            }
            ctx.fillRect((x+1)*44, (y+1)*44, 42, 42);
        }
        ctx.fillStyle="brown";
        ctx.fillRect((FW+1)*44, (y+1)*44, 42, 42);
    }
    ctx.fillStyle="brown";
    ctx.fillRect(0, (FH+1)*44, (FW+2)*44, 42);
}

function init(){
    let canvas=document.getElementById("canvas");
    ctx=canvas.getContext("2d");
    timer=setInterval(tick, 500);
    paint();

    window.onkeydown=mykedown; //第十三回講義,追加
    window.onkeyup=mykeyup; //第十三回講義,追加
}

//自分に隣接している同色のぷよの個数を調べる(探索後に消す→戻す)
function count(x, y){
    c=field[x][y]; //自分の色
    field[x][y]=0;
    n++;
    if(x+1<FW && field[x+1][y]==c) count(x+1, y);
    if(y+1<FH && field[x][y+1]==c) count(x, y+1);
    if(x-1>=0 && field[x-1][y]==c) count(x-1, y);
    if(y-1>=0 && field[x][y-1]==c) count(x, y-1);
}

//ぷよを消す(count関数の応用)
function vanish(f, x, y){
    c=f[x][y]; //自分の色

    f[x][y]=0; //色ぷよを消す

    if(x+1<FW && f[x+1][y]==c) vanish(f, x+1, y);
    if(y+1<FH && f[x][y+1]==c) vanish(f, x, y+1);
    if(x-1>=0 && f[x-1][y]==c) vanish(f, x-1, y);
    if(y-1>=0 && f[x][y-1]==c) vanish(f, x, y-1);
}

//ゲームフィールドの色をコピーする
function copy_field(to, from){
    for(y=0; y<FH; y++){
        for(x=0; x<FW; x++){
            to[x][y]=from[x][y];
        }
    }
}

//四方にDELETE以上隣接している色ぷよを消す
//戻り値:削除した色ぷよの数(スコア計算に利用可能)
function delete_puyo(){
    let f=Array(FW);
    for(yy=0; yy<FH; yy++){
        f[yy]=Array(FH);
    }
    d=0;

    copy_field(f, field);
    for(y=0; y<FH; y++){
        for(x=0; x<FW; x++){
            n=field[x][y];
            if(n!=0){
                n=0;
                count(x, y);
                if(n>=DELETE){
                    vanish(f, x, y);
                    d+=n;
                }
            }
        }
    }
    copy_field(field, f);
    return d;
}

//浮いているぷよを1マスだけ落とす
//戻り値:ぷよを落とした列数
function fall_puyo(){
    py++; //第十三回講義,追加
    input(); //第十三回講義,追加

    n=0;
    for(x=0; x<FW; x++){
        for(y=FH-1; y>=0; y--){
            if(field[x][y]==0){
                for(iy=y-1; iy>=0 && field[x][iy]==0; iy--);
                if(iy<0) break;
                n++;
                for(iy=y; iy>=0; iy--){
                    if(iy-1>=0)
                        field[x][iy]=field[x][iy-1];
                    else
                        field[x][iy]=0;
                }
                break;
            }
        }
    }
    return n;
}

//新しいぷよを作る
function new_puyo(){
    px=FW/2; //第十三回講義,追加
    py=0; //第十三回講義,追加

    //r=Math.floor(Math.random()*FW);
    field[px][0]=Math.floor(Math.random()*3)+1; //第十三回講義,変更
    field[px][1]=Math.floor(Math.random()*3)+1; //第十三回講義,変更
}

//メイン
function tick(){
    f_flag=fall_puyo();
    paint();
    if(f_flag==0){
        d_flag=delete_puyo();
        if(d_flag==0)
            new_puyo();
    }
    //ゲームオーバー処理(続き3),追加
    alert_logic_fnc();
}

//ゲームオーバーのアラート表示関数,自作,追加
function gameover_alert_fnc(){
    alert("GameOver"); //ゲームオーバーの通知
}

//ゲームオ－バーの形式作成関数,自作,追加
function alert_logic_fnc(){
    if(field[0][0]==1 || field[0][0]==2 || field[0][0]==3){ //初期位置に当たるゼロ列目かつ左から一行目にぷよがあった時
        if(field[0][1]==1 || field[0][1]==2 || field[0][1]==3){ //上から一列目かつ左から一行目にぷよがあった時
            if(field[0][2]==1 || field[0][2]==2 || field[0][2]==3){ //上から二列目かつ左から一行目にぷよがあった時
                gameover(); //ゲームオーバー関数
                //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                paint(); //ゲームフィールド関数
                gameover(); //ゲームオーバー関数
                setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
            }
        }
    }
    if(field[1][0]==1 || field[1][0]==2 || field[1][0]==3){ //初期位置に当たるゼロ列目かつ左から二行目にぷよがあった時
        if(field[1][1]==1 || field[1][1]==2 || field[1][1]==3){ //上から一列目かつ左から二行目にぷよがあった時
            if(field[1][2]==1 || field[1][2]==2 || field[1][2]==3){ //上から二列目かつ左から二行目にぷよがあった時
                gameover(); //ゲームオーバー関数
                //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                paint(); //ゲームフィールド関数
                gameover(); //ゲームオーバー関数
                setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
            }
        }
    }
    if(field[2][0]==1 || field[2][0]==2 || field[2][0]==3){ //初期位置に当たるゼロ列目かつ左から三行目にぷよがあった時
        if(field[2][1]==1 || field[2][1]==2 || field[2][1]==3){ //上から一列目かつ左から三行目にぷよがあった時
            if(field[2][2]==1 || field[2][2]==2 || field[2][2]==3){ //上から二列目かつ左から三行目にぷよがあった時
                gameover(); //ゲームオーバー関数
                //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                paint(); //ゲームフィールド関数
                gameover(); //ゲームオーバー関数
                setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
            }
        }
    }
    if(field[3][0]==1 || field[3][0]==2 || field[3][0]==3){ //初期位置に当たるゼロ列目かつ左から四行目にぷよがあった時
        if(field[3][1]==1 || field[3][1]==2 || field[3][1]==3){ //上から一列目かつ左から四行目にぷよがあった時
            if(field[3][2]==1 || field[3][2]==2 || field[3][2]==3){ //上から二列目かつ左から四行目にぷよがあった時
                gameover(); //ゲームオーバー関数
                //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                paint(); //ゲームフィールド関数
                gameover(); //ゲームオーバー関数
                setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
            }
        }
    }
    if(field[4][0]==1 || field[4][0]==2 || field[4][0]==3){ //初期位置に当たるゼロ列目かつ左から五行目にぷよがあった時
        if(field[4][1]==1 || field[4][1]==2 || field[4][1]==3){ //上から一列目かつ左から五行目にぷよがあった時
            if(field[4][2]==1 || field[4][2]==2 || field[4][2]==3){ //上から二列目かつ左から五行目にぷよがあった時
                gameover(); //ゲームオーバー関数
                //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                paint(); //ゲームフィールド関数
                gameover(); //ゲームオーバー関数
                setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
            }
        }
    }
    if(field[5][0]==1 || field[5][0]==2 || field[5][0]==3){ //初期位置に当たるゼロ列目かつ左から六行目にぷよがあった時
        if(field[5][1]==1 || field[5][1]==2 || field[5][1]==3){ //上から一列目かつ左から六行目にぷよがあった時
            if(field[5][2]==1 || field[5][2]==2 || field[5][2]==3){ //上から二列目かつ左から六行目にぷよがあった時
                gameover(); //ゲームオーバー関数
                //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                paint(); //ゲームフィールド関数
                gameover(); //ゲームオーバー関数
                setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
            }
        }
    }
}

//ゲームオーバー(現状どこからも呼ばれていない)
function gameover(){
    clearInterval(timer);
    timer=NaN;
}



//第十三回講義
let px=0;
let py=0;
let keyCode=0;

function mykedown(e){
    keyCode=e.keyCode;
}

function mykeyup(e){
    keyCode=0;
}

function input(){
    switch(keyCode){
        case 37: //左キー
            if(px>0){
                if(field[px-1][py]==0 && field[px-1][py-1]==0){
                    field[px-1][py]=field[px][py];
                    field[px-1][py-1]=field[px][py-1];
                    field[px][py]=0;
                    field[px][py-1]=0;
                    px--;
                }
            }
            break;
        case 39: //右キー
            //右キーの処理(続き1),追加
            if(px>0 && px<5){ //ぷよが移動させたい左端と右端を移動している間
                if(field[px+1][py]==0 && field[px+1][py-1]==0){ //移動先が移動可能である時
                    field[px+1][py]=field[px][py]; //下部分のぷよの右移動
                    field[px+1][py-1]=field[px][py-1]; //上部分のぷよの右移動
                    field[px][py]=0; //もともとの位置にあった下部分のぷよを削除
                    field[px][py-1]=0; //もともとの位置にあった上部分のぷよを削除
                    px++; //x座標の加算
                }
            }
            break;
        case 32: //スペースキー
            //スペースキーで上下を入れ替える(続き2),追加
            if(px>=0 && px<=5){ //ぷよが移動させたい左端と右端を移動している間
                let check1_var; //ぷよの下部分の位置取得変数
                let check2_var; //ぷよの上部分の位置取得変数
                check1_var=field[px][py]; //ぷよの下部分の位置取得
                check2_var=field[px][py-1]; //ぷよの上部分の位置取得
                
                if(check1_var==1) { //ぷよの下部分の色が赤の時
                    field[px][py-1]=1; //ぷよの上部分の色が赤となる
                } else if(check1_var==2) { //ぷよの下部分の色が緑の時
                    field[px][py-1]=2; //ぷよの上部分の色が緑となる
                } else if(check1_var==3) { //ぷよの下部分の色が青の時
                    field[px][py-1]=3; //ぷよの上部分の色が青となる
                }

                if(check2_var==1) { //ぷよの上部分の色が赤の時
                    field[px][py]=1; //ぷよの下部分の色が赤となる
                } else if(check2_var==2) { //ぷよの上部分の色が緑の時
                    field[px][py]=2; //ぷよの下部分の色が緑となる
                } else if(check2_var==3) { //ぷよの上部分の色が青の時
                    field[px][py]=3; //ぷよの下部分の色が青となる
                }
            }
            break;
    }
    keyCode=0;
}
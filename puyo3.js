///工夫点
//・ぷよの色を2色追加(工夫1)
//・スコアに加えてハイスコアの表示(工夫2)
//・連鎖によるスコア計算方法の追加(工夫3)
//・連結によるスコア計算方法の追加(工夫4)
//・再プレイ用の「REPLAY」ボタンの追加(工夫5)
//・初期化用の「RESET」ボタンの追加(工夫6)
//・ゲームの縦横の大きさやゲームの速度変更用の「CHANGE」ボタンの追加(工夫7)
//・ゲームのエラーメッセージの表示(工夫8)



//第十二回講義
let ctx;
let timer=NaN;

let FW=6; ///letで値の変化に対応,変更
let FH=13; ///letで値の変化に対応,変更
const DELETE=3;

let field=[
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
]; ///初期状態をぷよの無い状態に,変更

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
                case 4: ctx.fillStyle="yellow"; break; ///第五の色である黄色を追加,工夫1
                case 5: ctx.fillStyle="purple"; break; ///第六の色である紫色を追加,工夫1
            }
            ctx.fillRect((x+1)*44, (y+1)*44, 42, 42);
        }
        ctx.fillStyle="brown";
        ctx.fillRect((FW+1)*44, (y+1)*44, 42, 42);
    }
    ctx.fillStyle="brown";
    ctx.fillRect(0, (FH+1)*44, (FW+2)*44, 42);

    //第十四回講義,スコアの表示
    //ctx.clearRect(500, 0, 300, 800); //消す処理を追加
    ctx.clearRect(800, 0, 300, 800); ///消す処理を追加,値を変更,工夫2
    ctx.fillStyle="rgba(220, 133, 30, 50)";
    ctx.font="bold 50px sans-serif";
    ctx.fillText("SCORE", 800, 120); ///スコアの文字表示,工夫2
    //ctx.fillText(("0000000"+score).slice(-7), 500, 170);
    ctx.fillText(("0000000"+score).slice(-7), 800, 170); ///スコアの数字を表示,値を変更,工夫2
    ctx.fillText("HIGHSCORE", 800, 270); ///ハイスコアの文字表示,工夫2
    ctx.fillText(("0000000"+hscore).slice(-7), 800, 320); ///ハイスコアの数字を表示,工夫2
}

let speed_i_var=0; ///速度の値の入力反映変数
let speed_o_var=0; ///速度の値の出力反映変数

function init(){
    let canvas=document.getElementById("canvas");
    ctx=canvas.getContext("2d");
    
    speed_i_var=document.getElementById("speed_level_id").value; ///速度の値を変数で受け取る,工夫7
    ///受け取った数字を計算可能な数字に変換する,工夫7
    if(speed_i_var=="5"){ ///初期設定は5
        speed_o_var=5;
    } else if(speed_i_var=="1"){ ///入力変数が1の場合出力変数を1とする
        speed_o_var=1;
    } else if(speed_i_var=="2"){ ///入力変数が2の場合出力変数を2とする
        speed_o_var=2;
    } else if(speed_i_var=="3"){ ///入力変数が3の場合出力変数を3とする
        speed_o_var=3;
    } else if(speed_i_var=="4"){ ///入力変数が4の場合出力変数を4とする
        speed_o_var=4;
    } else if(speed_i_var=="6"){ ///入力変数が6の場合出力変数を6とする
        speed_o_var=6;
    } else if(speed_i_var=="7"){ ///入力変数が7の場合出力変数を7とする
        speed_o_var=7;
    } else if(speed_i_var=="8"){ ///入力変数が8の場合出力変数を8とする
        speed_o_var=8;
    } else if(speed_i_var=="9"){ ///入力変数が9の場合出力変数を9とする
        speed_o_var=9;
    } else if(speed_i_var==""){ ///未入力の場合は0
        speed_o_var=0;
    } else { ///未入力以外で入力値が不適切な場合は10
        speed_o_var=10;
    }

    if(0<speed_o_var && speed_o_var<10){ ///入力値が適切である時,工夫7
        timer=setInterval(tick, 1000-100*speed_o_var); ///数字に応じたタイマー変数の設定,工夫7
        document.getElementById("error_speed_id").innerHTML=""; ///エラーメッセージの削除,工夫8
    } else { ///入力値が不適切である時
        if(speed_o_var==10){ ///入力値が不適切である時,工夫
            document.getElementById("error_speed_id").innerHTML="・スピードの値が不適切です。"; ///不適切であるという趣旨のエラーメッセージ表示,工夫8
        } else if(speed_o_var==0){ ///未入力である時,工夫
            document.getElementById("error_speed_id").innerHTML="・スピードの値が入力されていません。"; ///未入力であるという趣旨のメッセージ表示,工夫8
        }
    }

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
    if(FW%2==1 && change_var==true){ ///幅が割り切れず,かつchangeボタンが押されている際,工夫7
        px=FW/2+0.5; ///値を加算して整数に変化,工夫7
    } else {
        px=FW/2; //第十三回講義,追加
    }

    py=0; //第十三回講義,追加

    field[px][0]=Math.floor(Math.random()*5)+1; //第十三回講義,変更+色を五色に変更,工夫1
    field[px][1]=Math.floor(Math.random()*5)+1; //第十三回講義,変更+色を五色に変更,工夫1
}

let renketu_var=0; ///連結数計測変数

//メイン
function tick(){
    f_flag=fall_puyo();
    paint();
    if(f_flag==0){
        d_flag=delete_puyo();
        if(d_flag==0)
            new_puyo();
        //第十四回講義,スコアの計算
        if(d_flag>0){
            rensa++;
            //score+=d_flag*10*rensa;
            renketu_var=0; ///連結変数の初期化

            ///test用
            console.log("d_flag="+d_flag);      
            
            if(rensa>1){ ///連鎖数が2以上の時
                if(4<d_flag && d_flag<9){ ///連結数が5~8の時
                    renketu_var=d_flag-3; ///連結変数の計算
                } else if(d_flag<=9){ ///連結数が9以上の時
                    renketu_var=5; ///連結変数の計算
                }
                score+=d_flag*10*(2**(rensa+1)+renketu_var); ///スコアの加算,工夫3と工夫4

                ///test用
                console.log("rensa="+rensa);
                console.log("renketu_var="+renketu_var);
                console.log("計算結果="+d_flag*10*(2**(rensa+1)+renketu_var));
                console.log("");
            } else if(4<d_flag && d_flag<9){ ///連結数が5~8の時
                renketu_var=d_flag-3; ///連結変数の計算
                score+=d_flag*10*renketu_var; ///スコアの加算,工夫3

                ///test用
                console.log("renketu_var="+renketu_var);
                console.log("計算結果="+d_flag*10*renketu_var);
                console.log("");
            } else if(9<=d_flag){ ///連結数が9以上の時
                renketu_var=5; ///連結変数の計算
                score+=d_flag*10*renketu_var; ///スコアの加算,工夫3
                ///test用
                console.log("renketu_var="+renketu_var);
                console.log("計算結果="+d_flag*10*renketu_var);
                console.log("");
            } else {
                score+=d_flag*10;

                ///test用
                console.log("計算結果="+d_flag*10);
                console.log("");
            }
        } else {
            rensa=0;
        }
    }
    //ゲームオーバー処理(続き3),追加
    alert_logic_fnc();
}

//ゲームオーバーのアラート表示関数,自作,追加
function gameover_alert_fnc(){
    //alert("GameOver"); //ゲームオーバーの通知
}

//ゲームオ－バーの形式作成関数,自作,追加
function alert_logic_fnc(){
    if(field[0][0]==1 || field[0][0]==2 || field[0][0]==3 || field[0][0]==4 || field[0][0]==5){ //初期位置に当たるゼロ列目かつ左から一行目にぷよがあった時
        if(field[0][1]==1 || field[0][1]==2 || field[0][1]==3 || field[0][1]==4 || field[0][1]==5){ //上から一列目かつ左から一行目にぷよがあった時
            if(field[0][2]==1 || field[0][2]==2 || field[0][2]==3 || field[0][2]==4 || field[0][2]==5){ //上から二列目かつ左から一行目にぷよがあった時
                gameover(); //ゲームオーバー関数
                //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                paint(); //ゲームフィールド関数
                gameover(); //ゲームオーバー関数
                setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
            }
        }
    }
    if(field[1][0]==1 || field[1][0]==2 || field[1][0]==3 || field[1][0]==4 || field[1][0]==5){ //初期位置に当たるゼロ列目かつ左から二行目にぷよがあった時
        if(field[1][1]==1 || field[1][1]==2 || field[1][1]==3 || field[1][1]==4 || field[1][1]==5){ //上から一列目かつ左から二行目にぷよがあった時
            if(field[1][2]==1 || field[1][2]==2 || field[1][2]==3 || field[1][2]==4 || field[1][2]==5){ //上から二列目かつ左から二行目にぷよがあった時
                gameover(); //ゲームオーバー関数
                //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                paint(); //ゲームフィールド関数
                gameover(); //ゲームオーバー関数
                setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
            }
        }
    }
    if(field[2][0]==1 || field[2][0]==2 || field[2][0]==3 || field[2][0]==4 || field[2][0]==5){ //初期位置に当たるゼロ列目かつ左から三行目にぷよがあった時
        if(field[2][1]==1 || field[2][1]==2 || field[2][1]==3 || field[2][1]==4 || field[2][1]==5){ //上から一列目かつ左から三行目にぷよがあった時
            if(field[2][2]==1 || field[2][2]==2 || field[2][2]==3 || field[2][2]==4 || field[2][2]==5){ //上から二列目かつ左から三行目にぷよがあった時
                gameover(); //ゲームオーバー関数
                //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                paint(); //ゲームフィールド関数
                gameover(); //ゲームオーバー関数
                setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
            }
        }
    }
    if(field[3][0]==1 || field[3][0]==2 || field[3][0]==3 || field[3][0]==4 || field[3][0]==5){ //初期位置に当たるゼロ列目かつ左から四行目にぷよがあった時
        if(field[3][1]==1 || field[3][1]==2 || field[3][1]==3 || field[3][1]==4 || field[3][1]==5){ //上から一列目かつ左から四行目にぷよがあった時
            if(field[3][2]==1 || field[3][2]==2 || field[3][2]==3 || field[3][2]==4 || field[3][2]==5){ //上から二列目かつ左から四行目にぷよがあった時
                gameover(); //ゲームオーバー関数
                //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                paint(); //ゲームフィールド関数
                gameover(); //ゲームオーバー関数
                setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
            }
        }
    }
    if(field[4][0]==1 || field[4][0]==2 || field[4][0]==3 || field[4][0]==4 || field[4][0]==5){ //初期位置に当たるゼロ列目かつ左から五行目にぷよがあった時
        if(field[4][1]==1 || field[4][1]==2 || field[4][1]==3 || field[4][1]==4 || field[4][1]==5){ //上から一列目かつ左から五行目にぷよがあった時
            if(field[4][2]==1 || field[4][2]==2 || field[4][2]==3 || field[4][2]==4 || field[4][2]==5){ //上から二列目かつ左から五行目にぷよがあった時
                gameover(); //ゲームオーバー関数
                //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                paint(); //ゲームフィールド関数
                gameover(); //ゲームオーバー関数
                setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
            }
        }
    }
    if(field[5][0]==1 || field[5][0]==2 || field[5][0]==3 || field[5][0]==4 || field[5][0]==5){ //初期位置に当たるゼロ列目かつ左から六行目にぷよがあった時
        if(field[5][1]==1 || field[5][1]==2 || field[5][1]==3 || field[5][1]==4 || field[5][1]==5){ //上から一列目かつ左から六行目にぷよがあった時
            if(field[5][2]==1 || field[5][2]==2 || field[5][2]==3 || field[5][2]==4 || field[5][2]==5){ //上から二列目かつ左から六行目にぷよがあった時
                gameover(); //ゲームオーバー関数
                //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                paint(); //ゲームフィールド関数
                gameover(); //ゲームオーバー関数
                setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
            }
        }
    }



    if(change_var==true){ ///changeボタンが有効である時,工夫7
        ///以下の6(七行目)から15(十六行目)のゲームオーバー判定の追加,工夫7
        if(field[6][0]==1 || field[6][0]==2 || field[6][0]==3 || field[6][0]==4 || field[6][0]==5){ //初期位置に当たるゼロ列目かつ左から七行目にぷよがあった時
            if(field[6][1]==1 || field[6][1]==2 || field[6][1]==3 || field[6][1]==4 || field[6][1]==5){ //上から一列目かつ左から七行目にぷよがあった時
                if(field[6][2]==1 || field[6][2]==2 || field[6][2]==3 || field[6][2]==4 || field[6][2]==5){ //上から二列目かつ左から七行目にぷよがあった時
                    gameover(); //ゲームオーバー関数
                    //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                    paint(); //ゲームフィールド関数
                    gameover(); //ゲームオーバー関数
                    setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                    setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
                }
            }
        }
        if(field[7][0]==1 || field[7][0]==2 || field[7][0]==3 || field[7][0]==4 || field[7][0]==5){ //初期位置に当たるゼロ列目かつ左から八行目にぷよがあった時
            if(field[7][1]==1 || field[7][1]==2 || field[7][1]==3 || field[7][1]==4 || field[7][1]==5){ //上から一列目かつ左から八行目にぷよがあった時
                if(field[7][2]==1 || field[7][2]==2 || field[7][2]==3 || field[7][2]==4 || field[7][2]==5){ //上から二列目かつ左から八行目にぷよがあった時
                    gameover(); //ゲームオーバー関数
                    //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                    paint(); //ゲームフィールド関数
                    gameover(); //ゲームオーバー関数
                    setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                    setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
                }
            }
        }
        if(field[8][0]==1 || field[8][0]==2 || field[8][0]==3 || field[8][0]==4 || field[8][0]==5){ //初期位置に当たるゼロ列目かつ左から九行目にぷよがあった時
            if(field[8][1]==1 || field[8][1]==2 || field[8][1]==3 || field[8][1]==4 || field[8][1]==5){ //上から一列目かつ左から九行目にぷよがあった時
                if(field[8][2]==1 || field[8][2]==2 || field[8][2]==3 || field[8][2]==4 || field[8][2]==5){ //上から二列目かつ左から九行目にぷよがあった時
                    gameover(); //ゲームオーバー関数
                    //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                    paint(); //ゲームフィールド関数
                    gameover(); //ゲームオーバー関数
                    setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                    setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
                }
            }
        }
        if(field[9][0]==1 || field[9][0]==2 || field[9][0]==3 || field[9][0]==4 || field[9][0]==5){ //初期位置に当たるゼロ列目かつ左から十行目にぷよがあった時
            if(field[9][1]==1 || field[9][1]==2 || field[9][1]==3 || field[9][1]==4 || field[9][1]==5){ //上から一列目かつ左から十行目にぷよがあった時
                if(field[9][2]==1 || field[9][2]==2 || field[9][2]==3 || field[9][2]==4 || field[9][2]==5){ //上から二列目かつ左から十行目にぷよがあった時
                    gameover(); //ゲームオーバー関数
                    //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                    paint(); //ゲームフィールド関数
                    gameover(); //ゲームオーバー関数
                    setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                    setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
                }
            }
        }
        if(field[10][0]==1 || field[10][0]==2 || field[10][0]==3 || field[10][0]==4 || field[10][0]==5){ //初期位置に当たるゼロ列目かつ左から十一行目にぷよがあった時
            if(field[10][1]==1 || field[10][1]==2 || field[10][1]==3 || field[10][1]==4 || field[10][1]==5){ //上から一列目かつ左から十一行目にぷよがあった時
                if(field[10][2]==1 || field[10][2]==2 || field[10][2]==3 || field[10][2]==4 || field[10][2]==5){ //上から二列目かつ左から十一行目にぷよがあった時
                    gameover(); //ゲームオーバー関数
                    //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                    paint(); //ゲームフィールド関数
                    gameover(); //ゲームオーバー関数
                    setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                    setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
                }
            }
        }
        if(field[11][0]==1 || field[11][0]==2 || field[11][0]==3 || field[11][0]==4 || field[11][0]==5){ //初期位置に当たるゼロ列目かつ左から十二行目にぷよがあった時
            if(field[11][1]==1 || field[11][1]==2 || field[11][1]==3 || field[11][1]==4 || field[11][1]==5){ //上から一列目かつ左から十二行目にぷよがあった時
                if(field[11][2]==1 || field[11][2]==2 || field[11][2]==3 || field[11][2]==4 || field[11][2]==5){ //上から二列目かつ左から十二行目にぷよがあった時
                    gameover(); //ゲームオーバー関数
                    //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                    paint(); //ゲームフィールド関数
                    gameover(); //ゲームオーバー関数
                    setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                    setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
                }
            }
        }
        if(field[12][0]==1 || field[12][0]==2 || field[12][0]==3 || field[12][0]==4 || field[12][0]==5){ //初期位置に当たるゼロ列目かつ左から十三行目にぷよがあった時
            if(field[12][1]==1 || field[12][1]==2 || field[12][1]==3 || field[12][1]==4 || field[12][1]==5){ //上から一列目かつ左から十三行目にぷよがあった時
                if(field[12][2]==1 || field[12][2]==2 || field[12][2]==3 || field[12][2]==4 || field[12][2]==5){ //上から二列目かつ左から十三行目にぷよがあった時
                    gameover(); //ゲームオーバー関数
                    //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                    paint(); //ゲームフィールド関数
                    gameover(); //ゲームオーバー関数
                    setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                    setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
                }
            }
        }
        if(field[13][0]==1 || field[13][0]==2 || field[13][0]==3 || field[13][0]==4 || field[13][0]==5){ //初期位置に当たるゼロ列目かつ左から十四行目にぷよがあった時
            if(field[13][1]==1 || field[13][1]==2 || field[13][1]==3 || field[13][1]==4 || field[13][1]==5){ //上から一列目かつ左から十四行目にぷよがあった時
                if(field[13][2]==1 || field[13][2]==2 || field[13][2]==3 || field[13][2]==4 || field[13][2]==5){ //上から二列目かつ左から十四行目にぷよがあった時
                    gameover(); //ゲームオーバー関数
                    //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                    paint(); //ゲームフィールド関数
                    gameover(); //ゲームオーバー関数
                    setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                    setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
                }
            }
        }
        if(field[14][0]==1 || field[14][0]==2 || field[14][0]==3|| field[14][0]==4 || field[14][0]==5){ //初期位置に当たるゼロ列目かつ左から十五行目にぷよがあった時
            if(field[14][1]==1 || field[14][1]==2 || field[14][1]==3 || field[14][1]==4 || field[14][1]==5){ //上から一列目かつ左から十五行目にぷよがあった時
                if(field[14][2]==1 || field[14][2]==2 || field[14][2]==3 || field[14][2]==4 || field[14][2]==5){ //上から二列目かつ左から十五行目にぷよがあった時
                    gameover(); //ゲームオーバー関数
                    //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                    paint(); //ゲームフィールド関数
                    gameover(); //ゲームオーバー関数
                    setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                    setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
                }
            }
        }
        if(field[15][0]==1 || field[15][0]==2 || field[15][0]==3 || field[15][0]==4 || field[15][0]==5){ //初期位置に当たるゼロ列目かつ左から六行目にぷよがあった時
            if(field[15][1]==1 || field[15][1]==2 || field[15][1]==3 || field[15][1]==4 || field[15][1]==5){ //上から一列目かつ左から六行目にぷよがあった時
                if(field[15][2]==1 || field[15][2]==2 || field[15][2]==3 || field[15][2]==4 || field[15][2]==5){ //上から二列目かつ左から六行目にぷよがあった時
                    gameover(); //ゲームオーバー関数
                    //以上一行のゲームオーバー処理後に以下二行でゲームオーバー後のぷよの画面描画を行う
                    paint(); //ゲームフィールド関数
                    gameover(); //ゲームオーバー関数
                    setTimeout(score_fnc, 100); //0.1秒後にスコアのアラート表示関数を起動,時間差で処理
                    setTimeout(gameover_alert_fnc, 100); //0.1秒後にゲームオーバーのアラート表示関数を起動,時間差で処理
                }
            }
        }
    }
}

//ゲームオーバー
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
            if(px>0 && px<FW-1){ //ぷよが移動させたい左端と右端を移動している間
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
            if(px>=0 && px<=FW-1){ //ぷよが移動させたい左端と右端を移動している間
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
                } else if(check1_var==4) { ///ぷよの下部分の色が黄の時,工夫1
                    field[px][py-1]=4; ///ぷよの上部分の色が黄となる,工夫1
                } else if(check1_var==5) { ///ぷよの下部分の色が紫の時,工夫1
                    field[px][py-1]=5; ///ぷよの上部分の色が紫となる,工夫1
                }

                if(check2_var==1) { //ぷよの上部分の色が赤の時
                    field[px][py]=1; //ぷよの下部分の色が赤となる
                } else if(check2_var==2) { //ぷよの上部分の色が緑の時
                    field[px][py]=2; //ぷよの下部分の色が緑となる
                } else if(check2_var==3) { //ぷよの上部分の色が青の時
                    field[px][py]=3; //ぷよの下部分の色が青となる
                } else if(check2_var==4) { ///ぷよの上部分の色が黄の時,工夫1
                    field[px][py]=4; ///ぷよの下部分の色が黄となる,工夫1
                } else if(check2_var==5) { ///ぷよの上部分の色が紫の時,工夫1
                    field[px][py]=5; ///ぷよの下部分の色が紫となる,工夫1
                }
            }
            break;
    }
    keyCode=0;
}

//第十四回講義
let hscore=0; //第十四回講義,スコアの保存

let rensa=0; ///連鎖の値の宣言
let score=0; ///現在スコアの宣言
let check_score_var=false; ///計測されたスコアの有無のリセット変数

///スコア結果表示関数,自作
function score_fnc(){
    if(check_score_var==false){ ///計測されたスコアがない時
        hscore=localStorage.getItem("hscore4017"); //第十四回講義,スコアの保存
        check_score_var=true; ///計測されたスコアがあるものとする
    }
    alert("これまでの最高スコア:"+hscore); //第十四回講義,スコアの保存
    //第十四回講義,スコアの保存
    if(hscore<score){
        hscore=score;
        localStorage.getItem("hscore4017", hscore);
    }
    alert("GameOver! Score:"+score);
}

///画面描画リセット関数,自作
function paint_clear_fnc(){
    field=[
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    ]; ///フィールド変数の初期化,大きさを変更した際の画面描画への対応
    ///ぷよ画面の初期化
    for(y=1; y<FH; y++){
        ctx.clearRect(0, (y+1)*44, 42, 42);
        for(x=0; x<FW; x++){
            ctx.clearRect((x+1)*44, (y+1)*44, 42, 42);
        }
        ctx.clearRect((FW+1)*44, (y+1)*44, 42, 42);
    }
    ctx.clearRect(0, (FH+1)*44, (FW+2)*44, 42);
}

///変数の初期化関数,自作
function value_clear_fnc(){
    n=0;
    d_flag=false;
    f=flag=false;

    px=0;
    py=0;
    keyCode=0;

    rensa=0;
    score=0;
}

///再プレイ関数,自作,工夫5
function replay_fnc(){
    gameover(); ///タイマーの初期化
    paint_clear_fnc(); ///画面描画の初期化
    value_clear_fnc(); ///変数の初期化

    init(); ///ぷよの描画
}

///リセット関数,自作,工夫6
function reset_fnc(){
    gameover(); ///タイマーの初期化
    paint_clear_fnc(); ///画面描画の初期化

    change_var=false; ///changeボタンの入力を無しに変更
    
    FW=6; ///ぷよの幅を初期化
    FH=13; //ぷよの高さを初期化
    speed_o_var=5; ///ゲームスピードの初期化

    document.getElementById("yoko_id").value=6;
    document.getElementById("tate_id").value=13;
    document.getElementById("speed_level_id").value=5;

    value_clear_fnc(); ///変数の初期化
    hscore=0; ///最高スコアの初期化

    check_score_var=false; ///計測されたスコアの再設定
    init(); ///ぷよの描画
}

let change_var=false; ///changeボタンの入力の有無取得変数
let input_false_var=false; ///入力された値が不適切である時の情報取得変数
let yoko_var; ///ぷよの横範囲取得変数
let tate_var; ///ぷよの縦範囲取得変数

///ぷよの範囲変更関数,自作,工夫7
function change_fnc(){
    gameover(); ///タイマーの初期化
    paint_clear_fnc(); ///画面描画の初期化

    change_var=true; ///changeボタンの入力をありに変更

    yoko_var=document.getElementById("yoko_id").value; ///ぷよの幅の値を変数で受け取る,工夫
    if(yoko_var=="6"){ ///初期設定は6
        yoko_var=6;
    } else if(yoko_var=="7"){ ///入力変数が7の場合出力変数を7とする
        yoko_var=7;
    } else if(yoko_var=="8"){ ///入力変数が8の場合出力変数を8とする
        yoko_var=8;
    } else if(yoko_var=="9"){ ///入力変数が9の場合出力変数を9とする
        yoko_var=9;
    } else if(yoko_var=="10"){ ///入力変数が10の場合出力変数を10とする
        yoko_var=10;
    } else if(yoko_var=="11"){ ///入力変数が11の場合出力変数を11とする
        yoko_var=11;
    } else if(yoko_var=="12"){ ///入力変数が12の場合出力変数を12とする
        yoko_var=12;
    } else if(yoko_var=="13"){ ///入力変数が13の場合出力変数を13とする
        yoko_var=13;
    } else if(yoko_var=="14"){ ///入力変数が14の場合出力変数を14とする
        yoko_var=14;
    } else if(yoko_var=="15"){ ///入力変数が15の場合出力変数を15とする
        yoko_var=15;
    } else if(yoko_var=="16"){ ///入力変数が16の場合出力変数を16とする
        yoko_var=16;
    } else if(yoko_var==""){ ///未入力の場合は0
        yoko_var=0;
    } else { ///未入力以外で入力値が不適切な場合は1
        yoko_var=1;
    }
    
    tate_var=document.getElementById("tate_id").value; ///ぷよの縦の値を変数で受け取る
    if(tate_var=="13"){ ///初期設定は13
        tate_var=13;
    } else if(tate_var=="14"){ ///入力変数が14の場合出力変数を14とする
        tate_var=14;
    } else if(tate_var=="15"){ ///入力変数が15の場合出力変数を15とする
        tate_var=15;
    } else if(tate_var=="16"){ ///入力変数が16の場合出力変数を16とする
        tate_var=16;
    } else if(tate_var=="17"){ ///入力変数が17の場合出力変数を17とする
        tate_var=17;
    } else if(tate_var=="18"){ ///入力変数が18の場合出力変数を18とする
        tate_var=18;
    } else if(tate_var=="19"){ ///入力変数が19の場合出力変数を19とする
        tate_var=19;
    } else if(tate_var=="20"){ ///入力変数が20の場合出力変数を20とする
        tate_var=20;
    } else if(tate_var=="21"){ ///入力変数が21の場合出力変数を21とする
        tate_var=21;
    } else if(tate_var=="22"){ ///入力変数が22の場合出力変数を22とする
        tate_var=22;
    } else if(tate_var=="23"){ ///入力変数が23の場合出力変数を23とする
        tate_var=23;
    } else if(tate_var=="") { ///未入力の場合は0
        tate_var=0;
    } else { ///未入力以外で入力値が不適切な場合は1
        tate_var=1;
    }

    input_false_var=false; ///入力された値が不適切でないとする,初期化
    if((yoko_var!=0 && yoko_var!=1) && (tate_var!=0 && tate_var!=1)){ ///横と縦の値の両方が適切である時
        FW=yoko_var; ///ぷよの幅を変数に結びつける
        FH=tate_var; ///ぷよの高さを変数に結びつける
        document.getElementById("error_yoko_id").innerHTML=""; ///エラーメッセージの削除,工夫8
        document.getElementById("error_tate_id").innerHTML=""; ///エラーメッセージの削除,工夫8
    } else {
        FW=0; ///ぷよの幅を表示不可にする
        if(yoko_var==1){ ///横のぷよに関わる変数が1の時
            document.getElementById("error_yoko_id").innerHTML="・横の値が不適切です。"; ///不適切であるという趣旨のエラーメッセージ表示,工夫8
        } else if(yoko_var==0){ ///横のぷよに関わる変数が0の時
            document.getElementById("error_yoko_id").innerHTML="・横の値が入力されていません。"; ///未入力であるという趣旨のメッセージ表示,工夫8
        }
        FH=0; ///ぷよの高さを表示不可にする
        if(tate_var==1){ ///縦のぷよに関わる変数が1の時
            document.getElementById("error_tate_id").innerHTML="・縦の値が不適切です。"; ///不適切であるという趣旨のエラーメッセージ表示,工夫8
        } else if(tate_var==0){ ///縦のぷよに関わる変数が0の時
            document.getElementById("error_tate_id").innerHTML="・縦の値が入力されていません。"; ///未入力であるという趣旨のメッセージ表示,工夫8
        }
        input_false_var=true; ///入力された値が不適切であるとする
    }

    value_clear_fnc(); ///変数の初期化
    hscore=0; ///最高スコアの初期化

    check_score_var=false; ///計測されたスコアの再設定
    if(input_false_var==false){ ///入力された値が不適切でない時
        init(); ///ぷよの描画
    }
}
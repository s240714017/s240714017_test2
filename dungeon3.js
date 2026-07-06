// エラーチェック,講義資料
"use strict"; //厳密なエラーチェック対応

/// 変数,講義資料(第9回講義,一部変更)
let W=31; //迷路の幅,「const」から「let」へ変更,「W」の変化に対応
let H=31; //迷路の高さ,「const」から「let」へ変更,「H」の変化に対応
const maze=[]; //迷路
let ctx;


/// 変数,講義資料(第10回講義,一部変更)
let player=new Player(1,1); //主人公,「const」から「let」へ変更,「player」の初期化に対応
let keyCode=0; //押下されたキー
let timer=NaN; //タイマー


/// 変数,自作(以下6行,第9回講義)
let size_var; //ブロック一つあたりの縦横の大きさを変更する変数
let change_var=false; //「CHANGE」ボタン入力の有無を取得する変数
let maze_W_var; //迷路の壁を出力するための変数
let maze_P_var; //迷路の通路を出力するための変数
let wide_var; //迷路の幅がcanvasの大きさをはみ出した際の処理を反映する変数
let height_var; //迷路の高さがcanvasの大きさをはみ出した際の処理を反映する変数


/// 変数,自作(以下15行,第10回講義)
let error1_check_var=false; //エラー1専用,一度きりのエラー処理反映変数
let error2_check_var=false; //エラー2専用,一度きりのエラー処理反映変数
let error3_check_var=false; //エラー3専用,一度きりのエラー処理反映変数
let error4_check_var=false; //エラー4専用,一度きりのエラー処理反映変数
let error5_check_var=false; //エラー5専用,一度きりのエラー処理反映変数

let maze_SP_var; //迷路の速度上昇通路を出力するための変数
let speed_up_item_var=false; //速度上昇の効果の有無を反映する変数
let rand1_var=Math.floor(Math.random()*W); //速度上昇通路の横の出力場所をランダムに指定する変数
let rand2_var=Math.floor(Math.random()*H); //速度上昇通路の縦の出力場所をランダムに指定する変数

let maze_WP_var; //迷路の瞬間移動通路を出力するための変数
let warp_item_var=false; //瞬間移動の効果の有無を反映する変数
let rand3_var=Math.floor(Math.random()*W); //一つ目の瞬間移動の横の出力場所をランダムに指定する変数
let rand4_var=Math.floor(Math.random()*H); //一つ目の瞬間移動の縦の出力場所をランダムに指定する変数
let rand5_var=Math.floor(Math.random()*W); //二つ目の瞬間移動の横の出力場所をランダムに指定する変数
let rand6_var=Math.floor(Math.random()*H); //二つ目の瞬間移動の縦の出力場所をランダムに指定する変数


// 乱数反映関数,講義資料(第9回講義)
function random(v){
    return Math.floor(Math.random()*v); //0からvまでの乱数を整数で返す
}

// 通常時の処理関数,講義資料(第9回+第10回講義)
function init(){
    let maze=document.getElementById("maze");
    ctx=maze.getContext("2d");

    createMaze(W,H); //迷路作成
    repaint();

    go(); //教科書はHTMLから呼び出している
}

// 迷路形式関数,講義資料(第9回講義)
function createMaze(w,h){
    for(let y=0; y<h; y++){
        maze[y]=[];
        for(let x=0; x<w; x++){
            maze[y][x] = x==0 || x==w-1 || y==0 || y==h-1 ? 1 : 0;
        }
    }
    for(let y=2; y<h-2; y+=2){
        for(let x=2; x<w-2; x+=2){
            maze[y][x]=1; //柱を立てる
            let dir=random(y==2 ? 4 :3);
            let px=x; //今のx座標
            let py=y; //今のy座標
            switch(dir){
                case 0:
                    py++; //上に倒す
                    break;
                case 1:
                    px--; //左に倒す
                    break;
                case 2:
                    px++; //右に倒す
                    break;
                case 3:
                    py--; //上に倒す
                    break;
            }
            maze[py][px]=1; //倒れた場所も柱にする
        }
    }
}

/// 迷路描画関数,講義資料(第9回+第10回講義)+一部変更(第9回+第10回+第11回講義)
function repaint(){
    //背景クリア
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, 1500, 1500); //大きさを(0,0,900,600)から(0,0,1500,1500)に変更,canvasの大きさ変化に対応

    //迷路描画
    //ctx.fillStyle="brown";
    //ctx.translate(0,0);

    //迷路の壁と通路の画像切り替え変数,追加(以下5行)
    let img1_var=document.getElementById("img1_id");
    let img2_var=document.getElementById("img2_id");
    let img3_var=document.getElementById("img3_id");
    let img4_var=document.getElementById("img4_id");
    let img5_var=document.getElementById("img5_id");

    check_img_fnc(); //画像確認関数の起動
    check_error_fnc(); //エラー確認関数の起動
    for(let x=0; x<W; x++){
        for(let y=0; y<H; y++){
            //「壁」の処理
            if(maze[y][x]==1 && change_var==false){ //「CHANGE」ボタンの入力が無い時の「壁」の描画,追加
                //if(maze_W_var==1){
                    //ctx.fillRect(x*16, y*16, 16, 16); //壁の画像描画
                //}
                //「maze_W_var」の内容に応じて壁画像の種類を切り替えて描画,画像の大きさはキャラクター画像の大きさと同様に「32」
                switch(maze_W_var){
                    case 1:
                        ctx.drawImage(img1_var, x*32, y*32, 32, 32);
                        break;
                    case 2:
                        ctx.drawImage(img2_var, x*32, y*32, 32, 32);
                        break;
                    case 3:
                        ctx.drawImage(img3_var, x*32, y*32, 32, 32);
                        break;
                    case 4:
                        ctx.drawImage(img4_var, x*32, y*32, 32, 32);
                        break;
                    case 5:
                        ctx.drawImage(img5_var, x*32, y*32, 32, 32);
                        break;
                }
            } else if(maze[y][x]==1 && change_var==true){ //「CHANGE」ボタンの入力がある時の「壁」の描画,追加
                //「maze_W_var」の内容に応じて壁画像の種類を切り替えて描画,画像の大きさはユーザーが指定
                switch(maze_W_var){
                    case 1:
                        ctx.drawImage(img1_var, x*size_var, y*size_var, size_var, size_var);
                        break;
                    case 2:
                        ctx.drawImage(img2_var, x*size_var, y*size_var, size_var, size_var);
                        break;
                    case 3:
                        ctx.drawImage(img3_var, x*size_var, y*size_var, size_var, size_var);
                        break;
                    case 4:
                        ctx.drawImage(img4_var, x*size_var, y*size_var, size_var, size_var);
                        break;
                    case 5:
                        ctx.drawImage(img5_var, x*size_var, y*size_var, size_var, size_var);
                        break;
                }
            }

            //「通路」の処理
            if(maze[y][x]==0 && change_var==false){ //「CHANGE」ボタンの入力が無い時の「通路」の描画,追加
                //「maze_P_var」の内容に応じて通路画像の種類を切り替えて描画,画像の大きさはキャラクター画像の大きさと同様に「32」
                switch(maze_P_var){
                    case 1:
                        ctx.drawImage(img1_var, x*32, y*32, 32, 32);
                        break;
                    case 2:
                        ctx.drawImage(img2_var, x*32, y*32, 32, 32);
                        break;
                    case 3:
                        ctx.drawImage(img3_var, x*32, y*32, 32, 32);
                        break;
                    case 4:
                        ctx.drawImage(img4_var, x*32, y*32, 32, 32);
                        break;
                    case 5:
                        ctx.drawImage(img5_var, x*32, y*32, 32, 32);
                        break;
                }
            } else if(maze[y][x]==0 && change_var==true){ //「CHANGE」ボタンの入力がある時の「通路」の描画,追加
                //「maze_P_var」の内容に応じて通路画像の種類を切り替えて描画,画像の大きさはユーザーが指定
                switch(maze_P_var){
                    case 1:
                        ctx.drawImage(img1_var, x*size_var, y*size_var, size_var, size_var);
                        break;
                    case 2:
                        ctx.drawImage(img2_var, x*size_var, y*size_var, size_var, size_var);
                        break;
                    case 3:
                        ctx.drawImage(img3_var, x*size_var, y*size_var, size_var, size_var);
                        break;
                    case 4:
                        ctx.drawImage(img4_var, x*size_var, y*size_var, size_var, size_var);
                        break;
                    case 5:
                        ctx.drawImage(img5_var, x*size_var, y*size_var, size_var, size_var);
                        break;
                }
            }

            //「速度上昇通路」の処理
            while(maze[rand2_var][rand1_var]==1){ //速度上昇通路が壁の場所であり続ける間
                rand1_var=Math.floor(Math.random()*W); //速度上昇通路の横の出力場所をもう一度設定
                rand2_var=Math.floor(Math.random()*H); //速度上昇通路の縦の出力場所をもう一度設定
            }
            if(maze[rand2_var][rand1_var]==0 && change_var==false) { //「CHANGE」ボタンの入力が無い時の「速度上昇通路」の描画,追加
                //「maze_SP_var」の内容に応じて速度上昇通路画像の種類を切り替えて描画,画像の大きさはキャラクター画像の大きさと同様に「32」
                switch(maze_SP_var){
                    case 1:
                        ctx.drawImage(img1_var, rand1_var*32, rand2_var*32, 32, 32);
                        break;
                    case 2:
                        ctx.drawImage(img2_var, rand1_var*32, rand2_var*32, 32, 32);
                        break;
                    case 3:
                        ctx.drawImage(img3_var, rand1_var*32, rand2_var*32, 32, 32);
                        break;
                    case 4:
                        ctx.drawImage(img4_var, rand1_var*32, rand2_var*32, 32, 32);
                        break;
                    case 5:
                        ctx.drawImage(img5_var, rand1_var*32, rand2_var*32, 32, 32);
                        break;
                }
                if(console_test1_var==false){
                    console.log("スピードアップあり,32"); //速度増加通路の通知1
                    console.log(""); //速度増加通路の通知2
                    console_test1_var=true;
                } 
            } else if(maze[rand2_var][rand1_var]==0 && change_var==true) { //「CHANGE」ボタンの入力がある時の「速度上昇通路」の描画,追加
                //「maze_SP_var」の内容に応じて速度上昇通路画像の種類を切り替えて描画,画像の大きさはユーザーが指定
                switch(maze_SP_var){
                    case 1:
                        ctx.drawImage(img1_var, rand1_var*size_var, rand2_var*size_var, size_var, size_var);
                        break;
                    case 2:
                        ctx.drawImage(img2_var, rand1_var*size_var, rand2_var*size_var, size_var, size_var);
                        break;
                    case 3:
                        ctx.drawImage(img3_var, rand1_var*size_var, rand2_var*size_var, size_var, size_var);
                        break;
                    case 4:
                        ctx.drawImage(img4_var, rand1_var*size_var, rand2_var*size_var, size_var, size_var);
                        break;
                    case 5:
                        ctx.drawImage(img5_var, rand1_var*size_var, rand2_var*size_var, size_var, size_var);
                        break;
                }
                if(console_test1_var==false){
                    console.log("スピードアップあり,size_var"); //速度増加通路の通知1
                    console.log(""); //速度増加通路の通知2
                    console_test1_var=true;
                } 
            }

            //「瞬間移動通路」の処理
            while((maze[rand4_var][rand3_var]==1) || (maze[rand6_var][rand5_var]==1) 
                || (rand2_var==rand4_var) || (rand4_var==rand6_var)
                || (rand2_var==rand6_var) || (rand1_var==rand3_var)
                || (rand3_var==rand5_var) || (rand1_var==rand5_var)){ //瞬間移動通路が壁の場所,あるいは他の特殊通路と同様のx・yの場所であり続ける間
                rand3_var=Math.floor(Math.random()*W); //一つ目の瞬間移動の横の出力場所をもう一度設定
                rand4_var=Math.floor(Math.random()*H); //一つ目の瞬間移動の縦の出力場所をもう一度設定
                rand5_var=Math.floor(Math.random()*W); //二つ目の瞬間移動の横の出力場所をもう一度設定
                rand6_var=Math.floor(Math.random()*H); //二つ目の瞬間移動の縦の出力場所をもう一度設定
            }
            if((maze[rand4_var][rand3_var]==0) && (maze[rand6_var][rand5_var]==0) 
                && (rand2_var!=rand4_var) && (rand4_var!=rand6_var)
                && (rand2_var!=rand6_var) && (rand1_var!=rand3_var)
                && (rand3_var!=rand5_var) && (rand1_var!=rand5_var)
                && change_var==false) { //「CHANGE」ボタンの入力が無い時の「瞬間移動通路」の描画,二つ描画された通路のブロックを一度だけ行き来できる,追加
                //「maze_WP_var」の内容に応じて瞬間移動通路画像の種類を切り替えて描画,画像の大きさはキャラクター画像の大きさと同様に「32」
                switch(maze_WP_var){
                    case 1:
                        ctx.drawImage(img1_var, rand3_var*32, rand4_var*32, 32, 32);
                        ctx.drawImage(img1_var, rand5_var*32, rand6_var*32, 32, 32);
                        break;
                    case 2:
                        ctx.drawImage(img2_var, rand3_var*32, rand4_var*32, 32, 32);
                        ctx.drawImage(img2_var, rand5_var*32, rand6_var*32, 32, 32);
                        break;
                    case 3:
                        ctx.drawImage(img3_var, rand3_var*32, rand4_var*32, 32, 32);
                        ctx.drawImage(img3_var, rand5_var*32, rand6_var*32, 32, 32);
                        break;
                    case 4:
                        ctx.drawImage(img4_var, rand3_var*32, rand4_var*32, 32, 32);
                        ctx.drawImage(img4_var, rand5_var*32, rand6_var*32, 32, 32);
                        break;
                    case 5:
                        ctx.drawImage(img5_var, rand3_var*32, rand4_var*32, 32, 32);
                        ctx.drawImage(img5_var, rand5_var*32, rand6_var*32, 32, 32);
                        break;
                }
                if(console_test2_var==false){
                    console.log("ワープあり,32"); //瞬間移動通路の通知1
                    console.log(""); //瞬間移動通路の通知2
                    console_test2_var=true;
                }      
            } else if((maze[rand4_var][rand3_var]==0) && (maze[rand6_var][rand5_var]==0) 
                && (rand2_var!=rand4_var) && (rand4_var!=rand6_var)
                && (rand2_var!=rand6_var) && (rand1_var!=rand3_var)
                && (rand3_var!=rand5_var) && (rand1_var!=rand5_var)
                && change_var==true) { //「CHANGE」ボタンの入力がある時の「瞬間移動通路」の描画,二つ描画された通路のブロックを一度だけ行き来できる,追加
                //「maze_WP_var」の内容に応じて瞬間移動通路画像の種類を切り替えて描画,画像の大きさはユーザーが指定
                switch(maze_WP_var){
                    case 1:
                        ctx.drawImage(img1_var, rand3_var*size_var, rand4_var*size_var, size_var, size_var);
                        ctx.drawImage(img1_var, rand5_var*size_var, rand6_var*size_var, size_var, size_var);
                        break;
                    case 2:
                        ctx.drawImage(img2_var, rand3_var*size_var, rand4_var*size_var, size_var, size_var);
                        ctx.drawImage(img2_var, rand5_var*size_var, rand6_var*size_var, size_var, size_var);
                        break;
                    case 3:
                        ctx.drawImage(img3_var, rand3_var*size_var, rand4_var*size_var, size_var, size_var);
                        ctx.drawImage(img3_var, rand5_var*size_var, rand6_var*size_var, size_var, size_var);
                        break;
                    case 4:
                        ctx.drawImage(img4_var, rand3_var*size_var, rand4_var*size_var, size_var, size_var);
                        ctx.drawImage(img4_var, rand5_var*size_var, rand6_var*size_var, size_var, size_var);
                        break;
                    case 5:
                        ctx.drawImage(img5_var, rand3_var*size_var, rand4_var*size_var, size_var, size_var);
                        ctx.drawImage(img5_var, rand5_var*size_var, rand6_var*size_var, size_var, size_var);
                        break;
                }
                if(console_test2_var==false){
                    console.log("ワープあり,size_var"); //瞬間移動通路の通知1
                    console.log(""); //瞬間移動通路の通知2
                    console_test2_var=true;
                }      
            }

            //「ゴール」の処理
            while(maze[rand8_var][rand7_var]==1){ //ゴールが壁の場所であり続ける間
                rand7_var=Math.floor((W-2)-Math.random()*3); //ゴールの横の出力場所をもう一度設定
                rand8_var=Math.floor((H-2)-Math.random()*3); //ゴールの縦の出力場所をもう一度設定
            }
            if(maze[rand8_var][rand7_var]==0 && change_var==false) { //「CHANGE」ボタンの入力が無い時の「ゴール」の描画,追加
                //「maze_G_var」の内容に応じてゴール画像の種類を切り替えて描画,画像の大きさはキャラクター画像の大きさと同様に「32」
                switch(maze_G_var){
                    case 1:
                        ctx.drawImage(img1_var, rand7_var*32, rand8_var*32, 32, 32);
                        break;
                    case 2:
                        ctx.drawImage(img2_var, rand7_var*32, rand8_var*32, 32, 32);
                        break;
                    case 3:
                        ctx.drawImage(img3_var, rand7_var*32, rand8_var*32, 32, 32);
                        break;
                    case 4:
                        ctx.drawImage(img4_var, rand7_var*32, rand8_var*32, 32, 32);
                        break;
                    case 5:
                        ctx.drawImage(img5_var, rand7_var*32, rand8_var*32, 32, 32);
                        break;
                }
                if(console_test3_var==false){
                    console.log("ゴールあり,32"); //ゴールの通知1
                    console.log(""); //ゴールの通知2
                    console_test3_var=true;
                } 
            } else if(maze[rand8_var][rand7_var]==0 && change_var==true) { //「CHANGE」ボタンの入力がある時の「ゴール」の描画,追加
                //「maze_G_var」の内容に応じてゴール画像の種類を切り替えて描画,画像の大きさはユーザーが指定
                switch(maze_G_var){
                    case 1:
                        ctx.drawImage(img1_var, rand7_var*size_var, rand8_var*size_var, size_var, size_var);
                        break;
                    case 2:
                        ctx.drawImage(img2_var, rand7_var*size_var, rand8_var*size_var, size_var, size_var);
                        break;
                    case 3:
                        ctx.drawImage(img3_var, rand7_var*size_var, rand8_var*size_var, size_var, size_var);
                        break;
                    case 4:
                        ctx.drawImage(img4_var, rand7_var*size_var, rand8_var*size_var, size_var, size_var);
                        break;
                    case 5:
                        ctx.drawImage(img5_var, rand7_var*size_var, rand8_var*size_var, size_var, size_var);
                        break;
                }
                if(console_test3_var==false){
                    console.log("ゴールあり,size_var"); //ゴールの通知1
                    console.log(""); //ゴールの通知2
                    console_test3_var=true;
                } 
            }
        }
    }
    player.paint(ctx, 32, 32, 32, 32); //講義資料,第十回講義で追加
    ctx.restore();

    //console.log("rand1_var="+rand1_var);
    //console.log("rand2_var="+rand2_var);
    //console.log("rand3_var="+rand3_var);
    //console.log("rand4_var="+rand4_var);
    //console.log("rand5_var="+rand5_var);
    //console.log("rand6_var="+rand6_var);
    //console.log("rand5_var="+rand7_var);
    //console.log("rand6_var="+rand8_var);
}


/// 数値の変化対応関数,自作(第9回+第10回+第11回講義)
function change_fnc(){
    W=document.getElementById("wide_id").value; //HTMLの「wide_id」に入力した値を画像の横の個数とする
    H=document.getElementById("height_id").value; //HTMLの「height_id」に入力した値を画像の横の個数とする
    size_var=document.getElementById("size_id").value; //HTMLの「size_id」に入力した値を画像の一つあたりの縦横の大きさとする
    change_var=true; //「CHANGE」ボタンの入力を反映
    document.getElementById("error_mess_id").innerHTML=""; //エラーメッセージが場合にリセット

    error1_check_var=false; //エラー1専用,エラーチェック変数の初期化,第十回講義で追加
    error2_check_var=false; //エラー2専用,エラーチェック変数の初期化,第十回講義で追加
    error3_check_var=false; //エラー3専用,エラーチェック変数の初期化,第十回講義で追加
    error4_check_var=false; //エラー4専用,エラーチェック変数の初期化,第十回講義で追加
    error5_check_var=false; //エラー5専用,エラーチェック変数の初期化,第十回講義で追加

    clearInterval(timer); //タイマーの初期化1,第十回講義で追加
    clearInterval(timer_var); //タイマーの初期化2,第十一回講義で追加
    player=new Player(1,1); //主人公画像の位置の初期化,第十回講義で追加
    speed_up_item_var=false; //スピードアップアイテムの有無の初期化,第十回講義で追加
    warp_item_var=false; //ワープアイテムの有無の初期化,第十回講義で追加
    goal_var=false; //ゴールの有無の初期化,第十回講義で追加
    console_test1_var=false; //速度上昇通路の有無メッセージの初期化,第十回講義で追加
    console_test2_var=false; //瞬間移動通路の有無メッセージの初期化,第十回講義で追加
    console_test3_var=false; //ゴールの有無メッセージの初期化,第十回講義で追加
    rand1_var=Math.floor(Math.random()*W); //速度上昇通路の横の出力場所をランダムに指定する変数,第十回講義で追加
    rand2_var=Math.floor(Math.random()*H); //速度上昇通路の縦の出力場所をランダムに指定する変数,第十回講義で追加
    rand3_var=Math.floor(Math.random()*W); //一つ目の瞬間移動の横の出力場所をランダムに指定する変数,第十回講義で追加
    rand4_var=Math.floor(Math.random()*H); //一つ目の瞬間移動の縦の出力場所をランダムに指定する変数,第十回講義で追加
    rand5_var=Math.floor(Math.random()*W); //二つ目の瞬間移動の横の出力場所をランダムに指定する変数,第十回講義で追加
    rand6_var=Math.floor(Math.random()*H); //二つ目の瞬間移動の縦の出力場所をランダムに指定する変数,第十回講義で追加
    rand7_var=Math.floor((W-2)-Math.random()*3); //ゴールの横の出力場所をランダムに指定する変数,第十回講義で追加
    rand8_var=Math.floor((H-2)-Math.random()*3); //ゴールの縦の出力場所をランダムに指定する変数,第十回講義で追加

    init(); //再度、値を変更した状態で画像描画処理を行う
}

/// リセット関数,自作(第9回+第10回+第11回講義)
function reset_fnc(){
    W=31; //画像の横の個数を初期化
    H=31; //画像の縦の個数を初期化
    size_var=0; //画像の大きさを初期化
    change_var=false; //「CHANGE」ボタンの入力を初期化
    player=new Player(1,1); //主人公画像の位置の初期化,第十回講義で追加
    document.getElementById("wide_id").value="31"; //画像の横の個数の入力状態を初期化
    document.getElementById("height_id").value="31"; //画像の縦の個数の入力状態を初期化
    document.getElementById("size_id").value="32"; //画像の大きさの入力状態を初期化
    document.getElementById("maze_wall_image_id").value="ChipA"; //壁画像の種類の入力状態を初期化
    document.getElementById("maze_path_image_id").value="ChipB"; //通路画像の種類の入力状態を初期化
    document.getElementById("maze_speedup_path_image_id").value="ChipC"; //速度増加通路画像の種類の入力状態を初期化
    document.getElementById("maze_warp_path_image_id").value="ChipD"; //瞬間移動通路画像の種類の入力状態を初期化
    document.getElementById("maze_goal_image_id").value="ChipE"; //ゴールの種類の入力状態を初期化
    document.getElementById("error_mess_id").innerHTML=""; //エラーメッセージの入力状態を初期化

    error1_check_var=false; //エラー1専用,エラーチェック変数の初期化,第十回講義で追加
    error2_check_var=false; //エラー2専用,エラーチェック変数の初期化,第十回講義で追加
    error3_check_var=false; //エラー3専用,エラーチェック変数の初期化,第十回講義で追加
    error4_check_var=false; //エラー4専用,エラーチェック変数の初期化,第十回講義で追加
    error5_check_var=false; //エラー5専用,エラーチェック変数の初期化,第十回講義で追加
    speed_up_item_var=false; //スピードアップアイテムの有無の初期化,第十回講義で追加
    warp_item_var=false; //ワープアイテムの有無の初期化,第十回講義で追加
    goal_var=false; //ゴールの有無の初期化,第十一回講義で追加
    console_test1_var=false; //速度上昇通路の有無メッセージの初期化,第十一回講義で追加
    console_test2_var=false; //瞬間移動通路の有無メッセージの初期化,第十一回講義で追加
    console_test3_var=false; //ゴールの有無メッセージの初期化,第十一回講義で追加
    rand1_var=Math.floor(Math.random()*W); //速度上昇通路の横の出力場所をランダムに指定する変数,第十回講義で追加
    rand2_var=Math.floor(Math.random()*H); //速度上昇通路の縦の出力場所をランダムに指定する変数,第十回講義で追加
    rand3_var=Math.floor(Math.random()*W); //一つ目の瞬間移動の横の出力場所をランダムに指定する変数,第十回講義で追加
    rand4_var=Math.floor(Math.random()*H); //一つ目の瞬間移動の縦の出力場所をランダムに指定する変数,第十回講義で追加
    rand5_var=Math.floor(Math.random()*W); //二つ目の瞬間移動の横の出力場所をランダムに指定する変数,第十回講義で追加
    rand6_var=Math.floor(Math.random()*H); //二つ目の瞬間移動の縦の出力場所をランダムに指定する変数,第十回講義で追加
    rand7_var=Math.floor((W-2)-Math.random()*3); //ゴールの横の出力場所をランダムに指定する変数,第十一回講義で追加
    rand8_var=Math.floor((H-2)-Math.random()*3); //ゴールの縦の出力場所をランダムに指定する変数,第十一回講義で追加
    

    clearInterval(timer); //タイマーの初期化1,第十回講義で追加
    clearInterval(timer_var); //タイマーの初期化2,第十一回講義で追加
    timer_var=NaN; //タイマー変数の初期化,第十一回講義で追加,第十一回講義で追加
    count_var=0; //タイマーカウント変数の初期化,第十一回講義で追加
    timer_value_var=document.getElementById("timer_value_id").value; //タイマーの数字変換の初期化,第十一回講義で追加
    document.getElementById("timer_id").innerHTML="残り時間: "+(timer_value_var-count_var)+"秒"; //タイマーの示す時間の初期化,第十一回講義で追加
    start_check_var=false; //動作環境を初期化,第十一回講義で追加
    time_score_var=0;/////
    player_name_var=0;
    document.getElementById("score_id").innerHTML="";
    document.getElementById("game_clear_id").innerHTML="";

    init();
}

/// 画像確認関数,自作(第9回+第10回+第11回講義)
function check_img_fnc(){
    //壁,第九回講義で追加
    if(document.getElementById("maze_wall_image_id").value=="ChipA"){ //壁画像の種類の入力が「ChipA」の時
        maze_W_var=1; //「repaint関数」の「img1_var」に結びつける
    } else if(document.getElementById("maze_wall_image_id").value=="ChipB"){ //壁画像の種類の入力が「ChipB」の時
        maze_W_var=2; //「repaint関数」の「img2_var」に結びつける
    } else if(document.getElementById("maze_wall_image_id").value=="ChipC"){ //壁画像の種類の入力が「ChipC」の時
        maze_W_var=3; //「repaint関数」の「img3_var」に結びつける
    } else if(document.getElementById("maze_wall_image_id").value=="ChipD"){ //壁画像の種類の入力が「ChipD」の時
        maze_W_var=4; //「repaint関数」の「img4_var」に結びつける
    } else if(document.getElementById("maze_wall_image_id").value=="ChipE"){ //壁画像の種類の入力が「ChipE」の時
        maze_W_var=5; //「repaint関数」の「img5_var」に結びつける
    }

    //通常通路,第九回講義で追加
    if(document.getElementById("maze_path_image_id").value=="ChipA"){ //通路画像の種類の入力が「ChipA」の時
        maze_P_var=1; //「repaint関数」の「img1_var」に結びつける
    } else if(document.getElementById("maze_path_image_id").value=="ChipB"){ //通路画像の種類の入力が「ChipB」の時
        maze_P_var=2; //「repaint関数」の「img2_var」に結びつける
    } else if(document.getElementById("maze_path_image_id").value=="ChipC"){ //通路画像の種類の入力が「ChipC」の時
        maze_P_var=3; //「repaint関数」の「img3_var」に結びつける
    } else if(document.getElementById("maze_path_image_id").value=="ChipD"){ //通路画像の種類の入力が「ChipD」の時
        maze_P_var=4; //「repaint関数」の「img4_var」に結びつける
    } else if(document.getElementById("maze_path_image_id").value=="ChipE"){ //通路画像の種類の入力が「ChipE」の時
        maze_P_var=5; //「repaint関数」の「img5_var」に結びつける
    }

    //速度上昇通路,第十回講義で追加
    if(document.getElementById("maze_speedup_path_image_id").value=="ChipA"){ //速度上昇通路画像の種類の入力が「ChipA」の時
        maze_SP_var=1; //「repaint関数」の「img1_var」に結びつける
    } else if(document.getElementById("maze_speedup_path_image_id").value=="ChipB"){ //速度上昇通路画像の種類の入力が「ChipB」の時
        maze_SP_var=2; //「repaint関数」の「img2_var」に結びつける
    } else if(document.getElementById("maze_speedup_path_image_id").value=="ChipC"){ //速度上昇通路画像の種類の入力が「ChipC」の時
        maze_SP_var=3; //「repaint関数」の「img3_var」に結びつける
    } else if(document.getElementById("maze_speedup_path_image_id").value=="ChipD"){ //速度上昇通路画像の種類の入力が「ChipD」の時
        maze_SP_var=4; //「repaint関数」の「img4_var」に結びつける
    } else if(document.getElementById("maze_speedup_path_image_id").value=="ChipE"){ //速度上昇画像の種類の入力が「ChipE」の時
        maze_SP_var=5; //「repaint関数」の「img5_var」に結びつける
    }

    //瞬間移動通路,第十回講義で追加
    if(document.getElementById("maze_warp_path_image_id").value=="ChipA"){ //瞬間移動通路画像の種類の入力が「ChipA」の時
        maze_WP_var=1; //「repaint関数」の「img1_var」に結びつける
    } else if(document.getElementById("maze_warp_path_image_id").value=="ChipB"){ //瞬間移動通路画像の種類の入力が「ChipB」の時
        maze_WP_var=2; //「repaint関数」の「img2_var」に結びつける
    } else if(document.getElementById("maze_warp_path_image_id").value=="ChipC"){ //瞬間移動通路画像の種類の入力が「ChipC」の時
        maze_WP_var=3; //「repaint関数」の「img3_var」に結びつける
    } else if(document.getElementById("maze_warp_path_image_id").value=="ChipD"){ //瞬間移動通路画像の種類の入力が「ChipD」の時
        maze_WP_var=4; //「repaint関数」の「img4_var」に結びつける
    } else if(document.getElementById("maze_warp_path_image_id").value=="ChipE"){ //瞬間移動画像の種類の入力が「ChipE」の時
        maze_WP_var=5; //「repaint関数」の「img5_var」に結びつける
    }

    //ゴール,第十一回講義で追加
    if(document.getElementById("maze_goal_image_id").value=="ChipA"){ //ゴール画像の種類の入力が「ChipA」の時
        maze_G_var=1; //「repaint関数」の「img1_var」に結びつける
    } else if(document.getElementById("maze_goal_image_id").value=="ChipB"){ //ゴール画像の種類の入力が「ChipB」の時
        maze_G_var=2; //「repaint関数」の「img2_var」に結びつける
    } else if(document.getElementById("maze_goal_image_id").value=="ChipC"){ //ゴール画像の種類の入力が「ChipC」の時
        maze_G_var=3; //「repaint関数」の「img3_var」に結びつける
    } else if(document.getElementById("maze_goal_image_id").value=="ChipD"){ //ゴール画像の種類の入力が「ChipD」の時
        maze_G_var=4; //「repaint関数」の「img4_var」に結びつける
    } else if(document.getElementById("maze_goal_image_id").value=="ChipE"){ //ゴール画像の種類の入力が「ChipE」の時
        maze_G_var=5; //「repaint関数」の「img5_var」に結びつける
    }
    
    //test用
    //console.log("maze_W_var="+maze_W_var);
    //console.log("maze_P_var="+maze_P_var);
    //console.log("maze_SP_var="+maze_SP_var);
    //console.log("maze_WP_var="+maze_WP_var);
    //console.log("maze_G_var="+maze_G_var);
    //console.log("");
}

/// エラー確認関数,自作(第9回+第10回+第11回講義)
function check_error_fnc(){
    // エラー1=「迷路の壁画像と通路画像が同一である時」
    if((((document.getElementById("maze_wall_image_id").value)==(document.getElementById("maze_path_image_id").value)) && change_var==true)
        || (((document.getElementById("maze_wall_image_id").value)==(document.getElementById("maze_speedup_path_image_id").value)) && change_var==true)
        || (((document.getElementById("maze_wall_image_id").value)==(document.getElementById("maze_warp_path_image_id").value)) && change_var==true)
        || (((document.getElementById("maze_wall_image_id").value)==(document.getElementById("maze_goal_image_id").value)) && change_var==true)
        || (((document.getElementById("maze_path_image_id").value)==(document.getElementById("maze_speedup_path_image_id").value)) && change_var==true)
        || (((document.getElementById("maze_path_image_id").value)==(document.getElementById("maze_warp_path_image_id").value)) && change_var==true)
        || (((document.getElementById("maze_path_image_id").value)==(document.getElementById("maze_goal_image_id").value)) && change_var==true)
        || (((document.getElementById("maze_speedup_path_image_id").value)==(document.getElementById("maze_warp_path_image_id").value)) && change_var==true)
        || (((document.getElementById("maze_speedup_path_image_id").value)==(document.getElementById("maze_goal_image_id").value)) && change_var==true)
        || (((document.getElementById("maze_warp_path_image_id").value)==(document.getElementById("maze_goal_image_id").value)) && change_var==true)){
        maze_W_var=0; //迷路の壁描画変数をゼロにすることで迷路の表示不可
        maze_P_var=0; //迷路の通路描画変数をゼロにすることで迷路の表示不可
        maze_SP_var=0; //迷路の速度上昇通路描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        maze_WP_var=0; //迷路の瞬間移動通路描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        maze_G_var=0; //迷路のゴール描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        if(error1_check_var==false){ //エラーチェック変数で一度表示したいエラー分岐処理
            document.getElementById("error_mess_id").innerHTML
            +="エラー1：「Maze_WALL」,「Maze_PATH」,「Maze_SPEED_UP_PATH」,「Maze_WARP_PATH」,「Maze_Goal」の値のいずれかが一緒になっています。<br>"; //エラー1のエラー詳細メッセージ
            error1_check_var=true; //追加,エラーメッセージ1を一度だけ取得
        }
    }

    // エラー2=「迷路の壁が適切な文字でない時」
    if((document.getElementById("maze_wall_image_id").value!="ChipA")&&
    (document.getElementById("maze_wall_image_id").value!="ChipB")&&
    (document.getElementById("maze_wall_image_id").value!="ChipC")&&
    (document.getElementById("maze_wall_image_id").value!="ChipD")&&
    (document.getElementById("maze_wall_image_id").value!="ChipE")&&
    change_var==true){
        maze_W_var=0; //迷路の壁描画変数をゼロにすることで迷路の表示不可
        maze_P_var=0; //迷路の通路描画変数をゼロにすることで迷路の表示不可
        maze_SP_var=0; //迷路の速度上昇通路描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        maze_WP_var=0; //迷路の瞬間移動通路描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        maze_G_var=0; //迷路のゴール描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        if(error2_check_var==false){ //エラーチェック変数で一度表示したいエラー分岐処理,第十回講義で追加
            document.getElementById("error_mess_id").innerHTML
            +="エラー2：「Maze_WALL」の値が不適切な数値になっています。<br>"; //エラー2のエラー詳細メッセージ
            error2_check_var=true; //エラーメッセージ2を一度だけ取得,第十回講義で追加
        }
    }

    // エラー3=「迷路の通路が適切な文字でない時」
    if((document.getElementById("maze_path_image_id").value!="ChipA")&&
    (document.getElementById("maze_path_image_id").value!="ChipB")&&
    (document.getElementById("maze_path_image_id").value!="ChipC")&&
    (document.getElementById("maze_path_image_id").value!="ChipD")&&
    (document.getElementById("maze_path_image_id").value!="ChipE")&&
    change_var==true){
        maze_W_var=0; //迷路の壁描画変数をゼロにすることで迷路の表示不可
        maze_P_var=0; //迷路の通路描画変数をゼロにすることで迷路の表示不可
        maze_SP_var=0; //迷路の速度上昇通路描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        maze_WP_var=0; //迷路の瞬間移動通路描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        maze_G_var=0; //迷路のゴール描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        if(error3_check_var==false){ //エラーチェック変数で一度表示したいエラー分岐処理,第十回講義で追加
            document.getElementById("error_mess_id").innerHTML
            +="エラー3：「Maze_PATH」の値が不適切な数値になっています。<br>"; //エラー3のエラー詳細メッセージ
            error3_check_var=true; //エラーメッセージ3を一度だけ取得,第十回講義で追加
        }
    }

    // エラー4=「迷路画像の描画幅がcanvasの描画幅をこえている時」
    if(size_var*W>1500 && change_var==true){
        maze_W_var=0; //迷路の壁描画変数をゼロにすることで迷路の表示不可
        maze_P_var=0; //迷路の通路描画変数をゼロにすることで迷路の表示不可
        maze_SP_var=0; //迷路の速度上昇通路描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        maze_WP_var=0; //迷路の瞬間移動通路描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        maze_G_var=0; //迷路のゴール描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        if(error4_check_var==false){ //エラーチェック変数で一度表示したいエラー分岐処理,第十回講義で追加
            document.getElementById("error_mess_id").innerHTML
            +="エラー4：「WIDE」*「SIZE」の値が枠を「"+((size_var*W)-1500)+"px」こえています。<br>"; //エラー4のエラー詳細メッセージ
            error4_check_var=true; //エラーメッセージ4を一度だけ取得,第十回講義で追加
        }
    }

    // エラー5=「迷路画像の描画高さがcanvasの描画高さをこえている時」
    if(size_var*H>1500 && change_var==true){
        maze_W_var=0; //迷路の壁描画変数をゼロにすることで迷路の表示不可
        maze_P_var=0; //迷路の通路描画変数をゼロにすることで迷路の表示不可
        maze_SP_var=0; //迷路の速度上昇通路描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        maze_WP_var=0; //迷路の瞬間移動通路描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        maze_G_var=0; //迷路のゴール描画変数をゼロにすることで迷路の表示不可,第十回講義で追加
        if(error5_check_var==false){ //エラーチェック変数で一度表示したいエラー分岐処理,第十回講義で追加
            document.getElementById("error_mess_id").innerHTML
            +="エラー5：「HIGHT」*「SIZE」の値が枠を「"+((size_var*H)-1500)+"px」こえています。<br>"; //エラー5のエラー詳細メッセージ
            error5_check_var=true; //エラーメッセージ5を一度だけ取得,第十回講義で追加
        }
    }

    //test用
    //let id_w_var=document.getElementById("maze_wall_image_id").value;
    //let id_s_var=document.getElementById("maze_path_image_id").value;
    //console.log("id_w_var="+id_w_var);
    //console.log("id_s_var="+id_s_var);
    //console.log("");
}

/// キャラクターの位置取得関数,講義資料(第10回講義)+一部変更(第10回+第11回講義)
function Player(x, y){
    this.x=x; //x座標
    this.y=y; //y座標
    this.dir=1; //向き

    this.update=function(){
        let nx=0; //仮のx方向移動量
        let ny=0; //仮のy方向移動量
        if(start_check_var==true){
            switch(keyCode){
            case 37:
                nx=-1;
                this.dir=2;
                break;
            case 38:
                ny=-1;
                this.dir=0;
                break;
            case 39:
                nx=+1;
                this.dir=3;
                break;
            case 40:
                ny=+1;
                this.dir=1;
                break;
        }
        if(maze[this.y+ny][this.x+nx]==0 && (nx != 0 || ny != 0)){
            //移動先の座標が通路(0)のとき
            this.x=this.x+nx; //x座標更新
            this.y=this.y+ny; //y座標更新
        }

        //以下の「速度上昇通路」と「瞬間移動通路」の処理は第十回講義にて追加
        //速度上昇通路の反映
        if((speed_up_item_var==false) && (this.x==rand1_var) && (this.y==rand2_var)){
            clearInterval(timer); //タイマーの停止
            timer=setInterval(tick, 45); //速度増加
            speed_up_item_var=true; //速度増加通路の反映
            //test用
            console.log("速度増加");
            console.log("speed_up_item_var="+speed_up_item_var);
            console.log("rand1_var="+rand1_var);
            console.log("rand2_var="+rand2_var);
            console.log("this.x="+this.x);
            console.log("this.y="+this.y);
            console.log("");
        }

        //瞬間移動通路の反映
        if((warp_item_var==false) && (this.x==rand3_var) && (this.y==rand4_var)){
            this.x=rand5_var; //瞬間移動2のx地点へ移動
            this.y=rand6_var; //瞬間移動2のy地点に移動
            warp_item_var=true; //瞬間移動通路の反映
            //test用
            console.log("瞬間移動1");
            console.log("warp_item_var="+warp_item_var);
            console.log("rand3_var="+rand3_var);
            console.log("rand4_var="+rand4_var);
            console.log("this.x="+this.x);
            console.log("this.y="+this.y);
            console.log("");
        } else if((warp_item_var==false) && (this.x==rand5_var) && (this.y==rand6_var)){
            this.x=rand3_var; //瞬間移動1のx地点へ移動
            this.y=rand4_var; //瞬間移動1のy地点に移動
            warp_item_var=true; //瞬間移動通路の反映
            //test用
            console.log("瞬間移動2");
            console.log("warp_item_var="+warp_item_var);
            console.log("rand5_var="+rand5_var);
            console.log("rand6_var="+rand6_var);
            console.log("this.x="+this.x);
            console.log("this.y="+this.y);
            console.log("");
        }


        //以下の「ゴール」の処理は第十一回講義にて追加
        //ゴールの反映
        if((goal_var==false) && (this.x==rand7_var) && (this.y==rand8_var)){
            clearInterval(timer); //タイマーの停止
            goal_var=true; //ゴールの反映
            start_check_var=false; //動作を止める
            player_name_var=document.getElementById("player_name_id").value; //プレイヤー名の取得
            document.getElementById("score_id").innerHTML
            =player_name_var+"さんのスコアは「"+time_score_var+"点」です。<br>"; //スコア通知
            document.getElementById("game_clear_id").innerHTML="ゲームクリア!!<br>"; //ゲームクリア通知
            //test用
            console.log("ゴール");
            console.log("goal_var="+goal_var);
            console.log("rand8_var="+rand7_var);
            console.log("rand7_var="+rand8_var);
            console.log("this.x="+this.x);
            console.log("this.y="+this.y);
            console.log("");
        }
    }
    };


    this.paint=function(gc, x, y, w, h){
        let img=document.getElementById("hero"+this.dir);
        if(change_var==false){ //「CHANGE」ボタンの入力が無い時の「キャラクター」の描画,第十回講義で追加
            //gc.drawImage(img, x, y, w, h); //教科書
            gc.drawImage(img, this.x*32, this.y*32, 32, 32); //主人公描画,通常時
        } else if(change_var==true && error1_check_var==false
                && error2_check_var==false && error3_check_var==false
                && error4_check_var==false && error5_check_var==false) { ////「CHANGE」ボタンの入力がある時の「キャラクター」の描画,エラーが全てなし,第十回講義で追加
            gc.drawImage(img, this.x*size_var, this.y*size_var, size_var, size_var); //主人公描画,画像の大きさはユーザーが指定,第十回講義で追加
        }
    };    
}

// 関数連続起動関数,講義資料(第10回講義)
function go(){
    window.onkeydown=mykeydown;
    window.onkeyup=mykeyup;

    let maze=document.getElementById("maze");
    //迷路への参照を取得して各種イベントパンドラ登録
    maze.oncontextmenu=function(e){
        e.preventfault(); //コンテキストメニューを非表示
    };

    timer=setInterval(tick, 200); //教科書は45,資料は200
}

// 描画変化対応関数1,講義資料(第10回講義)
function tick(){
    player.update();
    repaint();
}

// 描画変化対応関数2,講義資料(第10回講義)
function mykeydown(e){
    keyCode=e.keyCode;
}

// 描画変化対応関数3,講義資料(第10回講義)
function mykeyup(e){
    keyCode=0;
}


/// 変数,自作(以下13行,第11回講義)
let maze_G_var; //迷路のゴールを出力するための変数
let goal_var=false; //ゴールの有無を反映する変数
let rand7_var=Math.floor((W-2)-Math.random()*3); //ゴールの横の出力場所をランダムに指定する変数,右下に設置
let rand8_var=Math.floor((H-2)-Math.random()*3); //ゴールの縦の出力場所をランダムに指定する変数,右下に設置

let console_test1_var=false; //速度上昇迷路の出力の有無を通知する変数
let console_test2_var=false; //瞬間移動迷路の出力の有無を通知する変数
let console_test3_var=false; //ゴールの出力の有無を通知する変数

let timer_var=NaN; //タイマーの処理を連続して行う変数
let count_var=0; //タイマーの時間経過を計測する変数
let timer_value_var=0; //タイマーの秒数を指定する変数
let start_check_var=false; //ゲーム開始時前と終了時後にキャラクターの動作不可にする変数
let time_score_var=0; //ゲームクリアの時間取得変数
let player_name_var; //ゲームのプレイヤーネーム変数

/// タイマー起動関数,自作(第11回講義)
function start_fnc(){
    start_check_var=true; //ゲーム中にキャラクターを動作可能にする
    timer_var=setInterval(timer_sporrt_fnc, 1000); //1秒間にタイマー処理を一度処理を実行
}

//タイマーの処理反映関数,自作(第11回講義)
function timer_sporrt_fnc(){
    if(goal_var==false){
        count_var++; //1秒間に一度加算することでタイマーの時間経過を反映
    }
    if(change_var==true){
        timer_value_var=document.getElementById("timer_value_id").value; //タイマーの秒数指定を反映
        time_score_var=timer_value_var-count_var; //現在想定されるゲームクリアの時間取得
        if(count_var<timer_value_var){ //時間を計測している場合
            document.getElementById("timer_id").innerHTML="残り時間: "+(timer_value_var-count_var)+"秒"; //ゲーム途中経過メッセージ
        } else { //時間計測後の場合
            document.getElementById("timer_id").innerHTML="ゲーム終了"; //ゲーム終了メッセージ
            clearInterval(timer_var); //ゲーム時間計測を止める
            start_check_var=false; //ゲーム開始時前と終了時後にキャラクターの動作不可にする
            if(goal_var==false){ //ゴールしていなければ
                document.getElementById("game_clear_id").innerHTML="ゲームクリアならず...<br>"; //ゲームオーバーメッセージ
            }
        }
    } else {
        time_score_var=60-count_var;
        if(count_var<60){  //時間を計測している場合
            document.getElementById("timer_id").innerHTML="残り時間: "+(60-count_var)+"秒"; //ゲーム途中経過メッセージ
        } else { //時間計測後の場合
            document.getElementById("timer_id").innerHTML="ゲーム終了"; //ゲーム終了メッセージ
            clearInterval(timer_var); //ゲーム時間計測を止める
            start_check_var=false; //ゲーム開始時前と終了時後にキャラクターの動作不可にする
            if(goal_var==false){ //ゴールしていなければ
                document.getElementById("game_clear_id").innerHTML="ゲームクリアならず...<br>"; //ゲームオーバーメッセージ
            }
        }
    }
    //test用
    //console.log("count_var="+count_var);
    //console.log("timer_value_var="+timer_value_var);
    //console.log("");
}

// エラーチェック,講義資料
"use strict"; //厳密なエラーチェック対応

/// 変数,講義資料+一部変更
let W=31; //迷路の幅,「const」から「let」へ変更,「W」の変化に対応
let H=31; //迷路の高さ,「const」から「let」へ変更,「H」の変化に対応
const maze=[]; //迷路
let ctx;

/// 変数,自作(以下6行)
let size_var; //ブロック一つあたりの縦横の大きさを変更する変数
let change_var=false; //「CHANGE」ボタン入力の有無を取得する変数
let maze_W_var; //迷路の壁を出力するための変数
let maze_P_var; //迷路の通路を出力するための変数
let wide_var; //迷路の幅がcanvasの大きさをはみ出した際の処理を反映する変数
let height_var; //迷路の高さがcanvasの大きさをはみ出した際の処理を反映する変数

// 乱数反映関数,講義資料
function random(v){
    return Math.floor(Math.random()*v); //0からvまでの乱数を整数で返す
}

// 通常時の処理関数,講義資料
function init(){
    let maze=document.getElementById("maze");
    ctx=maze.getContext("2d");

    createMaze(W,H); //迷路作成
    repaint();
}

// 迷路形式関数,講義資料
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

/// 迷路描画関数,講義資料+一部変更
function repaint(){
    //背景クリア
    ctx.fillStyle="black";
    ctx.fillRect(0, 0, 1500, 1500); //大きさを(0,0,900,600)から(0,0,1500,1500)に変更,canvasの大きさ変化に対応

    //迷路描画
    //ctx.fillStyle="brown";
    //ctx.translate(0,0);

    //迷路の壁と通路の画像切り替え変数,追加(以下4行)
    let img1_var=document.getElementById("img1_id");
    let img2_var=document.getElementById("img2_id");
    let img3_var=document.getElementById("img3_id");
    let img4_var=document.getElementById("img4_id");

    check_img_fnc(); //画像確認関数の起動
    check_error_fnc(); //エラー確認関数の起動
    for(let x=0; x<W; x++){
        for(let y=0; y<H; y++){
            if(maze[y][x]==1 && change_var==false){ //「CHANGE」ボタンの入力が無い時の「壁」の描画,追加
                //if(maze_W_var==1){
                    //ctx.fillRect(x*16, y*16, 16, 16); //壁の画像描画
                //}
                //「maze_W_var」の内容に応じて壁画像の種類を切り替えて描画,画像の大きさは講義資料と同様に「16」
                switch(maze_W_var){
                    case 1:
                        ctx.drawImage(img1_var, x*16, y*16, 16, 16);
                        break;
                    case 2:
                        ctx.drawImage(img2_var, x*16, y*16, 16, 16);
                        break;
                    case 3:
                        ctx.drawImage(img3_var, x*16, y*16, 16, 16);
                        break;
                    case 4:
                        ctx.drawImage(img4_var, x*16, y*16, 16, 16);
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
                }
            }

            if(maze[y][x]==0 && change_var==false){ //「CHANGE」ボタンの入力が無い時の「通路」の描画,追加
                //「maze_P_var」の内容に応じて通路画像の種類を切り替えて描画,画像の大きさは講義資料と同様に「16」
                switch(maze_P_var){
                    case 1:
                        ctx.drawImage(img1_var, x*16, y*16, 16, 16);
                        break;
                    case 2:
                        ctx.drawImage(img2_var, x*16, y*16, 16, 16);
                        break;
                    case 3:
                        ctx.drawImage(img3_var, x*16, y*16, 16, 16);
                        break;
                    case 4:
                        ctx.drawImage(img4_var, x*16, y*16, 16, 16);
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
                }
            }
        }
    }
    ctx.restore();
}


/// 数値の変化対応関数,自作
function change_fnc(){
    W=document.getElementById("wide_id").value; //HTMLの「wide_id」に入力した値を画像の横の個数とする
    H=document.getElementById("height_id").value; //HTMLの「height_id」に入力した値を画像の横の個数とする
    size_var=document.getElementById("size_id").value; //HTMLの「size_id」に入力した値を画像の一つあたりの縦横の大きさとする
    change_var=true; //「CHANGE」ボタンの入力を反映
    document.getElementById("error_mess_id").innerHTML=""; //エラーメッセージが場合にリセット
    init(); //再度、値を変更した状態で画像描画処理を行う
}

/// リセット関数,自作
function reset_fnc(){
    W=31; //画像の横の個数を初期化
    H=31; //画像の縦の個数を初期化
    size_var=0; //画像の大きさを初期化
    change_var=false; //「CHANGE」ボタンの入力を初期化
    document.getElementById("wide_id").value="31"; //画像の横の個数の入力状態を初期化
    document.getElementById("height_id").value="31"; //画像の縦の個数の入力状態を初期化
    document.getElementById("size_id").value="16"; //画像の大きさの入力状態を初期化
    document.getElementById("maze_wall_image_id").value="ChipA"; //壁画像の種類の入力状態を初期化
    document.getElementById("maze_path_image_id").value="ChipB"; //通路画像の種類の入力状態を初期化
    document.getElementById("error_mess_id").innerHTML=""; //エラーメッセージの入力状態を初期化
    init();
}

/// 画像確認関数,自作
function check_img_fnc(){
    if(document.getElementById("maze_wall_image_id").value=="ChipA"){ //壁画像の種類の入力が「ChipA」の時
        maze_W_var=1; //「repaint関数」の「img1_var」に結びつける
    } else if(document.getElementById("maze_wall_image_id").value=="ChipB"){ //壁画像の種類の入力が「ChipB」の時
        maze_W_var=2; //「repaint関数」の「img2_var」に結びつける
    } else if(document.getElementById("maze_wall_image_id").value=="ChipC"){ //壁画像の種類の入力が「ChipC」の時
        maze_W_var=3; //「repaint関数」の「img3_var」に結びつける
    } else if(document.getElementById("maze_wall_image_id").value=="ChipD"){ //壁画像の種類の入力が「ChipD」の時
        maze_W_var=4; //「repaint関数」の「img4_var」に結びつける
    } 

    if(document.getElementById("maze_path_image_id").value=="ChipA"){ //通路画像の種類の入力が「ChipA」の時
        maze_P_var=1; //「repaint関数」の「img1_var」に結びつける
    } else if(document.getElementById("maze_path_image_id").value=="ChipB"){ //通路画像の種類の入力が「ChipB」の時
        maze_P_var=2; //「repaint関数」の「img2_var」に結びつける
    } else if(document.getElementById("maze_path_image_id").value=="ChipC"){ //通路画像の種類の入力が「ChipC」の時
        maze_P_var=3; //「repaint関数」の「img3_var」に結びつける
    } else if(document.getElementById("maze_path_image_id").value=="ChipD"){ //通路画像の種類の入力が「ChipD」の時
        maze_P_var=4; //「repaint関数」の「img4_var」に結びつける
    }
    
    //test用
    console.log("maze_W_var="+maze_W_var);
    console.log("maze_P_var="+maze_P_var);
    console.log("");
}

/// エラー確認関数,自作
function check_error_fnc(){
    // エラー1=「迷路の壁画像と通路画像が同一である時」
    if((document.getElementById("maze_wall_image_id").value)==(document.getElementById("maze_path_image_id").value)){
        maze_W_var=0; //迷路の壁描画変数をゼロにすることで迷路の表示不可
        maze_P_var=0; //迷路の通路描画変数をゼロにすることで迷路の表示不可
        document.getElementById("error_mess_id").innerHTML
        +="エラー1：「Maze_WALL」と「Maze_PATH」の値が一緒になっています。<br>"; //エラー1のエラー詳細メッセージ
    }

    // エラー2=「迷路の壁が適切な文字でない時」
    if((document.getElementById("maze_wall_image_id").value!="ChipA")&&
    (document.getElementById("maze_wall_image_id").value!="ChipB")&&
    (document.getElementById("maze_wall_image_id").value!="ChipC")&&
    (document.getElementById("maze_wall_image_id").value!="ChipD")){
        maze_W_var=0; //迷路の壁描画変数をゼロにすることで迷路の表示不可
        maze_P_var=0; //迷路の通路描画変数をゼロにすることで迷路の表示不可
        document.getElementById("error_mess_id").innerHTML
        +="エラー2：「Maze_WALL」の値が不適切な数値になっています。<br>"; //エラー2のエラー詳細メッセージ
    }

    // エラー3=「迷路の通路が適切な文字でない時」
    if((document.getElementById("maze_path_image_id").value!="ChipA")&&
    (document.getElementById("maze_path_image_id").value!="ChipB")&&
    (document.getElementById("maze_path_image_id").value!="ChipC")&&
    (document.getElementById("maze_path_image_id").value!="ChipD")){
        maze_W_var=0; //迷路の壁描画変数をゼロにすることで迷路の表示不可
        maze_P_var=0; //迷路の通路描画変数をゼロにすることで迷路の表示不可
        document.getElementById("error_mess_id").innerHTML
        +="エラー3：「Maze_PATH」の値が不適切な数値になっています。<br>"; //エラー3のエラー詳細メッセージ
    }

    // エラー4=「迷路画像の描画幅がcanvasの描画幅をこえている時」
    if(size_var*W>1500 && change_var==true){
        maze_W_var=0; //迷路の壁描画変数をゼロにすることで迷路の表示不可
        maze_P_var=0; //迷路の通路描画変数をゼロにすることで迷路の表示不可
        document.getElementById("error_mess_id").innerHTML
        +="エラー4：「WIDE」*「SIZE」の値が枠を「"+((size_var*W)-1500)+"」こえています。<br>"; //エラー4のエラー詳細メッセージ
    }

    // エラー5=「迷路画像の描画高さがcanvasの描画高さをこえている時」
    if(size_var*H>1500 && change_var==true){
        maze_W_var=0; //迷路の壁描画変数をゼロにすることで迷路の表示不可
        maze_P_var=0; //迷路の通路描画変数をゼロにすることで迷路の表示不可
        document.getElementById("error_mess_id").innerHTML
        +="エラー5：「HIGHT」*「SIZE」の値が枠を「"+((size_var*H)-1500)+"」こえています。<br>"; //エラー5のエラー詳細メッセージ
    }

    //test用
    let id_w_var=document.getElementById("maze_wall_image_id").value;
    let id_s_var=document.getElementById("maze_path_image_id").value;
    console.log("id_w_var="+id_w_var);
    console.log("id_s_var="+id_s_var);
    console.log("");
}
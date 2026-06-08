// canvas利用に必須の指示項目
let canvas=document.getElementById("canvas");
let ctx=canvas.getContext("2d");
let rotDig; //講義資料の変数宣言を外で


// 初期状態の変数処理と図形処理
let count_var=0; //回数取得変数
let start_var_1=false; //アニメ1がまだ描画されていないことを示す
let start_var_2=false; //アニメ2がまだ描画されていないことを示す
let start_var_3=false; //アニメ3がまだ描画されていないことを示す
let start_var_4=false; //アニメ4がまだ描画されていないことを示す
drawRct(0, 0, 1280, 640, "black", false); //画面(x=0~1280, y=0~640)に黒色の枠を描画



// アニメーション関数1, 緑の円の描画
function anime_func_1(){
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(rotDig/180*Math.PI);
    drawCcl(2*32, 2*32, 32, "green");
    ctx.restore();
}

// アニメ描画関数1, 円を等間隔で1個~100個まで書いて中心が空いた円をきれいに描画するアニメーション
function anime_count_fnc_1(){
    if(count_var!=100){ //回数が100回に達するまでの処理
        reset_fnc(); //画面のリセット
        count_var+=1; //回数のカウント
        document.getElementById("count_id_1").innerText="現在の円の数="+count_var+"個"; //表示されている円の個数の表示
        for(rotDig=0; rotDig<360; rotDig+=360/count_var){
            anime_func_1(); //等間隔の円の描画
        }
    } else { //回数が100回に達した後の処理
        document.getElementById("count_id_1").innerText=count_var+"個の円で作られた穴の開いた円の完成!!";  //穴の開いたの円の完成の表示
        document.getElementById("support_id").innerText="処理を続行する際はRESETボタンをクリックしてください。"; //support_idで指示
        clearInterval(timer_var_1); //タイマー1のアニメ1描画関数の停止
        count_var=0; //回数のリセット
        start_var_1=false; //アニメ1の描画が終了したことを示す
    }
}



// アニメーション関数2, 黄色の半円の描画
function anime_func_2(){
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.rotate(rotDig/180*Math.PI);
    draw_halfCcl(2*32, 2*32, 32, "yellow");
    ctx.restore();
}

// アニメ描画関数2, 半円(黄)を20回,円(茶)を1回,長方形(緑)を1回,半円(緑)を2回描画してひまわりを描くアニメーション
function anime_count_fnc_2(){
    if(count_var<20){ //回数が20回に達するまでの処理
        reset_fnc(); //画面のリセット
        document.getElementById("count_id_2").innerText="ひまわりの絵が完成するまであと"+(23-count_var)+"回"; //ひまわりの絵完成までの回数の表示
        count_var+=1; //回数のカウント
        for(rotDig=0; rotDig<360; rotDig+=360/count_var){
            anime_func_2(); //等間隔の半円の描画
        }
    } else if(count_var==20) { //回数が20回の時
        drawCcl(540, 220, 100, "brown"); //茶色の円の描画
        document.getElementById("count_id_2").innerText="ひまわりの絵が完成するまであと"+(23-count_var)+"回"; //ひまわりの絵完成までの回数の表示
        count_var+=1; //回数のカウント
    } else if(count_var==21) { //回数が21回の時
        drawRct(610, 450, 60, 190, "green", true); //緑に塗りつぶされた長方形の描画
        document.getElementById("count_id_2").innerText="ひまわりの絵が完成するまであと"+(23-count_var)+"回"; //ひまわりの絵完成までの回数の表示
        count_var+=1; //回数のカウント
    } else if(count_var==22) { //回数が22回の時
        draw_halfCcl(550, 500, 30, "green"); //緑の半円の描画
        document.getElementById("count_id_2").innerText="ひまわりの絵が完成するまであと"+(23-count_var)+"回"; //ひまわりの絵完成までの回数の表示
        count_var+=1; //回数のカウント
    } else { //回数が23回の時
        draw_halfCcl(670, 500, 30, "green"); //緑の半円の描画
        document.getElementById("count_id_2").innerText="ひまわりの絵の完成です!!"; //ひまわりの絵完成の表示
        document.getElementById("support_id").innerText="処理を続行する際はRESETボタンをクリックしてください。"; //support_idで指示
        clearInterval(timer_var_2); //タイマー2のアニメ2描画関数の停止
        count_var=0; //回数のリセット
        start_var_2=false; //アニメ2の描画が終了したことを示す
    }
}



// アニメ描画関数3, 半円(赤,オレンジ,黄,緑,青,紺,紫,白)の順に8回描画して虹を描くアニメーション
function anime_count_fnc_3(){
    if(count_var==0){ //回数が0回の時
        //640-r, 640-r
        draw_halfCcl(340, 320, 300, "red"); //赤の半円の描画
        count_var+=1; //回数のカウント
        document.getElementById("count_id_3").innerText="虹の絵が完成するまであと"+(8-count_var)+"回"; //虹の絵完成までの回数の表示
    } else if(count_var==1) { //回数が1回の時
        draw_halfCcl(360, 340, 280, "orange"); //オレンジの半円の描画
        count_var+=1; //回数のカウント
        document.getElementById("count_id_3").innerText="虹の絵が完成するまであと"+(8-count_var)+"回"; //虹の絵完成までの回数の表示
    } else if(count_var==2) { //回数が2回の時
        draw_halfCcl(380, 360, 260, "yellow"); //黄の半円の描画
        count_var+=1; //回数のカウント
        document.getElementById("count_id_3").innerText="虹の絵が完成するまであと"+(8-count_var)+"回"; //虹の絵完成までの回数の表示
    } else if(count_var==3) { //回数が3回の時
        draw_halfCcl(400, 380, 240, "green"); //緑の半円の描画
        count_var+=1; //回数のカウント
        document.getElementById("count_id_3").innerText="虹の絵が完成するまであと"+(8-count_var)+"回"; //虹の絵完成までの回数の表示
    } else if(count_var==4) { //回数が4回の時
        draw_halfCcl(420, 400, 220, "blue"); //青の半円の描画
        count_var+=1; //回数のカウント
        document.getElementById("count_id_3").innerText="虹の絵が完成するまであと"+(8-count_var)+"回"; //虹の絵完成までの回数の表示
    } else if(count_var==5) { //回数が5回の時
        draw_halfCcl(440, 420, 200, "navy"); //紺の半円の描画
        count_var+=1; //回数のカウント
        document.getElementById("count_id_3").innerText="虹の絵が完成するまであと"+(8-count_var)+"回"; //虹の絵完成までの回数の表示
    } else if(count_var==6) { //回数が6回の時
        draw_halfCcl(460, 440, 180, "purple"); //紫の半円の描画
        count_var+=1; //回数のカウント
        document.getElementById("count_id_3").innerText="虹の絵が完成するまであと"+(8-count_var)+"回"; //虹の絵完成までの回数の表示
    } else { //回数が7回の時
        draw_halfCcl(480, 460, 160, "white"); //白の半円の描画
        document.getElementById("count_id_3").innerText="虹の絵の完成です!!";//虹の絵完成の表示
        document.getElementById("support_id").innerText="処理を続行する際はRESETボタンをクリックしてください。"; //support_idで指示
        clearInterval(timer_var_3); //タイマー3のアニメ3描画関数の停止
        count_var=0; //回数のリセット
        start_var_3=false; //アニメ3の描画が終了したことを示す
    }
}



// アニメーション関数4, 三つの三角形の描画
function anime_func_4(){
    drawTri(608, 400-count_var*3, 64, 64, "black"); //黒い三角形
    drawTri(624, 400-count_var*3, 32, 64, "gray"); //グレーの三角形
    drawTri_R(624, 400-count_var*3, 32, 64, "gray"); //グレーの反転した三角形
}

// アニメ描画関数4, 三角形(黒)を1つ,三角形(グレー)を1つ,三角形(グレー,反転)を1つ描画して紙飛行機の移動を描くアニメーション
function anime_count_fnc_4(){
    if(count_var!=100){ //回数が100回に達するまでの処理
        reset_fnc(); //画面のリセット
        count_var+=1; //回数のカウント
        document.getElementById("count_id_4").innerText="紙飛行機のxの現在の位置は"+(400-count_var*3)+"で,ゴールの位置まであと"+((400-count_var*3)-100)+"です。";  //紙飛行機のアニメーション終了表示
        anime_func_4(); //紙飛行機のイラストの描画
        drawRct(640, 100, 0, 400, "black", false); //紙飛行機が通る位置を直線で表示,(xの中心),100(400-300),幅は0,400)
    } else { //回数が100回に達した後の処理
        document.getElementById("count_id_4").innerText="紙飛行機の移動するアニメーションは終了しました。";  //紙飛行機のアニメーション終了表示
        document.getElementById("support_id").innerText="処理を続行する際はRESETボタンをクリックしてください。"; //support_idで指示
        clearInterval(timer_var_4); //タイマー1のアニメ1描画関数の停止
        count_var=0; //回数のリセット
        start_var_4=false; //アニメ4の描画が終了したことを示す
    }
}



// スタート関数1, スタート1ボタンに対応していてアニメ1の描画を行う
function start_fnc_1(){ //スタート1のボタンクリック時
    if(start_var_2==false && start_var_3==false && start_var_4==false){ //アニメ2と3と4が描画されていない時
        timer_var_1=setInterval(anime_count_fnc_1, 300); //アニメ1描画関数のタイマー起動
        start_var_1=true; //アニメ1が描画されていることを示す
    }
}

// スタート関数2, スタート2ボタンに対応していてアニメ2の描画を行う
function start_fnc_2(){ //スタート2のボタンクリック時
    if(start_var_1==false && start_var_3==false && start_var_4==false){ //アニメ1と3と4が描画されていない時
        timer_var_2=setInterval(anime_count_fnc_2, 1500); //アニメ2描画関数のタイマー起動
        start_var_2=true; //アニメ2が描画されていることを示す
    }
}

// スタート関数3, スタート3ボタンに対応していてアニメ3の描画を行う
function start_fnc_3(){ //スタート3のボタンクリック時
    if(start_var_1==false && start_var_2==false && start_var_4==false){ //アニメ1と2と4が描画されていない時
        timer_var_3=setInterval(anime_count_fnc_3, 1000); //アニメ3描画関数のタイマー起動
        start_var_3=true; //アニメ3が描画されていることを示す
    }
}

// スタート関数4, スタート4ボタンに対応していてアニメ4の描画を行う
function start_fnc_4(){ //スタート4のボタンクリック時
    if(start_var_1==false && start_var_2==false && start_var_3==false){ //アニメ1と2と3が描画されていない時
        timer_var_4=setInterval(anime_count_fnc_4, 500); //アニメ4描画関数のタイマー起動
        start_var_4=true; //アニメ4が描画されていることを示す
    }
}

// ストップ関数, 表示された内容を途中で中断する
function stop_fnc(){
    if(start_var_1==true){
        start_var_1=false; //アニメ1の描画が途中で終了する
        count_var=0; //回数のリセット
        clearInterval(timer_var_1); //タイマー1のアニメ1描画関数の停止
        document.getElementById("support_id").innerText="処理を続行する際はRESETボタンをクリックしてください。"; //support_idで指示
    } else if(start_var_2==true) {
        start_var_2=false; //アニメ2の描画が途中で終了する
        count_var=0; //回数のリセット
        clearInterval(timer_var_2); //タイマー2のアニメ2描画関数の停止
        document.getElementById("support_id").innerText="処理を続行する際はRESETボタンをクリックしてください。"; //support_idで指示
    } else if(start_var_3==true) {
        start_var_3=false; //アニメ3の描画が途中で終了する
        count_var=0; //回数のリセット
        clearInterval(timer_var_3); //タイマー3のアニメ3描画関数の停止
        document.getElementById("support_id").innerText="処理を続行する際はRESETボタンをクリックしてください。"; //support_idで指示
    } else if(start_var_4==true) {
        start_var_4=false; //アニメ4の描画が途中で終了する
        count_var=0; //回数のリセット
        clearInterval(timer_var_4); //タイマー3のアニメ3描画関数の停止
        document.getElementById("support_id").innerText="処理を続行する際はRESETボタンをクリックしてください。"; //support_idで指示
    }
}

// リセット関数, 表示された内容をリセットする
function reset_fnc(){
    ctx.clearRect(0,0,1280,640); //画面(x=0~1280, y=0~640)をクリアにする
    drawRct(0, 0, 1280, 640, "black", false); //画面(x=0~1280, y=0~640)に黒色の枠を描画
    document.getElementById("count_id_1").innerText=""; //count_id_1の初期化
    document.getElementById("count_id_2").innerText=""; //count_id_2の初期化
    document.getElementById("count_id_3").innerText=""; //count_id_3の初期化
    document.getElementById("count_id_4").innerText=""; //count_id_4の初期化
    document.getElementById("support_id").innerText=""; //support_idの初期化
}

// 長方形関数, 講義資料
function drawRct(x, y, w, h, color, isfill) //(x=x値, y=y値, w=幅, h=高さ, isfill=塗りつぶしの有無)
{
    if(isfill==true){ //塗りつぶす時の処理
        ctx.fillStyle=color; //塗りつぶす色の指定
        ctx.fillRect(x, y, w, h); //長方形の描画(=塗りつぶす)
    } else if(isfill==false) { //塗りつぶさない時の処理
        ctx.strokeStyle=color; //枠の色の指定
        ctx.strokeRect(x, y, w, h); //長方形の描画(=塗りつぶさない)
    }
}

// 三角形関数, 講義資料
function drawTri(x, y, w, h, color) //(x=x値, y=y値, w=幅, h=高さ, color=円の色)
{
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.moveTo(x+w/2, y); //上の一点
    ctx.lineTo(x, y+h); //左の一点
    ctx.lineTo(x+w, y+h); //右の一点
    ctx.closePath();
    ctx.fill();
}

// 反転した三角形関数, 講義資料をもとに自作
function drawTri_R(x, y, w, h, color) //(x=x値, y=y値, w=幅, h=高さ, color=円の色)
{
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.moveTo(x+w/2, y+1.5*h); //下の一点,hをyに加えることで座標を下に落として反転した三角形の一点を作る
    ctx.lineTo(x, y+h); //左の一点
    ctx.lineTo(x+w, y+h); //右の一点
    ctx.closePath();
    ctx.fill();
}

// 円関数, 講義資料
function drawCcl(x, y, r, color) //(x=x値, y=y値, r=半径, color=円の色)
{
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x+r, y+r, r, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fill();
}

// 半円関数, 講義資料をもとに自作
function draw_halfCcl(x, y, r, color) //(x=x値, y=y値, r=半径, color=円の色)
{
    ctx.fillStyle=color;
    ctx.beginPath();
    ctx.arc(x+r, y+r, r, 0, Math.PI, true); //Math.PI*2をMath.PIにして半円を表現
    ctx.closePath();
    ctx.fill();
}
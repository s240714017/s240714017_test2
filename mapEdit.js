// 自作追加変数
let rand_number_var_1; //数字変更
let rand_number_var_2; //数字位置変更
let count_var=0; //ブロックの入力回数
let point_var=[]; //ブロックの入力位置取得
let start_var=false; //ゲームスタート
let check_var=false; //入力ブロックの重複の有無取得
let c; //入力ブロックの重複のカウント取得
let value_var; //回答結果の取得

/// 講義資料の変数
let b; //ボード変数

/// 講義資料の関数1
function init(){
    b=document.getElementById("board"); //「let」を外に変更,初期化に対応
    for(let i=0; i<15; i++){ //i<8からi<15に変更
        let tr=document.createElement("tr");
        for(let j=0; j<15; j++){ //j<8からj<15に変更
            let td=document.createElement("td");
            tr.appendChild(td);
            let img=document.createElement("img");

            //講義課題1
            img.src="chipA.png";
            img.className="cell";
            img.id="cell"+i+j;
            img.onclick=clicked;
            td.appendChild(img);
        }
        b.appendChild(tr);
    }
}

// ゲームスタート関数
function rand_number_fnc(){
    if(start_var==false){
        start_var=true; //ゲームスタート可能に変更
        rand_number_var_1=Math.floor(Math.random()*9+1); //数字の内容指定
        rand_number_var_2=Math.floor(Math.random()*10); //数字の位置指定

        //test用
        console.log("rand_number_var_1="+rand_number_var_1); //test
        console.log("rand_number_var_2="+rand_number_var_2); //test
        console.log(""); //test
    }
}

// ゲームリセット関数
function rand_reset_fnc(){
    if(start_var==true){
        start_var=false; //ゲームスタート初期状態に変更

        check_var=false; //入力ブロックの重複の初期化
        rand_number_var_1=0; //数字内容の初期化
        rand_number_var_2=0; //数字位置の初期化
        count_var=0; //ブロックの入力回数の初期化
        point_var=[]; //ブロックの入力位置の初期化
        c=0; //入力ブロックを初期状態に変更

        value_var=""; //回答結果の初期化
        document.getElementById("number_check_id").innerHTML=""; //回答欄の初期化
        document.getElementById("count_id").innerHTML="";  //回答回数の初期化
        document.getElementById("result_id").innerHTML=""; //回答結果の初期化

        document.getElementById("board").innerHTML=""; //ボード全体の初期化
        init(); //関数の呼び出し

        //test用
        console.log(""); //test

    }
}

/// 講義資料の関数2
function clicked(e){
    if(start_var==true){ //ゲームスタート関数起動時
        for(c=0; c<point_var.length; c++){ //ブロックの重複確認
            check_var=false; //重複なし
            if(point_var[c]==e.target.id){
                check_var=true; //重複あり
                break;
            }
        }
        if(count_var<30 && check_var==false){ //ブロックの入力回数が30未満で,ブロックの重複がない時
            point_var[count_var]=e.target.id; //ブロックの入力位置取得
            count_var+=1; //ブロックの入力回数を1回増やす
            if(count_var==30){ //クリック回数の可視化
                document.getElementById("count_id").innerHTML=
                "現在のクリック回数は"+count_var+"回です<br>"+
                "これ以上入力できません";
            } else {
                document.getElementById("count_id").innerHTML=
                "現在のクリック回数は"+count_var+"回です<br>"+
                "あと"+(30-count_var)+"回入力可能です";
            }

        //表示する数字が「1」の時
        if(rand_number_var_1==1){
            if(e.target.id=="cell"+rand_number_var_2+rand_number_var_2||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+1)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+1)){
                e.target.src="chipD.png";
            } else {
                e.target.src="chipB.png";
            }
        }
        //表示する数字が「2」の時
        else if(rand_number_var_1==2) {
            if(e.target.id=="cell"+rand_number_var_2+rand_number_var_2||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+1)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+2)){
                e.target.src="chipD.png";
            } else {
                e.target.src="chipB.png";
            }
        }
        //表示する数字が「3」の時
        else if(rand_number_var_1==3){
            if(e.target.id=="cell"+rand_number_var_2+rand_number_var_2||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+1)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+2)){
                e.target.src="chipD.png";
            } else {
                e.target.src="chipB.png";
            }
        }
        //表示する数字が「4」の時
        else if(rand_number_var_1==4){
            if(e.target.id=="cell"+rand_number_var_2+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+1)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+1)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2+3)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2+4)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+5)+(rand_number_var_2+2)){
                e.target.src="chipD.png";
            } else {
                e.target.src="chipB.png";
            }
        }
        //表示する数字が「5」の時
        else if(rand_number_var_1==5){
            if(e.target.id=="cell"+rand_number_var_2+rand_number_var_2||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+1)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+2)){
                e.target.src="chipD.png";
            } else {
                e.target.src="chipB.png";
            }
        }
        //表示する数字が「6」の時
        else if(rand_number_var_1==6){
            if(e.target.id=="cell"+rand_number_var_2+rand_number_var_2||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+1)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+2)){
                e.target.src="chipD.png";
            } else {
                e.target.src="chipB.png";
            }
        }
        //表示する数字が「7」の時
        else if(rand_number_var_1==7){
            if(e.target.id=="cell"+rand_number_var_2+rand_number_var_2||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+1)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+1)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+2)){
                e.target.src="chipD.png";
            } else {
                e.target.src="chipB.png";
            }
        }
        //表示する数字が「8」の時
        else if(rand_number_var_1==8){
            if(e.target.id=="cell"+rand_number_var_2+rand_number_var_2||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+1)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+1)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+2)){
                e.target.src="chipD.png";
            } else {
                e.target.src="chipB.png";
            }
        }
        //表示する数字が「9」の時
        else if(rand_number_var_1==9){
            if(e.target.id=="cell"+rand_number_var_2+rand_number_var_2||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+1)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+1)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+2)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+3)+(rand_number_var_2+2)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+1)||
                e.target.id=="cell"+(rand_number_var_2+4)+(rand_number_var_2+2)){
                e.target.src="chipD.png";
            } else {
                e.target.src="chipB.png";
            }
        }

        //講義課題2
        //e.target.src="chipB.png";
        document.getElementById("info").textContent=e.target.id+"clicked";

        //test用 
        console.log("rand_number_var_1="+rand_number_var_1); //test
        console.log("rand_number_var_2="+rand_number_var_2); //test
        console.log("c="+c); //test
        console.log("point_var="+point_var); //test
        console.log("e.target.id="+e.target.id); //test
        console.log("count_var="+count_var); //test
        console.log(""); //test
        }
    }
}

// 回答確認関数
function ok_fnc(){
    value_var=document.getElementById("number_check_id").value; //回答結果を変数に代入
    if(value_var==rand_number_var_1){ //回答が答えと一緒であれば
        document.getElementById("result_id").innerHTML="おめでとう、正解です！！";
    } else { //回答が答えと異なれば
        document.getElementById("result_id").innerHTML="残念、不正解です..";
    }

    //test用 
    console.log("value_var="+value_var); //test
    console.log(""); //test
}
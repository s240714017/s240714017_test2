// 変数宣言,講義資料にて作成
let qno=1; //問題と解答の数の変化に対応する変数
let x=0; //ゲームでの回答に当たる数の変数
let a; //乱数に対応する変数

// 変数宣言,自作変数
let start_time_var; //STARTボタン入力時の時間計測に対応する変数
let ss_var; //STARTボタン入力時の秒数の計測に対応する変数
let timer_var=false; //タイマーの起動を切り替える変数
let count_time_var; //時間経過時の時間計測に対応する変数
let hc_var; //経過した時間数の計測を行う変数
let mc_var; //経過した分数の計測を行う変数
let sc_var; //経過した秒数の計測を行う変数
let game_score_var; //ゲームのスコア変数
let miss_count_var; //ゲームの間違った回数計測変数
let plus_score_var; //最終スコアの加点に用いる変数



// タイマースタート関数,自作関数
function timer_start_fnc(){
    start_time_var=new Date();
    ss_var=start_time_var.getSeconds();
    hc_var=0;
    mc_var=0;
    timer_var=true;
}

// タイマーの時間計測関数,自作関数
function timer_count_fnc(){
    if(timer_var==true){
        count_time_var=new Date();
        sc_var=count_time_var.getSeconds();
        if(sc_var>=ss_var){
            document.getElementById("timer_id").innerText=
            "現在の経過時間は"+hc_var+"時間"+mc_var+"分"+(Math.max(sc_var,ss_var)-Math.min(sc_var,ss_var))+"秒です";
            timer_change_fnc();
        } else {
            sc_var+=60;
            document.getElementById("timer_id").innerText=
            "現在の経過時間は"+hc_var+"時間"+mc_var+"分"+(Math.max(sc_var,ss_var)-Math.min(sc_var,ss_var))+"秒です";
            timer_change_fnc();
        }
    }
}

// タイマーの計測時間の変化対応関数,自作関数
function timer_change_fnc(){
    if((mc_var==59)&&((Math.max(sc_var,ss_var)-Math.min(sc_var,ss_var))==59)){
        hc_var+=1;
    }
    if((Math.max(sc_var,ss_var)-Math.min(sc_var,ss_var))==59){
        mc_var+=1;
        if(mc_var==60){
            mc_var=0;
        }
    }
}

//　配列関数,講義資料にて作成
function q(){
    let dgt=[1,2,3,4,5,6,7,8,9];
    a=Array(8); //変更,aを外で宣言した
    x=Math.floor(Math.random()*8);
    for(let i=0,j=0; i<9; i++){
        //以下四行,講義課題
        if(i!=x){
            j=dgt[i];
            a.push(j);
        }
    }
    //document.getElementById("question1").innerText=a.join(" ");
}

// STARTボタンと連動した関数,講義資料にて作成
function start(){
    //以下20行でスタート時の値の処理
    timer_start_fnc();
    setInterval(timer_count_fnc, 1000);
    q();
    shuffle(a);
    qno=1;
    a=0;
    game_score_var=5000;
    miss_count_var=0;
    plus_score_var=10;
    document.getElementById("ans_count_id").innerText
    ="現在の正答数は"+(qno-1)+"個です。";
    document.getElementById("miss_count_id").innerText
    ="現在の間違った回数は"+miss_count_var+"回です。";
    document.getElementById("game_score_id").innerText
    ="現在のゲームスコアは"+game_score_var+"です。";

    //test用
    console.log("qno="+qno); //test
    console.log("x="+x); //test
    console.log("start_ok"); //test
}

// RESETボタンと連動した関数,自作関数
function reset_fnc(){
    //以下20行で値のリセット処理
    x=0;
    start_time_var=0;
    ss_var=0;
    timer_var=false;
    count_time_var=0;
    hc_var=0;
    mc_var=0;
    sc_var=0;
    game_score_var=0;
    miss_count_var=0;
    plus_score_var=10;
    document.getElementById("timer_id").innerText="";
    document.getElementById("ans_count_id").innerText="";
    document.getElementById("game_score_id").innerText="";
    document.getElementById("time_score_id").innerText="";
    for(qno=1; qno<11; qno++){
        document.getElementById("ans"+qno).innerText="";
        document.getElementById("question"+qno).innerText="";
    }

    //test用
    qno=1; //test
    console.log("qno="+qno); //test
    console.log("reset_ok"); //test
}

// キーイベントに対応,講義資料にて作成
document.addEventListener('keydown', myhandler, false);

//数字の出力に対応した関数,講義資料にて作成
function myhandler(event){
    for(let i='1'; i<='9'; i++){
        if(event.key==i && qno!=11){ //「qno!=11」の追加,問題数の限界に対応
            document.getElementById("ans"+qno).innerText='['+i+']'; //追加,「+qno」で複数の問題にidを対応

            // 以下6行で間違った内容の判定と計測
            if(i != x+1){
                miss_count_var+=1;
                plus_score_var-=1;
                document.getElementById("miss_count_id").innerText
                ="現在の間違った回数は"+miss_count_var+"回です。"; //間違った回数の表示
            }
            if(i == x+1){
                qno++;
                q();

                shuffle(a);
                game_score_var+=1000;
                plus_score_var+=1;
                if(qno==11){ //以下12行で回答完了時の処理を記述
                    game_score_var-=(1000*miss_count_var); //ミスの数スコアの減点
                    game_score_var=(game_score_var/10)*plus_score_var; //最終スコアの加算
                    document.getElementById("ans_count_id").innerText
                    ="現在の正答数が「"+(qno-1)+"個」となったので、ゲームクリアです！"; //正答数の表示
                    document.getElementById("miss_count_id").innerText
                    ="現在の間違った回数が「"+miss_count_var+"回」でした..."; //間違った回数の表示
                    document.getElementById("game_score_id").innerText
                    ="現在のゲームスコアの結果は「"+game_score_var+"点」です！"; //ゲームスコアの表示
                    document.getElementById("time_score_id").innerText
                    ="現在のゲームクリアまでにかかった時間は「"+hc_var+"時間"+mc_var+"分"
                    +(Math.max(sc_var,ss_var)-Math.min(sc_var,ss_var))+"秒」です！"; //ゲームにかかった時間の表示
                } else { //以下8行で通常回答時の処理を記述
                    document.getElementById("ans_count_id").innerText
                    ="現在の正答数は"+(qno-1)+"個です。"; //正答数の表示
                    document.getElementById("miss_count_id").innerText
                    ="現在の間違った回数は"+miss_count_var+"回です。"; //間違った回数の表示
                    document.getElementById("game_score_id").innerText
                    ="現在のゲームスコアは"+game_score_var+"点です。"; //ゲームスコアの表示
                }

                //test用
                console.log("qno="+qno); //test
                console.log("game_score_var="+game_score_var); //test
                console.log("plus_score_var="+plus_score_var); //test
                console.log("x="+x); //test
                console.log(""); //test
            }
        }
    }
}

// 乱数の反映関数1,講義資料にて作成
Array.prototype.shuffle=function(){
    let i=this.length;
    while(i){
        let j=Math.floor(Math.random()*i);
        let t=this[--i];
        this[i]=this[j];
        this[j]=t;
    }
    return this;
}

// 乱数の反映関数2,講義資料にて作成
function shuffle(cards){
    cards.shuffle();
    if(qno!=11){ //条件追加,問題数の限界に対応
        document.getElementById("question"+qno).innerText=cards.join(" "); //追加,「+qno」で複数の問題にidを対応
    }
}
/// 講義資料の変数
let janken=["グー","チョキ","パー"];
let message;
let win=0;

// 自作追加変数
let rule1_mess; //ルール1の説明
let rule2_mess; //ルール2の説明

let check_init; //init関数の確認
let button_1; //ゲーム1のOKボタン
let button_2; //ゲーム2のOKボタン

let score; //ゲームスコア
let score_mess; //スコアメッセージ
let count; //ゲームカウント
let count_mess; //カウントメッセージ

let rand_check_var; //乱数のリセットボタン
let rand_message; //乱数の確率メッセージ

let gu_var; //グーの乱数
let ty_var; //チョキの乱数
let pa_var; //パーの乱数
let janken_sum; //じゃんけんの合計
let gu_parcent; //グーの確率
let ty_parcent; //チョキの確率
let pa_parcent; //パーの確率

let win_mess; //勝ち数のメッセージ
let judge_var; //ゲームの勝敗

// ルール1関数
function rule1_fnc(){
    //ルール1の表示
    rule1_mess=
    "ルール1:<br>"
    +"1.<button>ゲーム開始</button>のボタンをクリックする。<br><br>"
    +"2.<button>1.通常のゲーム開始</button>のボタンをクリックする。<br><br>"
    +"3.「グー」「チョキ」「パー」の項目から一つ選んでクリックする。<br><br>"
    +"4.表示されている<button>OK</button>のボタンをクリックする。<br><br>"
    +"5.結果が表示される。<br><br>"
    +"6.1~5の手順でゲーム実行完了。<br><br>"
    +"注意1:値のリセットを行う場合は<button>リセット</button>をクリック<br><br>"
    +"注意2:じゃんけんの勝敗とスコア変動は以下の通りである<br>"
    +"勝ち→+2000,負け→-500,あいこ→±0,クリア→100,000以上,ゲームオーバー→0以下";
    document.getElementById("rule_1").innerHTML=rule1_mess;

    //ルール2の非表示
    rule2_mess="";
    document.getElementById("rule_2").innerHTML=rule2_mess;
}

// ルール2関数
function rule2_fnc(){
    //ルール2の表示
    rule2_mess=
    "ルール2:<br>"
    +"1.<button>ゲーム開始</button>のボタンをクリックする。<br><br>"
    +"2.<button>2.乱数ありのゲーム開始</button>のボタンをクリックする。<br><br>"
    +"3.「グー」「チョキ」「パー」の項目から一つ選んでクリックする。<br><br>"
    +"4.表示されている<button>OK</button>のボタンをクリックする。<br><br>"
    +"5.結果が表示される。<br><br>"
    +"6.1~5の手順でゲーム実行完了。<br><br>"
    +"注意1:値のリセットを行う場合は<button>リセット</button>をクリック<br>"
    +"注意2:乱数のリセットを行う場合は<button>乱数のリセット</button>をクリック<br>"
    +"注意3:じゃんけんの勝敗とスコア変動は以下の通りである<br>"
    +"勝ち→+3000,負け→-5000,あいこ→±0,クリア→100,000以上,ゲームオーバー→0以下";
    document.getElementById("rule_2").innerHTML=rule2_mess;

    //ルール1の非表示
    rule1_mess="";
    document.getElementById("rule_1").innerHTML=rule1_mess;
}

// ゲーム開始ボタン関数
function init(){
    win=0;
    message="";
    document.getElementById("result").innerHTML=message;

    //追加処理
    check_init=1;
    button_1="";
    button_2="";

    score=10000;
    score_mess="現在のスコアは"+score+"です。<br>"
    document.getElementById("score_id").innerHTML=score_mess;

    count=0;
    count_mess="現在の回数は"+count+"です。<br>"
    document.getElementById("count_id").innerHTML=count_mess;

    console.log("init_OK"); //test
}

// ゲーム1関数
function game_choice_1(){
    //init関数起動時
    if(check_init==1){
    //ボタン1の処理
    button_1="OK";
    document.getElementById("button1_id").innerHTML=button_1;

    //ボタン2の処理の初期化
    button_2="";
    document.getElementById("button2_id").innerHTML=button_2;
    rand_check_var="";
    document.getElementById("rand_check_id").innerHTML=rand_check_var;
    
    //2つの表示結果の初期化
    message="";
    document.getElementById("result").innerHTML=message;
    rand_message="";
    document.getElementById("rand_id").innerHTML=rand_message;
    }
}

// ゲーム2関数
function game_choice_2(){
    //init関数起動時
    if(check_init==1){
    //ボタン2の処理
    button_2="OK";
    document.getElementById("button2_id").innerHTML=button_2;
    rand_check_var="乱数のリセット";
    document.getElementById("rand_check_id").innerHTML=rand_check_var;

    //ボタン1の処理の初期化
    button_1="";
    document.getElementById("button1_id").innerHTML=button_1;

    //グー,チョキ,パーの乱数処理
    gu_var=Math.floor(Math.random()*10);
    ty_var=Math.floor(Math.random()*10);
    pa_var=Math.floor(Math.random()*10);

    //グー,チョキ,パーの割合処理
    janken_sum= gu_var + ty_var + pa_var;
    gu_parcent= gu_var / janken_sum * 100;
    ty_parcent= ty_var / janken_sum * 100;
    pa_parcent= pa_var / janken_sum * 100;

    //グー,チョキ,パーの割合表示
    rand_message="コンピュータがグーを出す確率は,約"+gu_parcent+"%です。<br>";
    rand_message+="コンピュータがチョキを出す確率は,約"+ty_parcent+"%です。<br>";
    rand_message+="コンピュータがパーを出す確率は,約"+pa_parcent+"%です。<br>";
    document.getElementById("rand_id").innerHTML=rand_message;

    //表示結果の初期化
    message="";
    document.getElementById("result").innerHTML=message;
    }
}

// 乱数リセット関数
function rand_check(){
    //game_choice_2関数起動時
    if(button_2="OK"){
    //グー,チョキ,パーの乱数処理
    gu_var=Math.floor(Math.random()*10);
    ty_var=Math.floor(Math.random()*10);
    pa_var=Math.floor(Math.random()*10);

    //グー,チョキ,パーの割合処理
    janken_sum= gu_var + ty_var + pa_var;
    gu_parcent= gu_var / janken_sum * 100;
    ty_parcent= ty_var / janken_sum * 100;
    pa_parcent= pa_var / janken_sum * 100;

    //グー,チョキ,パーの割合表示
    rand_message="コンピュータがグーを出す確率は,約"+gu_parcent+"%です。<br>";
    rand_message+="コンピュータがチョキを出す確率は,約"+ty_parcent+"%です。<br>";
    rand_message+="コンピュータがパーを出す確率は,約"+pa_parcent+"%です。<br>";
    document.getElementById("rand_id").innerHTML=rand_message;

    //表示結果の初期化
    message="";
    document.getElementById("result").innerHTML=message;
    }
}

// ゲーム1の結果関数
function judge(){
    //game_choice_1関数起動時
    if(button_1=="OK"){
    
    /// 講義資料の処理
    let comp=Math.floor(Math.random()*3);
    let elements=document.getElementsByName('jk');
    for(let i=0; i<janken.length; i++)
        if(elements.item(i).checked) user=i;

    // ここに処理を足す
    var_1=""; //じゃんけん結果
    // じゃんけんの勝ち負け判定
    if(user==comp){
        var_1="あいこ";
        score_mess="現在のスコアは"+score+"です。<br>"
        document.getElementById("score_id").innerHTML=score_mess;
    } else if( (user==0&&comp==1) || (user==1&&comp==2) || (user==2&&comp==0) ){
        var_1="かち";
        score+=2000;
        score_mess="現在のスコアは"+score+"です。<br>"
        document.getElementById("score_id").innerHTML=score_mess;
        win+=1;
        win_mess="現在の勝ち回数は"+win+"です。<br>";
        document.getElementById("win_id").innerHTML=win_mess;
    } else {
        var_1="まけ";
        score-=500;
        score_mess="現在のスコアは"+score+"です。<br>"
        document.getElementById("score_id").innerHTML=score_mess;
    }
    
    //ユーザーのじゃんけんの手判定
    if(user==0){
        user="グー";
    } else if(user==1) {
        user="チョキ";
    } else {
        user="パー"
    }

    //敵のじゃんけんの手判定
    if(comp==0){
        comp="グー";
    } else if(comp==1) {
        comp="チョキ";
    } else {
        comp="パー"
    }

    /// 講義資料の処理
    message="あなたの手："+user+"<br>";
    message+="コンピュータの手："+comp+"<br>";
    message+="あなたの"+var_1+"です。<br>"; //追加
    document.getElementById("result").innerHTML=message;

    //回数の判定
    count+=1;
    count_mess="現在の回数は"+count+"です。<br>"
    document.getElementById("count_id").innerHTML=count_mess;

    //ゲームの勝ち負け判定
    if(100000<=score){
        judge_var=count+"回でゲームクリア！！";
        document.getElementById("gamejudge_id").innerHTML=judge_var;
        button_1="";
        document.getElementById("button1_id").innerHTML=button_1;
    } else if(score<=0) {
        judge_var="ゲームオーバー..";
        document.getElementById("gamejudge_id").innerHTML=judge_var;
        button_1="";
        document.getElementById("button1_id").innerHTML=button_1;
    }

    console.log("judge_OK"); //test
    console.log("user="+user); //test
    console.log("comp="+comp); //test
    console.log("var_1="+var_1); //test
    console.log(""); //test
    }
}

// ゲーム2の結果関数
function random_fnc(){
    //game_choice_2関数起動時
    if(button_2=="OK"){
    
    //敵のじゃんけんの手指定
    let rand_comp=Math.floor(Math.random()*(janken_sum));
    let comp=0;

    //敵のじゃんけんの割合指定
    if(rand_comp<=gu_var){
        comp=0;
    } else if(gu_var<rand_comp && rand_comp<=gu_var+ty_var) {
        comp=1;
    } else {
        comp=2;
    }
    let elements=document.getElementsByName('jk');
    for(let i=0; i<janken.length; i++)
        if(elements.item(i).checked) user=i;

    // ここに処理を足す
    var_1=""; //じゃんけん結果
    // じゃんけんの勝ち負け判定
    if(user==comp){
        var_1="あいこ";
        score_mess="現在のスコアは"+score+"です。<br>"
        document.getElementById("score_id").innerHTML=score_mess;
    } else if( (user==0&&comp==1) || (user==1&&comp==2) || (user==2&&comp==0) ){
        var_1="かち";
        score+=3000;
        score_mess="現在のスコアは"+score+"です。<br>"
        document.getElementById("score_id").innerHTML=score_mess;
        win+=1;
        win_mess="現在の勝ち回数は"+win+"です。<br>";
        document.getElementById("win_id").innerHTML=win_mess;
    } else {
        var_1="まけ";
        score-=5000;
        score_mess="現在のスコアは"+score+"です。<br>"
        document.getElementById("score_id").innerHTML=score_mess;
    }
    
    //ユーザーのじゃんけんの手判定
    if(user==0){
        user="グー";
    } else if(user==1) {
        user="チョキ";
    } else {
        user="パー"
    }

    //敵のじゃんけんの手判定
    if(comp==0){
        comp="グー";
    } else if(comp==1) {
        comp="チョキ";
    } else {
        comp="パー"
    }

    message="あなたの手："+user+"<br>";
    message+="コンピュータの手："+comp+"<br>";
    message+="あなたの"+var_1+"です。<br>";
    document.getElementById("result").innerHTML=message;

    //回数の判定
    count+=1;
    count_mess="現在の回数は"+count+"です。<br>"
    document.getElementById("count_id").innerHTML=count_mess;

    //ゲームの勝ち負け判定
    if(100000<=score){
        judge_var=count+"回でゲームクリア！！";
        document.getElementById("gamejudge_id").innerHTML=judge_var;
        button_2="";
        document.getElementById("button2_id").innerHTML=button_2;
    } else if(score<=0) {
        judge_var="ゲームオーバー..";
        document.getElementById("gamejudge_id").innerHTML=judge_var;
        button_2="";
        document.getElementById("button2_id").innerHTML=button_2;
    }

    console.log("rand_OK"); //test
    console.log("user="+user); //test
    console.log("rand_comp="+rand_comp); //test
    console.log("gu_var="+gu_var); //test
    console.log("ty_var="+ty_var); //test
    console.log("pa_var="+pa_var); //test
    console.log(""); //test
    }
}

// リセット関数
function reset_fnc(){
    //全体の値のリセット
    win=0;
    message="";
    check_init=0;
    button_1="";
    button_2="";
    document.getElementById("result").innerHTML=message;

    score_mess=""
    document.getElementById("score_id").innerHTML=score_mess;

    count_mess=""
    document.getElementById("count_id").innerHTML=count_mess;

    win_mess="";
    document.getElementById("win_id").innerHTML=win_mess;

    button_1="";
    document.getElementById("button1_id").innerHTML=button_1;

    button_2="";
    document.getElementById("button2_id").innerHTML=button_2;
    rand_check_var="";
    document.getElementById("rand_check_id").innerHTML=rand_check_var;

    message="";
    document.getElementById("result").innerHTML=message;
    rand_message="";
    document.getElementById("rand_id").innerHTML=rand_message;

    judge_var="";
    document.getElementById("gamejudge_id").innerHTML=judge_var;

    console.log("reset_OK"); //test
    console.log("win="+win); //test
    console.log("message="+message); //test
    console.log("check_init="+check_init); //test
    console.log("button_1="+button_1); //test
    console.log("button_2="+button_2); //test
    console.log("score_mess="+score_mess); //test
    console.log("count_mess="+count_mess); //test
    console.log("win_mess="+win_mess); //test
    console.log("rand_check_var="+rand_check_var); //test
    console.log("rand_message="+rand_message); //test
    console.log("judge_var="+judge_var); //test
    console.log(""); //test
}
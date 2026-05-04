// 変数設定
let r=0; //乱数
let level_var=0; //レベル
let reset_var=0; //リセット
let rule_var=0; //ルール
let count_var=0; //カウント
let result_var=[]; //失敗結果

// レベル1関数
function level1_func(){
  level_var=1;
  document.getElementById("level_id").innerHTML=level_var;
  reset_var="Level1未設定";
  document.getElementById("reset_id").innerHTML=reset_var;

  rule_var="";
  document.getElementById("rule_id").innerHTML="";
  count_var=0;
  result_var.length=0;
  console.log(result_var);
  document.getElementById("result").innerHTML="";
  document.getElementById("result_total").innerHTML="";
}

// レベル2関数
function level2_func(){
  level_var=2;
  document.getElementById("level_id").innerHTML=level_var;
  reset_var="Level2未設定";
  document.getElementById("reset_id").innerHTML=reset_var;

  rule_var="";
  document.getElementById("rule_id").innerHTML="";
  count_var=0;
  result_var.length=0;
  document.getElementById("result").innerHTML="";
  document.getElementById("result_total").innerHTML="";
}

// レベル3関数
function level3_func(){
  level_var=3;
  document.getElementById("level_id").innerHTML=level_var;
  reset_var="Level3未設定";
  document.getElementById("reset_id").innerHTML=reset_var;
  
  rule_var="";
  document.getElementById("rule_id").innerHTML="";
  count_var=0;
  result_var.length=0;
  document.getElementById("result").innerHTML="";
  document.getElementById("result_total").innerHTML="";
}

// リセット関数
function reset_func(){
  if(level_var==1){
    reset_var="Level1設定済み";
    document.getElementById("reset_id").innerHTML=reset_var;
    rule_var="1~5";
    document.getElementById("rule_id").innerHTML=rule_var;
    r=Math.floor(Math.random()*5)+1;
    console.log(r);
  } else if(level_var==2) {
    reset_var="Level2設定済み";
    document.getElementById("reset_id").innerHTML=reset_var;
    rule_var="1~50";
    document.getElementById("rule_id").innerHTML=rule_var;
    r=Math.floor(Math.random()*50)+1;
    console.log(r);
  } else if(level_var==3)  {
    reset_var="Level3設定済み";
    document.getElementById("reset_id").innerHTML=reset_var;
    rule_var="1~100";
    document.getElementById("rule_id").innerHTML=rule_var;
    r=Math.floor(Math.random()*100)+1;
    console.log(r);
  }
}

// 入力関数
function judge(){
  let a=document.getElementById("num").value;
  if(r==a) {
    document.getElementById("result").innerHTML=a+"が正解!!!<br><img src='test.jpg'>";
  } else {
    document.getElementById("result").innerHTML=a+"は不正解...";
    result_var[count_var]=a;
    document.getElementById("result_total").innerHTML="不正解となった数字を右に表示→["+result_var+"]";
    count_var+=1;
    console.log(count_var);
    console.log(result_var);
  }
}
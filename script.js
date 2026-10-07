const $=id=>document.getElementById(id);
let score=0,level=0,lives=3,time=60,timerId=null,answered=false;

const questions=[
 {topic:"Жазықтық",q:"A(2; −3) нүктесінің абсциссасы нешеге тең?",a:["−3","2","5","−5"],correct:1,ex:"Абсцисса — x координатасы."},
 {topic:"Жазықтық",q:"A(−2; 4) және B(3; 1). AB векторының координаталарын тап.",a:["(1; 5)","(5; −3)","(−5; 3)","(−1; −5)"],correct:1,ex:"AB = B − A = (3−(−2); 1−4) = (5; −3)."},
 {topic:"Вектор",q:"a⃗ = (3; 4) векторының ұзындығы?",a:["5","7","12","1"],correct:0,ex:"|a| = √(3²+4²) = 5."},
 {topic:"Вектор",q:"a⃗=(2;−1), b⃗=(−4;3). a⃗+b⃗ = ?",a:["(−2; 2)","(6; −4)","(2; 4)","(−6; 3)"],correct:0,ex:"Координаталарды сәйкесінше қосамыз: (2−4; −1+3)."},
 {topic:"Кеңістік",q:"C(−1; 2; 5) нүктесінің z координатасы?",a:["−1","2","5","6"],correct:2,ex:"Кеңістікте нүкте (x; y; z) түрінде беріледі."},
 {topic:"Кеңістік",q:"A(1;2;3), B(4;6;3). AB векторы?",a:["(3;4;0)","(5;8;6)","(−3;−4;0)","(3;4;6)"],correct:0,ex:"B−A = (4−1; 6−2; 3−3)."},
 {topic:"Кеңістік",q:"a⃗=(1;2;2) векторының ұзындығы?",a:["3","√7","5","√9"],correct:0,ex:"√(1²+2²+2²)=√9=3."},
 {topic:"Вектор",q:"a⃗=(2;3), b⃗=(4;−1). a⃗−b⃗ = ?",a:["(6;2)","(−2;4)","(2;−4)","(−6;−2)"],correct:1,ex:"(2−4; 3−(−1)) = (−2; 4)."},
 {topic:"Жазықтық",q:"O(0;0) мен P(6;8) арасындағы қашықтық?",a:["10","14","2","48"],correct:0,ex:"d=√(6²+8²)=10."},
 {topic:"Қорытынды",q:"Егер a⃗=(x;y) және b⃗=(2x;2y) болса, b⃗ қандай вектор?",a:["a⃗-ға перпендикуляр","a⃗-ға қарама-қарсы","a⃗-мен бағыттас, 2 есе ұзын","нөлдік"],correct:2,ex:"b⃗=2a⃗, сондықтан бағыттары бірдей, ұзындығы 2 есе үлкен."}
];

function start(){
 score=0;level=0;lives=3;time=60;answered=false;
 $("intro").classList.add("hidden");$("result").classList.add("hidden");$("game").classList.remove("hidden");
 $("score").textContent=score;$("lives").textContent="❤️❤️❤️";
 clearInterval(timerId);timerId=setInterval(()=>{time--; $("timer").textContent=time;if(time<=0) finish(false)},1000);
 render();
}
function render(){
 answered=false;$("feedback").textContent="";$("feedback").className="";
 const q=questions[level];$("level").textContent=`${level+1}/${questions.length}`;$("topicBadge").textContent=q.topic;
 $("question").textContent=q.q;$("progressBar").style.width=`${(level+1)/questions.length*100}%`;
 $("nextBtn").classList.add("hidden");$("answers").innerHTML="";
 q.a.forEach((x,i)=>{const b=document.createElement("button");b.className="answer";b.textContent=x;b.onclick=()=>choose(i,b);$("answers").appendChild(b)});
 drawVisual(level);
}
function choose(i,btn){
 if(answered)return;answered=true;const q=questions[level];
 [...$("answers").children].forEach((b,k)=>{b.disabled=true;if(k===q.correct)b.classList.add("correct")});
 if(i===q.correct){score+=100+Math.max(0,time-45)*2;$("score").textContent=score;$("feedback").textContent="Дұрыс! +ұпай";$("feedback").className="good"}
 else{btn.classList.add("wrong");lives--; $("lives").textContent="❤️".repeat(lives)+"🖤".repeat(3-lives);$("feedback").textContent="Қате. "+q.ex;$("feedback").className="bad"}
 $("nextBtn").textContent=level===questions.length-1?"Нәтижені көру →":"Келесі →";$("nextBtn").classList.remove("hidden");
}
$("nextBtn").onclick=()=>{if(lives<=0){finish(false);return}if(level===questions.length-1)finish(true);else{level++;render()}};
function finish(win){
 clearInterval(timerId);$("game").classList.add("hidden");$("result").classList.remove("hidden");
 $("resultTitle").textContent=win&&lives>0?"Квест аяқталды!":"Ойын аяқталды";
 $("resultText").textContent=`Сенің нәтижең: ${score} ұпай. ${win&&lives>0?"Барлық деңгейден өттің!":"Келесі жолы тағы байқап көр!"}`;
}
function drawVisual(n){
 const v=$("visual");v.innerHTML="";
 if([0,1,3,7,8].includes(n)){
  const c=document.createElement("div");c.className="coord";c.innerHTML='<div class="axis-x"></div><div class="axis-y"></div>';
  if(n===0||n===8){const d=document.createElement("div");d.className="dot";d.style.left=n===0?"67%":"80%";d.style.top=n===0?"36%":"30%";c.appendChild(d)}
  if([1,3,7].includes(n)){const line=document.createElement("div");line.className="vector";line.style.left="50%";line.style.top="50%";line.style.width=n===1?"120px":"90px";line.style.transform=`rotate(${n===1?-31:n===3?-18:25}deg)`;c.appendChild(line)}
  v.appendChild(c);
 }else{v.innerHTML='<div class="cube">🧊</div>'}
}
$("startBtn").onclick=start;$("restartBtn").onclick=start;

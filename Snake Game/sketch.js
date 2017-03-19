var txt=document.getElementById("txt");
var hi=document.getElementById("high");
var win=document.getElementById("win");
var eaten=0;
var s;
var scl = 20;
var food;
var alive;
var rare;
var sth;
var autotrig=false;
var theLevel=1;
var CanvH,CanvW;
var autoarrx=[];
var autoarry=[];
var learnx=[];
var learny=[];
var txtfile;
var trigtime=0;


var levels=document.getElementById('level');
levels.src="badge_1.png"
var through=1;

$("#auto").on('click',function(){
  autotrig=!autotrig;
});

$("#level").on('click',function(){
  if (levels.src.slice(-11)==="badge_1.png"){
    levels.src="badge_2.png"
    frameRate(20);
    through=0;
    theLevel=2;
  }else if(levels.src.slice(-11)==="badge_2.png"){
    levels.src="badge_3.png"
    frameRate(25);
    through=0;
    theLevel=3;
  }else if(levels.src.slice(-11)==="badge_3.png"){
    levels.src="badge_1.png"
    frameRate(15);
    through=1;
    theLevel=1;
  }
});

$("#res").on('click',function(){
  s.death(1);
})

if (window.localStorage.hscore===undefined){
    window.localStorage.hscore=0;
   // window.localStorage.plays=0;
    //window.localStorage.history=0;
  }
  
hi.textContent="High Score: " + window.localStorage.hscore;



function setup() {
  txtfile=loadStrings('http://mixance.com/snake/high.txt');
  for (var i = 0; i < txtfile.length; i++) {
    (i%2===0) ? learnx.push(txtfile[i]) : learny.push(txtfile[i]);
  }
  CanvW=1360;
  CanvH=480;
  createCanvas(CanvW,CanvH);
  $("body").append("<hr>")
  s = new Snake();
  frameRate(15);
  pickLocation();
}

function pickLocation(flag) {
  if (flag!==undefined){
    rare = createVector(CanvW+flag,(CanvH-scl*3));
    rare.mult(scl);
    eaten=5;
  }
  var cols = floor(width/scl);
  var rows = floor(height/scl);

  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);

  while(!tailPlace(food)){
    food = createVector(floor(random(cols)), floor(random(rows)));
    food.mult(scl);
  }

  rare = createVector(floor(random(cols)), floor(random(rows)));
  rare.mult(scl);
  while(!tailPlace(rare)){
    rare = createVector(floor(random(cols)), floor(random(rows)));
    rare.mult(scl);
  }
}

// function mousePressed() {
//   s.total++;
// }

function draw() {
  autoarrx.push(s.x);
  autoarry.push(s.y);
  auto();
  background(0, 0, 0,100); 

  if (s.eat(food)) {
    eaten++;
    pickLocation();
  }
  if (s.eatRare(rare)) {
    pickLocation();
  }

  s.death();
  s.update();
  s.show();


  fill(255, 0, 100);
  rect(food.x, food.y, scl, scl);

  if (eaten>4){
    alive=1;

    fill(30, 61, 216);
    rect(rare.x,rare.y,scl,scl);
    setTimeout(function(){
      alive=0;
      eaten=0;
    },7000)
  };
}

function score(high){
  sth=high+bonus;
  txt.textContent="Score: " + sth;
}


// p5
function keyPressed() {
  if (keyCode === UP_ARROW && s.yspeed!==1) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && s.yspeed!==-1) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW && s.xspeed!==-1) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW && s.xspeed!==1) {
    s.dir(-1, 0);
  }
}

function auto (foodis){
  if (foodis===undefined){
    (alive===1) ? foodis=rare : foodis=food;
  };
  if (autotrig){
  if ((foodis.x-s.x)>0){
    if ((foodis.x-s.x)<scl){
      autoDrive("down");
    }
    if ((foodis.x-s.x)!==0){
      autoDrive("right");
    };
  }else if ((foodis.x-s.x)<0){
    if ((foodis.x-s.x)>-scl){
      autoDrive("up");
    }
    if ((foodis.x-s.x)!==0){
      autoDrive("left");
    };
  }else if ((foodis.x-s.x)===0){
    if ((foodis.y-s.y)<0){
      autoDrive("down");
    }else if ((foodis.y-s.y)>0){
      autoDrive("up");
    }
  }
}
}

// if (trigtime===1){
// 		var t=setTimeout(function(){
// 			if (trigtime>10){
// 				s.death(1);
// 				trigtime=0;
// 			}
// 		},5000)
// 	}

function autoDrive(dist,flag){
    // for ( var i = 0; i < s.tail.length; i ++){
    //   var avg = (s.tail[i].x / s.tail.length) * s.tail.length
    // }
    // if (s.tail.length>11){
    //   if (avg-s.tail[s.tail.length-2].x<40){
    //     avg>CanvW ? s.dir(-1, 0) : s.dir(1, 0);
    //   }
    // }
    // if (flag!==undefined){
    // 	trigtime++;
    // }
  if (dist==="right" && tailPlace(createVector(s.x+scl,s.y)) && s.xspeed!==-1){
    s.dir(1, 0);
  }else if (dist==="up" && tailPlace(createVector(s.x,s.y+scl)) && s.yspeed!==-1){
    s.dir(0, 1);
  }else if (dist==="left" && tailPlace(createVector(s.x-scl,s.y)) && s.xspeed!==1){
    s.dir(-1, 0);
  }else if (dist==="down" && tailPlace(createVector(s.x,s.y-scl)) && s.yspeed!==1){
    s.dir(0, -1);
  }else{
    console.log(dist,s.x);
    if (dist==="right") {autoDrive("up","up");};
    if (dist==="left") {autoDrive("down","down");};
    if (dist==="up") {autoDrive("left","left");};
    if (dist==="down") {autoDrive("right","right");};
  }
}

function highscore(){
  window.localStorage.plays+=1;
  if (sth>window.localStorage.hscore){
    window.localStorage.hscore=sth;
    win.play();
    hi.textContent="High Score: " + window.localStorage.hscore;
  }
  //window.localStorage.history["win "+window.localStorage.plays]=(autoarr);
}
//jquery-touchSwipe
$('body').swipe( {
  swipeUp:function(event, direction, distance, duration) {
    s.dir(0, -1);
  },
  swipeDown:function(event, direction, distance, duration) {
    s.dir(0, 1);
  },
  swipeRight:function(event, direction, distance, duration) {
    s.dir(1, 0);
  },
  swipeLeft:function(event, direction, distance, duration) {
    s.dir(-1, 0);
  },
  click:function(event, target) { 
  },
  threshold:100,
  allowPageScroll:"vertical"
});
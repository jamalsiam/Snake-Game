var once=0;
var bonus=0;
//constructor
var audio=document.getElementById("audio");
var die=document.getElementById("die");
function Snake() {
  this.x = 0;
  this.y = 0;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.eat = function(pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      audio.play();
      this.total++;
      bonus+=theLevel-1;
      return true;
    } else {
      return false;
    }
  }


  this.eatRare = function(posi) {
    if (alive===1){
    var d = dist(this.x, this.y, posi.x, posi.y);
    if (d < 1) {
      alive=0;
      eaten=0;
      audio.play();
      this.total++;
      bonus+=theLevel*5;
      return true;
    } else {
      return false;
    }
  }
  }


  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }



  this.death = function(dea) {
    score(this.total);
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1 || dea!==undefined) {
        if ((!(autotrig && (s.x<scl||s.y<scl||s.x>(CanvW-scl*2)||s.y>(CanvH-scl*2)))) || dea!==undefined){
        if (sth<window.localStorage.hscore){
          die.play();
          txtfile.push(autoarrx.join(" "));
          txtfile.push(autoarry.join(" "));
          //save(txtfile, "http://mixance.com/snake/high.txt");
        }
        highscore();
        console.log('starting over');
        bonus=0;
        eaten=0;
        this.total = 0;
        this.tail = [];
        }
      }
    }
  }

  this.update = function() {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;

    if (through===1){
    if (this.x===width) {
     this.x=-scl;
    }
    else if ( this.x===-scl) {
     this.x=width;
    }
    if ( this.y===-scl) {
     this.y=height;
    }
    else if (this.y===height) {
     this.y=-scl
    }
if (once===0){
 once=1;
    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
     }
   }else{
    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
   }
  }


  
  this.show = function() {
    if (this.x===CanvW || this.y ===CanvH){
    this.x = constrain(this.x, 0, width - scl);
    this.y = constrain(this.y, 0, height - scl);
    }

    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);

  }
}

var tailPlace = function(foods) {
    for (var i = 0; i < s.tail.length; i++) {
      var pos = s.tail[i];
      var d = dist(foods.x, foods.y, pos.x, pos.y);
      if (d < 1) {
        return false;
      }
    }
    return true;
  }

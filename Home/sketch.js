let arrows=["→","ᐵ","►","↠","↝","↣","↦","↪","↬","⇀","⇉","⇛","⇝","⇢","⇨","➔","➙","➜","➟","➠","➢","➤","➥","➧","➩","➳","➾"];
let x = 1;
let y = 1;
let easing = 0.05;
let moverArr = [];

class mover{
    constructor(x,y,s,f, fontSize){
        this.pos = createVector(x,y);
        this.vel = createVector(0,0);
        this.acc = createVector(0,0);
        this.maxSpeed = s;
        this.maxForce = f;
        this.r = 16;
        this.rotateVal = random(0,360);
        this.fontSize = fontSize;
    }
    evade(mover){
        let pursuit = this.pursue(mover);
        pursuit.mult(-1);
        return pursuit;
    }
    pursue(mover){
        let target = mover.pos.copy();
        let prediction = mover.vel.copy();
        prediction.mult(10);
        target.add(prediction);
        fill(0,255,0);
        circle(target.x, target.y, 16);
        return this.seek(target);
    }

    arrive(target){
        return this.seek(target, true);
    }
    flee(target){
        return this.seek(target).mult(-1);
    }

    seek(target, arrival = false){
        let force = p5.Vector.sub(target, this.pos);
        let desiredSpeed = this.maxSpeed;
        if(arrival){
            let slowRadius = 100;
            let distance = force.mag();
                if(distance < slowRadius){
                    desiredSpeed = map(distance, 0, slowRadius, 0, this.maxSpeed);
                }
        }
        force.setMag(desiredSpeed);
        force.sub(this.vel);
        force.limit(this.maxForce);
        return force;
    }
    applyForce(force){
        this.acc.add(force);
    }
    update(){
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.set(0,0);
    }
    show(i){
        stroke(0);
        strokeWeight(5);
        fill(255);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        // console.log(i+": "+ this.vel.heading());
        // rotate(this.vel.heading()*this.rotateVal);
        textSize(this.fontSize);

        text(arrows[i],this.r-this.fontSize,this.fontSize/3);

        // triangle(-this.r, -this.r / 2, -this.r, this.r / 2, this.r, 0);
        pop();
    }
    // edges() {
    //     if (this.pos.x > width + this.r) {
    //       this.pos.x = -this.r;
    //     } else if (this.pos.x < -this.r) {
    //       this.pos.x = width + this.r;
    //     }
    //     if (this.pos.y > height + this.r) {
    //       this.pos.y = -this.r;
    //     } else if (this.pos.y < -this.r) {
    //       this.pos.y = height + this.r;
    //     }
    //   }
}

class Target extends mover {
    constructor(x, y) {
      super(x, y);
      this.vel = p5.Vector.random2D();
      this.vel.mult(5);
    }
  
    show() {
      stroke(255);
      strokeWeight(2);
      fill(255);
      push();
      translate(this.pos.x, this.pos.y);
      circle(0, 0, this.r * 2);
      pop();
    }
  }
  let fontSize;
  function setup() {
    createCanvas(windowWidth, windowHeight);
    for(let i = 0; i<arrows.length; i++){
        fontSize = random(20,400);
        let s = random(1,10);
        let f = random(0,1);
        moverArr[i] = new mover(windowWidth,windowHeight,s,f, fontSize);
    }
    // mover = new mover(100,100);
  }

  function draw() {
    background(0);
    
    let target = createVector(mouseX, mouseY);

    let steering; 

    for(let i =0; i<moverArr.length; i++){
        steering = moverArr[i].arrive(target);
        moverArr[i].applyForce(steering);
        moverArr[i].update();
        moverArr[i].show(i);
    }
    fill(0, 159);
  }

var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites;
    Common = Matter.Common,
    Svg = Matter.Svg,
    Vertices = Matter.Vertices,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Body = Matter.Body;

Matter.use('matter-dom-plugin');

var engine = Engine.create();   
    world = engine.world;

let width = $(window).width();
let height = $(window).height();
let vmin = Math.min(width, height);
function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
var styleElem = document.head.appendChild(document.createElement("style"));

$(document).mousemove(function (event) {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    mouseXpercentage = Math.round(255/windowWidth*event.pageX);
    mouseYpercentage = Math.round(255/windowHeight*event.pageY);
    contrastX = 255-mouseXpercentage;
    contrastY = 255-mouseYpercentage;
    bodyBackground = 'rgb('+contrastX+',170,'+contrastY+')'
    bodyBackground2 = 'rgb('+contrastX+',150,'+contrastY+')';

    $('.box-container2').css('background', 'linear-gradient(65deg,'+bodyBackground2+','+bodyBackground);
    $('body').css('background', bodyBackground2);
    var tail = document.querySelector('.box-container2');
    tail.style.setProperty('--pseudo-background', bodyBackground2);
});

var matterCanvas=document.querySelector('#mattercanvas');
var render = Render.create({
    element: document.body,
    canvas:matterCanvas,
    engine: engine,
    options: {
        width: width/2,
        height: height,
        showVelocity: false,
        showAngleIndicator: false,
        wireframes: false,
        background: "transparent",
        hasBounds: true,
        enabled:true,
        wireframe:true,
        showBounds:true
    }
});


let bodies = [];

var floor = Bodies.rectangle(
    width / 2, height+50, width, 100, 
    { isStatic: true,
        render: {fillStyle: "red"} 
    });
var ceiling = Bodies.rectangle(
    width / 2, -50, width, 100, 
    { isStatic: true,
        render: {fillStyle: "blue"} 
    });
var rightWall = Bodies.rectangle(
    -50, height / 2, 100, height, 
    { isStatic: true,
        render: {fillStyle: "orange"} 
    });
var leftWall = Bodies.rectangle(
    width/2 + 50, height / 2, 100, height, 
    { isStatic: true,
        render: {fillStyle: "pruple"} 
    });

ceiling.render.visible = false;
//floor.render.visible = false;
rightWall.render.visible = false;
leftWall.render.visible = false;
bodies.push(ceiling); bodies.push(floor); bodies.push(rightWall); bodies.push(leftWall);

var bodiesDom = document.querySelectorAll('.curve');
//console.log(bodiesDom)
for (var i = 0, l = bodiesDom.length; i < l; i++) {
    var body = Bodies.rectangle(
        getRandomInt(bodiesDom[i].clientWidth/2,width/2-bodiesDom[i].clientWidth/2),
        getRandomInt(bodiesDom[i].clientHeight/2,height-bodiesDom[i].clientHeight/2), 
        bodiesDom[i].clientWidth, 
        bodiesDom[i].clientHeight,
        { render: {visible: false}}
        );
        bodiesDom[i].id = body.id;
        bodies.push(body);
    }
    
window.requestAnimationFrame(update);
function update() {
    for (var i = 0, l = bodiesDom.length; i < l; i++) {
        var bodyDom = bodiesDom[i];
        var body = null;
        for (var j = 0, k = bodies.length; j < k; j++) {
            if ( bodies[j].id == bodyDom.id ) {
                body = bodies[j];
                break;
            }
        }
            
        if ( body === null ) continue;
        bodyDom.style.transform = "translate( " 
                + body.vertices[0].x
                + "px, "
                + body.vertices[0].y
                + "px )";
            bodyDom.style.transform += "rotate( " + body.angle + "deg )";
        }
        window.requestAnimationFrame(update);
    }

Composite.add(world, bodies);

var mouse = Mouse.create(render.canvas) ,
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });  

Composite.add(world, mouseConstraint);
render.mouse = mouse;

Matter.Events.on(mouseConstraint, 'mousemove', function (event) {
  for (var i = 0, l = bodiesDom.length; i < l; i++) {
    var bodyDom = bodiesDom[i];
    var body = null;
    for (var j = 0, k = bodies.length; j < k; j++) {
        if ( bodies[j].id == bodyDom.id ) {
            body = bodies[j];
            var tooltip=document.getElementsByClassName("tooltip");
            if(bodies[j].vertices[0].x<mouse.position.x && mouse.position.x<bodies[j].vertices[1].x && bodies[j].vertices[0].y<mouse.position.y && mouse.position.y<bodies[j].vertices[2].y){
                tooltip[j-4].removeAttribute('style');   
                tooltip[j-4].setAttribute('style','true');
                tooltip[j-4].style.transform = "translate( " 
                + (mouse.position.x-tooltip[j-4].clientWidth/2)
                + "px, "
                + (mouse.position.y-tooltip[j-4].clientHeight*1.2)
                + "px )";
                render.canvas.style.cursor="pointer";
            }else{
                render.canvas.style.cursor="default";          
                tooltip[j-4].style.visibility = "hidden";
            }
        }
    }
}
});

Matter.Events.on(mouseConstraint, "mousedown", function(eve){
    for (var i = 0, l = bodiesDom.length; i < l; i++) {
        var bodyDom = bodiesDom[i];
        var body = null;
        for (var j = 0, k = bodies.length; j < k; j++) {
            if ( bodies[j].id == bodyDom.id ) {
                body = bodies[j];
                if(bodies[j].vertices[0].x<mouse.position.x && mouse.position.x<bodies[j].vertices[1].x && bodies[j].vertices[0].y<mouse.position.y && mouse.position.y<bodies[j].vertices[2].y){
                    if(j == 4){
                        console.log(bodies[j]);
                        window.open("https://www.minyoungbang.com/works/#AR-VR","_self")
                    }else if(j == 5){
                        console.log(bodies[j].id);
                        window.open("https://www.minyoungbang.com/works/#UX","_self")
                    }else if(j == 6){
                        console.log(bodies[j].id);
                        window.open("https://www.minyoungbang.com/works/#Motion","_self")
                    }
                }
            }
        }
    }
});

Render.run(render);
var runner = Runner.create();
Runner.run(runner, engine);

//gravity
let intervalID;
function changeGravity() {
  if (!intervalID) {
    intervalID = setInterval(setGravity, 3000);
  }
}

let intervalNumber = 1;
function setGravity() {
  if (intervalNumber === 1) {
    //console.log("interval " + intervalNumber + ", down");
    world.gravity.y = 0.5;
    world.gravity.x = 0;
    intervalNumber += 1;
  } else if (intervalNumber === 2) {
    //console.log("interval " + intervalNumber + ", up");
    world.gravity.y = -0.5;
    world.gravity.x = 0;
    intervalNumber += 1;
  } else if (intervalNumber === 3) {
    //console.log("interval " + intervalNumber + ", right");
    world.gravity.x = 0.5;
    world.gravity.y = 0;
    intervalNumber += 1;
  } else {
    //console.log("interval " + intervalNumber + ", left");
    world.gravity.x = -0.5;
    world.gravity.y = 0;
    intervalNumber = 1;
  }
}

changeGravity();


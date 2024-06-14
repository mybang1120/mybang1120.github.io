// module aliases
var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites;
    Common = Matter.Common,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Body = Matter.Body;


// create an engine
var engine = Engine.create();   
    world = engine.world;

function percentX(percent) {
        return Math.round((percent / 100) * window.innerWidth);
    }
function percentY(percent) {
        return Math.round((percent / 100) * window.innerHeight);
    }

let width = $(window).width();
let height = $(window).height();
let vmin = Math.min(width, height);
function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

mouseXPos=[];
mouseYPos=[];
$(document).mousemove(function (event) {
    windowWidth = $(window).width();
    windowHeight = $(window).height();
    mouseXpercentage = Math.round(255/windowWidth*event.pageX);
    mouseYpercentage = Math.round(255/windowHeight*event.pageY);
    contrastX = 255-mouseXpercentage;
    contrastY = 255-mouseYpercentage;
    mouseXPos.push(event.pageX);
    mouseYPos.push(event.pageY);
    //console.log(mouseXPos);
    bodyBackground = 'rgba('+contrastX+',150,'+contrastY+',0)'
    bodyBackground2 = 'rgb('+contrastX+',150,'+contrastY+')'

   // $('.radial-gradient').css('left', event.pageX+'px');
    //$('.radial-gradient').css('top', event.pageY+'px');
       // $('.radial-gradient').css('width', 600+'px');
   // $('.radial-gradient').css('background', 'radial-gradient(rgb('+mouseXpercentage+','+mouseYpercentage+', 255) 15%,'+bodyBackground+' 50%');
    $('body').css('background', bodyBackground2);
        
        //if()

});
     

var render = Render.create({
    element: document.body,
    engine: engine,
    options: {
        width: width,
        height: height,
        showVelocity: false,
        showAngleIndicator: false,
        wireframes: false,
        background: "transparent"
    }
});

console.log(" width: "+window.innerWidth+" | height: "+window.innerHeight);
console.log(" percentX: "+percentX(0)+" | percentY: "+percentY(100))

let bodies = [];

world.gravity.y = 0.02;
world.gravity.x = -0.01;

var ceiling = Bodies.rectangle(width / 2, height + 50, width, 100, { isStatic: true,render: {
    fillStyle: "green"
  } });
var floor = Bodies.rectangle(width / 2, -50, width, 100, { isStatic: true,render: {
    fillStyle: "blue"
  } });
var rightWall = Bodies.rectangle(-50, height / 2, 100, height, { isStatic: true,render: {
    fillStyle: "orange"
  } });
var leftWall = Bodies.rectangle(width + 50, height / 2, 100, height, { isStatic: true,render: {
    fillStyle: "pruple"
  } });
var UX = Bodies.rectangle(width-250, 0, 500, 144, {chamfer: {radius: 2}, render: { sprite: { texture: 'UXtag.png', xScale: 0.25, yScale: 0.25 }}});
var PD = Bodies.rectangle(width-350, height-350, 700, 144, {chamfer: {radius: 2}, render: { sprite: { texture: 'PDtag.png', xScale: 0.35, yScale: 0.35 }}});
var Interaction = Bodies.rectangle(200, height-300, 500, 144, {chamfer: {radius: 2}, render: { sprite: { texture: 'Interactiontag.png', xScale: 0.25, yScale: 0.25 }}});
var Motion = Bodies.rectangle(width/2, 0, 500, 144, {chamfer: {radius: 2}, friction:1, render: { sprite: { texture: 'Motiontag.png', xScale: 0.25, yScale: 0.25 }}})


//ceiling.render.visible = false;
//floor.render.visible = false;
//rightWall.render.visible = false;
//leftWall.render.visible = false;
for(let i = 0; i<10; i++){
    let smallRecs = Bodies.rectangle(Common.random(500,width-500), height/2, Common.random(50,100),Common.random(5,10), {render: {
        fillStyle: "rgb(255,150,200)",
        strokeStyle:'black',
        lineWidth:2
      } });
     /*  let smallCircles = Bodies.circle(Common.random(500,width-500), height/2, Common.random(5,20), {render: {
        fillStyle: "rgb(255,150,200)",
        strokeStyle:'black',
        lineWidth:2
      } }); */
      bodies.push(smallRecs);
      //bodies.push(smallCircles);
}
bodies.push(ceiling);
bodies.push(floor);
bodies.push(rightWall);
bodies.push(leftWall);
bodies.push(UX);bodies.push(PD);bodies.push(Interaction);bodies.push(Motion);

Composite.add(world, bodies);


var stack = Composites.stack(0, 0, 5, 1, 0, 0, function(x, y) {
    switch(Math.round(Common.random(0,1))){
        
        case 0:
            if (Common.random() < 0.5) {
                return Bodies.rectangle(x, y, Common.random(50, 350), Common.random(10, 600),{
                    chamfer:{radius:[Common.random(0, 25),Common.random(0, 50),Common.random(0, 100),Common.random(0, 20)]},
                    render:{
                        fillStyle: "green",
                        //strokeStyle:'black',
                        //lineWidth:2
                    }}
                    );
            } else {
                return Bodies.rectangle(x, y, Common.random(150, 200), Common.random(300, 600),{
                    chamfer:{radius:[Common.random(0, 5),Common.random(0, 25),Common.random(0, 150),Common.random(0, 20)]},
                    render:{
                        fillStyle: "red",
                        //strokeStyle:'black',
                        //lineWidth:2
                    }
                });
            }
        case 1:
            return Bodies.polygon(x, y, Math.round(Common.random(3, 8)), Common.random(80, 550),{
                    chamfer:{radius:[Common.random(0, 80),Common.random(0, 50),Common.random(0, 10),Common.random(0, 50)]},
                    render:{
                        fillStyle: "rgb(100,0,255)",
                        //strokeStyle:'black',
                        //lineWidth:2
                    }
                });
        }
    });

Composite.add(world, stack);
var mouse = Mouse.create(render.canvas)/* ,
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
render.mouse = mouse; */
/* Render.lookAt(render, {
    min: { x: 0, y: -4000 },
    max: { x: 3000, y: 4000 }
}); */
var bodyM = Bodies.circle(0, 0, 30, { isStatic: true });

Matter.Events.on(engine, 'afterUpdate', function() {
		if (!mouse.position.x) {
			return;
		}

		Body.setVelocity(bodyM, {
			x: bodyM.position.x - mouse.position.x,
			y: bodyM.position.y - mouse.position.y
		})

		Body.setPosition(bodyM, {
			x: mouse.position.x,
			y: mouse.position.y
		});
	});
    bodyM.render.visible = false;
	Composite.add(world, bodyM);

//Matter.Events.on(mouseConstraint, 'mousemove', function (event) {
   //For Matter.Query.point pass "array of bodies" and "mouse position"
        //console.log(event.mouse.position)
  // var foundPhysics = Matter.Query.point(bodies, event.mouse.position);

  //Your custom code here
  //console.log(foundPhysics[0]); //returns a shape corrisponding to the mouse position

//});
// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

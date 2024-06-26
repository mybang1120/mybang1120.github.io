var vector = new Two.Vector();
var entities = [];
var mouse;
var copy = [
  "Idea",
  "Tech",
  "Concept",
  "Business",
  "Design",
  "MVP"
];

var two = new Two({
  type: Two.Types.canvas,
  fullscreen: true,
  autostart: true
}).appendTo(document.body);

var solver = Matter.Engine.create();
solver.world.gravity.y = 1;

var bounds = {
  length: 5000,
  thickness: 50,
  properties: {
    isStatic: true
  }
};

// bounds.top = createBoundary(bounds.length, bounds.thickness);
bounds.left = createBoundary(bounds.thickness, bounds.length);
bounds.right = createBoundary(bounds.thickness, bounds.length);
bounds.bottom = createBoundary(bounds.length, bounds.thickness);

Matter.World.add(solver.world, [
  /*bounds.top.entity,*/ bounds.left.entity,
  bounds.right.entity,
  bounds.bottom.entity
]);

var defaultStyles = {
  size: two.width * 0.08,
  weight: 400,
  fill: "white",
  leading: two.width * 0.08 * 0.8,
  family: "Angus, Arial, sans-serif",
  alignment: "center",
  baseline: "baseline",
  margin: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
};

addSlogan();
resize();
mouse = addMouseInteraction();
two.bind("resize", resize).bind("update", update);

function addMouseInteraction() {
  // add mouse control
  var mouse = Matter.Mouse.create(document.body);
  var mouseConstraint = Matter.MouseConstraint.create(solver, {
    mouse: mouse,
    constraint: {
      stiffness: 0.2
    }
  });

  Matter.World.add(solver.world, mouseConstraint);

  return mouseConstraint;
}

function resize() {
  var length = bounds.length;
  var thickness = bounds.thickness;

  // vector.x = two.width / 2;
  // vector.y = - thickness / 2;
  // Matter.Body.setPosition(bounds.top.entity, vector);

  vector.x = -thickness / 2;
  vector.y = two.height / 2;
  Matter.Body.setPosition(bounds.left.entity, vector);

  vector.x = two.width + thickness / 2;
  vector.y = two.height / 2;
  Matter.Body.setPosition(bounds.right.entity, vector);

  vector.x = two.width / 2;
  vector.y = two.height + thickness / 2;
  Matter.Body.setPosition(bounds.bottom.entity, vector);

  var size;

  if (two.width < 480) {
    size = two.width * 0.12;
  } else if (two.width > 1080 && two.width < 1600) {
    size = two.width * 0.07;
  } else if (two.width > 1600) {
    size = two.width * 0.06;
  } else {
    size = two.width * 0.08;
  }

  var leading = size * 0.8;

  for (var i = 0; i < two.scene.children.length; i++) {
    var child = two.scene.children[i];

    if (!child.isWord) {
      continue;
    }

    var text = child.text;
    var rectangle = child.rectangle;
    var entity = child.entity;

    text.size = size;
    text.leading = leading;

    var rect = text.getBoundingClientRect(true);
    rectangle.width = rect.width;
    rectangle.height = rect.height;

    Matter.Body.scale(entity, 1 / entity.scale.x, 1 / entity.scale.y);
    Matter.Body.scale(entity, rect.width, rect.height);
    entity.scale.set(rect.width, rect.height);

    text.size = size / 3;
  }
}

function addSlogan() {
  var stack = Matter.Composites.pyramid(-350,  0, 7, 6, 0, 0, function(x, y) {
    switch(Math.round(Matter.Common.random(0,1))){
        case 0:
            if (Matter.Common.random() < 0.8) {
                return Matter.Bodies.rectangle(x, y, Matter.Common.random(50, 350), Matter.Common.random(10, 60),{
                    chamfer:{radius:Matter.Common.random(0, 5)},
                    render:{
                        fillStyle: "green",
                       // strokeStyle:'black',
                        //lineWidth:2
                    }}
                    );
            } else {
                return Matter.Bodies.rectangle(x, y, Matter.Common.random(50, 200), Matter.Common.random(100, 400),{
                    chamfer:{radius:[Matter.Common.random(0, 5),Matter.Common.random(0, 50),Matter.Common.random(0, 50),Matter.Common.random(0, 20)]},
                    render:{
                        fillStyle: "red",
                        //strokeStyle:'black',
                       // lineWidth:2
                    }
                });
            }
        case 1:
            return Matter.Bodies.polygon(x, y, Math.round(Matter.Common.random(3, 8)), Matter.Common.random(80, 250),{
                    chamfer:{radius:[Matter.Common.random(0, 80),Matter.Common.random(0, 50),Matter.Common.random(0, 10),Matter.Common.random(0, 50)]},
                    render:{
                        fillStyle: "rgb(100,0,255)",
                        //strokeStyle:'black',
                        //lineWidth:2
                    }
                });
        }
    });

    Matter.Composite.add(solver.world, stack);
}

function update(frameCount, timeDelta) {
  var allBodies = Matter.Composite.allBodies(solver.world);
  Matter.MouseConstraint.update(mouse, allBodies);
  Matter.MouseConstraint._triggerEvents(mouse);

  Matter.Engine.update(solver);

  for (var i = 0; i < entities.length; i++) {
    var entity = entities[i];
    entity.object.position.copy(entity.position);
    entity.object.rotation = entity.angle;
  }
}

function createBoundary(width, height) {
  var rectangle = two.makeRectangle(0, 0, width, height);
  rectangle.visible = false;

  rectangle.entity = Matter.Bodies.rectangle(
    0,
    0,
    width,
    height,
    bounds.properties
  );
  rectangle.entity.position = rectangle.position;

  return rectangle;
}

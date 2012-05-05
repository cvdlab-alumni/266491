/**
* @author Daniele Spidalieri 266491
*/

/**
* Exercise 2
* Produce the model of the fuselage (local coordinate system).
*/

var domain = DOMAIN([[0,1],[0,1]])([60,60]);

//fuselage
var p0fus = [[0,1 , 0],[1,1,0], [1, 0, 0], [1, -2.4, 0], [-1.2, -2.4, 0], 
								[-1.2, -1.7, 0], [-1.4, 1, 0], [-1.4, 1, 0],[0, 1, 0]];
//scalo
var p1fus = p0fus.map(function(p) {return [p[0]*3, p[1]*3, p[2]]});
var p2fus = p0fus.map(function(p) {return [p[0]*3, p[1]*3, p[2]]});
var p3fus = p0fus.map(function(p) {return [p[0]*2, p[1]*2, p[2]]});
var p4fus = p0fus.map(function(p) {return [p[0]*0.5, p[1]*0.5, p[2]]});
var p5fus = p0fus.map(function(p) {return [p[0]*0.001, p[1]*0.001, p[2]]});
p0fus = p0fus.map(function(p) {return [p[0]*1.5, p[1]*2.5, p[2]]});

//traslo
p1fus = p1fus.map(function(p) {return [p[0], p[1], p[2]+9]});
p2fus = p2fus.map(function(p) {return [p[0], p[1], p[2]+18]});
p3fus = p3fus.map(function(p) {return [p[0], p[1]+1.5, p[2]+25]});
p4fus = p4fus.map(function(p) {return [p[0], p[1]+2.5, p[2]+36]});
p5fus = p5fus.map(function(p) {return [p[0], p[1]+2.5, p[2]+37]});

//snout of plain
var p1snout = p0fus.map(function(p) {return [p[0]*0.5, p[1]*0.5, p[2]-0.1]});
var p2snout = p0fus.map(function(p) {return [p[0]*0.05, p[1]*0.05, p[2]-0.1]});
var p3snout = p0fus.map(function(p) {return [p[0]*0.001, p[1]*0.001, p[2]-0.1]});

// curve fuselage
var c0fus = BEZIER(S0)(p0fus);
var c1fus = BEZIER(S0)(p1fus);
var c2fus = BEZIER(S0)(p2fus);
var c3fus = BEZIER(S0)(p3fus);
var c4fus = BEZIER(S0)(p4fus);
var c5fus = BEZIER(S0)(p5fus);
var c1snout = BEZIER(S0)(p1snout);
var c2snout = BEZIER(S0)(p2snout);
var c3snout = BEZIER(S0)(p3snout);
var controlsFus = [c3snout,c2snout,c1snout,c0fus,c1fus,c2fus,c3fus,c4fus,c5fus];

var fus = BEZIER(S1)(controlsFus);
var surfFus = COLOR([1,0.7,0, 1])(MAP(fus)(domain));

//propeller of plane
var knotsProp = [0,0,0,1,1,1];
var c1prop1 = NUBS(S0)(2)(knotsProp)([[-0.1,0.2,0],[0.3,1.2,0],[0.1,1.2,0]]);
var c2prop1 = NUBS(S0)(2)(knotsProp)([[-0.1,0.2,0],[0,1.2,0.2],[0.1,1.2,0]]);
var prop1 = BEZIER(S1)([c1prop1,c2prop1]);
var surfeProp1 = MAP(prop1)(domain);

//curve propeller
var c1prop2 = NUBS(S0)(2)(knotsProp)([[-0.1,0.2,0],[0,-0.4,0.2],[-0.1,-0.9,0]]);
var c2prop2 = NUBS(S0)(2)(knotsProp)([[-0.1,0.2,0],[0,-0.4,-0.2],[-0.1,-0.9,0]]);
var prop2 = BEZIER(S1)([c1prop2,c2prop2]);
var surfeProp2 = MAP(prop2)(domain);

var propeller = S([0,1,2])([3,3,3])(COLOR([0,0,0,1])(STRUCT([surfeProp1,surfeProp2])));

// propeller hider
var drawCone= function (r,h,m,n) {
  var domain = DOMAIN([[0,2*PI],[0,1]])([n,m]);

  var cone = function (p) {
    var u = p[0];
    var v = p[1];

    return [r * (v) * COS(u), r * (v) * SIN(u), h * v];
  }
  var mapped = MAP(cone)(domain);

  return mapped;
};

var cone = T([0,1,2])([-0.25,0.6,-0.3])(drawCone(0.3,0.5,50,50));
 
// propeller final
var propellerTot = T([0,1,2])([0.2,-0.5,-0.1])(STRUCT([cone,propeller]));

//cockpit
var c0coc = CUBIC_HERMITE(S0)([[0.35,0,2.5],[-0.35,0,2.5],[0,0.8,0],[0,-0.8,0]])
var c1coc = CUBIC_HERMITE(S0)([[0.35,0,2.8],[-0.35,0,2.8],[0,5,0],[0,-5,0]])
var c2coc = CUBIC_HERMITE(S0)([[0.35,0,3.75],[-0.35,0,3.75],[0.8,5,0],[0,-5,-0.8]])
var c3coc = CUBIC_HERMITE(S0)([[0.35,0,4.5],[-0.35,0,4.5],[0,0.8,0],[0,-0.8,0]])

var surfCoc = BEZIER(S1)([c0coc,c1coc,c2coc,c3coc]);
var cockpit = T([0,1])([-0.4,1.5])(S([0,1,2])([4,4,4])(MAP(surfCoc)(domain)));
var glass = COLOR([0.69,0.87,0.9,0.98])(cockpit);

// fuselage final
var fuselage = STRUCT([surfFus,propellerTot,glass]);
DRAW(fuselage);


/**
* @author Daniele Spidalieri 266491
*/

/**
* Exercise 4
* Assemble the various assemblies and/or subassemblies into a 
* single model. 
*/

// fuselage
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

// stabilizers

//vertical stabilizer

var vs = [[0,0,0],[0.3,4,0],[2,15,0],[5.5,5.5,0],[10,1.5,0],[6,0,0],[0,0,0]];
vs1 = vs.map(function (p) {return [p[0], p[1], p[2]+0.1]});
vs2 = vs.map(function (p) {return [p[0]*0.001, p[1]*0.001, p[2]+0.2]});
vs3 = vs.map(function (p) {return [p[0]*0.001, p[1]*0.001, p[2]]});

var c0vs = BEZIER(S0)(vs);
var c1vs = BEZIER(S0)(vs1);
var c2vs = BEZIER(S0)(vs2);
var c3vs = BEZIER(S0)(vs3);
var controlsVs = [c0vs,c1vs,c2vs,c3vs]
var wingVs = BEZIER(S1)(controlsVs);
var surfVs = R([0,1])(-PI/12)(T([0,1])([0,0.5])(MAP(wingVs)(domain)));

//right horizontal stabilizer
var p0dx = [[9,1,0],[0,2,0],[0,0,0],[4,1,0],[9,1,0]];

//scalo
var p1dx = p0dx.map(function (p) {return [p[0]*0.9, p[1]*0.9, p[2]+1]});
var p2dx = p0dx.map(function (p) {return [p[0]*0.8, p[1]*0.8, p[2]+2]});
var p3dx = p0dx.map(function (p) {return [p[0]*0.7, p[1]*0.7, p[2]+3]});
var p4dx = p0dx.map(function (p) {return [p[0]*0.6, p[1]*0.6, p[2]+4]});
var p5dx = p0dx.map(function (p) {return [p[0]*0.5, p[1]*0.5, p[2]+5]});

var p6dx = p0dx.map(function (p) {return [p[0]*0.5, p[1]*0.5, p[2]+5]});
var p7dx = p0dx.map(function (p) {return [p[0]*0.5, p[1]*0.1, p[2]+5]});
var p8dx = p0dx.map(function (p) {return [p[0]*0.5, p[1]*0.01, p[2]+5]});

//traslo
p1dx = p1dx.map(function (p) {return [p[0]+0.5, p[1], p[2]]});
p2dx = p2dx.map(function (p) {return [p[0]+1, p[1], p[2]]});
p3dx = p3dx.map(function (p) {return [p[0]+1.5, p[1], p[2]]});
p4dx = p4dx.map(function (p) {return [p[0]+2, p[1], p[2]]});
p5dx = p5dx.map(function (p) {return [p[0]+2.5, p[1], p[2]]});

p6dx = p6dx.map(function (p) {return [p[0]+2.5, p[1], p[2]]});
p7dx = p7dx.map(function (p) {return [p[0]+2.5, p[1]+0.4, p[2]]});
p8dx = p8dx.map(function (p) {return [p[0]+2.5, p[1]+0.5, p[2]]});

//curve
var c0dx = BEZIER(S0)(p0dx);
var c1dx = BEZIER(S0)(p1dx);
var c2dx = BEZIER(S0)(p2dx);
var c3dx = BEZIER(S0)(p3dx);
var c4dx = BEZIER(S0)(p4dx);
var c5dx = BEZIER(S0)(p5dx);
var c6dx = BEZIER(S0)(p6dx);
var c7dx = BEZIER(S0)(p7dx);
var c8dx = BEZIER(S0)(p8dx);
var controlsdx = [c0dx,c1dx,c2dx,c3dx,c4dx,c5dx];
var controls2dx = [c6dx,c7dx,c8dx];

// wing surface
var wingdx = BEZIER(S1)(controlsdx);
var surfdx = MAP(wingdx)(domain);

// chiusura ala
var wing2dx = BEZIER(S1)(controls2dx);
var surf2dx = MAP(wing2dx)(domain);

// right wing final
var wingTotdx = STRUCT([surfdx,surf2dx]);

//left horizontal stabilizer

var p0sx = [[9,1,0],[0,2,0],[0,0,0],[4,1,0],[9,1,0]];

//scalo
var p1sx = p0sx.map(function (p) {return [p[0]*0.9, p[1]*0.9, p[2]-1]});
var p2sx = p0sx.map(function (p) {return [p[0]*0.8, p[1]*0.8, p[2]-2]});
var p3sx = p0sx.map(function (p) {return [p[0]*0.7, p[1]*0.7, p[2]-3]});
var p4sx = p0sx.map(function (p) {return [p[0]*0.6, p[1]*0.6, p[2]-4]});
var p5sx = p0sx.map(function (p) {return [p[0]*0.5, p[1]*0.5, p[2]-5]});

var p6sx= p0sx.map(function (p) {return [p[0]*0.5, p[1]*0.5, p[2]-5]});
var p7sx = p0sx.map(function (p) {return [p[0]*0.5, p[1]*0.1, p[2]-5]});
var p8sx = p0sx.map(function (p) {return [p[0]*0.5, p[1]*0.01, p[2]-5]});

//traslo
p1sx = p1sx.map(function (p) {return [p[0]+0.5, p[1], p[2]]});
p2sx = p2sx.map(function (p) {return [p[0]+1, p[1], p[2]]});
p3sx = p3sx.map(function (p) {return [p[0]+1.5, p[1], p[2]]});
p4sx = p4sx.map(function (p) {return [p[0]+2, p[1], p[2]]});
p5sx = p5sx.map(function (p) {return [p[0]+2.5, p[1], p[2]]});

p6sx = p6sx.map(function (p) {return [p[0]+2.5, p[1], p[2]]});
p7sx = p7sx.map(function (p) {return [p[0]+2.5, p[1]+0.4, p[2]]});
p8sx = p8sx.map(function (p) {return [p[0]+2.5, p[1]+0.5, p[2]]});

//curve
var c0sx = BEZIER(S0)(p0sx);
var c1sx = BEZIER(S0)(p1sx);
var c2sx = BEZIER(S0)(p2sx);
var c3sx = BEZIER(S0)(p3sx);
var c4sx = BEZIER(S0)(p4sx);
var c5sx = BEZIER(S0)(p5sx);
var c6sx = BEZIER(S0)(p6sx);
var c7sx = BEZIER(S0)(p7sx);
var c8sx = BEZIER(S0)(p8sx);
var controlsSx = [c0sx,c1sx,c2sx,c3sx,c4sx,c5sx];
var controls2Sx = [c6sx,c7sx,c8sx];

// wing surface
var wingsx = BEZIER(S1)(controlsSx);
var surfsx = MAP(wingsx)(domain);

// chiusura ala
var wing2sx = BEZIER(S1)(controls2Sx);
var surf2sx = MAP(wing2sx)(domain);

// left wing final
var wingTotsx = STRUCT([surfsx,surf2sx]);

//stabilizers final
var stabilizers = T([1,2])([1.6,28])(R([0,2])(-PI/2)(COLOR([1,0.7,0, 1])(STRUCT([surfVs,wingTotsx,wingTotdx]))));


//wings

var p0wing = [[9,0,0],[0,5,0],[0,0,0],[4,2,0],[9,0,0]];

//scalo
var p1wing = p0wing.map(function (p) {return [p[0]*0.9, p[1]*0.9, p[2]]});
var p2wing = p0wing.map(function (p) {return [p[0]*0.8, p[1]*0.8, p[2]]});
var p3wing = p0wing.map(function (p) {return [p[0]*0.7, p[1]*0.7, p[2]]});
var p4wing = p0wing.map(function (p) {return [p[0]*0.6, p[1]*0.6, p[2]]});
var p5wing = p0wing.map(function (p) {return [p[0]*0.5, p[1]*0.5, p[2]]});
//punti chiusura ala
var p6wing = p0wing.map(function (p) {return [p[0]*0.5, p[1]*0.5, p[2]]});
var p7wing = p0wing.map(function (p) {return [p[0]*0.5, p[1]*0.1, p[2]]});
var p8wing = p0wing.map(function (p) {return [p[0]*0.5, p[1]*0.01, p[2]]});

//traslo
p1wing = p1wing.map(function (p) {return [p[0]+0.5, p[1], p[2]+4]});
p2wing = p2wing.map(function (p) {return [p[0]+1, p[1]+0.8, p[2]+8]});
p3wing = p3wing.map(function (p) {return [p[0]+1.5, p[1]+1.2, p[2]+12]});
p4wing = p4wing.map(function (p) {return [p[0]+2, p[1]+1.6, p[2]+16]});
p5wing = p5wing.map(function (p) {return [p[0]+2.5, p[1]+2, p[2]+20]});

p6wing = p6wing.map(function (p) {return [p[0]+2.5, p[1]+2, p[2]+20]});
p7wing = p7wing.map(function (p) {return [p[0]+2.5, p[1]+2, p[2]+20]});
p8wing = p8wing.map(function (p) {return [p[0]+2.5, p[1]+2, p[2]+20]});

//curve ala
var c0wing = BEZIER(S0)(p0wing);
var c1wing = BEZIER(S0)(p1wing);
var c2wing = BEZIER(S0)(p2wing);
var c3wing = BEZIER(S0)(p3wing);
var c4wing = BEZIER(S0)(p4wing);
var c5wing = BEZIER(S0)(p5wing);

//curve chiusura
var c6wing = BEZIER(S0)(p6wing);
var c7wing = BEZIER(S0)(p7wing);
var c8wing = BEZIER(S0)(p8wing);

var controlswing = [c0wing,c1wing,c2wing,c3wing,c4wing,c5wing];
var controls2wing = [c6wing,c7wing,c8wing];

//superfice ala
var bigWing = BEZIER(S1)(controlswing);
var surfwing = MAP(bigWing)(domain);

//superfice chiusura ala
var bigWing2 = BEZIER(S1)(controls2wing);
var surf2wing = MAP(bigWing2)(domain);

// ala finale
var bigWingTot = R([1,2])(-PI/17)(T([0,1,2])([-1,-5.5,7])(R([0,2])(-PI/2)(COLOR([1,0.7,0, 1])(STRUCT([surfwing,surf2wing])))));

//ala dx
var p0wing2 = [[9,0,0],[0,5,0],[0,0,0],[4,2,0],[9,0,0]];

//scalo
var p1wing2 = p0wing2.map(function (p) {return [p[0]*0.9, p[1]*0.9, p[2]]});
var p2wing2 = p0wing2.map(function (p) {return [p[0]*0.8, p[1]*0.8, p[2]]});
var p3wing2 = p0wing2.map(function (p) {return [p[0]*0.7, p[1]*0.7, p[2]]});
var p4wing2 = p0wing2.map(function (p) {return [p[0]*0.6, p[1]*0.6, p[2]]});
var p5wing2 = p0wing2.map(function (p) {return [p[0]*0.5, p[1]*0.5, p[2]]});
//punti chiusura ala
var p6wing2 = p0wing2.map(function (p) {return [p[0]*0.5, p[1]*0.5, p[2]]});
var p7wing2 = p0wing2.map(function (p) {return [p[0]*0.5, p[1]*0.1, p[2]]});
var p8wing2 = p0wing2.map(function (p) {return [p[0]*0.5, p[1]*0.01, p[2]]});

//traslo
p1wing2 = p1wing2.map(function (p) {return [p[0]+0.5, p[1], p[2]-4]});
p2wing2 = p2wing2.map(function (p) {return [p[0]+1, p[1]+0.8, p[2]-8]});
p3wing2 = p3wing2.map(function (p) {return [p[0]+1.5, p[1]+1.2, p[2]-12]});
p4wing2 = p4wing2.map(function (p) {return [p[0]+2, p[1]+1.6, p[2]-16]});
p5wing2 = p5wing2.map(function (p) {return [p[0]+2.5, p[1]+2, p[2]-20]});

p6wing2 = p6wing2.map(function (p) {return [p[0]+2.5, p[1]+2, p[2]-20]});
p7wing2 = p7wing2.map(function (p) {return [p[0]+2.5, p[1]+2, p[2]-20]});
p8wing2 = p8wing2.map(function (p) {return [p[0]+2.5, p[1]+2, p[2]-20]});

//curve ala
var c0wing2 = BEZIER(S0)(p0wing2);
var c1wing2 = BEZIER(S0)(p1wing2);
var c2wing2 = BEZIER(S0)(p2wing2);
var c3wing2 = BEZIER(S0)(p3wing2);
var c4wing2 = BEZIER(S0)(p4wing2);
var c5wing2 = BEZIER(S0)(p5wing2);

//curve chiusura
var c6wing2 = BEZIER(S0)(p6wing2);
var c7wing2 = BEZIER(S0)(p7wing2);
var c8wing2 = BEZIER(S0)(p8wing2);

var controlswing2 = [c0wing2,c1wing2,c2wing2,c3wing2,c4wing2,c5wing2];
var controls2wing2 = [c6wing2,c7wing2,c8wing2];

//superfice ala
var bigWing2 = BEZIER(S1)(controlswing2);
var surfwing2 = MAP(bigWing2)(domain);

//superfice chiusura ala
var bigWing22 = BEZIER(S1)(controls2wing2);
var surf2wing2 = MAP(bigWing22)(domain);

// ala finale
var bigWingTot2 = R([1,2])(-PI/17)(T([0,1,2])([0,-5.5,7])(R([0,2])(-PI/2)(COLOR([1,0.7,0, 1])(STRUCT([surfwing2,surf2wing2])))));

var aircraft = STRUCT([fuselage,stabilizers,bigWingTot2,bigWingTot]);
DRAW(aircraft);
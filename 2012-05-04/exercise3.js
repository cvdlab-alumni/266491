/**
* @author Daniele Spidalieri 266491
*/

/**
* Exercise 3
* Produce the model of horizontal and vertical stabilizers 
* (local coordinate system).
*/

//vertical stabilizer
var domain = DOMAIN([[0,1],[0,1]])([40,40]);

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
var stabilizers = COLOR([1,0.7,0, 1])(STRUCT([surfVs,wingTotsx,wingTotdx]));
DRAW(stabilizers);

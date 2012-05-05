/**
* @author Daniele Spidalieri 266491
*/

/**
* Exercise 1
* Produce the model of a single wing in a local coordinate system.
*/

var domain = DOMAIN([[0,1],[0,1]])([40,40]);

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
var bigWingTot = COLOR([1,0.7,0, 1])(STRUCT([surfwing,surf2wing]));
DRAW(bigWingTot);
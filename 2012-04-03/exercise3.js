/**
*@author Daniele Spidalieri 266491
*/

/**
* Produce a colored version of the previous model.
*/
// pavimentazione
var floor1 = SIMPLEX_GRID([[39],[1],[1]]);
var floor2 = T([1])([1])(SIMPLEX_GRID([[1],[1],[1]]));
var floor3 = T([0,1])([21,1])(SIMPLEX_GRID([[15],[3],[1]]));
var floor4 = T([0,1])([21,4])(SIMPLEX_GRID([[18],[13],[1]]));
var floor5 = T([0,1])([39,4])(SIMPLEX_GRID([[8],[12],[1]]));
var floor6 = T([0,1])([1,10])(SIMPLEX_GRID([[20],[7],[1]]));
var floor7 = T([0,1])([1,17])(SIMPLEX_GRID([[8],[5],[1]]));
var floor8 = T([0,1])([39,4])(SIMPLEX_GRID([[13],[1],[1]]));
var floor9 = T([0,1])([51,5])(SIMPLEX_GRID([[1],[1],[1]]));
var floor3D = COLOR([0.93,0.84,0.69])
						 (STRUCT([floor1, floor2, floor3,floor4, floor5, floor6,floor7, floor8, floor9]));

// piscine
var bigPool3D = T([0,1])([1,1])(SIMPLEX_GRID([[20],[9],[0.8]]));
var smallPool3D = T([0,1])([47,5])(SIMPLEX_GRID([[4],[11],[0.8]]));
var pools3D = COLOR([0.26,0.75,0.98])(STRUCT([bigPool3D, smallPool3D]));

//mura di marmo
var wall1 = T([0,1,2])([1,0.75,0])(SIMPLEX_GRID([[7],[0.25],[4]]));
var wall2 = T([0,1,2])([0.75,0.75,0])(SIMPLEX_GRID([[0.25],[21.50],[4]]));
var wall3 = T([0,1,2])([1,22,0])(SIMPLEX_GRID([[8],[0.25],[4]]));
var wall4 = T([0,1,2])([9,16.75,0])(SIMPLEX_GRID([[0.25],[5.50],[4]]));
var wall5 = T([0,1,2])([7.5,15,1])(SIMPLEX_GRID([[19],[0.25],[3]]));
var wall6 = T([0,1,2])([37.75,16,0])(SIMPLEX_GRID([[13.25],[0.25],[4]]));
var wall7 = T([0,1,2])([51,4.75,0])(SIMPLEX_GRID([[0.25],[11.5],[4]]));
var wall8 = T([0,1,2])([41.3,4.75,0])(SIMPLEX_GRID([[9.7],[0.25],[4]]));
var wall9 = T([0,1,2])([25.2,7.2,1])(SIMPLEX_GRID([[9.6],[0.25],[3]]));
var wall10 = T([0,1,2])([37.2,11.4,1])(SIMPLEX_GRID([[5.75],[0.25],[3]]));
var walls3D =  COLOR([0.93,0.84,0.69])
							(STRUCT([wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9, wall10]));

// mura di vetro
var glassWall1AxisX = SIMPLEX_GRID([[0.1],REPLICA(2)([2.7]),[0.05]]);
var glassWall1AxisY = SIMPLEX_GRID([[0.1],REPLICA(2)([0.1,-2.7,0.1]),[3]]);
var glass1 = COLOR([0.52,0.8,0.92])(SIMPLEX_GRID([[0.01],[-0.1,2.7,-0.2,2.65],[-0.05,3,-0.5]]));
var glassWall1 =T([0,1,2])([31,7.5,1])(STRUCT([glassWall1AxisX,glassWall1AxisY,glass1]));
var glassWall2 =T([0])([1])(glassWall1);

var glassWall3AxisX = SIMPLEX_GRID([REPLICA(4)([0.1,-3.65]),[0.1],[3]]);
var glassWall3AxisY = SIMPLEX_GRID([REPLICA(3)([-0.1,3.65]),[0.1],[0.05]]);
var glass3 = COLOR([0.52,0.8,0.92])(SIMPLEX_GRID([REPLICA(3)([-0.1,3.65]),[0.05],[-0.05,3,0.05]]));
var glassWall3= T([0,1,2])([30,5,1])(STRUCT([glassWall3AxisX,glassWall3AxisY,glass3]));

var glassWall4AxisX = SIMPLEX_GRID([REPLICA(7)([0.1,-1.5]),[0.1],[2.8]]);
var glassWall4AxisY = SIMPLEX_GRID([REPLICA(6)([-0.1,1.5]),[0.1],[0.05]]);
var glass4 = COLOR([0.52,0.8,0.92])(SIMPLEX_GRID([REPLICA(6)([-0.1,1.5]),[0.01],[-0.05,2.7,0.05]]));
var glassWall4 = T([0,1,2])([30,13.5,1])(STRUCT([glassWall4AxisX,glassWall4AxisY,glass4]));

//piscina
var glassWall5AxisX = SIMPLEX_GRID([[0.1],REPLICA(9)([0.1,-0.77]),[2.8]]);
var glassWall5AxisY = SIMPLEX_GRID([[0.1],[7.25],[0.05,-2.7,0.05]]);
var glass5 = COLOR([0.52,0.8,0.92])(SIMPLEX_GRID([[0.01],REPLICA(8)([-0.1,0.77]),[-0.05,2.7,0.05]]));
var glassWall5 = T([0,1,2])([44.6,6.9,1])(STRUCT([glassWall5AxisX,glassWall5AxisY,glass5]));

var glassWall6AxisX = SIMPLEX_GRID([REPLICA(4)([0.1,-1.85,0.05]),[0.1],[3]]);
var glassWall6AxisY = SIMPLEX_GRID([REPLICA(4)([1.99]),[0.1],[0.05]]);
var glass6 = COLOR([0.52,0.8,0.92])(SIMPLEX_GRID([REPLICA(4)([-0.1,1.89]),[0.01],[-0.05,3,0.05]]));
var glassWall6 = T([0,1,2])([1,16.9,1])(STRUCT([glassWall6AxisX,glassWall6AxisY,glass6]));
var glassWalls3D = STRUCT([glassWall1,glassWall2,glassWall3,glassWall4,glassWall5,glassWall6]);

// scalinata
var stair1 = SIMPLEX_GRID([[0.4],[3],[0.13]]); 
var stair2 = T([0,2])([-0.4,0.13])(stair1);
var stair3 = T([0,2])([-0.4,0.13])(stair2);
var stair4 = T([0,2])([-0.4,0.13])(stair3);
var stair5 = T([0,2])([-0.4,0.13])(stair4);
var stair6 = T([0,2])([-0.4,0.13])(stair5);
var stair7 = T([0,2])([-0.4,0.13])(stair6);
var stairs3D = COLOR([0.93,0.84,0.69])
							(T([0,1])([38.4,1])
							(STRUCT([stair1,stair2,stair3,stair4,stair5,stair6,stair7])));

// colonne
var pillars3D = COLOR([0.51,0.51,0.45])(T([0,1])([26,6.8])(SIMPLEX_GRID([REPLICA(4)([0.15,-6.2]),
	                         [0.15,-7,0.15],
	                         [3,1]
              ])));

// panchina
var benchLegs = T([0,1,2])([8, 14.2, 1])(SIMPLEX_GRID([REPLICA(8)([0.4,-1.7]),[0.4],[0.4]]));
var benchSit = T([0,1,2])([7.9, 14.1, 1.38])(SIMPLEX_GRID([[15.3],[0.5],[0.1]]));
var bench3D = COLOR([0.93,0.84,0.69])(STRUCT([benchSit,benchLegs]));

//tetti
var bigRoof = T([0,1,2])([24,4,4])(SIMPLEX_GRID([[23],[13],[0.25]]));
var smallRoof = T([0,1,2])([0.5,13.2,4])(SIMPLEX_GRID([[9.5],[10],[0.25]]));
var roofs3D = COLOR([0.16,0.14,0.13])(STRUCT([bigRoof,smallRoof]));

//struttura colorata completa
var pavillionBarcelona = STRUCT([floor3D,pools3D, walls3D,glassWalls3D,stairs3D,pillars3D,bench3D,roofs3D]);
DRAW(pavillionBarcelona);
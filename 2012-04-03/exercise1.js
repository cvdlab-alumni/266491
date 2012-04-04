/**
* @author Daniele Spidalieri 266491
*/

/**
* Reproduce a 2D model of the floor plan of the Barcelona Pavilion
* using only the plasm.js primitives POLYLINE and STRUCT.
* Let assume the grid of squares on the floor be 1.0m x 1.0m.
*/

// perimetro mappa
var externalWallsPoints = [[38.9,1],[39,1],[39,0],[0,0],[0,2],[1,2],[1,22],
													[9,22],[9,17],[39,17],[39,16],[51,16],
													[51,6],[52,6],[52,4],
													[38.9,4]
													];
var externalWalls = POLYLINE(externalWallsPoints);

//piscina grande
var bigPoolPoints = [[1,1],[1,10],[21,10],[21,1],[1,1]];
var bigPool= POLYLINE(bigPoolPoints);

//negozio
var shopPoints = [[5,19.2],[5,17],[1,17],[1,22],[5,22],[5,19.8]];
var shop = POLYLINE(shopPoints);

//aministrazione
var adminPoints = [[7.2,17],[5,17],[5,22],[9,22],[9,17],[7.8,17]];
var adminBathPoints = [[5.8,20.7],[5,20.7],[5,22],[7,22],[7,20.7],[6.6,20.7]];
var adminToilettePoints = [[7,20.7],[7,22],[9,22],[9,20.7],[7,20.7]];
var admin = POLYLINE(adminPoints);
var adminBath = POLYLINE(adminBathPoints);
var adminToilette = POLYLINE(adminToilettePoints);
var adminRoom = STRUCT([admin,adminBath,adminToilette]);

//mura interne
var internalWall1Points = [[7.5,15],[26.5,15]];
var internalWall1 = POLYLINE(internalWall1Points);
var internalWall2Points = [[25.2,7.3],[33.8,7.3]];
var internalWall2 = POLYLINE(internalWall2Points);
var internalWall3Points = [[37.2,11.5],[42.5,11.5]];
var internalWall3 = POLYLINE(internalWall3Points);
var internalWall4Points = [[44.7,6.9],[44.7,14.1]];
var internalWall4 = POLYLINE(internalWall4Points);
var internalWall5Points = [[31,7.3],[31,13.7]];
var internalWall5 = POLYLINE(internalWall5Points);
var internalWall6Points = [[32,7.3],[32,13.7]];
var internalWall6 = POLYLINE(internalWall6Points);
var internalWall7Points = [[30,13.7],[40,13.7]];
var internalWall7 = POLYLINE(internalWall7Points);
var internalWalls = STRUCT([internalWall1,internalWall2,internalWall3,internalWall4,
	internalWall5,internalWall6,internalWall7
												 ]);
// perimetro stanza interna
var internalRoomPoints = [[37.7,16],[47,16],[47,5],[30,5]];
var internalRoom = POLYLINE(internalRoomPoints);

//piscina piccola
var smallPoolPoints = [[47,5],[47,16],[51,16],[51,5],[47,5]];
var smallPool = POLYLINE(smallPoolPoints);

//colonne
var pillar1Points = [[25.925,6.925],[25.925,7.075],[26.075,7.075],[26.075,6.925],[25.925,6.925]];
var pillar1 = POLYLINE(pillar1Points);
var pillar2Points = [[25.925,13.925],[25.925,14.075],[26.075,14.075],[26.075,13.925],[25.925,13.925]];
var pillar2 = POLYLINE(pillar2Points);
var pillar3Points = [[32.255,6.925],[32.255,7.075],[32.405,7.075],[32.405,6.925],[32.255,6.925]];
var pillar3 = POLYLINE(pillar3Points);
var pillar4Points = [[32.255,13.925],[32.255,14.075],[32.405,14.075],[32.405,13.925],[32.255,13.925]];
var pillar4 = POLYLINE(pillar4Points);
var pillar5Points = [[38.585,6.925],[38.585,7.075],[38.735,7.075],[38.735,6.925],[38.585,6.925]];
var pillar5 = POLYLINE(pillar5Points);
var pillar6Points = [[38.585,13.925],[38.585,14.075],[38.735,14.075],[38.735,13.925],[38.585,13.925]];
var pillar6 = POLYLINE(pillar6Points);
var pillar7Points = [[44.915,6.925],[44.915,7.075],[45.065,7.075],[45.065,6.925],[44.915,6.925]];
var pillar7 = POLYLINE(pillar7Points);
var pillar8Points = [[44.915,13.925],[44.915,14.075],[45.065,14.075],[45.065,13.925],[44.915,13.925]];
var pillar8 = POLYLINE(pillar8Points);
var pillars = STRUCT([pillar1,pillar2,pillar3,pillar4,pillar5,pillar6,pillar7,pillar8]);

//scalinata
var step1Points = [[36.1,1],[36.1,4],[36.5,4],[36.5,1],[36.1,1]];
var step1 = POLYLINE(step1Points);
var step2Points = [[36.5,1],[36.5,4],[36.9,4],[36.9,1],[36.5,1]];
var step2 = POLYLINE(step2Points);
var step3Points = [[36.9,1],[36.9,4],[37.3,4],[37.3,1],[36.9,1]];
var step3 = POLYLINE(step3Points);
var step4Points = [[37.3,1],[37.3,4],[37.7,4],[37.7,1],[37.3,1]];
var step4 = POLYLINE(step4Points);
var step5Points = [[37.7,1],[37.7,4],[38.1,4],[38.1,1],[37.7,1]];
var step5 = POLYLINE(step5Points);
var step6Points = [[38.1,1],[38.1,4],[38.5,4],[38.5,1],[38.1,1]];
var step6 = POLYLINE(step6Points);
var step7Points = [[38.5,1],[38.5,4],[38.9,4],[38.9,1],[38.5,1]];
var step7 = POLYLINE(step7Points);
var steps = STRUCT([step1,step2,step3,step4,step5,step6,step7]);

//panchina
var benchPoints = [[7.8,14.2],[7.8,14.7],[22.2,14.7],[22.2,14.2],[7.8,14.2]];
var bench = POLYLINE(benchPoints);

//piantina completa
var plan = STRUCT([externalWalls,bigPool,shop,adminRoom,internalWalls,internalRoom,smallPool,steps,pillars,bench]);
DRAW(plan);
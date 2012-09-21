/**
 * @author Daniele Spidalieri 266491
 */

/**
 * Final Project
 * 3D model of Villa Chiericati (Vancimuglio, Vicenza, Italy)
 */

//domini
var domain1 = DOMAIN([[0,1],[0,1],[0,1]])([12,1,1]);
var domain2 = DOMAIN([[0,1],[0,2*PI]])([20,20,1]);
var domain3 = DOMAIN([[0,1],[0,1],[0,1]])([20,1,1]);
var domain4 = DOMAIN([[0,1],[0,1]])([5,15]);


//colors
var ground_color = [10/255,143/255,23/255,1];
var main_color = [248/255,232/255,213/255,1];
var roof_color = [218/255,128/255,91/255,1];
var winGlass_color = [23/255,115/255,235/255,0.4];
var winStruct_color = [158/255,88/255,80/255,1];
var door_color = [158/255,88/255,80/255,1];
var statue_color = [194/255,181/255,165/255,1];

//utility
var baseHgt = 2.37;
var wallStairsHgt = 3;
var winWdt = 0.79;
var winBigHgt = 1.86;
var winMedHgt = 0.76;
var winSmallHgt = 0.56;
var extWallHgt = 7.5;
var mainDoorWdt = 1.68/2;
var intDoorWdt = 0.8;
var intDoorHgt = 1.46;
var stairsLgt = 5.6;
var stepWdt = 2.45/2;
var stepLgt = stairsLgt/13;
var finalStepLgt = 1.6;
var stepHgt = baseHgt/13;
var baseAtrLgt = 0.9+0.9+1.42+0.9+0.3;
var baseAtrWdt = 0.91+1.21+0.63+stepWdt+0.25;
var baseHouseLgt = 12;
var baseHouseWdt = 17.8/2;
var baseHouseDstUtl = [0.3,-4.38+0.3-7.62+0.4,0.4]; //utility distaza muri basement
var extWallHgtUtl = baseHgt+stepHgt; // utility altezza da terra muri esterni
var extRearDstUtl = 0.76+winWdt+2+winWdt+0.2+1.6+winWdt; //utility distanza porta posteriore
var supFloorHgt = 5.25;
var supFloorTopHgt = 6.8;
var atrArchHgt = columnHgt+columnBase1Hgt+columnBase2Hgt; //6.4
var atrArchWdt = 1.42;
var atrArchSideWdt = 0.9;
var atrArchUtl = 3.57+0.69;
var columnWdt = 0.65;
var columnHgt = 5.25+0.38;
var columnBase1Hgt = 0.17;
var columnBase2Hgt = 0.26;
var capDst = 4;
var atrArchHgt = columnHgt+columnBase1Hgt+columnBase2Hgt+0.1; //6.4
var atrArchWdt = 1.42;
var atrArchSideWdt = 0.9;
var atrArchUtl = 3.57+0.69;
var tympanumBaseLgt = atrArchWdt+atrArchSideWdt*3+0.3;
var tympanumBaseHgt = extWallHgt-columnHgt-columnBase1Hgt-columnBase2Hgt-0.1;
var tympanumHgt = 2.10;
var roof1Utl = 0.4;
var roof1Hgt = tympanumHgt + 0.56 + roof1Utl/2;
var roof1Lgt = (baseHouseLgt+roof1Utl)/2;
var roof1Wdt = 3.7;
var intWallSupHgt1 = extWallHgt-supFloorHgt+0.1; 
var intWallSupHgt2 = (extWallHgt-supFloorTopHgt+0.1+tympanumHgt)*2/3;
var intStepSupLgt = (4.2/2)/11;
var intStepSupWdt = 2.9/3;
var intStepSupHgt = (supFloorTopHgt-supFloorHgt)/11;
var intStepLgt = 2/20;
var intStepWdt = 1.25/2;
var intStepHgt = (supFloorHgt/2+stepHgt)/20;

//utility per le funzioni speciali
var halfHouseIsDraw = false; 
var fullHouseIsDraw = true;
var modelTemp;

//terreno
var ground = T([0,1,2])([-20,-10,-0.1])(COLOR(ground_color)(CUBOID([40,40,0.1])));


//funzioni scale

/**
 * Crea una scala aperta sotto.
 * @param n.scalini,lunghezza scalino,larghezza scalino,altezza scalino,lunghezza ultimo scalino
 */

var stairsAlt = function(n,l,w,h,fl){
	var tZ = 0;
	var tY = 0;
	var steps = [];
	for (var i = 0; i<n-1; i++){ 
		steps.push(T([1,2])([tY,tZ])(CUBOID([w,l,h])));
		tY += l;
		tZ += h;
	}
	steps.push(T([1,2])([tY,tZ])(CUBOID([w,fl,h])));
	return STRUCT(steps);
};

/**
 * Crea una scala chiusa sotto.
 * @param n.scalini,lunghezza scalino,larghezza scalino,altezza scalino,lunghezza ultimo scalino
 */
var stairs = function(n,l,w,h,fl){
	var tZ = h;
	var tY = 0;
	var steps = [];
	for (var i = 0; i<n-1; i++){ 
		steps.push(T([1])([tY])(CUBOID([w,l,tZ])));
		tY += l;
		tZ += h;
	}
	steps.push(T([1])([tY])(CUBOID([w,fl,tZ])));
	return STRUCT(steps);
};


//corrimano
var wallStairsPts = [[0,1.15,0],[0,stairsLgt+finalStepLgt,0],[0,stairsLgt+finalStepLgt,wallStairsHgt],
	[0,stairsLgt,wallStairsHgt],[0,1.15,1.1],[-0.25,1.15,0],[-0.25,stairsLgt+finalStepLgt,0],[-0.25,stairsLgt+finalStepLgt,wallStairsHgt],
	[-0.25,stairsLgt,wallStairsHgt],[-0.25,1.15,1.1]];

var wallCells = [[0,1,2,3,4],[5,6,7,8,9],[1,2,7,6,6],[2,3,8,7,7],[3,4,9,8,8],[0,4,9,5,5],[0,1,6,5,5]];

var wallStairsSx = SIMPLICIAL_COMPLEX(wallStairsPts)(wallCells);

//baseAtrio
var baseAtr = SIMPLEX_GRID([[0.91,-1.21,0.63+stepWdt+0.25],[0.9],[baseHgt]]);
var baseAtrSide = SIMPLEX_GRID([[0.1],[-0.9,0.9,-1.42,0.9],[baseHgt]]);
var baseAtrRear = T([1])([0.9+0.9+1.42+0.9])(SIMPLEX_GRID([[baseAtrWdt],[0.3],[baseHgt]]));

var baseAtrArch1Pts = [[0,0,baseHgt-0.4],[0,1.42/2,baseHgt-0.1],[0,1.42,baseHgt-0.4]];
var baseAtrArch1 = BEZIER(S0)(baseAtrArch1Pts);
var baseAtrArch2Pts = [[0,0,baseHgt],[0,1.42,baseHgt]];
var baseAtrArch2 = BEZIER(S0)(baseAtrArch2Pts);
var baseAtrArchSurf1 = BEZIER(S1)([baseAtrArch1,baseAtrArch2]);

var baseAtrArch3Pts = baseAtrArch1Pts.map(function (p) {return [p[0]+0.1,p[1],p[2]] });
var baseAtrArch3 = BEZIER(S0)(baseAtrArch3Pts);
var baseAtrArch4Pts = baseAtrArch2Pts.map(function (p) {return [p[0]+0.1,p[1],p[2]] });
var baseAtrArch4 = BEZIER(S0)(baseAtrArch4Pts);
var baseAtrArchSurf2 = BEZIER(S1)([baseAtrArch3,baseAtrArch4]);

var baseAtrArchMap = BEZIER(S2)([baseAtrArchSurf1,baseAtrArchSurf2]);
var baseAtrArch = MAP(baseAtrArchMap)(domain1);

var baseAtrArchSide = T([1])([0.9*2])(baseAtrArch);
var baseAtrArchFront = R([0,1])(-PI/2)(T([0,1])([-0.1,0.9])(baseAtrArch));

var basementAtr = STRUCT([baseAtr,baseAtrSide,baseAtrRear,baseAtrArchSide,
					baseAtrArchFront]);

// basevilla
var baseHouseFront1 = SIMPLEX_GRID([[0.76],baseHouseDstUtl,[baseHgt]]);
var baseHouseFront2 = SIMPLEX_GRID([[-0.76,winWdt],baseHouseDstUtl,[1.15,-winMedHgt,baseHgt-1.15-winMedHgt]]);
var baseHouseFront3 = SIMPLEX_GRID([[-0.76-winWdt,baseHouseWdt-0.76-winWdt],baseHouseDstUtl,[baseHgt]]);
var baseHouseSide = SIMPLEX_GRID([[0.3],[baseHouseLgt],[baseHgt]]);
var baseHouseInt = SIMPLEX_GRID([[-0.3,baseHouseWdt-0.3],[-4.38,0.3],[baseHgt]]);
var baseHouseColumn = T([0,1])([baseHouseWdt/2,baseHouseLgt-3.5])
					(CYL_SURFACE([0.69/2,baseHgt])([20]));

var baseHouse = STRUCT([baseHouseFront1,baseHouseFront2,baseHouseFront3,baseHouseSide,baseHouseInt,baseHouseColumn]);

//pavimento
var floor1House =  CUBOID([baseHouseWdt,baseHouseLgt,stepHgt]);
var floor1Atr = T([0,1])([baseHouseWdt-baseAtrWdt,-baseAtrLgt])(CUBOID([baseAtrWdt,baseAtrLgt,stepHgt]));
var floor1 = STRUCT([floor1House,floor1Atr]);

// basamento completo
var basement = COLOR(main_color)(STRUCT([stairs(14,stepLgt,stepWdt,stepHgt,finalStepLgt),wallStairsSx,
						T([0,1])([-2.75-0.25,stairsLgt+finalStepLgt])(basementAtr),
						T([0,1])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt])(baseHouse),
						T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt,baseHgt])(floor1)]));

//muri esterni
var extFrontWall1 = SIMPLEX_GRID([[0.76],[0.3],[extWallHgt]]);
var extFrontWall2 = SIMPLEX_GRID([[-0.76,winWdt],[0.3],
								[3.09-extWallHgtUtl,-winBigHgt,8.97-3.09-winBigHgt,-winSmallHgt,extWallHgt-8.97+extWallHgtUtl-winSmallHgt]]);
var extFrontWall3 = SIMPLEX_GRID([[-0.76-winWdt,5.8-0.76-winWdt],[0.3],[extWallHgt]]);
var extFrontWall4 = SIMPLEX_GRID([[-5.8,winWdt],[0.3],[3.09-extWallHgtUtl,-winBigHgt,extWallHgt-3.09+extWallHgtUtl-winBigHgt]]);
var extFrontWall5 = SIMPLEX_GRID([[-5.8-winWdt,8.06-5.8-winWdt],[0.3],[extWallHgt]]);
var extFrontWall6 = SIMPLEX_GRID([[-8.06,mainDoorWdt],[0.3],[-3.85,extWallHgt-3.85]]);

var extFrontWall = STRUCT([extFrontWall1,extFrontWall2,extFrontWall3,extFrontWall4,extFrontWall5,extFrontWall6]);

var extSideWall1 = SIMPLEX_GRID([[0.3],[baseHouseLgt],[3.09-extWallHgtUtl]]);
var extSideWall2 = SIMPLEX_GRID([[0.3],[1.95,-winWdt,2.25,-winWdt,1.85,-winWdt,3.58],[-3.09+extWallHgtUtl,winBigHgt]]);
var extSideWall3 = SIMPLEX_GRID([[0.3],[baseHouseLgt],[-3.09+extWallHgtUtl-winBigHgt,8.97-3.09-winBigHgt]]);
var extSideWall4 = SIMPLEX_GRID([[0.3],[1.95,-winWdt,2.25,-winWdt,1.85,-winWdt,2.25,-winWdt,3.58-2.25-winWdt],[-8.97+extWallHgtUtl,winSmallHgt]]);
var extSideWall5 = SIMPLEX_GRID([[0.3],[baseHouseLgt],[-8.97+extWallHgtUtl-winSmallHgt,extWallHgt-8.97+extWallHgtUtl-winSmallHgt]]);

var extSideWall = STRUCT([extSideWall1,extSideWall2,extSideWall3,extSideWall4,extSideWall5]);

var extRearWall1 = SIMPLEX_GRID([[0.76],[0.3],[extWallHgt]]);
var extRearWall2 = SIMPLEX_GRID([[-0.76,winWdt],[0.3],
								[3.09-extWallHgtUtl,-winBigHgt,2,-winMedHgt,8.97-winMedHgt-2-winBigHgt-3.09,-winSmallHgt,extWallHgt-8.97+extWallHgtUtl-winSmallHgt]]);
var extRearWall3 = SIMPLEX_GRID([[-0.76-winWdt,2],[0.3],[extWallHgt]]);
var extRearWall4 = SIMPLEX_GRID([[-0.76-winWdt-2,winWdt],[0.3],
								[3.09-extWallHgtUtl,-winMedHgt,(winBigHgt-winMedHgt)+2,-winMedHgt,extWallHgt+extWallHgtUtl-winMedHgt-(winBigHgt-winMedHgt)-2-3.09-winMedHgt]]);
var extRearWall5 = SIMPLEX_GRID([[-0.76-winWdt-2-winWdt,0.2],[0.3],[extWallHgt]]);
var extRearWall6 = SIMPLEX_GRID([[-0.76-winWdt-2-winWdt-0.2,1.6],[0.6],[extWallHgt]]);
var extRearWall7 = SIMPLEX_GRID([[-0.76-winWdt-2-winWdt-0.2-1.6,winWdt],[0.6],[3.09-extWallHgtUtl,-winBigHgt,extWallHgt-3.09+extWallHgtUtl-winBigHgt]]);
var extRearWall8 = SIMPLEX_GRID([[-extRearDstUtl,8.06-extRearDstUtl],[0.6],[extWallHgt]]);
var extRearWall9 = SIMPLEX_GRID([[-8.06,mainDoorWdt],[0.6],[-3.85,extWallHgt-3.85]]);
var extRearWallPlus = T([1,2])([0.3,-extWallHgtUtl])(SIMPLEX_GRID([[-0.76-winWdt-2-winWdt-0.2,baseHouseWdt-0.76-winWdt-2-winWdt-0.2],[0.3],[extWallHgtUtl]]));
var extRearWall = STRUCT([extRearWall1,extRearWall2,extRearWall3,extRearWall4,extRearWall5,extRearWall6,extRearWall7,extRearWall8,extRearWall9,extRearWallPlus]);

var extWalls = COLOR(main_color)(STRUCT([T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt,extWallHgtUtl])(extFrontWall),
						T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt,extWallHgtUtl])(extSideWall),
						T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt+baseHouseLgt-0.3,extWallHgtUtl])(extRearWall)]));

//muri interni orizzontali
var intWall1 = SIMPLEX_GRID([[0.46,-intDoorWdt,6.7-intDoorWdt-0.46+0.3],[-4.2,0.3],[supFloorHgt]]);
var intWall2 = SIMPLEX_GRID([[0.46,-intDoorWdt,4.12-intDoorWdt-0.46],[-4.2-0.3-4.2,0.3],[supFloorHgt]]);
var intWallDoor1 = SIMPLEX_GRID([[-0.46,intDoorWdt],[-4.2,0.3,-4.2,0.3],[-intDoorHgt,supFloorHgt-intDoorHgt]]);

//muri interni verticali
var intWall3 = SIMPLEX_GRID([[-6.7,0.3],[(4.2/2)-intDoorWdt/2,-intDoorWdt,(4.2/2)-intDoorWdt/2],[supFloorHgt]]);
var intWallDoor2 = SIMPLEX_GRID([[-6.7,0.3],[-(4.2/2)+intDoorWdt/2,intDoorWdt],[-intDoorHgt,supFloorHgt-intDoorHgt]]);

var intWall4 = SIMPLEX_GRID([[-4.12,0.3],
							[-4.2-0.3,(4.2/2)-intDoorWdt/2,-intDoorWdt,(4.2/2)-intDoorWdt/2,0.6,-intDoorWdt,2.6-intDoorWdt-0.3],
							[supFloorTopHgt]]);
var intWall5 = SIMPLEX_GRID([[-2.6,0.3],[-8.4-0.6,2.2-intDoorWdt,-intDoorWdt,0.2],[supFloorHgt]]);
var intWallDoor3 = SIMPLEX_GRID([[-4.12,0.3],[-4.2-0.3-(4.2/2)+intDoorWdt/2,intDoorWdt,-(4.2/2)+intDoorWdt/2-0.6,intDoorWdt],[-intDoorHgt,supFloorTopHgt-intDoorHgt]]);
var intWallDoor4 = SIMPLEX_GRID([[-2.6,0.3],[-8.4-0.6-2.2+intDoorWdt,intDoorWdt],[-intDoorHgt,supFloorHgt-intDoorHgt]]);

var intWalls = COLOR(main_color)(T([0,1,2])([-baseHouseWdt+stepWdt+0.3,stairsLgt+finalStepLgt+baseAtrLgt+0.3,extWallHgtUtl])
				(STRUCT([intWall1,intWall2,intWall3,intWall4,intWall5,intWallDoor1,intWallDoor2,intWallDoor3,intWallDoor4])));

//pavimento piano superiore
var supFloor1 = SIMPLEX_GRID([[2.6+0.3],[baseHouseLgt-0.6],[stepHgt]]);
var supFloor2 = SIMPLEX_GRID([[-2.9,baseHouseWdt-2.9-0.3],[4.2],[stepHgt]]);
var supFloor3 = SIMPLEX_GRID([[-2.9,4.2-2.9],[-4.2-0.3,4.2],[stepHgt]]);
var supFloor4 = SIMPLEX_GRID([[-2.9,baseHouseWdt-2.9-0.3],[-4.2-0.3,7.1],[stepHgt]]);

var supFloor = COLOR(main_color)(T([0,1,2])([-baseHouseWdt+stepWdt+0.3,stairsLgt+finalStepLgt+baseAtrLgt+0.3,supFloorHgt+extWallHgtUtl])
				(STRUCT([supFloor1,supFloor2,supFloor3,T([2])([supFloorTopHgt-supFloorHgt])(supFloor4)])));

//muri orizzontali superiori
var intWallSup1 = SIMPLEX_GRID([[-2.9,baseHouseWdt-2.9-0.3],[-4.2,0.3],[intWallSupHgt1]]);

var intWallSup1PlusPts = [[0,0,0],[0,0,tympanumHgt-0.15],[-roof1Wdt-1,0,tympanumHgt-0.15],[-baseHouseWdt+2.9+0.3,0,tympanumHgt-0.7],[-baseHouseWdt+2.9+0.3,0,0],
						  [0,0.3,0],[0,0.3,tympanumHgt],[-roof1Wdt-0.9,0.3,tympanumHgt],[-baseHouseWdt+2.9+0.3,0.3,tympanumHgt-0.7],[-baseHouseWdt+2.9+0.3,0.3,0]];

var intWallSup1PlusCells = [[0,1,2,3,4],[5,6,7,8,9],[0,1,6,5,0]];
var intWallSup1Plus = T([0,1,2])([2.9+baseHouseWdt-2.9-0.3,4.2,supFloorTopHgt-supFloorHgt+extWallHgt-supFloorTopHgt+0.1])
						(SIMPLICIAL_COMPLEX(intWallSup1PlusPts)(intWallSup1PlusCells));

var intWallSup2 = SIMPLEX_GRID([[-2.9,4.2-2.9],[-8.4-0.3,0.3],[supFloorTopHgt-supFloorHgt]]);

//muri veritcali superiori
var intWallSup3 = SIMPLEX_GRID([[-2.9,0.3],[(4.2/2)-intDoorWdt/2,-intDoorWdt,4.2/2-intDoorWdt/2],[intWallSupHgt1]]);

var intWallSup3PlusPts = [[0,0,0],[0,4.5,0],[0,4.5,tympanumHgt-0.57],[0,(4.2/2)+intDoorWdt+0.35,tympanumHgt-0.57],
						  [0.3,0,0],[0.3,4.5,0],[0.3,4.5,tympanumHgt-0.49],[0.3,(4.2/2)+intDoorWdt+0.35,tympanumHgt-0.57]];

var intWallSup3PlusCells = [[0,1,2,3],[4,5,6,7]];
var intWallSup3Plus = T([0,2])([2.9,supFloorTopHgt-supFloorHgt+extWallHgt-supFloorTopHgt+0.1])
						(SIMPLICIAL_COMPLEX(intWallSup3PlusPts)(intWallSup3PlusCells));

var intWallSup4 = SIMPLEX_GRID([[-2.9,0.3],[-4.2-0.3,1.5,-intDoorWdt],[-supFloorTopHgt+supFloorHgt,intWallSupHgt2]]);

var intWallSup4PlusPts = [[0,0,0],[0,0,tympanumHgt-1.23],[0,1.5+intDoorWdt,tympanumHgt-1.23],[0,1.5+intDoorWdt,0],
							[0.3,0,0],[0.3,0,tympanumHgt-1.15],[0.3,1.5+intDoorWdt,tympanumHgt-1.15],[0.3,1.5+intDoorWdt,0]];
var intWallSup4PlusCells = [[0,1,2,3],[4,5,6,7],[0,4,5,1]];
var intWallSup4Plus = T([0,1,2])([2.9,4.2+0.3,supFloorTopHgt-supFloorHgt+intDoorHgt])
						(SIMPLICIAL_COMPLEX(intWallSup4PlusPts)(intWallSup4PlusCells));

var intWallSup5 = SIMPLEX_GRID([[-2.9,0.3],[-4.2-0.3-1.5-intDoorWdt,6.9-1.5-intDoorWdt],[-supFloorTopHgt+supFloorHgt,extWallHgt-supFloorTopHgt+0.1]]);

var intWallSup5PlusPts = [[0,0,0],[0,0,tympanumHgt-0.57],[0,1.2,tympanumHgt-0.57],[0,6.9-1.5-intDoorWdt,0],
							[0.3,0,0],[0.3,0,tympanumHgt-0.49],[0.3,1.2,tympanumHgt-0.49],[0.3,6.9-1.5-intDoorWdt,0]];
var intWallSup5PlusCells = [[0,1,2,3],[4,5,6,7],[0,4,5,1]];
var intWallSup5Plus = T([0,1,2])([2.9,4.2+0.3+1.5+intDoorWdt,supFloorTopHgt-supFloorHgt+extWallHgt-supFloorTopHgt+0.1])
						(SIMPLICIAL_COMPLEX(intWallSup5PlusPts)(intWallSup5PlusCells));

var intWallSupDoor1 = SIMPLEX_GRID([[-2.9,0.3],[-(4.2/2)+intDoorWdt/2,intDoorWdt],[-intDoorHgt-stepHgt,intWallSupHgt1-intDoorHgt]]);
var intWallSupDoor2 = SIMPLEX_GRID([[-2.9,0.3],[-4.2-0.3-1.5,intDoorWdt],[-intDoorHgt,-supFloorTopHgt+supFloorHgt,intWallSupHgt2-intDoorHgt]]);

var intWallSup = COLOR(main_color)(T([0,1,2])([-baseHouseWdt+stepWdt+0.3,stairsLgt+finalStepLgt+baseAtrLgt+0.3,supFloorHgt+extWallHgtUtl])
					(STRUCT([intWallSup1,intWallSup2,intWallSup3,intWallSup4,intWallSup5,intWallSup1Plus,intWallSup3Plus,intWallSup4Plus,intWallSup5Plus,intWallSupDoor1,intWallSupDoor2])));

//scalette piano superiore
var intStairsSup =	T([0,1,2])
						([-baseHouseWdt+stepWdt+0.3+2.9,+4.2+0.3+4.2+stairsLgt+finalStepLgt+baseAtrLgt+0.3,supFloorHgt+extWallHgtUtl+stepHgt])
					 		(R([0,1])([PI])(stairs(11,intStepSupLgt,intStepSupWdt,intStepSupHgt,intDoorWdt)));

//scale interne 
var intStairs1 =T([0,1,2])
					([-baseHouseWdt+stepWdt+0.3+2.9+1.25,stairsLgt+finalStepLgt+baseAtrLgt+baseHouseLgt-0.5,extWallHgtUtl])
					 	(R([0,1])([PI])(stairsAlt(20,intStepLgt,intStepWdt,intStepHgt,0.4)));

var intStairs2 =T([0,1,2])
					([-baseHouseWdt+stepWdt+0.3+2.9,stairsLgt+finalStepLgt+baseAtrLgt+baseHouseLgt-0.5-2.2,extWallHgtUtl+supFloorHgt/2])
					 	(stairsAlt(20,intStepLgt,intStepWdt,intStepHgt,0.5));
var intStairs = COLOR(main_color)(STRUCT([intStairs1,intStairs2,intStairsSup]));

// atrio
var atrArch1Pts = [[0,atrArchSideWdt,atrArchUtl-0.69],[0,atrArchSideWdt,atrArchUtl],[0,atrArchSideWdt+atrArchWdt/2,atrArchUtl],
					[0,atrArchSideWdt+atrArchWdt,atrArchUtl],[0,atrArchSideWdt+atrArchWdt,atrArchUtl-0.69]];
var atrArch1 = BEZIER(S0)(atrArch1Pts);
var atrArch2Pts = [[0,atrArchSideWdt,atrArchHgt],[0,atrArchWdt+atrArchSideWdt,atrArchHgt]];
var atrArch2 = BEZIER(S0)(atrArch2Pts);
var atrArchSurf1 = BEZIER(S1)([atrArch1,atrArch2]);

var atrArch3Pts = atrArch1Pts.map(function (p) {return [p[0]+atrArchSideWdt,p[1],p[2]] });
var atrArch3 = BEZIER(S0)(atrArch3Pts);
var atrArch4Pts = atrArch2Pts.map(function (p) {return [p[0]+atrArchSideWdt,p[1],p[2]] });
var atrArch4 = BEZIER(S0)(atrArch4Pts);
var atrArchSurf2 = BEZIER(S1)([atrArch3,atrArch4]);

var atrArchMap = BEZIER(S2)([atrArchSurf1,atrArchSurf2]);
var atrArch = MAP(atrArchMap)(domain1);

var atrArchSide = SIMPLEX_GRID([[atrArchSideWdt],[atrArchSideWdt,-atrArchWdt,atrArchSideWdt+0.3],[atrArchHgt]]);

//colonna
var columnBase1 = CUBOID([0.9,0.9,columnBase1Hgt]);

var columnBase2Profile = CUBIC_HERMITE(S0)([[0.45,0,0],[0,0,columnBase2Hgt/2],[0,0,0.8],[0,0,0]]);
var columnBase2Surf = ROTATIONAL_SURFACE(columnBase2Profile);
var columnBase2 = MAP(columnBase2Surf)(domain2);

var columnBase3Profile = CUBIC_HERMITE(S0)([[0.38,0,columnBase2Hgt/2],[0,0,columnBase2Hgt],[0,0,0.8],[0,0,0]]);
var columnBase3Surf = ROTATIONAL_SURFACE(columnBase3Profile);
var columnBase3 = MAP(columnBase3Surf)(domain2);

var shaft = CYL_SURFACE([columnWdt/2,columnHgt])([32,2]);

var columnBase = STRUCT([T([0,1,2])([-0.45,-0.45,-columnBase1Hgt])(columnBase1),columnBase2,columnBase3,
							T([2])([columnBase2Hgt])(shaft)]);

//capitello
var capital1Pts = [[0,0,0],[-1.5,0,0],[-1.5,0,2.5],[2,0,2],[2,0,-1],[0,0,-1],[-2,0,-0.5],[-2,0,2],[1,0,1.5]];
var capital1 = BEZIER(S0)(capital1Pts);
var capital2Pts = [[0,0,0],[-1.4,0,0.1],[-1.4,0,2.4],[1.9,0,1.8],[1.8,0,-0.9],[0.1,0,-0.9],[-1.9,0,-0.4],[-1.9,0,1.9],[1,0,1.5]];
var capital2 = BEZIER(S0)(capital2Pts);
var capitalSurf1 = BEZIER(S1)([capital1,capital2]);

var capital3Pts = capital1Pts.map(function (p) {return [p[0],p[1]+capDst,p[2]]});
var capital3 = BEZIER(S0)(capital3Pts);
var capital4Pts = capital2Pts.map(function (p) {return [p[0],p[1]+capDst,p[2]]});
var capital4 = BEZIER(S0)(capital4Pts);
var capitalSurf2 = BEZIER(S1)([capital3,capital4]);

var capitalSurf3 = BEZIER(S1)([capital1,BEZIER(S0)([[0,0,0]])]);

var capitalMap = BEZIER(S2)([capitalSurf1,capitalSurf2]);
var capitalPart1 = MAP(capitalMap)(domain3);
var capitalPart2 = T([0])([2.5])(S([0])([-1])(capitalPart1));
var capitalPart3 = T([0,1,2])([-0.3,0.2,1])(CUBOID([3,capDst-0.25,0.8]));
var capitalPart4 = T([1])([0.2])(MAP(capitalSurf3)(domain3));
var capitalPart5 = T([0])([2.5])(S([0])([-1])(capitalPart4));
var capitalPart6 = T([1])([capDst-0.4])(capitalPart4);
var capitalPart7 = T([0])([2.5])(S([0])([-1])(capitalPart6));

var capital = T([0,1,2])([-0.25,-0.4,columnHgt])
				(S([0,1,2])([0.2,0.2,0.2])
				(STRUCT([capitalPart1,capitalPart2,capitalPart3,capitalPart4,capitalPart5,capitalPart6,capitalPart7])));

var column = STRUCT([columnBase,capital]);

var column1 = T([0,1,2])([0.45,-0.45,columnBase1Hgt])(column);
var column2 = T([0])([2.75-0.35])(column1);

//timpano
var tympanumBase = T([1,2])([-0.9,atrArchHgt])(CUBOID([baseAtrWdt,tympanumBaseLgt,tympanumBaseHgt]));

var tympanumPts = [[0,0,0],[baseAtrWdt,0,0],[baseAtrWdt,0,tympanumHgt],[0,0.6,0],[baseAtrWdt,0.6,0],[baseAtrWdt,0.6,tympanumHgt]];
var tympanumCells = [[0,1,2,0],[3,4,5,3],[1,4,5,2],[0,3,5,2]];

var tympanum = SIMPLICIAL_COMPLEX(tympanumPts)(tympanumCells);
var tympanum1 = T([1,2])([-0.9,atrArchHgt+tympanumBaseHgt])(tympanum);
var tympanum2 = T([1])([tympanumBaseLgt-0.3])(tympanum1);
var tympanum3 = T([0,1])([-0.125,tympanumBaseLgt+baseHouseLgt-0.3])(S([0])([1.03])(tympanum1));

var atrium = COLOR(main_color)(T([0,1,2])([-2.75-0.25,stairsLgt+finalStepLgt+0.9,extWallHgtUtl])
			(STRUCT([column1,column2,atrArchSide,atrArch,tympanumBase,tympanum1,tympanum2,tympanum3])));

//tetto
var roof1Pts = [[0,0,0],[baseHouseWdt+roof1Utl/2,0,0],[baseHouseWdt+roof1Utl/2,roof1Lgt,roof1Hgt],[baseHouseWdt + roof1Utl/2 -roof1Wdt,roof1Lgt,roof1Hgt]];
var roof1Cells = [[0,1,2,3]];
var roof1 = SIMPLICIAL_COMPLEX(roof1Pts)(roof1Cells);

var roof2Pts = [[0,0,0],[baseHouseWdt+roof1Utl/2-roof1Wdt,roof1Lgt,roof1Hgt],[0,baseHouseLgt+roof1Utl,0]];
var roof2Cells = [[0,1,2]];
var roof2 = SIMPLICIAL_COMPLEX(roof2Pts)(roof2Cells);

var roof3 = T([1])([baseHouseLgt+roof1Utl])(S([1])([-1])(roof1));

var roofFrontPts = [[0,0,0],[baseAtrWdt+roof1Utl/2,0,tympanumHgt+0.1],[baseAtrWdt+roof1Utl/2,tympanumBaseLgt+4.76+roof1Utl/2,tympanumHgt+0.1],[0,tympanumBaseLgt+roof1Utl/2,0]];
var roofFrontCells = [[0,1,2,3]];
var roofFront = T([0,1])([baseHouseWdt-baseAtrWdt,-tympanumBaseLgt-roof1Utl/2])(SIMPLICIAL_COMPLEX(roofFrontPts)(roofFrontCells));

var roofRearPts = [[0,0,0],[baseAtrWdt+roof1Utl,-4.76,tympanumHgt+0.1],[baseAtrWdt+roof1Utl,1,tympanumHgt+0.1],[0,1,0]];
var roofRearCells = [[0,1,2,3]];
var roofRear = T([0,1])([baseHouseWdt-baseAtrWdt-roof1Utl/2,baseHouseLgt+roof1Utl])(SIMPLICIAL_COMPLEX(roofRearPts)(roofRearCells));

var roof = COLOR(roof_color)(T([0,1,2])([-baseHouseWdt+stepWdt-roof1Utl/2,stairsLgt+finalStepLgt+baseAtrLgt-roof1Utl/2,extWallHgtUtl+extWallHgt-roof1Utl/4.5])
			(STRUCT([roof1,roof2,roof3,roofFront,roofRear])));

//ornamenti esterni

//cornice inferiore
var extLowFrame1 = CUBOID([baseHouseWdt-baseAtrWdt+0.2,0.2,0.95/2]);
var extLowFrame2 = T([0,1,2])([0.1,0.1,0.95/2])(CUBOID([baseHouseWdt-baseAtrWdt+0.1,0.1,0.95/2]));

var extLowFrame3 = CUBOID([0.2,baseHouseLgt+0.4,0.95/2]);
var extLowFrame4 = T([0,1,2])([0.1,0.1,0.95/2])(CUBOID([0.1,baseHouseLgt+0.2,0.95/2]));

var extLowFrame5 = T([0,1])([0.2,baseHouseLgt+0.2])(CUBOID([0.76+winWdt+2+winWdt+0.2,0.2,0.95/2]));
var extLowFrame6 = T([0,1,2])([0.2,baseHouseLgt+0.2,0.95/2])(CUBOID([0.76+winWdt+2+winWdt+0.2,0.1,0.95/2]));

var extLowFrame7 = T([0,1])([0.76+winWdt+2+winWdt+0.2+0.2,baseHouseLgt+0.3+0.2])(CUBOID([baseHouseWdt-0.76-winWdt-2-winWdt-0.2,0.2,0.95/2]));
var extLowFrame8 = T([0,1,2])([0.76+winWdt+2+winWdt+0.2+0.2,baseHouseLgt+0.3+0.2,0.95/2])(CUBOID([baseHouseWdt-0.76-winWdt-2-winWdt-0.2,0.1,0.95/2]));

var extLowFrame9 = T([0,1])([0.76+winWdt+2+winWdt+0.2,baseHouseLgt+0.2])(CUBOID([0.2,0.3+0.2,0.95/2]));
var extLowFrame10 = T([0,1,2])([0.76+winWdt+2+winWdt+0.3,baseHouseLgt+0.2,0.95/2])(CUBOID([0.1,0.3+0.1,0.95/2]));

var extLowFrame11 = T([1])([-baseAtrLgt+0.2])(SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt,0.2],[0.9,0.9,-1.42,0.9+0.2],[0.95/2]]));
var extLowFrame12 = T([1])([-baseAtrLgt+0.2])(SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt-0.1,0.1],[0.9,0.9,-1.42,0.9+0.2],[-0.95/2,0.95/2]]));

var extLowFrame13 = T([1])([-baseAtrLgt])(SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt,0.91+0.2,-1.21,0.63],[0.2],[0.95/2]]));
var extLowFrame14 = T([1])([-baseAtrLgt+0.1])(SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt-0.1,0.91+0.1,-1.21,0.63],[0.1],[-0.95/2,0.95/2]]));

var extLowFrames = COLOR(main_color)(T([0,1])([-baseHouseWdt+stepWdt-0.2,stairsLgt+finalStepLgt+baseAtrLgt-0.2])
					(STRUCT([extLowFrame1,extLowFrame2,extLowFrame3,extLowFrame4,extLowFrame5,
								extLowFrame6,extLowFrame7,extLowFrame8,extLowFrame9,extLowFrame10,
									extLowFrame11,extLowFrame12,extLowFrame13,extLowFrame14])));

//cornice centrale
var extMidFrame1 = CUBOID([baseHouseWdt-baseAtrWdt+0.1,0.1,0.25]);
var extMidFrame2 = T([0,1,2])([0.05,0.05,0.25])(CUBOID([baseHouseWdt-baseAtrWdt+0.05,0.05,0.3]));

var extMidFrame3 = CUBOID([0.1,baseHouseLgt+0.2,0.25]);
var extMidFrame4 = T([0,1,2])([0.05,0.05,0.25])(CUBOID([0.05,baseHouseLgt+0.1,0.3]));

var extMidFrame5 = T([0,1])([0.1,baseHouseLgt+0.1])(CUBOID([0.76+winWdt+2+winWdt+0.2,0.1,0.25]));
var extMidFrame6 = T([0,1,2])([0.1,baseHouseLgt+0.1,0.25])(CUBOID([0.76+winWdt+2+winWdt+0.2,0.05,0.3]));

var extMidFrame7 = T([0,1])([0.76+winWdt+2+winWdt+0.2+0.1,baseHouseLgt+0.3+0.1])(CUBOID([baseHouseWdt-0.76-winWdt-2-winWdt-0.2-mainDoorWdt,0.1,0.25]));
var extMidFrame8 = T([0,1,2])([0.76+winWdt+2+winWdt+0.2+0.1,baseHouseLgt+0.3+0.1,0.25])(CUBOID([baseHouseWdt-0.76-winWdt-2-winWdt-0.2-mainDoorWdt,0.05,0.3]));

var extMidFrame9 = T([0,1])([0.76+winWdt+2+winWdt+0.2,baseHouseLgt+0.1])(CUBOID([0.1,0.3+0.1,0.25]));
var extMidFrame10 = T([0,1,2])([0.76+winWdt+2+winWdt+0.25,baseHouseLgt+0.1,0.25])(CUBOID([0.05,0.3+0.05,0.3]));

var extMidFrame11 = T([1])([-baseAtrLgt+0.1])(SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt,0.1],[baseAtrLgt],[0.25]]));
var extMidFrame12 = T([1])([-baseAtrLgt+0.1])(SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt-0.05,0.05,-0.9,0.05],[-0.9,0.9,-1.42,0.9+0.3],[-0.25,0.3]]));

var extMidFrame13 = T([1])([-baseAtrLgt])(SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt,0.91+0.1,1.21,0.63],[0.1],[0.25]]));

var extMidFrames = COLOR(main_color)(T([0,1,2])([-baseHouseWdt+stepWdt-0.1,stairsLgt+finalStepLgt+baseAtrLgt-0.1,extWallHgtUtl-0.25])
					(STRUCT([extMidFrame1,extMidFrame2,extMidFrame3,extMidFrame4,extMidFrame5,
								extMidFrame6,extMidFrame7,extMidFrame8,extMidFrame9,extMidFrame10,
									extMidFrame11,extMidFrame12,extMidFrame13])));

//cornice superiore
var extTopFrame1 = SIMPLEX_GRID([[0.76+0.05,-winWdt,baseHouseWdt-baseAtrWdt-0.77-winWdt],[0.05],[winSmallHgt+0.2]])
var extTopFrame1Plus = SIMPLEX_GRID([[-0.76-0.05,winWdt],[0.05],[0.1,-winSmallHgt,0.1]])
var extTopFrame2 = T([0,1,2])([-0.05,-0.05,winSmallHgt+0.2])(CUBOID([baseHouseWdt-baseAtrWdt+0.1,0.1,0.25]));
var extTopFrame2Plus = T([0,1,2])([-0.1,-0.1,winSmallHgt+0.2+0.25])(CUBOID([baseHouseWdt-baseAtrWdt+0.15,0.15,0.1]));

var extTopFrame3 = SIMPLEX_GRID([[0.05],[1.95+0.05,-winWdt,2.25,-winWdt,1.85,-winWdt,2.25,-winWdt,3.58-2.25-winWdt],[winSmallHgt+0.2]]);
var extTopFrame3Plus = SIMPLEX_GRID([[0.05],[-1.95-0.05,winWdt,-2.25,winWdt,-1.85,winWdt,-2.25,winWdt],[0.1,-winSmallHgt,0.1]]);
var extTopFrame4 = T([0,1,2])([-0.05,0.05,winSmallHgt+0.2])(CUBOID([0.1,baseHouseLgt+0.1,0.25]));
var extTopFrame4Plus = T([0,1,2])([-0.1,0.05,winSmallHgt+0.2+0.25])(CUBOID([0.15,baseHouseLgt+0.15,0.1]));

var extTopFrame5 = SIMPLEX_GRID([[0.76+0.05,-winWdt,2+winWdt+0.2],[-baseHouseLgt-0.05,0.05],[winSmallHgt+0.2]])
var extTopFrame5Plus = SIMPLEX_GRID([[-0.76-0.05,winWdt,-2-winWdt-0.2],[-baseHouseLgt-0.05,0.05],[0.1,-winSmallHgt,0.1]])
var extTopFrame6 = T([0,1,2])([-0.05,baseHouseLgt+0.05,winSmallHgt+0.2])(CUBOID([baseHouseWdt-baseAtrWdt+0.1,0.1,0.25]));
var extTopFrame6Plus = T([0,1,2])([-0.1,baseHouseLgt+0.05,winSmallHgt+0.2+0.25])(CUBOID([baseHouseWdt-baseAtrWdt,0.15,0.1]));

var extTopFrame7 = T([0,1])([0.76+winWdt+2+winWdt+0.2+0.05,baseHouseLgt+0.3+0.05])(CUBOID([baseHouseWdt-0.76-winWdt-2-winWdt-0.2,0.05,winSmallHgt+0.2]));
var extTopFrame8 = T([0,1,2])([0.76+winWdt+2+winWdt+0.2+0.05,baseHouseLgt+0.3+0.05,winSmallHgt+0.2])(CUBOID([baseHouseWdt-0.76-winWdt-2-winWdt-0.2,0.1,0.25]));
var extTopFrame8Plus = T([0,1,2])([0.76+winWdt+2+winWdt+0.2+0.05,baseHouseLgt+0.3+0.05,winSmallHgt+0.2+0.25])(CUBOID([baseHouseWdt-0.76-winWdt-2-winWdt-0.2,0.15,0.1]));

var extTopFrame9 = T([0,1])([0.76+winWdt+2+winWdt+0.2,baseHouseLgt+0.05])(CUBOID([0.05,0.3+0.05,winSmallHgt+0.2]));
var extTopFrame10 = T([0,1,2])([0.76+winWdt+2+winWdt+0.15,baseHouseLgt+0.05,winSmallHgt+0.2])(CUBOID([0.1,0.3+0.1,0.25]));
var extTopFrame10Plus = T([0,1,2])([0.76+winWdt+2+winWdt+0.1,baseHouseLgt+0.05,winSmallHgt+0.2+0.25])(CUBOID([0.15,0.3+0.15,0.1]));

var extTopFrame11 = T([1])([-baseAtrLgt+0.05])(SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt,0.05],[baseAtrLgt],[winSmallHgt+0.2]]));
var extTopFrame12 = T([1])([-baseAtrLgt+0.05])(SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt+0.05,0.1],[baseAtrLgt],[-winSmallHgt-0.2,0.25]]));
var extTopFrame12Plus = T([1])([-baseAtrLgt+0.05])(SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt+0.1,0.15],[baseAtrLgt],[-winSmallHgt-0.2-0.25,0.1]]));

var extTopFrame13 = T([1])([-baseAtrLgt])(SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt,baseAtrWdt+0.05],[0.05],[winSmallHgt+0.2]]));
var extTopFrame14 = T([1])([-baseAtrLgt-0.05])(SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt+0.05,baseAtrWdt+0.1],[0.1],[-winSmallHgt-0.2,0.25]]));
var extTopFrame14Plus = T([1])([-baseAtrLgt-0.1])(SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt+0.1,baseAtrWdt+0.15],[0.15],[-winSmallHgt-0.2-0.25,0.1]]));

var extTopFrames = COLOR(main_color)(T([0,1,2])([-baseHouseWdt+stepWdt-0.05,stairsLgt+finalStepLgt+baseAtrLgt-0.05,8.97-0.1])
					(STRUCT([extTopFrame1,extTopFrame1Plus,extTopFrame2,extTopFrame2Plus,extTopFrame3,extTopFrame3Plus,extTopFrame4,extTopFrame4Plus,
						extTopFrame5,extTopFrame5Plus,extTopFrame6,extTopFrame6Plus,extTopFrame7,extTopFrame8,extTopFrame8Plus,extTopFrame9,extTopFrame10,extTopFrame10Plus,
									extTopFrame11,extTopFrame12,extTopFrame12Plus,extTopFrame13,extTopFrame14,extTopFrame14Plus])));

//cornice timpano

var tympanumFrame1 = T([0,1,2])([-baseAtrWdt+stepWdt,stairsLgt+finalStepLgt-0.15,extWallHgtUtl+atrArchHgt+tympanumBaseHgt-0.11])
						(R([0,2])([-PI/6.8])(CUBOID([baseAtrWdt+0.5,0.15,0.1])));

var tympanumFrame2 = T([0,1,2])([-baseAtrWdt+stepWdt+0.5,stairsLgt+finalStepLgt-0.1,extWallHgtUtl+atrArchHgt+tympanumBaseHgt+0.02])
						(R([0,2])([-PI/6.8])(SIMPLEX_GRID([REPLICA(12)([0.1,-0.27]),[0.1],[0.1]])));

var tympanumFrame3 = T([0,1,2])([-baseAtrWdt+stepWdt+0.3,stairsLgt+finalStepLgt-0.1,extWallHgtUtl+atrArchHgt+tympanumBaseHgt-0.1])
						(SIMPLEX_GRID([REPLICA(12)([0.1,-0.24]),[0.1],[0.1]]));

var tympanumFrameRear = T([0,1,2])([-baseAtrWdt+stepWdt-0.1,stairsLgt+finalStepLgt+baseHouseLgt+baseAtrLgt+0.3,extWallHgtUtl+atrArchHgt+tympanumBaseHgt-0.11])
						(R([0,2])([-PI/7])(CUBOID([baseAtrWdt+0.6,0.15,0.1])));
var tympanumFrames =  COLOR(main_color)(STRUCT([tympanumFrame1,tympanumFrame2,tympanumFrame3,tympanumFrameRear]));

// cornici finestre modello
var winFrame1Pts1 = [[0,0,0], [0.35,0,0], [0,0,0], [0,0,0]];
var winFrame1Pts2 = [[0,0,0.1], [0.35,0,0.1], [0,0,0], [0,0,0]];
var winFrame1Pts3 = [[0,0,0], [0,0.2,0], [0,0,0], [0,0,0]];
var winFrame1Pts4 = [[0,0,0.1], [0,0.2,0.1], [0,0,0], [0,0,0]];
var winFrame1_1 = CUBIC_HERMITE(S0)(winFrame1Pts1);
var winFrame1_2 = CUBIC_HERMITE(S0)(winFrame1Pts2);
var winFrame1_3 = CUBIC_HERMITE(S0)(winFrame1Pts3);
var winFrame1_4 = CUBIC_HERMITE(S0)(winFrame1Pts4);

var winFrame1S1_1 = CUBIC_HERMITE(S1)([winFrame1_1,winFrame1_2,[-0.3,-0.3,0], [0.3,0.3,0]]);
var winFrame1S1_2 = CUBIC_HERMITE(S1)([winFrame1_1,winFrame1_2,[0,-0.3,0], [0,0.3,0]]);
var winFrame1S1_3 = CUBIC_HERMITE(S1)([winFrame1_3,winFrame1_4,[-0.3,-0.3,0], [0.3,0.3,0]]);

var winFrame1Surf1 = MAP(winFrame1S1_1)(domain4);
var winFrame1Surf2 = T([0])([0.81])(S([0])([-1])(winFrame1Surf1));
var winFrame1Surf3 = T([0])([0.2])(MAP(winFrame1S1_2)(domain4));
var winFrame1Surf4 = MAP(winFrame1S1_3)(domain4);
var winFrame1Surf5 = T([0])([0.81])(S([0])([-1])(winFrame1Surf4));

var winFrame1 = T([0,2])([-0.01,winBigHgt+0.05])
				(STRUCT([winFrame1Surf1,winFrame1Surf2,winFrame1Surf3,winFrame1Surf4,winFrame1Surf5]));

var winFrame2 = T([0,1])([-0.05,-0.05])
				(SIMPLEX_GRID([[0.05,-winWdt,0.05],[0.05],[winBigHgt]]));
var winFrame3 = T([0,1,2])([-0.1,-0.05,-0.1])
				(CUBOID([winWdt+0.2,0.05,0.1]));

var winFrame4 = T([0,1,2])([-0.05,-0.05,winBigHgt])
				(CUBOID([winWdt+0.1,0.05,0.05]));

var winFrame5 = T([0,1,2])([-0.1,-0.05,winBigHgt+0.05+0.1])
				(CUBOID([winWdt+0.2,0.05,0.1]));

var winFrame6 = T([0,1,2])([-0.15,-0.15,winBigHgt+0.05+0.1+0.1])
				(CUBOID([winWdt+0.3,0.15,0.025]));

var winFrame = COLOR(main_color)(STRUCT([winFrame1,winFrame2,winFrame3,winFrame4,winFrame5,winFrame6]));

//cornici finestre frontali
var winFramesFront1 = T([0,1,2])([-baseHouseWdt+stepWdt+0.76,stairsLgt+finalStepLgt+baseAtrLgt,3.09])(winFrame);

var winFramesFront2 = T([0,1,2])([-baseHouseWdt+stepWdt+5.8,stairsLgt+finalStepLgt+baseAtrLgt,3.09])(winFrame);

//cornici finestre laterali
var winFramesSide1 = T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt+1.95+winWdt,3.09])
						(R([0,1])([-PI/2])(winFrame));

var winFramesSide2 = T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt+1.95+winWdt+2.25+winWdt,3.09])
						(R([0,1])([-PI/2])(winFrame));

var winFramesSide3 = T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt+1.95+winWdt+2.25+winWdt+1.85+winWdt,3.09])
						(R([0,1])([-PI/2])(winFrame));

//cornici finestre posteriori
var winFramesRear1 = T([0,1,2])([-baseHouseWdt+stepWdt+0.76+winWdt,baseHouseLgt+stairsLgt+finalStepLgt+baseAtrLgt,3.09])
						(R([0,1])([PI])(winFrame));

var winFramesRear2 = T([0,1,2])([-baseHouseWdt+stepWdt+0.76+winWdt*3+2+1.8,baseHouseLgt+stairsLgt+finalStepLgt+baseAtrLgt+0.3,3.09])
						(R([0,1])([PI])(winFrame));

var winFrames = STRUCT([winFramesFront1,winFramesFront2,winFramesSide1,winFramesSide2,winFramesSide3,winFramesRear1,winFramesRear2])

//infisso finestra modello
var winBigGlass = COLOR(winGlass_color)(SIMPLEX_GRID([[winWdt],[-0.025,0.05],[winBigHgt]]));
var winBigFixture1 = COLOR(winStruct_color)(SIMPLEX_GRID([[0.02,-winWdt/2+0.03,0.02,-winWdt/2+0.03,0.02],[0.1],[winBigHgt]]));
var winBigFixture2 = COLOR(winStruct_color)(SIMPLEX_GRID([[winWdt],[0.1],[0.02,-winBigHgt+0.04,0.02]]));
var winBigFixture = STRUCT([winBigGlass,winBigFixture1,winBigFixture2]);

var winMedGlass = COLOR(winGlass_color)(SIMPLEX_GRID([[winWdt],[-0.025,0.05],[winMedHgt]]));
var winMedFixture1 = COLOR(winStruct_color)(SIMPLEX_GRID([REPLICA(5)([0.02,(-winWdt+0.1)/4]),[0.1],[winMedHgt]]));
var winMedFixture2 = COLOR(winStruct_color)(SIMPLEX_GRID([[winWdt],[0.1],REPLICA(5)([0.02,(-winMedHgt+0.1)/4])]));
var winMedFixture = STRUCT([winMedGlass,winMedFixture1,winMedFixture2]);

var winSmallGlass = COLOR(winGlass_color)(SIMPLEX_GRID([[winWdt],[-0.025,0.05],[winSmallHgt]]));
var winSmallFixture1 = COLOR(winStruct_color)(SIMPLEX_GRID([REPLICA(5)([0.02,(-winWdt+0.1)/4]),[0.1],[winSmallHgt]]));
var winSmallFixture2 = COLOR(winStruct_color)(SIMPLEX_GRID([[winWdt],[0.1],REPLICA(5)([0.02,(-winSmallHgt+0.1)/4])]));
var winSmallFixture = STRUCT([winSmallGlass,winSmallFixture1,winSmallFixture2]);

//infissi finestre frontali
var winBigFixturesFront1 =  T([0,1,2])([-baseHouseWdt+stepWdt+0.76,stairsLgt+finalStepLgt+baseAtrLgt,3.09])(winBigFixture);
var winBigFixturesFront2 =  T([0,1,2])([-baseHouseWdt+stepWdt+5.8,stairsLgt+finalStepLgt+baseAtrLgt,3.09])(winBigFixture);

var winMedFixturesFront =  T([0,1,2])([-baseHouseWdt+stepWdt+0.76,stairsLgt+finalStepLgt+baseAtrLgt,1.15])(winMedFixture);

var winSmallFixturesFront =  T([0,1,2])([-baseHouseWdt+stepWdt+0.76,stairsLgt+finalStepLgt+baseAtrLgt,8.97])(winSmallFixture);

//infissi finestre laterali
var winBigFixturesSide1 =  T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt+1.95+winWdt,3.09])
						(R([0,1])([-PI/2])((winBigFixture)));

var winBigFixturesSide2 = T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt+1.95+winWdt+2.25+winWdt,3.09])
						(R([0,1])([-PI/2])(winBigFixture));

var winBigFixturesSide3 = T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt+1.95+winWdt+2.25+winWdt+1.85+winWdt,3.09])
						(R([0,1])([-PI/2])(winBigFixture));

var winSmallFixturesSide1 =  T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt+1.95+winWdt,8.97])
						(R([0,1])([-PI/2])((winSmallFixture)));

var winSmallFixturesSide2 = T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt+1.95+winWdt+2.25+winWdt,8.97])
						(R([0,1])([-PI/2])(winSmallFixture));

var winSmallFixturesSide3 = T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt+1.95+winWdt+2.25+winWdt+1.85+winWdt,8.97])
						(R([0,1])([-PI/2])(winSmallFixture));

var winSmallFixturesSide4 = T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt+1.95+winWdt+2.25+winWdt+1.85+winWdt+2.25+winWdt,8.97])
						(R([0,1])([-PI/2])(winSmallFixture));

//infissi finestre posteriori
var winBigFixturesRear1 = T([0,1,2])([-baseHouseWdt+stepWdt+0.76+winWdt,baseHouseLgt+stairsLgt+finalStepLgt+baseAtrLgt,3.09])
						(R([0,1])([PI])(winBigFixture));

var winBigFixturesRear2 = T([0,1,2])([-baseHouseWdt+stepWdt+0.76+winWdt*3+2+1.8,baseHouseLgt+stairsLgt+finalStepLgt+baseAtrLgt+0.3,3.09])
						(R([0,1])([PI])(winBigFixture));

var winMedFixturesRear1 =  T([0,1,2])([-baseHouseWdt+stepWdt+0.76+winWdt,baseHouseLgt+stairsLgt+finalStepLgt+baseAtrLgt,1.15])
						(R([0,1])([PI])(winMedFixture));
var winMedFixturesRear2 =  T([0,1,2])([-baseHouseWdt+stepWdt+0.76+winWdt,baseHouseLgt+stairsLgt+finalStepLgt+baseAtrLgt,3.09+winBigHgt+2])
						(R([0,1])([PI])(winMedFixture));
var winMedFixturesRear3 =  T([0,1,2])([-baseHouseWdt+stepWdt+0.76+2+winWdt*2,baseHouseLgt+stairsLgt+finalStepLgt+baseAtrLgt,3.09+winBigHgt+2])
						(R([0,1])([PI])(winMedFixture));
var winMedFixturesRear4 =  T([0,1,2])([-baseHouseWdt+stepWdt+0.76+2+winWdt*2,baseHouseLgt+stairsLgt+finalStepLgt+baseAtrLgt,3.09])
						(R([0,1])([PI])(winMedFixture));

var winSmallFixturesRear = T([0,1,2])([-baseHouseWdt+stepWdt+0.76+winWdt,baseHouseLgt+stairsLgt+finalStepLgt+baseAtrLgt,8.97])
						(R([0,1])([PI])(winSmallFixture));

var winFixtures = STRUCT([winBigFixturesFront1,winBigFixturesFront2,winMedFixturesFront,winSmallFixturesFront,
							winBigFixturesSide1,winBigFixturesSide2,winBigFixturesSide3,winSmallFixturesSide1,winSmallFixturesSide2,winSmallFixturesSide3,winSmallFixturesSide4,
								winBigFixturesRear1,winBigFixturesRear2,winMedFixturesRear1,winMedFixturesRear2,winMedFixturesRear3,winMedFixturesRear4,winSmallFixturesRear]);

//balconata posteriore
var balconyFloor = CUBOID([mainDoorWdt+0.2,0.6,stepHgt]);
var balconyBanister1 = SIMPLEX_GRID([REPLICA(5)([0.1,(-mainDoorWdt+0.2+0.1)/4]),[-0.5,0.1],[-stepHgt,0.5]]);
var balconyBanister2 = SIMPLEX_GRID([[0.1],[-0.1,0.1,-0.1,0.1],[-stepHgt,0.5]]);
var balconyBanister3 = SIMPLEX_GRID([[mainDoorWdt+0.2],[-0.5,0.2],[-stepHgt-0.5,0.08]]);
var balconyBanister4 = T([0])([-0.1])(SIMPLEX_GRID([[0.2],[0.7],[-stepHgt-0.5,0.08]]));


var balconyRear = COLOR(main_color)(T([0,1,2])([stepWdt-mainDoorWdt-0.2,baseHouseLgt+stairsLgt+finalStepLgt+baseAtrLgt+0.3,baseHgt])
				(STRUCT([balconyFloor,balconyBanister1,balconyBanister2,balconyBanister3,balconyBanister4])));

//ringhiera frontale
var frontBanister1 = T([0,1])([0.92,0.35])(SIMPLEX_GRID([REPLICA(7)([0.1,(-2.75+0.9+0.6+0.5)/6]),[0.1],[0.6]]));
var frontBanister2 = T([0,1])([0.75,0.25])(SIMPLEX_GRID([[2.75-0.9],[0.2],[-0.6,0.05]]));

var frontSideBanister1 = T([0,1])([0.1,0.9*2+0.05])(SIMPLEX_GRID([[0.1],REPLICA(6)([0.1,(-1.42+0.7)/5]),[0.6]]));
var frontSideBanister2 = T([1])([0.9*2])(SIMPLEX_GRID([[0.2],[1.42],[-0.6,0.05]]));

var frontBanister = COLOR(main_color)(T([0,1,2])([-baseAtrWdt+stepWdt,stairsLgt+finalStepLgt,extWallHgtUtl])
						(STRUCT([frontBanister1,frontBanister2,frontSideBanister1,frontSideBanister2])));

//porte
var mainDoor = T([0,1])([8.06,0.15])(CUBOID([0.15,mainDoorWdt,3.85]));

var mainDoorRear = T([0,1])([8.06,baseHouseLgt-mainDoorWdt+0.15 ])(CUBOID([0.15,mainDoorWdt,3.85]));

var  intDoor1 = T([0,1])([6.7-intDoorWdt+0.3+0.15,(4.2/2)-intDoorWdt/2+0.3])(CUBOID([intDoorWdt,0.1,intDoorHgt]));

var  intDoor2 = T([0,1])([4.2-intDoorWdt+0.3,4.2+0.3+(4.2/2)-intDoorWdt/2+0.3])(CUBOID([intDoorWdt,0.1,intDoorHgt]));

var  intDoor3 = T([0,1])([4.2-intDoorWdt+0.3,4.2*2+0.3*2+2.2-intDoorWdt*2])(CUBOID([intDoorWdt,0.1,intDoorHgt]));

var  intDoor4 = T([0,1])([2.6-intDoorWdt+0.3+0.15,4.2*2+0.3*2+2.6-0.1-intDoorWdt])(CUBOID([intDoorWdt,0.1,intDoorHgt]));

var  intDoor5 = T([0,1,2])([2.9+0.3+0.15,(4.2/2)-intDoorWdt/2+0.3,supFloorHgt+stepHgt])(CUBOID([intDoorWdt,0.1,intDoorHgt]));

var  intDoor6 = T([0,1,2])([2.9+0.3+0.15,4.2+0.3+1.5+0.3,supFloorTopHgt+stepHgt])(CUBOID([intDoorWdt,0.1,intDoorHgt-0.18]));

var  intDoor7 = T([0,1])([0.46+intDoorWdt-0.1+0.3,4.2+0.15+0.3-intDoorWdt])(CUBOID([0.1,intDoorWdt,intDoorHgt]));

var  intDoor8 = T([0,1])([0.46+intDoorWdt-0.1+0.3,4.2+4.2+0.15+0.3+0.3])(CUBOID([0.1,intDoorWdt,intDoorHgt]));

var doors = COLOR(door_color)(T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt,extWallHgtUtl])
				(STRUCT([mainDoor,mainDoorRear,intDoor1,intDoor2,intDoor3,intDoor4,intDoor5,intDoor6,intDoor7,intDoor8])));

// cornici porte

//cornice porta grande frontale
var mainDoorFrames1 =  CUBOID([0.1,0.05,3.85]);
var mainDoorFrames2 = T([2])([3.85])(CUBOID([mainDoorWdt+0.1,0.05,0.1]));
var mainDoorFrames3 = T([0,1,2])([0.05,0.06,3.85+0.1])(S([0,1,2])([1.7,1.5,1.6])(STRUCT([winFrame1Surf1,winFrame1Surf3,winFrame1Surf4])));
var mainDoorFrames4 = T([0,2])([-0.1,3.85+0.1+0.15])(CUBOID([mainDoorWdt+0.2,0.05,0.15]));
var mainDoorFrames5 = T([0,1,2])([-0.2,-0.1,3.85+0.1+0.15+0.15])(CUBOID([mainDoorWdt+0.3,0.15,0.05]));


var mainDoorFrames = COLOR(main_color)(T([0,1,2])([stepWdt-mainDoorWdt-0.1,stairsLgt+finalStepLgt+baseAtrLgt-0.05,extWallHgtUtl])
					(STRUCT([mainDoorFrames1,mainDoorFrames2,mainDoorFrames3,mainDoorFrames4,mainDoorFrames5])));

//cornice porta grande posteriore
var mainDoorRearFrames = T([1])([(stairsLgt+finalStepLgt+baseAtrLgt)*2+baseHouseLgt+0.3])
								(STRUCT([S([1])([-1])(mainDoorFrames)]));

//cornici porte interne primo piano
var intDoorFrame1 = T([0,1])([6.7+0.6,(4.2/2)-0.1])
				(S([0,1,2])([0.6,1.0125,0.785])
				(R([0,1])([PI/2])(STRUCT([winFrame1,winFrame2,winFrame4,winFrame5,winFrame6]))));

var intDoorFrame2 = T([0,1])([6.7+0.3,(4.2/2)+intDoorWdt-0.1])
				(S([0,1,2])([0.6,1.0125,0.785])
				(R([0,1])([-PI/2])(STRUCT([winFrame1,winFrame2,winFrame4,winFrame5,winFrame6]))));

var intDoorFrame3 = T([0,1])([4.2+0.52,4.2+0.3+(4.2/2)-0.1])
				(S([0,1,2])([0.6,1.0125,0.785])
				(R([0,1])([PI/2])(STRUCT([winFrame1,winFrame2,winFrame4,winFrame5,winFrame6]))));

var intDoorFrame4 = T([0,1])([4.2+0.22,4.2+0.3+(4.2/2)+intDoorWdt-0.1])
				(S([0,1,2])([0.6,1.0125,0.785])
				(R([0,1])([-PI/2])(STRUCT([winFrame1,winFrame2,winFrame4,winFrame5,winFrame6]))));	

var intDoorFrame5 = T([0,1])([4.2+0.52,4.2*2+0.3*2+2.2-intDoorWdt*2])
				(S([0,1,2])([0.6,1.0125,0.785])
				(R([0,1])([PI/2])(STRUCT([winFrame1,winFrame2,winFrame4,winFrame5,winFrame6]))));

var intDoorFrame6 = T([0,1])([2.6+0.3,4.2*2+0.3+2.2-0.2+intDoorWdt])
				(S([0,1,2])([0.6,1.0125,0.785])
				(R([0,1])([-PI/2])(STRUCT([winFrame1,winFrame2,winFrame4,winFrame5,winFrame6]))));	

var intDoorFrame7 = T([0,1])([0.46+0.3,4.2+4.2+0.3+0.3])
				(S([0,1,2])([1.0125,0.6,0.785])
				(STRUCT([winFrame1,winFrame2,winFrame4,winFrame5,winFrame6])));

var intDoorFrame8 = T([0,1])([0.46+0.3+intDoorWdt,4.2+4.2+0.3+0.3+0.3])
				(S([0,1,2])([1.0125,0.6,0.785])
				(R([0,1])([PI])(STRUCT([winFrame1,winFrame2,winFrame4,winFrame5,winFrame6]))));	

var intDoorFrame9 = T([0,1])([0.46+0.3,4.2+0.3])
				(S([0,1,2])([1.0125,0.6,0.785])
				(STRUCT([winFrame1,winFrame2,winFrame4,winFrame5,winFrame6])));

var intDoorFrame10 = T([0,1])([0.46+0.3+intDoorWdt,4.2+0.3+0.3])
				(S([0,1,2])([1.0125,0.6,0.785])
				(R([0,1])([PI])(STRUCT([winFrame1,winFrame2,winFrame4,winFrame5,winFrame6]))));	

var intDoorFrames =  COLOR(main_color)(T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt,extWallHgtUtl])
						(STRUCT([intDoorFrame1,intDoorFrame2,intDoorFrame3,intDoorFrame4,intDoorFrame5,intDoorFrame6,intDoorFrame7,intDoorFrame8,intDoorFrame9,intDoorFrame10])));

//decorazioni varie

//cornice stanza interna
var intRoomFrame1 = T([0])([6.7+0.6])(CUBOID([baseHouseWdt-6.7-0.6,0.02,0.15]));
var intRoomFrame2 = T([0])([6.7+0.6])(CUBOID([0.02,4.2+0.3,0.15]));
var intRoomFrame3 = T([0,1])([4.12+0.6,4.2+0.3])(CUBOID([baseHouseWdt-4.12-0.6-(baseHouseWdt-6.7-0.6)+0.02,0.02,0.15]));

var intRoomFrames= COLOR(main_color)(T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+baseAtrLgt+0.3,extWallHgtUtl+3.85+0.15])
						(STRUCT([intRoomFrame1,intRoomFrame2,intRoomFrame3])));

//cornice atrio 
var atrFrame1 = SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt,0.9],[0.05,-0.9,0.05,-1.42+0.1,0.05],[0.1]]);

var atrFrame2 = SIMPLEX_GRID([[-baseHouseWdt+baseAtrWdt+0.05,0.05,-0.9,0.05],[0.9+0.1,-1.42+0.1,0.9+0.3+0.05],[0.1]]);


var atrFrame3Pts = [[0,0,0],[0,0.2,0],[0,0.25,0.4],[0,-0.05,0.4],[1,0,0],[1,0.2,0],[1,0.25,0.4],[1,-0.05,0.4]];

var atrFrame3Cells = [[0,1,2,3],[4,5,6,7],[0,4,7,3],[1,5,6,2],[2,6,7,3],[0,4,5,1]];

var atrFrame3 = T([0,1,2])([baseHouseWdt-baseAtrWdt-0.05,0.9+0.68,0.71])(SIMPLICIAL_COMPLEX(atrFrame3Pts)(atrFrame3Cells));

var atrFrames = COLOR(main_color)(T([0,1,2])([-baseHouseWdt+stepWdt,stairsLgt+finalStepLgt+0.9-0.05,extWallHgtUtl+3.4])
						(STRUCT([atrFrame1,atrFrame2,atrFrame3])));

//statua modello

//testa
var headSurf = BEZIER(S0)([[0,0,0],[3,0,0],[3,0,0],[3,0,3],[3,0,6],[3,0,6],[0,0,6]]);
var headMap = ROTATIONAL_SURFACE(headSurf);
var head = T([2])([30.5])(MAP(headMap)(domain2));


//torace
var chestSurf = BEZIER(S0)([[0,0,0],[5,0,0],[5,0,0],[5,0,0],[5,0,7],[5,0,14],[5,0,14],[5,0,14],[1,0,15],[1,0,15],[2,0,16]]);
var chestMap = ROTATIONAL_SURFACE(chestSurf);
var chest = T([2])([15])(MAP(chestMap)(domain2));

//gambe
var leg1 = T([0])([-2])(CYL_SURFACE([2,16])([20,2]));
var leg2 = T([0])([2])(CYL_SURFACE([2,16])([20,2]));

//braccia
var arm1Pts1 = [[0,0,0], [3,0,2], [0,0,0], [5,0,0]];
var arm1Pts2 = [[-1,0,1], [4,0,3], [0,0,1], [6,0,0]];

var arm1_1 = CUBIC_HERMITE(S0)(arm1Pts1);
var arm1_2 = CUBIC_HERMITE(S0)(arm1Pts2);

var armS1 = CUBIC_HERMITE(S1)([arm1_1,arm1_2,[0,-3,0], [0,3,0]]);

var arm1Surf1 = MAP(armS1)(domain4);

var arm1Surf2 = S([1])([-1])(arm1Surf1);

var arm1Pts3 = [[1,0,0], [0,0,1], [0,0,2], [-2,0,0]];
var arm1Pts4 = [[2.5,0,0], [0,0,2.5], [0,0,4], [-4,0,0]];

var arm1_3 = CUBIC_HERMITE(S0)(arm1Pts3);
var arm1_4 = CUBIC_HERMITE(S0)(arm1Pts4);

var armS2 = CUBIC_HERMITE(S1)([arm1_3,arm1_4,[0,-3,0], [0,3,0]]);

var arm1Surf3 = R([0,2])([-PI/4])(T([2])([-1])(R([0,1])([PI])(MAP(armS2)(domain4))));
var arm1Surf4 = R([0,2])([-PI/4])(T([2])([-1])(R([0,1])([PI])(S([1])([-1])(MAP(armS2)(domain4)))));

var arm1Pts5 = [[3,0,2], [3,0,2], [0,0,0], [0,0,0]];
var arm1Pts6 = [[4,0,3], [4,0,3], [0,0,0], [0,0,0]];

var arm1_5 = CUBIC_HERMITE(S0)(arm1Pts5);
var arm1_6 = CUBIC_HERMITE(S0)(arm1Pts6);

var armS3 = CUBIC_HERMITE(S1)([arm1_5,arm1_6,[0,3,0], [0,-3,0]]);
var armS4 = CUBIC_HERMITE(S1)([arm1_5,arm1_6,[0,0,0], [0,0,0]]);
var armEnd = BEZIER(S2)([armS3,armS4]);

var arm1Surf5 = MAP(armEnd)(domain1);
var arm1Surf6 = S([1])([-1])(arm1Surf5);
var arm1 = T([0,1,2])([-5,-2,27]) 
				(S([0,1,2])([2,2,1])
					(R([0,1])([-PI/2])
						(R([1,2])([PI/2])
							(STRUCT([arm1Surf1,arm1Surf2,arm1Surf3,arm1Surf4,arm1Surf5,arm1Surf6])))));

var arm2 = T([1,2])([-28,27])(R([0,1])([PI])(R([1,2])([PI/2])(arm1)))

//statue
var statueBase1 = CUBOID([0.3,0.3,0.3]);
var statueBase2 = T([0,1,2])([-0.025,-0.025,0.3])(CUBOID([0.35,0.35,0.05]));
var statueBase3 = T([0,1,2])([-0.05,-0.05,0.35])(CUBOID([0.4,0.4,0.01]));
var statueBase4 = T([0,1,2])([-0.025,-0.025,0.36])(CUBOID([0.35,0.35,0.05]));

var statueBase = STRUCT([statueBase1,statueBase2,statueBase3,statueBase4]);

var statueBody = T([0,1,2])([0.15,0.15,0.36])(S([0,1,2])([0.03,0.03,0.03])(STRUCT([head,chest,leg1,leg2,arm1,arm2])));
var statue = STRUCT([statueBase,statueBody]);

var statue1 = T([0,1])([-baseHouseWdt+stepWdt+0.1,stairsLgt+finalStepLgt+baseAtrLgt])(statue);
var statue2 = T([0,1])([-baseAtrWdt+stepWdt+0.1,stairsLgt+finalStepLgt])(statue);
var statue3 = T([0,1,2])([stepWdt-0.15,stairsLgt+finalStepLgt,tympanumHgt-0.1])(statue);

var statues = COLOR(statue_color)(T([1,2])([0.15,extWallHgt+extWallHgtUtl])(STRUCT([statue1,statue2,statue3])));
var statuesRight = COLOR(statue_color)(T([1,2])([0.15,extWallHgt+extWallHgtUtl])(STRUCT([statue1,statue2])));

var decorations = STRUCT([extLowFrames,extMidFrames,extTopFrames,tympanumFrames,
				winFrames,winFixtures,balconyRear,frontBanister,doors,mainDoorFrames,mainDoorRearFrames,intDoorFrames,intRoomFrames,
					atrFrames]);

var leftHouse = STRUCT([basement,extWalls,supFloor,intWalls,intWallSup,atrium,roof,intStairs,decorations]);

var rightHouse = T([0])([stepWdt*2])(S([0])([-1])(STRUCT([leftHouse,statuesRight])));

var fullHouse = STRUCT([leftHouse,statues,rightHouse,ground]);

DRAW(fullHouse);

modelTemp = fullHouse.clone();

// funzioni spelciali


/**
 * Visualizza metà villa.
 * 
 */
var drawHalfHouse = function(){
	if (halfHouseIsDraw){
		CANCEL(leftHouse);
		DRAW(leftHouse);
		fullHouseIsDraw = true;
	}
	else { 
		CANCEL(fullHouse);
		fullHouseIsDraw = false;
		DRAW(leftHouse);
		halfHouseIsDraw = true;
		modelTemp = leftHouse.clone();

	}

};

/**
 * Visualizza la villa completa
 * 
 */
var drawFullHouse = function(){
	if (halfHouseIsDraw){
		CANCEL(leftHouse);
		halfHouseIsDraw = false;
		DRAW(fullHouse);
		fullHouseIsDraw = true;
	}
	else { 
		CANCEL(fullHouse);
		DRAW(fullHouse);
		fullHouseIsDraw = true;
	}
};

/**
 * Mette in trasparenza i muri esterni
 * 
 */
var viewInternal = function(){
	   main_color[3]=0.5;

	if (halfHouseIsDraw){

		leftHouse.structs[1].color(main_color);
		leftHouse.structs[8].structs[1].color(main_color);
		leftHouse.structs[8].structs[2].color(main_color);
	}

	if(fullHouseIsDraw){
		fullHouse.structs[0].structs[1].color(main_color);
		fullHouse.structs[0].structs[8].structs[1].color(main_color);
		fullHouse.structs[0].structs[8].structs[2].color(main_color);

		fullHouse.structs[2].structs[0].structs[1].color(main_color);
		fullHouse.structs[2].structs[0].structs[8].structs[1].color(main_color);
		fullHouse.structs[2].structs[0].structs[8].structs[2].color(main_color);
	}
};

/**
 * Toglie la trasparenza dei muri esterni
 * 
 */
var viewExternal = function(){
	if (halfHouseIsDraw){
		CANCEL(leftHouse);
		leftHouse = modelTemp.clone();
		DRAW(leftHouse);
	}

	if(fullHouseIsDraw){
		CANCEL(fullHouse);
 		fullHouse = modelTemp.clone();
 		DRAW(fullHouse);
	}
	
};

/**
 * Rimuove i muri esterni
 * 
 */
var removeExtWalls = function(){
	if (halfHouseIsDraw){

		leftHouse.structs[1].hide();
		leftHouse.structs[8].structs[1].hide();
		leftHouse.structs[8].structs[2].hide();
	}

	if(fullHouseIsDraw){
		fullHouse.structs[0].structs[1].hide();
		fullHouse.structs[0].structs[8].structs[1].hide();
		fullHouse.structs[0].structs[8].structs[2].hide();

		fullHouse.structs[2].structs[0].structs[1].hide();
		fullHouse.structs[2].structs[0].structs[8].structs[1].hide();
		fullHouse.structs[2].structs[0].structs[8].structs[2].hide();
	}
};

/**
 * Ripristina i muri esterni
 * 
 */
var addExtWalls = function(){
	if (halfHouseIsDraw){

		leftHouse.structs[1].show();
		leftHouse.structs[8].structs[1].show();
		leftHouse.structs[8].structs[2].show();
	}

	if(fullHouseIsDraw){
		fullHouse.structs[0].structs[1].show();
		fullHouse.structs[0].structs[8].structs[1].show();
		fullHouse.structs[0].structs[8].structs[2].show();

		fullHouse.structs[2].structs[0].structs[1].show();
		fullHouse.structs[2].structs[0].structs[8].structs[1].show();
		fullHouse.structs[2].structs[0].structs[8].structs[2].show();
	}
};

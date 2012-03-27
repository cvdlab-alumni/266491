var dominio = DOMAIN([[0,1]])([10]);
/* p e' un array di m coordinate */
var mapping = function(p) {
	var u = p[0];

	return [u,1];
};
/* mappa ritorna nuovo dominio MAP(funzione mapping)(dominio da mappare) */
var mapped = MAP(mapping)(dominio);

/*****/

var dominioBisettrice = DOMAIN([[0,10]])([100]);

var mappingBisettrice = function(p) {
	var u = p[0];

	return [u,u];
};

var mappedBisettrice = MAP(mappingBisettrice)(dominioBisettrice);

/****/

var dominioSin = DOMAIN([[0,100*PI]])([1000]);

var mappingSin = function(p) {
	var u = p[0];

	return [u,SIN(u)];
};

var mappedSin = MAP(mappingSin)(dominioSin);
DRAW(mappedSin);

/****/


var drawCircle = function(r,n) {
	var dominioCircle = DOMAIN([[0,2*PI]])([n]);

	var mappingCircle = function(p) {
		var u = p[0];
		return [r * COS(u), r * SIN(u)];
	};

	var mappedCircle = MAP(mappingCircle)(dominioCircle);
	DRAW(mappedCircle);
};

/*****/

var drawCilinder = function(r,h,n,m,color) {
	var dominioCircle = DOMAIN([[0,2*PI],[0,h]])([n,m]);

	var mappingCircle = function(p) {
		var u = p[0];
		var v = p[1];
		return [r * COS(u), r * SIN(u), v];
	};

	var mappedCircle = MAP(mappingCircle)(dominioCircle);
	DRAW(mappedCircle);
	COLOR(color)(mappedCircle);
};

/****/
// dominio bidimensionale
// x,y,z,raggio
// x = raggio * cos(alfa) * cos(beta)
// y = raggio * cos(alfa) * sin(beta)
// z = raggio * sin(alfa)
// raggio
var drawSphere = function(r,n,color) {
	var dominioCircle = DOMAIN([[0,2*PI],[0,PI]])([n,2*n]);

	var mappingCircle = function(p) {
		var u = p[0];
		var v = p[1];
		return [ r * SIN(v) * SIN(u), r * SIN(v) * COS(u) , r * COS(v)];
	};

	var mappedCircle = MAP(mappingCircle)(dominioCircle);
	DRAW(mappedCircle);
	// COLOR(color)(mappedCircle);
};

/*
	se l'altezza del punto generico x,y,z e' r sin(alfa) dove alfa e' l'angolo tra il raggio e il piano
	quando il cos(alfa) ovvero la proiezione del punto e' = 0 mi trovo sull'asse z, quando e' = 1 sulla circofenrenza massima
	assumo che cos(alfa) sia il fattore di scala delle varie circonferenze concentriche che definiscono la sfera guardandola da sopra
	assunto cio' le coordinate restanti x e y sono le classiche cordinate di una crf con l'alnglo tra la proiezione e l'asse
	quizi
	z = r * sin(alfa)
	y = r * cos(alfa) * sin(beta)
	x = r * cos(alfa) * cos(beta)

	alfa variera' tra -pi/2 e pi/2 che per limiti di plasm verra' definito come 0,pi a cui sottrarre pi/2
	beta e' tra 0,2pi

	definita cosi' pero' chiudo il piano dal lato non illuminato per evitare questo effetto moltiplico la z per -1
	(inverto la normale?)
*/
var drawSphereNew = function(r,n,color) {
	var dominioCircle = DOMAIN([[0,PI],[0,2*PI]])([n,2*n]);

	var mappingCircle = function(p) {
		var u = p[0] - PI/2; // alfa
		var v = p[1]; // beta
		return [ r * COS(u) * COS(v), r * COS(u) * SIN(v), r * SIN(u) * -1];
	};

	var mappedCircle = MAP(mappingCircle)(dominioCircle);
	DRAW(mappedCircle);
	// COLOR(color)(mappedCircle);
};
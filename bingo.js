var POSSIBLE_ITEMS = [
	"Proposition Wins",
	"Opposition Wins",
	"Party Polemic",
	"A Member is Fined",
	"A Speaker Swears",
	"Point of Order Results in Thunderous Applause",
	'"On your feet, Mr. Dobbin!"',
	"Both Sides Agree",
	"The House Abstains",
	"A Speaker Goes Over 7 Minutes",
	"Shame, Resign!",
	"Shakespeare is Quoted",
	"Somebody Mentions Trump",
	"Somebody Mentions Nazis",
	"Memes are Mentioned",
	"A Speaker Appears to be Intoxicated",
	"POI During Protected Time",
	"No Barracking!",
	"A Speaker Takes No POIs",
	"Chair Shortage",
	"Maiden Speech",
	"Somebody Leaves Early",
	"A Drink is Spilled",
	"Mjönir, Hammer of the Thunder God and Slayer of the World Serpent Jörmungandr, is stolen",
	"Frivolous PMB Emailed In",
	"A Speech Lasts Less Than 6 Minutes",
	"Matthew Bradley's Presidency is Mentioned",
	"Dermot Mentions South Armagh"
]

console.log(POSSIBLE_ITEMS);

// To identify each user uniquely, we store the time they first accessed the page as
// a cookie. Since it doesn't need to be absolutely unique, and the chance of collision
// is very small, this is good enough for Literific work.
if (getCookie("accessCookie") == "") {
	var d = new Date();
	setCookie("accessCookie", d.getTime(), 365);
	console.log("Attempted to set cookie. Value is: " + getCookie("accessCookie"));
} else {
	console.log("Cookie Present. Value is: " + getCookie("accessCookie"));
}

function crossOut(canvas) {
	canvasRect = canvas.getBoundingClientRect();
	canvasLeftCoord = canvasRect.left;
	canvasTopCoord  = canvasRect.top;

	var newImage = document.createElement("img");
	newImage.setAttribute('id', (canvas.id).substr(-2))
	newImage.setAttribute('src', 'godkinhead.png');
	newImage.setAttribute('class', 'overlays');
	newImage.setAttribute('onclick', "this.remove(); lineChecker()");
	newImage.style.left = canvasLeftCoord + "px";
	newImage.style.top = canvasTopCoord + "px";
	newImage.style.opacity = "0.5";
	document.body.appendChild(newImage);

	lineChecker()
}

function lineChecker() {
	var stamp_array = [];
	const diagids1 = ['00', '11', '22', '33', '44'];
	const diagids2 = ['04', '13', '22', '31', '40'];

	const nodeList = document.querySelectorAll("img[src='godkinhead.png']");

	var horcounter = {0:0, 1:0, 2:0, 3:0, 4:0};
	var vercounter = {0:0, 1:0, 2:0, 3:0, 4:0};
	var diacount1 = 0;
	var diacount2 = 0;

	var bingobefore = 0;
	var bingoafter = 0;

	for (i = 0; i < nodeList.length; i++) {
		stamp_array.push(nodeList[i].id);
	}

	for (let coord of stamp_array){
		if (document.getElementById(coord).style.filter == "invert(1)") {
			bingobefore++;
		}
	}

	// count horizontal stamps
	for (coord in Object.keys(horcounter)){
		for (let coord1 of stamp_array){
			if (coord1.charAt(0) == coord) {
				horcounter[coord]++;
			}
		}
	}

	// count vertical stamps
	for (coord in Object.keys(vercounter)){
		for (let coord1 of stamp_array){
			if (coord1.charAt(1) == coord) {
				vercounter[coord]++;
			}
		}
	}

	// count diagonal stamps
	for (let coord1 of stamp_array){
		if (coord1.charAt(0) == coord1.charAt(1)) {
			diacount1++;
			if (coord1.charAt(0) && coord1.charAt(1) == 2) {
				diacount2++;
			}
		} else if ((Number(coord1.charAt(0)) + Number(coord1.charAt(1))) == 4) {
			diacount2++;
		}
	}

	// update stamps

	// clear horizontal inversion
	for (coord in Object.keys(horcounter)){
		if (horcounter[coord] != 5) {
			for (i = 0; i < 5; i++) {
				try {
					document.getElementById(coord + i).style.filter = "invert(0)";
				} catch {
				}
			}
		}
	}

	// clear vertical inversion
	for (coord in Object.keys(vercounter)){
		if (vercounter[coord] != 5) {
			for (i = 0; i < 5; i++) {
				try {
					document.getElementById(i + coord).style.filter = "invert(0)";
				} catch {
				}
			}
		}
	}

	// clear diagonal 1 inversion
	if (diacount1 != 5) {
		for (let coord of diagids1) {
			try {
				document.getElementById(coord).style.filter = "invert(0)";
			} catch {
			}
		}
	}

	// clear diagonal 2 inversion
	if (diacount2 != 5) {
		for (let coord of diagids2) {
			try {
				document.getElementById(coord).style.filter = "invert(0)";
			} catch {
			}
		}
	}

	for (coord in Object.keys(horcounter)){
		if (horcounter[coord] == 5) {
			for (i = 0; i < 5; i++) {
				document.getElementById(coord + i).style.filter = "invert(1)";
			}
		}
	}

	for (coord in Object.keys(vercounter)){
		if (vercounter[coord] == 5) {
			for (let i = 0; i < 5; i++) {
				document.getElementById(i + coord).style.filter = "invert(1)";
			}
		}
	}

	if (diacount1==5){
		for (let coord of diagids1) {
			document.getElementById(coord).style.filter = "invert(1)";
		}
	}

	if (diacount2==5){
		for (let coord of diagids2) {
			document.getElementById(coord).style.filter = "invert(1)";
		}
	}

	for (let coord of stamp_array){
		if (document.getElementById(coord).style.filter == "invert(1)") {
			bingoafter++;
		}
	}

	if ((bingobefore < bingoafter)) {
		var canvas = document.getElementById("canvas 00");
		canvasRect = canvas.getBoundingClientRect();
		canvasLeftCoord = canvasRect.left;
		canvasTopCoord  = canvasRect.top;
		
		var newImage = document.createElement("img");
		newImage.setAttribute('id', 'BINGO')
		newImage.setAttribute('src', 'godkinhead.png');
		newImage.setAttribute('class', 'bingooverlay');
		newImage.setAttribute('onclick', "this.remove()");
		newImage.style.left = canvasLeftCoord + "px";
		newImage.style.top = canvasTopCoord + "px";
		newImage.style.opacity = "1";
		document.body.appendChild(newImage);
		confetti();
	}
}

function displayBingoSheet(itemArray) {
	for (var i = 0; i < itemArray.length; i++) {
		for (var j = 0; j < itemArray[i].length; j++) {
			var canvas = document.getElementById("canvas " + i + j);
			var ctx = canvas.getContext("2d");
			ctx.font = 'bold 18pt Garamond';
			ctx.textAlign = "center";
			ctx.fillStyle = "#FFFFFF";
			wrapText(ctx, itemArray[i][j], canvas.width / 2, (canvas.height / 2) - 35, canvas.width, 22);
		}
	}
}

function generateBingoSheet() {
	// The rng's seed is the current day and the user's identifier.
	// This means each user gets one sheet per day.
	var rngSeed = getDaysSinceEpoch() + getCookie("accessCookie");
	var rng = new Random(rngSeed);

	var allItems = POSSIBLE_ITEMS.slice(0);
	var finalItemArray = [];

	for (var i = 0; i < 5; i++) {
		var row = [];
		for (var j = 0; j < 5; j++) {
			var index = rng.next() % allItems.length;
			row[j] = allItems.splice(index, 1)[0];
		}
		finalItemArray[i] = row;
	}

	return finalItemArray;
}

function getDaysSinceEpoch() {
	var d = new Date();
	return Math.floor(d.getTime() / 86400000);
}

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
	var name = cname + "=";
	var decodedCookie = decodeURIComponent(document.cookie);
	var ca = decodedCookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
	var line = '';

	for (var n = 0; n < words.length; n++) {
		var testLine = line + words[n] + ' ';
		var metrics = context.measureText(testLine);
		var testWidth = metrics.width;
		if (testWidth > maxWidth && n > 0) {
			context.fillText(line, x, y);
			line = words[n] + ' ';
			y += lineHeight;
		}
		else {
			line = testLine;
		}
	}
	context.fillText(line, x, y);
}

/**
 * Creates a pseudo-random value generator. The seed must be an integer.
 *
 * Uses an optimized version of the Park-Miller PRNG.
 * http://www.firstpr.com.au/dsp/rand31/
 */
function Random(seed) {
	this._seed = seed % 2147483647;
	if (this._seed <= 0) this._seed += 2147483646;
}

/**
 * Returns a pseudo-random value between 1 and 2^32 - 2.
 */
Random.prototype.next = function () {
	return this._seed = this._seed * 16807 % 2147483647;
};


/**
 * Returns a pseudo-random floating point number in range [0, 1).
 */
Random.prototype.nextFloat = function (opt_minOrMax, opt_max) {
	// We know that result of next() will be 1 to 2147483646 (inclusive).
	return (this.next() - 1) / 2147483646;
};

function confetti() {
  // Globals
  var random = Math.random
	, cos = Math.cos
	, sin = Math.sin
	, PI = Math.PI
	, PI2 = PI * 2
	, timer = undefined
	, frame = undefined
	, confetti = [];

  var particles = 10
	, spread = 40
	, sizeMin = 3
	, sizeMax = 12 - sizeMin
	, eccentricity = 10
	, deviation = 100
	, dxThetaMin = -.1
	, dxThetaMax = -dxThetaMin - dxThetaMin
	, dyMin = .13
	, dyMax = .18
	, dThetaMin = .4
	, dThetaMax = .7 - dThetaMin;

  var colorThemes = [
	function() {
	  return color(200 * random()|0, 200 * random()|0, 200 * random()|0);
	}, function() {
	  var black = 200 * random()|0; return color(200, black, black);
	}, function() {
	  var black = 200 * random()|0; return color(black, 200, black);
	}, function() {
	  var black = 200 * random()|0; return color(black, black, 200);
	}, function() {
	  return color(200, 100, 200 * random()|0);
	}, function() {
	  return color(200 * random()|0, 200, 200);
	}, function() {
	  var black = 256 * random()|0; return color(black, black, black);
	}, function() {
	  return colorThemes[random() < .5 ? 1 : 2]();
	}, function() {
	  return colorThemes[random() < .5 ? 3 : 5]();
	}, function() {
	  return colorThemes[random() < .5 ? 2 : 4]();
	}
  ];
  function color(r, g, b) {
	return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  // Cosine interpolation
  function interpolation(a, b, t) {
	return (1-cos(PI*t))/2 * (b-a) + a;
  }

  // Create a 1D Maximal Poisson Disc over [0, 1]
  var radius = 1/eccentricity, radius2 = radius+radius;
  function createPoisson() {
	// domain is the set of points which are still available to pick from
	// D = union{ [d_i, d_i+1] | i is even }
	var domain = [radius, 1-radius], measure = 1-radius2, spline = [0, 1];
	while (measure) {
	  var dart = measure * random(), i, l, interval, a, b, c, d;

	  // Find where dart lies
	  for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
		a = domain[i], b = domain[i+1], interval = b-a;
		if (dart < measure+interval) {
		  spline.push(dart += a-measure);
		  break;
		}
		measure += interval;
	  }
	  c = dart-radius, d = dart+radius;

	  // Update the domain
	  for (i = domain.length-1; i > 0; i -= 2) {
		l = i-1, a = domain[l], b = domain[i];
		// c---d          c---d  Do nothing
		//   c-----d  c-----d    Move interior
		//   c--------------d    Delete interval
		//         c--d          Split interval
		//       a------b
		if (a >= c && a < d)
		  if (b > d) domain[l] = d; // Move interior (Left case)
		  else domain.splice(l, 2); // Delete interval
		else if (a < c && b > c)
		  if (b <= d) domain[i] = c; // Move interior (Right case)
		  else domain.splice(i, 0, c, d); // Split interval
	  }

	  // Re-measure the domain
	  for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
		measure += domain[i+1]-domain[i];
	}

	return spline.sort();
  }

  // Create the overarching container
  var container = document.createElement('div');
  container.id     		   = 'confetti';
  container.style.position = 'fixed';
  container.style.top      = '0';
  container.style.left     = '0';
  container.style.width    = '100%';
  container.style.height   = '0';
  container.style.overflow = 'visible';
  container.style.zIndex   = '9999';

  // Confetto constructor
  function Confetto(theme) {
	this.frame = 0;
	this.outer = document.createElement('div');
	this.inner = document.createElement('div');
	this.outer.appendChild(this.inner);

	var outerStyle = this.outer.style, innerStyle = this.inner.style;
	outerStyle.position = 'absolute';
	outerStyle.width  = (sizeMin + sizeMax * random()) + 'px';
	outerStyle.height = (sizeMin + sizeMax * random()) + 'px';
	innerStyle.width  = '100%';
	innerStyle.height = '100%';
	innerStyle.backgroundColor = theme();

	outerStyle.perspective = '50px';
	outerStyle.transform = 'rotate(' + (360 * random()) + 'deg)';
	this.axis = 'rotate3D(' +
	  cos(360 * random()) + ',' +
	  cos(360 * random()) + ',0,';
	this.theta = 360 * random();
	this.dTheta = dThetaMin + dThetaMax * random();
	innerStyle.transform = this.axis + this.theta + 'deg)';

	this.x = window.innerWidth * random();
	this.y = -deviation;
	this.dx = sin(dxThetaMin + dxThetaMax * random());
	this.dy = dyMin + dyMax * random();
	outerStyle.left = this.x + 'px';
	outerStyle.top  = this.y + 'px';

	// Create the periodic spline
	this.splineX = createPoisson();
	this.splineY = [];
	for (var i = 1, l = this.splineX.length-1; i < l; ++i)
	  this.splineY[i] = deviation * random();
	this.splineY[0] = this.splineY[l] = deviation * random();

	this.update = function(height, delta) {
	  this.frame += delta;
	  this.x += this.dx * delta;
	  this.y += this.dy * delta;
	  this.theta += this.dTheta * delta;

	  // Compute spline and convert to polar
	  var phi = this.frame % 7777 / 7777, i = 0, j = 1;
	  while (phi >= this.splineX[j]) i = j++;
	  var rho = interpolation(
		this.splineY[i],
		this.splineY[j],
		(phi-this.splineX[i]) / (this.splineX[j]-this.splineX[i])
	  );
	  phi *= PI2;

	  outerStyle.left = this.x + rho * cos(phi) + 'px';
	  outerStyle.top  = this.y + rho * sin(phi) + 'px';
	  innerStyle.transform = this.axis + this.theta + 'deg)';
	  return this.y > height+deviation;
	};
  }

  function poof() {
	if (!frame) {
	  // Append the container
	  document.body.appendChild(container);

	  // Add confetti
	  var theme = colorThemes[0]
		, count = 0;
	  (function addConfetto() {
		var confetto = new Confetto(theme);
		confetti.push(confetto);
		container.appendChild(confetto.outer);
		timer = setTimeout(addConfetto, spread * random());
	  })(0);

	  // Start the loop
	  var prev = undefined;
	  requestAnimationFrame(function loop(timestamp) {
		var delta = prev ? timestamp - prev : 0;
		prev = timestamp;
		var height = window.innerHeight;

		for (var i = confetti.length-1; i >= 0; --i) {
		  if (confetti[i].update(height, delta)) {
			container.removeChild(confetti[i].outer);
			confetti.splice(i, 1);
		  }
		}

		if (timer || confetti.length)
		  return frame = requestAnimationFrame(loop);

		// Cleanup
		document.body.removeChild(container);
		frame = undefined;
	  });
	}
  }

  poof();
};
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
		newImage.setAttribute('onclick', "this.remove(); stopConfetti()");
		newImage.style.left = canvasLeftCoord + "px";
		newImage.style.top = canvasTopCoord + "px";
		newImage.style.opacity = "1";
		document.body.appendChild(newImage);
		startConfetti();
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

var confetti = {
	maxCount: 150,		//set max confetti count
	speed: 2,			//set the particle animation speed
	frameInterval: 15,	//the confetti animation frame interval in milliseconds
	alpha: 1.0,			//the alpha opacity of the confetti (between 0 and 1, where 1 is opaque and 0 is invisible)
	gradient: false,	//whether to use gradients for the confetti particles
	start: null,		//call to start confetti animation (with optional timeout in milliseconds, and optional min and max random confetti count)
	stop: null,			//call to stop adding confetti
	toggle: null,		//call to start or stop the confetti animation depending on whether it's already running
	pause: null,		//call to freeze confetti animation
	resume: null,		//call to unfreeze confetti animation
	togglePause: null,	//call to toggle whether the confetti animation is paused
	remove: null,		//call to stop the confetti animation and remove all confetti immediately
	isPaused: null,		//call and returns true or false depending on whether the confetti animation is paused
	isRunning: null		//call and returns true or false depending on whether the animation is running
};


confetti.start = startConfetti;
confetti.stop = stopConfetti;
confetti.toggle = toggleConfetti;
confetti.pause = pauseConfetti;
confetti.resume = resumeConfetti;
confetti.togglePause = toggleConfettiPause;
confetti.isPaused = isConfettiPaused;
confetti.remove = removeConfetti;
confetti.isRunning = isConfettiRunning;
var supportsAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
var colors = ["rgba(30,144,255,", "rgba(107,142,35,", "rgba(255,215,0,", "rgba(255,192,203,", "rgba(106,90,205,", "rgba(173,216,230,", "rgba(238,130,238,", "rgba(152,251,152,", "rgba(70,130,180,", "rgba(244,164,96,", "rgba(210,105,30,", "rgba(220,20,60,"];
var streamingConfetti = false;
var animationTimer = null;
var pause = false;
var lastFrameTime = Date.now();
var particles = [];
var waveAngle = 0;
var context = null;

function resetParticle(particle, width, height) {
	particle.color = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
	particle.color2 = colors[(Math.random() * colors.length) | 0] + (confetti.alpha + ")");
	particle.x = Math.random() * width;
	particle.y = Math.random() * height - height;
	particle.diameter = Math.random() * 10 + 5;
	particle.tilt = Math.random() * 10 - 10;
	particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
	particle.tiltAngle = Math.random() * Math.PI;
	return particle;
}

function toggleConfettiPause() {
	if (pause)
		resumeConfetti();
	else
		pauseConfetti();
}

function isConfettiPaused() {
	return pause;
}

function pauseConfetti() {
	pause = true;
}

function resumeConfetti() {
	pause = false;
	runAnimation();
}

function runAnimation() {
	if (pause)
		return;
	else if (particles.length === 0) {
		context.clearRect(0, 0, window.innerWidth, window.innerHeight);
		animationTimer = null;
	} else {
		var now = Date.now();
		var delta = now - lastFrameTime;
		if (!supportsAnimationFrame || delta > confetti.frameInterval) {
			context.clearRect(0, 0, window.innerWidth, window.innerHeight);
			updateParticles();
			drawParticles(context);
			lastFrameTime = now - (delta % confetti.frameInterval);
		}
		animationTimer = requestAnimationFrame(runAnimation);
	}
}

function startConfetti(timeout, min, max) {
	var width = window.innerWidth;
	var height = window.innerHeight;
	window.requestAnimationFrame = (function() {
		return window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback) {
				return window.setTimeout(callback, confetti.frameInterval);
			};
	})();
	var canvas = document.getElementById("confetti-canvas");
	if (canvas === null) {
		canvas = document.createElement("canvas");
		canvas.setAttribute("id", "confetti-canvas");
		canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none;position:fixed;top:0");
		document.body.prepend(canvas);
		canvas.width = width;
		canvas.height = height;
		window.addEventListener("resize", function() {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}, true);
		context = canvas.getContext("2d");
	} else if (context === null)
		context = canvas.getContext("2d");
	var count = confetti.maxCount;
	if (min) {
		if (max) {
			if (min == max)
				count = particles.length + max;
			else {
				if (min > max) {
					var temp = min;
					min = max;
					max = temp;
				}
				count = particles.length + ((Math.random() * (max - min) + min) | 0);
			}
		} else
			count = particles.length + min;
	} else if (max)
		count = particles.length + max;
	while (particles.length < count)
		particles.push(resetParticle({}, width, height));
	streamingConfetti = true;
	pause = false;
	runAnimation();
	if (timeout) {
		window.setTimeout(stopConfetti, timeout);
	}
}

function stopConfetti() {
	streamingConfetti = false;
}

function removeConfetti() {
	stop();
	pause = false;
	particles = [];
}

function toggleConfetti() {
	if (streamingConfetti)
		stopConfetti();
	else
		startConfetti();
}

function isConfettiRunning() {
	return streamingConfetti;
}

function drawParticles(context) {
	var particle;
	var x, y, x2, y2;
	for (var i = 0; i < particles.length; i++) {
		particle = particles[i];
		context.beginPath();
		context.lineWidth = particle.diameter;
		x2 = particle.x + particle.tilt;
		x = x2 + particle.diameter / 2;
		y2 = particle.y + particle.tilt + particle.diameter / 2;
		if (confetti.gradient) {
			var gradient = context.createLinearGradient(x, particle.y, x2, y2);
			gradient.addColorStop("0", particle.color);
			gradient.addColorStop("1.0", particle.color2);
			context.strokeStyle = gradient;
		} else
			context.strokeStyle = particle.color;
		context.moveTo(x, particle.y);
		context.lineTo(x2, y2);
		context.stroke();
	}
}

function updateParticles() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	var particle;
	waveAngle += 0.01;
	for (var i = 0; i < particles.length; i++) {
		particle = particles[i];
		if (!streamingConfetti && particle.y < -15)
			particle.y = height + 100;
		else {
			particle.tiltAngle += particle.tiltAngleIncrement;
			//particle.x += Math.sin(waveAngle) - 0.5;
			particle.y += (Math.cos(waveAngle) + particle.diameter + confetti.speed) * 0.5;
			particle.tilt = Math.sin(particle.tiltAngle) * 15;
		}
		if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
			if (streamingConfetti && particles.length <= confetti.maxCount)
				resetParticle(particle, width, height);
			else {
				particles.splice(i, 1);
				i--;
			}
		}
	}
}
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
	newImage.setAttribute('src', 'godkinhead.png');
	newImage.setAttribute('class', 'overlays');
	newImage.setAttribute('onclick', "this.remove()");
	newImage.style.left = canvasLeftCoord + "px";
	newImage.style.top = canvasTopCoord + "px";
	newImage.style.opacity = "0.5";
	document.body.appendChild(newImage);
	
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
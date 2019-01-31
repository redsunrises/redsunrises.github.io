var FPS = 1000;
var FRAME = FPS / 1000;

var canvasElement = document.getElementById("myCanvas");
var canvas = canvasElement.getContext("2d");

var WIDTH = 500;
var HEIGHT = 500;

var d = new Date();
var n = d.getTime();
var secondHand = d.getSeconds();
var minuteHand = d.getMinutes();
var hourHand = d.getHours();

var update = function(){
	d = new Date();
	n = d.getTime();
	secondHand = d.getSeconds();
	minuteHand = d.getMinutes();
	hourHand = d.getHours();
	millisecondHand = d.getMilliseconds();
};

// var audio = new (window.AudioContext || window.webkitAudioContext)();

// function createOscillator(freq) {
//     var osc = audio.createOscillator();

//     osc.frequency.value = freq;
//     osc.type = "square";
//     osc.connect(audio.destination);
//     osc.start(0);

//     setTimeout(function() {
//         osc.stop(0);
//         osc.disconnect(audio.destination);
//     }, 1000 / 4)
// }

var render = function(){
	canvas.fillStyle = "#F5F5F5";
	canvas.fillRect(0, 0, WIDTH, HEIGHT);

	

	canvas.fillStyle = "#000000";
	canvas.beginPath();
	canvas.arc(250, 250, 200, 0, 2 * Math.PI);
	canvas.stroke();
	var r = Math.round(255*(hourHand/24));
	var g = Math.round(255*(minuteHand/60));
	var b = Math.round(255*(secondHand/60));
	canvas.fillStyle = "rgb("+r+", "+g+", "+b+")";
	canvas.fill();
	
	//face markings
	for(var a = 0; a < 24; a++){
		canvas.save();

		canvas.translate(250, 250);
		canvas.rotate(15*(a-6) * Math.PI / 180);

		canvas.fillStyle = "#000000";
		canvas.fillRect(200, 0, -20, 3);
		canvas.font = "20px Courier";
		canvas.fillText(""+a, 155, 8)

		canvas.restore();
	}
	for(var a = 0; a < 60; a++){
		canvas.save();

		canvas.translate(250, 250);
		canvas.rotate(6*a * Math.PI / 180);

		canvas.fillStyle = "#FFFFFF";
		canvas.fillRect(200, 0, -10, 3);

		canvas.restore();
	}
	//second hand
	canvas.save();

	canvas.translate(250, 250);
	canvas.rotate((6*secondHand-1+.006*millisecondHand) * Math.PI / 180);

	canvas.fillStyle = "rgb(0, 0, "+b+")";
	canvas.fillRect(-5, 0, 10, -180);

	canvas.restore();

	//minute hand
	canvas.save();

	canvas.translate(250, 250);
	canvas.rotate((6*minuteHand-1+.1*(secondHand-1)+.0001*millisecondHand) * Math.PI / 180);

	canvas.fillStyle = "rgb(0, "+g+", 0)";
	canvas.fillRect(-5, 0, 10, -160);

	canvas.restore();

	//hour hand
	canvas.save();

	canvas.translate(250, 250);
	canvas.rotate((15*(hourHand+12)-1+.25*(minuteHand-1)+.25/60*(secondHand-1)+15/60/60/1000*millisecondHand) * Math.PI / 180);

	canvas.fillStyle = "rgb("+r+", 0, 0)";
	canvas.fillRect(-5, 0, 10, 130);

	canvas.restore();

	//millisecond time
	canvas.fillStyle = "#FFFFFF";
	canvas.font = "32px Courier";
	canvas.fillText(""+n, 127, 260);

	// if(minuteHand == 50){
	// 	if(millisecondHand % 500 == 0 && millisecondHand/500+secondHand*2 < hourHand){
	// 		createOscillator;
	// 	}
	// }
};

var run = function(){
	update();
	render();
	setTimeout(run, 1)
};



run();
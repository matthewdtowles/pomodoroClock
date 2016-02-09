var $work = $("#work");
var $break = $("#break");
var $status = $("#status");

var startBtn = document.getElementById('start');
var pauseBtn = document.getElementById('pause');
var resetBtn = document.getElementById('reset');

startBtn.onclick = run;
pauseBtn.onclick = pause;
resetBtn.onclick = stop;

$("#subtract-work").click(function(){
	$status.text("Working...");
	if (+$work.text() >= 1) {
		$work.text(+$work.text() - 1);
	}
});

$("#add-work").click(function(){
	$status.text("Working...");
	$work.text(+$work.text() + 1);
});

$("#subtract-break").click(function(){
	$status.text("Relax! (Don't do it...)");
	if (+$break.text() >= 1) {
		$break.text(+$break.text() - 1);
	}
});

$("#add-break").click(function(){
	$status.text("Relax! (Don't do it...)");
	$break.text(+$break.text() + 1);
});

var audio = new Audio('http://soundbible.com/grab.php?id=1377&type=mp3');

function alarm() {
	audio.play();
}

function pad(val) {
	return ("00" + val).slice(-2);
}

var updateTime = document.getElementById("timer");

function updateDisplay(t) {
	var minutes = Math.floor(t/60);
	t-=minutes*60;
	var seconds = Math.floor(t);
	updateTime.innerHTML = pad(minutes) + ":" + pad(seconds);
}

time = 0;
updateDisplay(time);
var running = true;
var tlast = (new Date()).getTime();

function update() {
	if (time <= 0.0) {
		return;
	}
	
	var tnow = (new Date()).getTime();
	var dt = (tnow - tlast)/1000.0;
	tlast=tnow;
	time-=dt;
	
	if (time <= 0.0) {
		if ($status.text()=== "Working..."){
			alarm();
			$status.text("Relax! (Don't do it...)");
			time = $break.text()*60;
		} else {
			alarm();
			$status.text("Working...");
			time = $work.text()*60;
		}
	}
	updateDisplay(time);//?
	if (running){
		requestAnimationFrame(update);
	}
}

function run() {
	$status.text("Working...");
	if (time <=0.0){
		time = $work.text()*60;
	}
	tlast = (new Date()).getTime();
	running=true;
	requestAnimationFrame(update);
}

function pause(){
	running = false;
}

function stop() {
  running = false;
  time = 0;
  updateTime.innerHTML = '00:00';
  $status.text("Working...");
  $work.text(25);
  $break.text(5);
}
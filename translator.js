// Get frequency data array and detect significant peaks / troughs at specific moment
var mpTransverse = [];
var mpMotion = [];
var mpLongitudinal = [];
var bpChange = [];
var finalizeAA = [];

function peakCollection() {
	// Separate current freqArray into 2 important segments: Drum/Bass and Vocal/other instruments
	// Note: This is a relative separation and is based on trials and errors
    var bassArray = frequencyData.slice(0, 8);
    var mainArray = frequencyData.slice(8);

    // Find peak from the bassArray, locating it as the foundation peak
	var valueBP = Math.max.apply(Math, bassArray);
	var indexBP = bassArray.indexOf(valueBP);

	// Find peak from the mainArray, locating it as the foundation peak
	var valueMP = Math.max.apply(Math, mainArray);
	var indexMP = mainArray.indexOf(valueMP);

	// Append the values found into the arrays that we will be looking and comparing for behaviours.
	valueBPArray.push(valueBP);
	indexBPArray.push(indexBP);
    valueMPArray.push(valueMP);
    indexMPArray.push(indexMP);
}

// Understand the peak data and translate them into valid information
function peakAnalysis() {
	// Observing and comparing for trend / motion

	// Working with MAIN PART first
	// motion values: 0 for stationary, 1 for right, -1 for left
	for (var i = 1; i < indexMPArray.length; i++) {
		// Not the same peak, meaning there is some transition in peak => Longitudinal
		if (Math.abs(indexMPArray[i] - indexMPArray[i-1]) > 16) {
			// Record time frame in which the peak transit
			mpLongitudinal.push(i);
			// Record direction of travel
			var rand = Math.random();
			if (Math.abs(rand - 1) > Math.abs(rand - 0)){
				mpMotion.push(1);
			} else mpMotion.push(0);
			// 0 is LEFT, 1 is RIGHT
		}
    }
    // Seeking for longitudinal motion: a significant change in value of highest peak
	for (i = 1; i < valueMPArray.length; i++) {
		// Check for sudden increase in value of peak. Value used: 32
		if (valueMPArray[i] - valueMPArray[i-1] >= 32){
			// Record time frame in which the peak changes suddenly
			mpTransverse.push(i);
		}
	}
	// In the end, what we obtain are:
	// mpTransverse holds time frames of change transversely
	// mpLongitudinal holds time frames of change longitudinally
	// mpMotion holds direction of highest peak in each time frame
	// Using mpTransverse to determine UP arrow
	// Using mpLongitudinal & mpMotion determine between LEFT arrow and RIGHT arrow


	// Working with BASS PART second
	// Idea: Find Group of Peaks and any changes will correspond to an action
	// TLDR High sensitivity

	// First, check whether the peak value exceed the average value of whole composition
	// to determine whether the sound is soft or hearable
    var sum = frequencyData.reduce(function(a, b) { return a + b; });
    var avg = sum / frequencyData.length;

	for (i = 0; i < valueBPArray.length; i++) {
		// Check for adequate loudness, and significant enough for a response
		if ((valueBPArray[i] > avg) && ((valueBPArray[i] - valueBPArray[i-1]) >= 32)){
			bpChange.push(i);
		}
	}
	// In the end, what we obtain is
	// bpChange holds time frames of change significantly
	// Using bpChange to determine DOWN arrow
}

function peakFinalization() {
	// Based on all information acquired, creating an array or array[4] containing information for each frame
	// to decide which arrows will appear
	var isUp = 0;
	var isDown = 0;
	var isLeft = 0;
	var isRight = 0;
	var count = 0;
	for (var i = 0; i < countLengthSong; i++) {
		// Determine UP
		if (mpTransverse.indexOf(i) != -1) {
			isUp = 1;
		} else isUp = 0;

		// Determine DOWN
		if (bpChange.indexOf(i) != -1) {
			isDown = 1;
		} else isDown = 0;

		// Determine LEFT / RIGHT
		if (mpLongitudinal.indexOf(i) != -1) {
			count++;
			if (mpMotion[count-1] = 0) {
				isLeft = 1;
				isRight = 0;
			}
			if (mpMotion[count-1] = 1) {
				isRight = 1;
				isLeft = 0;
			}
		} else {
			isLeft = 0;
			isRight = 0;
		}
		finalizeAA.push([isLeft, isUp, isDown, isRight]);
	}
}
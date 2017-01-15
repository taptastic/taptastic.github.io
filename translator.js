// Get frequency data array and detect significant peaks / troughs at specific moment
function peakCollection() {
	// Separate current freqArray into 2 important segments: Drum/Bass and Vocal/other instruments
	// Note: This is a relative separation and is based on trials and errors
    var bassArray = frequencyData.slice(0, 8);
    var mainArray = frequencyData.slice(8);

    // Find peak from the bassArray, locating it as the foundation peak
	var valueBP = Math.max.apply(Math, bassArray);
	var indexBP = bassArray.indexOf(initialBP);

	// Find peak from the mainArray, locating it as the foundation peak
	var valueMP = Math.max.apply(Math, mainArray);
	var indexMP = bassArray.indexOf(initialMP);

	// Append the values found into the arrays that we will be looking and comparing for behaviours.
	valueBPArray.push(initialBP);
	indexBPArray.push(indexBP);
    valueMPArray.push(initialBP);
    indexMPArray.push(indexBP);
}

// Understand the peak data and translate them into valid information
function peakAnalysis() {
	// Observing and comparing for trend / motion

	// Working with Main part first
	// motionCheck: 0 for stationary, 1 for right, -1 for left
	var mpLongitudinal = [];
	var mpMotion = [];
	for (var i = 1; i < indexMPArray.length; i++) {
		// Not the same peak, meaning there is some transition in peak => Transverse
		if (indexMPArray[i] != indexMPArray[i-1]) {
			// Record position in which the peak transit
			mpLongitudinal.push(indexMPArray[i-1]);
			// Record direction of travel
			if (indexMPArray[i] > indexMPArray[i-1]) {
				mpMotion.push(1);
			} else mpMotion.push(-1);
		} else mpMotion.push(0);
    }
    // Seeking for longitudinal motion: a significant change in value of highest peak
    var mpTransverse = [];
	for (var i = 1; i < valueMPArray.lengthh; i++) {
		// Check for sudden increase in value of peak. Value used: 32
		if (valueMPArray[i] - valueMPArray[] >= 32){

		}
	}

}
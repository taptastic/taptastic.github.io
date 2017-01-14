// Get frequency data array and detect significant peaks / troughs at specific moment
function peakCollection() {
	// Separate current freqArray into 2 important segments: Drum/Bass and Vocal/other instruments
	// Note: This is a relative separation and is based on trials and errors
    var bassArray = frequencyData.slice(0, 8);
    var mainArray = frequencyData.slice(8);

    // Find peak from the bassArray, locating it as the foundation peak
	var initialBP = Math.max.apply(Math, bassArray);
	var indexBP = bassArray.indexOf(initialBP);

	// Find peak from the mainArray, locating it as the foundation peak
	var initialMP = Math.max.apply(Math, mainArray);
	var indexMP = bassArray.indexOf(initialMP);

	// Append the values found into the arrays that we will be looking and comparing for behaviours.
	initialBPArray.push(initialBP);
	indexBPArray.push(indexBP);
    initialMPArray.push(initialBP);
    indexMPArray.push(indexBP);
}

// Understand the peak data and translate them into valid information
function peakAnalysis() {
	// Observing and comparing for trend / motion

}
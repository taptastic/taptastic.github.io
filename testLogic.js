var next = 0;
var frequencyData;
var initialBPArray = [];
var indexBPArray = [];
var initialMPArray = [];
var indexMPArray = [];

$(document).ready(function () {

    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var audioElement = document.getElementById('testAudio');
    var audioSrc = audioCtx.createMediaElementSource(audioElement);
    var analyser = audioCtx.createAnalyser();

    // Bind our analyser to the media element source.
    audioSrc.connect(analyser);
    audioSrc.connect(audioCtx.destination);

    //var frequencyData = new Uint8Array(analyser.frequencyBinCount);
    frequencyData = new Uint8Array(64);

    var svgHeight = '300';
    var svgWidth = '1200';
    var barPadding = '1';

    function createSvg(parent, height, width) {
        return d3.select(parent).append('svg').attr('height', height).attr('width', width);
    }

    var svg = createSvg('body', svgHeight, svgWidth);

    // Create our initial D3 chart.
    svg.selectAll('rect')
        .data(frequencyData)
        .enter()
        .append('rect')
        .attr('x', function (d, i) {
            return i * (svgWidth / frequencyData.length);
        })
        .attr('width', svgWidth / frequencyData.length - barPadding);

    // Continuously loop and update chart with frequency data.
    function renderChart() {
        requestAnimationFrame(renderChart);

        // Copy frequency data to frequencyData array.
        analyser.getByteFrequencyData(frequencyData);

        // Update d3 chart with new data.
        svg.selectAll('rect')
            .data(frequencyData)
            .attr('y', function (d) {
                return svgHeight - d;
            })
            .attr('height', function (d) {
                return d;
            })
            .attr('fill', function (d) {
                return 'rgb(0, 0, ' + d + ')';
            });

        console.log(frequencyData);
    }

    // Run the loop
    renderChart();

});

function chooseSong() {
    var audio = document.getElementById('testAudio');
    switch (next) {
        case 0:
            audio.src = "sample1_classic.mp3";
            break;
        case 1:
            audio.src = "sample2_pop.mp3";
            break;
        case 2:
            audio.src = "sample3_rap.mp3";
            break;
        case 3:
            audio.src = "sample4_ballad.mp3";
            break;
        case 4:
            audio.src = "sample5_soul.mp3";
            break;
        case 5:
            audio.src = "sample6_blue.mp3";
            break;
        case 6:
            audio.src = "sample7_edm.mp3";
            break;
        default:
            break;
    }
}

// Set default value for volumn
function setHalfVolume() {
	var audio = document.getElementById('testAudio');
	audio.volume = 0.5;
}

function nextSong() {
    next = (next + 1) % 7;
    chooseSong();
}

function previousSong() {
    next = next - 1;
    if (next == -1) next = 6;
    chooseSong();
}
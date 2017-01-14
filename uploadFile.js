function startRead(evt) {
    var file = document.getElementById('file').files[0];
    if (file) {
        if (file.type.match("mp3.*")) {
            getAsAudio(file);
            alert("Name: " + file.name);
        }
        else {
            alert("Please choose an mp3 file");
        }
    }
}

function getAsAudio(readFile) {
    var reader = new FileReader();
    reader.onload = addAudio;
    reader.readAsArrayBuffer(readFile);
}

function addAudio(mp3src) {
    var audio = document.getElementById('testAudio');
	audio.crossOrigin = "anonymous";
    audio.src = URL.createObjectURL(mp3src);
}
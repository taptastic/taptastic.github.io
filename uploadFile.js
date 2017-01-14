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
    reader.readAsDataURL(readFile);
    reader.onload = addAudio;
}

function addAudio(mp3src) {
    var audio = document.getElementById('testAudio');
    audio.src = mp3src.target.result;
}
function dropEvent(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    
    var droppedFiles = evt.dataTransfer.files;
    
    var reader = new FileReader();
    
    reader.onload = function(fileEvent) {
        var data = fileEvent.target.result;
        var audio = document.getElementById('testAudio');
		audio = data;
    }
    
    reader.readAsArrayBuffer(droppedFiles[0]);
}

function dragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
}

var dropArea = document.getElementById('body');
body.addEventListener('drop', dropEvent,false);
body.addEventListener('dragover', dragOver, false);
// dependency: <script src="https://www.WebRTC-Experiment.com/RecordRTC.js"></script>
// a simple recorder.

let recorder=null;
let recing=false;
async function initrecord(ondataavailable) {
    console.log("initializing");
    let stream=await navigator.mediaDevices.getUserMedia({video: false, audio: true});
    function dataavailable(e){
        console.log("debug from voice.js: ondataavailable", e);
        let blob = e;
        let arrayBuffer = blob.arrayBuffer();
        let u16array = new Uint16Array(arrayBuffer);
        ondataavailable(u16array);
    }
    recorder=new  RecordRTCPromisesHandler(stream, {recorderType: RecordRTC.StereoAudioRecorder,    type: 'audio', disableLogs:true, numberOfAudioChannels: 1, sampleRate: 44100, mimeType: 'audio/pcm', timeSlice: 100, ondataavailable: dataavailable});

}



async function getChunk() {  // don't use this function, it's not needed but i keep it in case i need it later
    let blob = await recorder.getBlob();
    if(blob==null){
        alert("error getting the recorded content");
        return;
    }
    let bt="."+(blob.type.split(";")[0].split("/")[1])  // debugx
    return blob;
}

function startrec(){
    console.log("starting recording");
    if(recorder==null || recing){return;}
    recorder.startRecording();
    recing=true;
}

async function stoprec(){
    if(recorder==null || !recing){return;}
    await recorder.stopRecording();
    recing=false;
}

async function toggle(){
    if(recing){
        await stoprec();
    }else{
        startrec();
    }
    return recing;
}
// initrecord();
export {initrecord, toggle};
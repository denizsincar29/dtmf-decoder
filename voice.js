// making the same recorder but without recordrtc

async function initrecord(dataavailable) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new AudioContext();
        const mediaStreamSource = audioContext.createMediaStreamSource(stream);
        const processor = audioContext.createScriptProcessor(1024, 1, 1);
        mediaStreamSource.connect(processor);
        processor.connect(audioContext.destination);
        processor.onaudioprocess = function (event) {
            const float32Array = event.inputBuffer.getChannelData(0);
            dataavailable(float32Array);
        };
        console.log("Recorder initialized");
    } catch (error) {
        console.error("Error initializing recorder:", error);
    }
}

// i very very very hope that no button is required to get microphone access. Because some browsers require user gesture for some actions
// so i will call initrecord right away in index.js
export { initrecord }; // yep, give it away to index.js
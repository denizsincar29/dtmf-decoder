// dependency: <script src="https://www.WebRTC-Experiment.com/RecordRTC.js"></script>
// a simple recorder.

let recorder = null;
let recing = false;

async function initrecord(dataavailable) {
    console.log("initializing");
    try {
        let stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
        console.log("Stream obtained:", stream);

        // Initialize RecordRTC with PCM settings
        recorder = new RecordRTCPromisesHandler(stream, {
            recorderType: RecordRTC.StereoAudioRecorder,
            type: 'audio',
            disableLogs: true,
            numberOfAudioChannels: 1,
            sampleRate: 44100,
            mimeType: 'audio/pcm',
            bufferSize: 1024,
            ondataavailable: async (blob) => {
                console.log("data available");
                try {
                    // Convert the blob to an array buffer
                    let arrayBuffer = await blob.arrayBuffer();
                    const audioContext = new AudioContext();
                    let audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
                    // Assuming mono audio
                    let float32Array = audioBuffer.getChannelData(0);
                    console.log(float32Array);
                    dataavailable(float32Array); // Send float32Array to Wasm
                } catch (error) {
                    console.error("Error processing audio data:", error);
                }
            },
            bitsPerSample: 16
        });

        console.log("Recorder initialized");
    } catch (error) {
        console.error("Error initializing recorder:", error);
    }
}

async function startrec() {
    console.log("starting recording");
    if (recorder == null || recing) {
        console.log("recording is null or already recing");
        return;
    }
    try {
        await recorder.startRecording();
        recing = true;
        console.log("Recording started");
    } catch (error) {
        console.error("Error starting recording:", error);
    }
}

async function stoprec() {
    if (recorder == null || !recing) {
        return;
    }
    try {
        await recorder.stopRecording();
        recing = false;
        console.log("stopped recording");
    } catch (error) {
        console.error("Error stopping recording:", error);
    }
}

async function toggle() {
    if (recing) {
        await stoprec();
    } else {
        await startrec();
    }
    return recing;
}

export { initrecord, toggle };

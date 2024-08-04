async function initRecord(dataAvailable) {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();

        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        const mediaStreamSource = audioContext.createMediaStreamSource(stream);

        // Adding the AudioWorklet processor
        await audioContext.audioWorklet.addModule('processor.js');
        const processorNode = new AudioWorkletNode(audioContext, 'audio-processor');

        processorNode.port.onmessage = (event) => {
            const float32Array = event.data;
            console.log(float32Array);
            dataAvailable(float32Array);
        };

        mediaStreamSource.connect(processorNode);
        processorNode.connect(audioContext.destination);

        console.log("Recorder initialized with AudioWorklet");
        // return sampleRate;
        return audioContext.sampleRate;
    } catch (error) {
        console.error("Error initializing recorder:", error);
    }
}

export { initRecord };

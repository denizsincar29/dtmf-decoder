async function initRecord(ondataavailable) {
    // Request access to the microphone
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Create an AudioContext
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const sampleRate = audioContext.sampleRate;
    console.log(sampleRate);

    // Create a MediaStreamSource from the microphone input
    const source = audioContext.createMediaStreamSource(stream);

    // Create a ScriptProcessorNode with a buffer size of 512
    const bufferSize = 512;
    const processor = audioContext.createScriptProcessor(bufferSize, 1, 1);

    // Connect the source to the processor, and the processor to the destination (to avoid audio feedback)
    source.connect(processor);
    processor.connect(audioContext.destination);

    // Handle audio processing
    processor.onaudioprocess = (event) => {
        const inputBuffer = event.inputBuffer;
        const inputData = inputBuffer.getChannelData(0); // Get the data for the first channel
        const float32Array = new Float32Array(bufferSize);
        float32Array.set(inputData);
        // console.log(float32Array);
        // Call the callback with the audio data
        ondataavailable(float32Array);
    };

    return sampleRate;
}

export { initRecord };
class AudioProcessor extends AudioWorkletProcessor {
    process(inputs, outputs, parameters) {
        const input = inputs[0];
        if (input.length > 0) {
            const float32Array = input[0];
            this.port.postMessage(float32Array);
        }
        return true;
    }
}

registerProcessor('audio-processor', AudioProcessor);

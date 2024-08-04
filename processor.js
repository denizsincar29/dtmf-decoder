class AudioProcessor extends AudioWorkletProcessor {
    constructor() {
        super();
        this.buffer = new Float32Array(512);
        this.bufferIndex = 0;
    }

    process(inputs, outputs, parameters) {
        const input = inputs[0];
        if (input.length > 0) {
            const channelData = input[0]; // Assuming mono input

            for (let i = 0; i < channelData.length; i++) {
                this.buffer[this.bufferIndex++] = channelData[i];

                if (this.bufferIndex === 512) {
                    this.port.postMessage(this.buffer.slice(0));
                    this.bufferIndex = 0;
                }
            }
        }

        return true;
    }
}

registerProcessor('audio-processor', AudioProcessor);

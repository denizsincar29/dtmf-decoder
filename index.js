import * as wasm from "./pkg/dtmf_decoder.js";
import * as rec from "./voice.js";

export { rec };

let decoder = null;
let currentTone = "n";

// Function to handle the detected tone
function onToneDetected(tone) {
    document.getElementById("tone").innerHTML += tone;
}

// Function to process the audio data
function onDataAvailable(data) {
    // Log how many bytes are received
    if (decoder === null) {
        console.log("Decoder not yet ready");
        return;
    }

    let tone = decoder.decode(data);
    // Check if the tone has changed
    if (currentTone !== tone) {
        console.log("Tone state changed: " + tone);
        currentTone = tone;
        if (currentTone !== "n") {
            onToneDetected(currentTone);
        }
    }
}

// Initialize the recorder with the onDataAvailable callback
const sr=rec.initRecord(onDataAvailable);

// Wait for the Wasm module to be initialized
console.log("Initializing Wasm module");
wasm.default().then(() => {
    console.log("Wasm module initialized");
    decoder = new wasm.DTMF(sr);
    console.log("Decoder initialized");
}).catch(error => {
    console.error("Error initializing Wasm module:", error);
});

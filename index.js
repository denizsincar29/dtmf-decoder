import * as wasm from "./pkg/dtmf_decoder.js";
import * as rec from "./voice.js";
export { rec };

let decoder = null;
let t = "n";

// Function to handle the detected tone
function ontone(tone) {
    document.getElementById("tone").innerHTML += tone;
}

// Function to process the audio data
function ondataavailable(data) {
    // Log how many bytes are received
    if (decoder === null) {
        console.log("Decoder not yet ready");
        return;
    }
    let tone = decoder.decode(data);
    // Check if the tone has changed
    if (t !== tone) {
        console.log("Tone state changed: " + tone);
        t = tone;
        if (t !== "n") {
            ontone(t);
        }
    }
}

// Initialize the recorder with the ondataavailable callback
rec.initrecord(ondataavailable);

// Wait for the Wasm module to be initialized
console.log("Initializing Wasm module");
await wasm.default();
console.log("Wasm module initialized");
decoder = new wasm.DTMF();
console.log("Decoder initialized");
/*
// Enable the record button
const recordButton = document.getElementById("record");
recordButton.disabled = false;
recordButton.onclick = async function () {
    const recording = await rec.toggle();
    console.log("Recording: " + recording);
    recordButton.innerHTML = recording ? "Stop" : "Record";
};
*/ // Commented out because the record button is not needed but in case it is needed, uncomment this block


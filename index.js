import * as wasm from "./pkg/dtmf_decoder.js";
import * as rec from "./voice.js";
import { srSpeak } from "./sr.js";

export { rec };

let decoder = null;
let currentTone = "n";

// Function to handle the detected tone
function onToneDetected(tone) {
    document.getElementById("tone").innerHTML += tone;
    srSpeak(tone); // screen reader
}

// Function to process the audio data
function onDataAvailable(data) {
    // Log how many bytes are received
    // console.log("Received " + data.length + " samples");
    if (decoder === null) {
        console.log("Decoder not yet ready");
        return;
    }

    let tone = decoder.decode(data);
    // console.log("Detected tone: " + tone);
    // Check if the tone has changed
    if (currentTone !== tone) {
        console.log("Tone state changed: " + tone);
        currentTone = tone;
        if (currentTone !== "n") {
            onToneDetected(currentTone);
        }
    }
}

async function init_everything(){
    // Initialize the recorder with the onDataAvailable callback
    const sr=await rec.initRecord(onDataAvailable);
    // Wait for the Wasm module to be initialized
    console.log("Initializing Wasm module");
    await wasm.default();
    console.log("Wasm module initialized");
    decoder = new wasm.DTMF(sr);
    console.log("Decoder initialized");
}

init_everything();
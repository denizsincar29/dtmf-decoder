mod utils;
mod dtmfdecoder;

use wasm_bindgen::prelude::*;
use dtmfdecoder::Detector;

// console.log
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}



// lets make a struct to hold the decoder
#[wasm_bindgen]
pub struct DTMF {
    detector: Detector,
    pub tone: char, // want it to be 'n' by default
}

#[wasm_bindgen]
impl DTMF {
    #[wasm_bindgen(constructor)]
    pub fn new(samplerate: u32) -> DTMF {
        utils::set_panic_hook();
        log("DTMF decoder initialized");
        log(&format!("samplerate: {}", samplerate));
        DTMF {
            detector: Detector::new(samplerate),  // hope js recordrtc uses 44100
            tone: 'n'
        }
    }


    #[wasm_bindgen]
    pub fn decode(&mut self, samples: Vec<f32>) -> char {
        // print the samples length
        // log(&format!("samples length: {}", samples.len()));  // this is too much, spamming the console, but at least it works
        self.detector.decode(samples);
        self.tone = self.detector.last_tone();
        self.tone
    }

    



}


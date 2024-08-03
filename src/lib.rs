mod utils;
mod dtmfdecoder;

use wasm_bindgen::prelude::*;
use dtmfdecoder::Detector;
use dasp::sample::conv;  // stupid recordrtc doesn't use f32 so we need to convert


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
    pub tone: char // want it to be 'n' by default
}

#[wasm_bindgen]
impl DTMF {
    #[wasm_bindgen(constructor)]
    pub fn new() -> DTMF {
        utils::set_panic_hook();
        DTMF {
            detector: Detector::new(44100),  // hope js recordrtc uses 44100
            tone: 'n'
        }
    }

    #[wasm_bindgen]
    pub fn decode_i16(&mut self, samples: Vec<i16>) -> char {
        // print the samples length
        log(&format!("samples length: {}", samples.len()));
        let data: Vec<f32> = samples.iter().map(|s| conv::i16::to_f32(*s)).collect();

        self.detector.decode(data);
        self.tone = self.detector.last_tone();
        self.tone
    }

    #[wasm_bindgen]
    pub fn decode(&mut self, samples: Vec<f32>) -> char {
        // print the samples length
        log(&format!("samples length: {}", samples.len()));
        self.detector.decode(samples);
        self.tone = self.detector.last_tone();
        self.tone
    }

    



}

/*
// some very strange error in js when I try to use the Detector struct directly. (upd, fixed, i didn't wait for the wasm to load!)
#[wasm_bindgen]
pub fn dtmfinit() -> DTMF {
    DTMF::new()
}
*/
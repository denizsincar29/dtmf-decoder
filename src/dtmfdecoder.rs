use dtmf::{
    decoder::{Decoder, ToneChange},
    enums::{State, Tone},
};

struct Tones {
    tone: char,
    tones: String,
}
impl ToneChange for Tones {
    fn tone_change(&mut self, tone: Tone, state: State) {
        match state {
            State::On => {
                self.tone = tone.as_char();
                self.tones.push(self.tone);
            }
            State::Off => self.tone = 'n',
        }
    }
}

pub struct Detector {
    decoder: Decoder<Tones>,
}
impl Detector {
    pub fn new(sr: u32) -> Self {
        Self {
            decoder: Decoder::new(
                sr,
                Tones {
                    tone: 'n',
                    tones: "".to_string(),
                },
            ),
        }
    }
    pub fn last_tone(&self) -> char {
        self.decoder.tone_change.tone
    }
    #[allow(dead_code)]
    pub fn tones(&self) -> String {
        self.decoder.tone_change.tones.clone()
    }

    pub fn decode(&mut self, data: Vec<f32>) {
        self.decoder.process(&data);
    }
}

# dtmf-decoder

A simple DTMF decoder written in rust / wasm.  
Author: Deniz Sincar <deniz@r1oaz.ru>

## what is DTMF?

In simple terms, DTMF is the [beeping sound](https://www.youtube.com/watch?v=qOWwpkZ_RXw) you hear when you press a button on your phone's keypad. Each key has it's own sound, so it is used not only to feal cool while dialing a number, but also to send information over the phone line.

As wikipedia says:
> Dual-tone multi-frequency signaling ([DTMF](https://en.wikipedia.org/wiki/DTMF)) is a telecommunication signaling system using the voice-frequency band over telephone lines between telephone equipment and other communications devices and switching centers.

## Try it out

Became curious? You can try it out [here](https://deniz.r1oaz.ru/dtmf/).
Just open the website and allow the microphone access. Then press a button on your phone's keypad and see the magic happen. At the bottom of the page, you will see the numbers you pressed.

## Building

To build the project, you need to have `wasm-pack` installed. You can install it by running:

```bash
cargo install wasm-pack
```

Then you can build the project by running:

```bash
wasm-pack build --target web
```
After building, you just serve the repository root with a web server. For example, you can use `python`'s built-in web server:

```bash
python -m http.server
```

Then you can access the project by navigating to `http://localhost:8000`.
If you want to host the project on your server, you can copy the pkg directory, as well as other js and html files to your server. Or simply git clone my repo into the server's serving directory.

## What's the purpose of this project?

### back story

Once back in the days, I explored that if you lift the telephone handset and let it listen to the DTMF tones from a different source, it dials the number. I was so amazed by this, that I quickly saved a few wavs of some of my relative's phone numbers and am still dialing by playing them to the microphone.

### the project

While i was still learning programming, i so much wanted to find an opensource dtmf decoder library, but nearly all of them were broken or not maintained. A year ago I guess, I found a rust crate for decoding DTMF, and made a [CLI tool](https://github.com/denizsincar29/dtmf_rust) out of it.

Three days ago, i wanted to explore a relatively new technology, WebAssembly. I thought that it would be a good idea to make a web version of the CLI tool I made. So I did it. And here we are. 3 days of work with thousands of errors and bugs, but I am happy with the result.

## contributing

If you want to contribute to the project, you can open an issue or a pull request. I will be happy to see your contributions.

### Happy dtmf-decoding!

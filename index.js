import * as wasm from "./pkg/dtmf_decoder.js";
import * as rec from "./voice.js";
export {rec};

let decoder=null;


let t="n";


function ontone(tone){
    // if new tone is different then save it, and also if it's not "n" then print it
    if(t!=tone){
        t=tone;
        if(t!="n"){
            document.getElementById("tone").innerHTML+=t;
        }
    }
}

function ondataavailable(data){
    // log how many bytes are received
    console.log(data.length);
    if(decoder==null){
        console.log("decoder yet not ready");
        return;
    }
    let tone=decoder.decode(data);
    console.log(tone);
    ontone(tone);
}

rec.initrecord(ondataavailable);
// record button on click toggle recording.
// on dom load:
document.addEventListener("DOMContentLoaded", function(){
    // create the decoder
    decoder=new wasm.DTMF();
    // enable the record button
    document.getElementById("record").disabled=false;
    document.getElementById("record").onclick=function(){
        rec.toggle().then(function(recording){
            if(recording){
                document.getElementById("record").innerHTML="Stop";
            } else {
                document.getElementById("record").innerHTML="Record";
            }
    
        });
    };
});
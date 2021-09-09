const synth = window.speechSynthesis;

let utterThis = new SpeechSynthesisUtterance("Hello! computer");

let text;
function mousePos(event){
    let x = event.clientX;
    let y = event.clientY;

    speak(x,y);
}


let arr=[]; let k=0;
const speak = (x,y) => {
    document.querySelector("#my_button").onclick = () => {
        console.log("button click");
        text = document.querySelector("#text-input").value;
    }
    let pitchValue;
    let rateValue;
    rateValue=x/(window.innerWidth/3)+0.1;
    pitchValue= y/(window.innerHeight/2);
  
    console.log(pitchValue);


    if(text!=""&&text!=undefined){
        
        let colorR=Math.floor(Math.random() * 255);
        let colorG=Math.floor(Math.random() * 255);
        let colorB=Math.floor(Math.random() * 255);

        let stringA = "<div><button id=button"+k;
        let stringB = " style="+'"position:absolute; color:rgb('+colorR+','+colorG+','+colorB+'); left:'+x+'; top:'+y+';'; 
        let stringC= ">"+text+"</button></div>";
        arr[k]=stringA+stringB+stringC;
        k++;
        let full="";
        for(let i =0; i<k; i++){
            console.log(i+" : "+arr[i]+"\n");
            full+=arr[i];
        }
        document.getElementById("insert").innerHTML=full;
        let utterThis = new SpeechSynthesisUtterance(text);
        utterThis.pitch = pitchValue;
        utterThis.rate=rateValue;
        if(k>1){
            synth.speak(utterThis);
        }
        console.log(text);
        
    }else if(text==""||text==undefined){
        console.log("fail");
    }
   
    console.log("K="+k)
}


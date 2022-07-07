export default [
  `
  html, body {
    height: 100%;
    margin: 0;
    font-family: 'Paytone One', sans-serif;
  }
  article {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #4C4C47;
    height: 100%;
  }
  video {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  
  video {
    // border: 4px solid red;
    display: none;
  }
  canvas {
    padding: 150px, 0;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  
  h1 {
    font-size: 45px;
    position: absolute;
    top: 0;
    margin: 2rem 0;
    text-shadow:
      -1px -1px 0 #FFF,  
       1px -1px 0 #FFF,
      -1px  1px 0 #FFF,
       1px  1px 0 #FFF;
  }
  
  button {
    position: absolute;
    border-radius: 50%;
    height: 75px;
    width: 75px;
    bottom: 0;
    outline: none;
    &:hover {
      cursor: pointer;
    }
    img {
      width: 75%;
    }
  }
  
  #board {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
    display: flex;
    flex-wrap: wrap;
    > a {
      width: 150px;
      img {
        width: 100%;
      }
    }
  }
  `,
  `function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}`,
`function dec2hex (dec) {
  return dec.toString(16).padStart(2, "0")
}

// generateId :: Integer -> String
function generateId (len) {
  var arr = new Uint8Array((len || 40) / 2)
  window.crypto.getRandomValues(arr)
  return Array.from(arr, dec2hex).join('')
}`,
`> var arr = new Uint8Array(4) # make array of 4 bytes (values 0-255)
> arr
Uint8Array(4) [ 0, 0, 0, 0 ]

> window.crypto
Crypto { subtle: SubtleCrypto }

> window.crypto.getRandomValues()
TypeError: Crypto.getRandomValues requires at least 1 argument, but only 0 were passed

> window.crypto.getRandomValues(arr)
Uint8Array(4) [ 235, 229, 94, 228 ]`,
`function randomString(len, charSet) {
  charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
      var randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
  }
  return randomString;
}`,
`var canvas = null;
var context = null;
var bufferCanvas = null;
var bufferCanvasCtx = null;
var bubbleArray = [];
var bubbleTimer = null;
var maxBubbles = (window.innerWidth / 10); // Here you may set max bubbles to be created

function sizeCanvas(height, width) {
  bufferCanvas = document.createElement("canvas");
  bufferCanvas.width = canvas.width = width;
  bufferCanvas.height = canvas.height = height;
  bufferCanvasCtx = bufferCanvas.getContext("2d");
}

function init() {
  bubbleTimer = null;
  canvas = document.getElementById('glCanvas');
  context = canvas.getContext("2d");
  sizeCanvas(window.innerHeight, window.innerWidth);
  bubbleTimer = setInterval(addBubble, 200);

  DrawBubble();
  DrawFish();

  setInterval(animate, 30);
}

function animate() {
  context.save();
  blank();
  UpdateBubble();
  DrawBubble();
  UpdateFish();
  DrawFish();
  context.drawImage(bufferCanvas, 0, 0, bufferCanvas.width, bufferCanvas.height);
  context.font = '80px sans-serif';
  // context.fillText('Want to find out how I drew this fish?', bufferCanvas.width / 2 - 750, 100);
  context.restore();
}

function addBubble() {
  bubbleArray[bubbleArray.length] = new Bubble();
  if (bubbleArray.length == maxBubbles) {
    clearInterval(bubbleTimer);
  }
}

function blank() {
  bufferCanvasCtx.fillStyle = "#8789C0";
  bufferCanvasCtx.fillRect(0, 0, canvas.width, canvas.height);
}

function UpdateBubble() {
  for (var i = 0; i < bubbleArray.length; i++) {
    if (bubbleArray[i].y <= context.canvas.height) {
      bubbleArray[i].y -= bubbleArray[i].speed;
      if (bubbleArray[i].y <= 0)
        bubbleArray[i].y = context.canvas.height;
      bubbleArray[i].x += bubbleArray[i].drift;
      if (bubbleArray[i].x > context.canvas.width)
        bubbleArray[i].x = 0;
    }
  }
}

function UpdateFish() {

}

function DrawFish() {
  // context.save();
  // blank();
  var x = (context.canvas.width / 2);
  var y = (context.canvas.height / 2);
  bufferCanvasCtx.beginPath();
  bufferCanvasCtx.moveTo(x,y);
  var radgrad = bufferCanvasCtx.createRadialGradient((x-250), (y+4), 15, (x+30), (y+30), 350);
  radgrad.addColorStop(0.5, '#FF6200');
  radgrad.addColorStop(0, '#FFA426');
  bufferCanvasCtx.fillStyle = radgrad;
  bufferCanvasCtx.lineWidth = 5;
  bufferCanvasCtx.beginPath();
  bufferCanvasCtx.moveTo(x-197.5,y-125);
  bufferCanvasCtx.quadraticCurveTo(x-325.5,y-125,x-397.5,y+0);
  bufferCanvasCtx.quadraticCurveTo(x-297.5,y+125,x-152.5,y+115);
  bufferCanvasCtx.quadraticCurveTo(x-127.5,y+150,x-57.5,y+220);
  bufferCanvasCtx.bezierCurveTo(x-17.5,y+230,x-37.5,y+100,x-67.5,y+110);
  bufferCanvasCtx.quadraticCurveTo(x-52.5,y+115,x-17.5,y+105);
  bufferCanvasCtx.quadraticCurveTo(x+32.5,y+120,x+92.5,y+110);
  bufferCanvasCtx.quadraticCurveTo(x+107.5,y+95,x+102,y+75);
  bufferCanvasCtx.bezierCurveTo(x+242.5,y-30,x+252.5,y+130,x+352.5,y+170);
  bufferCanvasCtx.bezierCurveTo(x+392.5,y+185,x+372.5,y-10,x+352.5,y+0);
  bufferCanvasCtx.bezierCurveTo(x+372.5,y-10,x+392.5,y-200,x+377.5,y-180);
  bufferCanvasCtx.bezierCurveTo(x+342.5,y-200,x+252.5,y,x+152.5,y-45);
  bufferCanvasCtx.quadraticCurveTo(x+122.5,y-80,x+102.5,y-80);
  bufferCanvasCtx.bezierCurveTo(x+127.5,y-100,x+152.5,y-120,x+132.5,y-160);
  bufferCanvasCtx.bezierCurveTo(x+52.5,y-190,x-162.5,y-200,x-197.5,y-125);
  // bufferCanvasCtx.stroke();
  bufferCanvasCtx.fill();

  bufferCanvasCtx.beginPath();
  bufferCanvasCtx.arc(x-320, y-40, 10, 0, Math.PI * 2, true);
  bufferCanvasCtx.strokeStyle = "rgba(0,0,0,0.5)";
  bufferCanvasCtx.lineWidth = 6;
  bufferCanvasCtx.fillStyle = "black";
  bufferCanvasCtx.stroke();
  bufferCanvasCtx.fill();

  // bufferCanvasCtx.beginPath();
  // bufferCanvasCtx.fillStyle = "red";
  // bufferCanvasCtx.rect(x,y, (4), (4));
  // bufferCanvasCtx.fill();
}

function Bubble() {
  this.x = Math.round(Math.random() * context.canvas.width);
  this.y = context.canvas.height - 10;
  this.drift = Math.random();
  this.speed = Math.round(Math.random() * 3) + 1;
  this.width = (Math.random() * 5) + 10;
  this.height = this.width;
}

function Fish() {
  this.x = Math.round(Math.random() * context.canvas.width);
  this.y = context.canvas.height - 10;
  this.drift = Math.random();
  this.speed = Math.round(Math.random() * 3) + 1;
  this.width = (Math.random() * 10) + 2;
  this.height = this.width;
}

function DrawBubble() {
  for (var i = 0; i < bubbleArray.length; i++) {
    bufferCanvasCtx.beginPath();
    bufferCanvasCtx.arc(bubbleArray[i].x, bubbleArray[i].y, bubbleArray[i].width, 0, Math.PI * 2, true);
    bufferCanvasCtx.strokeStyle = "white";
    bufferCanvasCtx.lineWidth = 1;
    bufferCanvasCtx.fillStyle = "rgba(255,255,255,.15)";
    bufferCanvasCtx.stroke();
    bufferCanvasCtx.fill();

  }
  // context.drawImage(bufferCanvas, 0, 0, bufferCanvas.width, bufferCanvas.height);
  // context.restore();
}

window.addEventListener('DOMContentLoaded', function() {
  init();
});

//Set up logic to resize!
if (typeof window.orientation !== 'undefined') {
  window.addEventListener("orientationchange", function () {
    sizeCanvas(document.body.clientHeight, document.body.clientWidth);
  });
} else {
  window.onresize = (function() {
    sizeCanvas(window.innerHeight, window.innerWidth);
  });
}
`,
`
<main>
  <section role="login">
      <header>
      <h1>Dungeon Delver</h1>
    </header>
    <form>
      <label>
        User Name:
        <input type="text" name="username" />
      </label>
      <label>
        Password:
      <input type="password" name="password" placeholder=""/>
      </label>
      <footer>
      <button>LOGIN</button>
       <button>FORGOT</button>
      </footer>
    </form>
  </section>
</main>

  <div class="modal">
    <section>
      <header>
        <h1>Autoplay is Disabled!</h1>
      </header> 
      <div>
      <p>It appears that autoplay is disabled on your browser. To get the full experience, click the "PLAY" button!</p>
      <footer>
        <button id="play">PLAY</button>
        <button id="mute">MUTE</button>
      </footer>
      </div>
    </section>
  </div>`
]
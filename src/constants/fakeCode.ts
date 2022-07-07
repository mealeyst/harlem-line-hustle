export default [
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
}`
]
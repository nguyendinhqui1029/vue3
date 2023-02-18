import aes from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
export class Crypto {
  encode(message, secretKey) {
    const hashDigest = aes.encrypt(JSON.stringify(message), secretKey).toString();
    const totalSecretKey = this.sumSecretKey(secretKey);
    let newHasDigest = '';
    for(let i = 0; i< hashDigest.length; i++) {
      newHasDigest += String.fromCharCode(hashDigest[i].charCodeAt(0) + totalSecretKey);
    }
    return newHasDigest;
  }
  decode(hashDigest, secretKey) {
    const totalSecretKey = this.sumSecretKey(secretKey);
    let newHasDigest = '';
    for(let i = 0; i< hashDigest.length; i++) {
      newHasDigest += String.fromCharCode(hashDigest[i].charCodeAt(0) - totalSecretKey).toString();
    }
    const hmacDigest = aes.decrypt(newHasDigest, secretKey);
    return JSON.parse(hmacDigest.toString(CryptoJS.enc.Utf8));
  }

  sumSecretKey(secretKey) {
    let sum = 0;
    for(let i = 0; i< secretKey.length; i++)
    {
      sum += parseInt(secretKey[i]);
    }
    return sum;
  }
}
import aes from 'crypto-js/aes';
import CryptoJS from 'crypto-js';
export class Crypto {
  encode(message, secretKey) {
    secretKey = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(secretKey));
    const hashDigest = aes.encrypt(JSON.stringify(message), secretKey, {
      iv: secretKey,
      mode: CryptoJS.mode.CBC,
    }).toString();
    return hashDigest;
  }
  decode(hashDigest, secretKey) {
    secretKey = CryptoJS.enc.Utf8.parse(CryptoJS.MD5(secretKey));
    const hmacDigest = aes.decrypt(hashDigest,secretKey,{
      iv: secretKey,
      mode: CryptoJS.mode.CBC,
    });
    return hmacDigest.toString(CryptoJS.enc.Utf8);
  }
}
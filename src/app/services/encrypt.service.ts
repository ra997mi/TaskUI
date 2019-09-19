import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class EncryptService {

    constructor() { }

    encryptPassword(num: string, password: string): string {
        let keyNum = num;
        let _key = CryptoJS.enc.Utf8.parse(keyNum);
        let _iv = CryptoJS.enc.Utf8.parse(keyNum);
        let encrypted = CryptoJS.AES.encrypt(
            JSON.stringify(password), _key, {
            keySize: keyNum.length,
            iv: _iv,
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.toString();
    }
}

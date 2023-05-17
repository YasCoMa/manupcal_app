import { defineStore } from "pinia";
import axios from "axios";
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");

export const useCriptoStore = defineStore("cripto", {
  state: () => ({
    secret_key: "" as String,
    //secret_key: "FBXx=,u81%c-MrBLSFr6%[w@kB(Xh;e%Ds9i-)6B@P44SU5~F,WareJoDRuFEKuD&d?eHid+Ot!Lt7.Ac;u}y))N6nTG2q}rYlQ6gJ=H{h$~K]ivutbE=J^;!y(~8f1xylThLVa#=5aSihuStEtr1_hU!eWr3N1$6l&iX+VSM6]~poylUq}KN@KMMns4kaXEV=_e@GT+L07(k+~ps;Mo_6" as String,
    sistema_id: 1
  }),
  actions: {
    async getSecretKey() {
      const data = await axios.get("/criptografado");
      this.secret_key = data.data.key;
      sessionStorage.setItem( "key", data.data.key);
      //console.log(data.data)
      return data.data.key;
    },
    encryptGo(key: any) {
      let encJson = CryptoJS.AES.encrypt(JSON.stringify(key), sessionStorage.getItem('key')).toString()
      let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
      return encData;
    },
    decryptBack(key: any) {
      let decData = CryptoJS.enc.Base64.parse(key).toString(CryptoJS.enc.Utf8)
      let bytes = CryptoJS.AES.decrypt(decData, sessionStorage.getItem('key')).toString(CryptoJS.enc.Utf8)
      return JSON.parse(bytes);
     // return CryptoJS.AES.decrypt(key, this.secret_key)
    }
  }
});

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as CryptoJS from "crypto-js";
import { environment } from "../../environments/environment.prod";
@Injectable({
  providedIn: "root",
})
export class GlobalService {
  apiUrl = environment.apiUrl;
  baseUrl;
  token;
  headers;
  saltKey = environment.saltKey;
  constructor(private http: HttpClient) {
    if (localStorage.getItem("dcmstoken") != undefined) {
      this.decrypt(localStorage.getItem("dcmstoken"), (des) => {
        this.token = des;
        this.headers = new HttpHeaders({
          Authorization: "Bearer " + des,
          "Content-Type": "application/json; charset=utf-8",
        });
      });
    }
  }
  login(data, callback) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
    this.http
      .post(this.apiUrl + "login", data, { headers: headers })
      .subscribe((a) => {
        if (a["msg"] == "SUCCESS") {
          localStorage.setItem("userid", a["data"]["uid"]);
          this.token = a["data"]["token"];
          this.headers = new HttpHeaders({
            Authorization: "Bearer " + a["data"]["token"],
            "Content-Type": "application/json; charset=utf-8",
          });
          this.encrypt(a["data"]["token"], (enc) => {
            localStorage.setItem("dcmstoken", enc);
          });
          callback(a["msg"]);
        } else {
          callback(a["msg"]);
        }
      });
  }

  getAll(path, callback) {
    this.http
      .get(this.apiUrl + path, { headers: this.headers })
      .subscribe((data) => {
        callback(data);
      });
  }
  getById(path, id, callback) {
    this.http
      .get(this.apiUrl + path + "/" + id, { headers: this.headers })
      .subscribe((data) => callback(data));
  }
  post(path, data, callback) {
    this.http
      .post(this.apiUrl + path, data, { headers: this.headers })
      .subscribe((data) => callback(data));
  }
  put(path, data, callback) {
    this.http
      .put(this.apiUrl + path, data, { headers: this.headers })
      .subscribe((data) => callback(data));
  }
  deleteById(path, id, callback) {
    this.http
      .delete(this.apiUrl + path + "/" + id, { headers: this.headers })
      .subscribe((data) => callback(data));
  }
  jwtVerify(callback) {
    if (localStorage.getItem("dcmstoken")) {
      var data = {};
      this.http
        .post(this.apiUrl + "verifyToken", data, { headers: this.headers })
        .subscribe((a) => {
          callback(a["data"]);
        });
    } else {
      callback(false);
    }
  }
  logout() {
    this.headers = null;
    localStorage.removeItem("userid");
    localStorage.removeItem("dcmstoken");
    return;
  }
  encrypt(string, cal) {
    cal(CryptoJS.AES.encrypt(string, this.saltKey).toString());
  }
  decrypt(string, cal) {
    cal(CryptoJS.AES.decrypt(string, this.saltKey).toString(CryptoJS.enc.Utf8));
  }
}

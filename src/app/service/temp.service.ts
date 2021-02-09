import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TempService {

  constructor(private http: HttpClient) {
  }
  saveTemplate(title, interval, font, fontsize, fields, alignment, temp1, temp2, callback){
    console.log(title, interval, font, fontsize, fields, alignment, temp1, temp2);
    this.http.get(`http://localhost:8080/save_angular`,
      { headers: { t: title, i: interval, f: font, fs: fontsize, fi: fields, a: alignment, t1: temp1, t2: temp2 } }).subscribe( response => {
      if (response && response['username']) {
        console.log('Succesful save');
        return callback && callback();
      }
      console.log('Unsuccesful save');
    });
  }

  createBasicTempToken(title, interval, font, fontsize, fields, alignment, temp1, temp2, callback) {
    return 'Basic ' + window.btoa(title + ';' + interval + ';' + font + ';' + fontsize + ';' + fields
      + ';' + alignment + ';' + temp1 + ';' + temp2 + ';' + callback);
  }
}

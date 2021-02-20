import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeroFormComponent} from "../hero-form/hero-form.component";

@Injectable({
  providedIn: 'root'
})
export class TempService {

  constructor(private http: HttpClient) {
  }
  // saveTemplate(title, interval, font, fontsize, fields, alignment, temp1, temp2, callback){
  //   console.log(title, interval, font, fontsize, fields, alignment, temp1, temp2);
  //   this.http.post(`http://localhost:8080/save_angular`,
  //     { title, interval, font, fontsize, fields, alignment, temp1, temp2 }).subscribe( response => {
  //     if (response && response['username']) {
  //       console.log('Succesful save');
  //       return callback && callback();
  //     }
  //     console.log('Unsuccesful save');
  //   });
  // }
  saveTemplate(template){
    console.log(this.http.post(`http://localhost:8080/save_angular`, template));
  }

  createBasicTempToken(title, interval, font, fontsize, fields, alignment, temp1, temp2, callback) {
    return 'Basic ' + window.btoa(title + ';' + interval + ';' + font + ';' + fontsize + ';' + fields
      + ';' + alignment + ';' + temp1 + ';' + temp2 + ';' + callback);
  }
}

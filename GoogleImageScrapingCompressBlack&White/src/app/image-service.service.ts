import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {search_data} from './keyword';

@Injectable({
  providedIn: 'root'
})

export class ImageServiceService {

  constructor(private http : HttpClient) { }

  download(gShrch:any){
    return this.http.post("/imagedownload",gShrch)
    .pipe(tap(res=>{console.log("Searched Images URL in Array ",res);}))
  }

  
  imageDisplay(key:any){
    return this.http.post("/display",key)
    .pipe(tap(res=>{console.log("Display Images ",res);}))
  }

  imgscraper(gShrch:any){
    return this.http.post("/imagescraper",gShrch)
    .pipe(tap(res=>{console.log("Your All images compressed ",res);}))
  }
  
  getImages(){
    return this.http.get<search_data[]>("/getsaveRcnSrch")
      .pipe(tap(res=>{console.log("All Images in Array ",res);}))
  }


}

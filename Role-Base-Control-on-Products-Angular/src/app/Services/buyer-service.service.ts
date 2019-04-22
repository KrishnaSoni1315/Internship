import { Injectable } from '@angular/core';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ProductModel } from '../productDetails';

@Injectable({
  providedIn: 'root'
})

export class BuyerServiceService {

  constructor(private httpClient : HttpClient) { }

  createAuthrorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('access_token');
    headers = headers.set('access_token', token);
    return headers
  }

//product list
  list(){
    let myheader = this.createAuthrorizationHeader();
    return this.httpClient.get<ProductModel[]>('/buyer/list', { headers: myheader })
      .pipe(tap(res => { console.log(res); }))
  }
//product ID
  productId(id: string) {
    let myheader = this.createAuthrorizationHeader();
    return this.httpClient.get<ProductModel>('/buyer'+'/product/'+ id, { headers: myheader })
      .pipe(tap(res => { console.log(res); }))
  }

//Buy Product
  buy(id: string) {
    let myheader = this.createAuthrorizationHeader();
    return this.httpClient.get<ProductModel>('/buyer'+'/'+ id + "?quantity=1", { headers: myheader })
      .pipe(tap(res => { console.log(res); }))
  }


}

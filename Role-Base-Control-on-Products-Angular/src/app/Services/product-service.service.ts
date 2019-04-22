import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { ProductModel } from '../productDetails';

@Injectable({
  providedIn: 'root'
})

export class ProductServiceService {

  constructor(private httpClient: HttpClient) { }

  createAuthrorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('access_token');
    headers = headers.set('access_token', token);
    return headers
  }

  //addProduct
  create(product: ProductModel) {
    let headers = this.createAuthrorizationHeader();
    return this.httpClient.post("/seller/add", product, { headers: headers })
      .pipe(tap(res => { console.log(res); }))
  }

  //getAllproducts
  read() {
    let headers = this.createAuthrorizationHeader();
    return this.httpClient.get<ProductModel[]>('/seller/all', { headers: headers })
      .pipe(tap(res => { console.log(res); }))
  }

  //updateProduct
  update(product: ProductModel) {
    let headers = this.createAuthrorizationHeader();
    
    console.log(product._id);
    return this.httpClient.put('/seller' + '/' + product._id, product, { headers: headers })
      .pipe(tap(res => { console.log(res); }))
  }

  //deleteProduct
  delete(id: string) {
    let headers = this.createAuthrorizationHeader();
    return this.httpClient.delete('/seller/' + id, { headers: headers })
  }

  //getProductById
  getById(id: string) {
    let headers = this.createAuthrorizationHeader();
    return this.httpClient.get<ProductModel>('/seller'+'/'+ id , { headers: headers })
      .pipe(tap(res => { console.log(res); }))
  }

}



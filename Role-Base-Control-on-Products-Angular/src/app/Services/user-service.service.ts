import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import {userModel} from '../userDetails';

@Injectable({
  providedIn: 'root'
})

export class UserServiceService {

  constructor( private router: Router, private httpClient : HttpClient) { }

//Registration
  register(user_data:any) {
    return this.httpClient.post
      ('/user', user_data)
        .pipe(tap(res => {
          console.log(res);
    }))
  }

//Login
  login(user_data){
    return this.httpClient.post<{access_token : string, role:string , points: number , _id:string}>
        ('/user/login',user_data)
          .pipe(tap(res=>{
            if(res && res.access_token){
              console.log("Welcome ",res.role);
              console.log("You have ",res.points," Points");
              console.log("Your Profile ",res);
              if(res.role == "seller"){
                this.router.navigate(['/product_display']);
              }
              if(res.role == "buyer"){
                this.router.navigate(['/product_buy']);
              }
              localStorage.setItem('User_id',res._id);
              localStorage.setItem('access_token',res.access_token);
              localStorage.setItem('role',res.role);
            }
            return res;
          }))
  }
 
//getProductById
UserId(id: string) {
    return this.httpClient.get<userModel>('/user'+'/'+ id )
      .pipe(tap(res => { console.log(res); }))
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import {UserServiceService} from '../Services/user-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileform : FormGroup;
  
  constructor(private formBuilder: FormBuilder,private userService : UserServiceService,private  router: Router) { }

  ngOnInit() {
    let userId = localStorage.getItem("User_id");
    if(!userId){
      alert("Something wrong!");
      this.router.navigate(['/login']);
      return;
  }
  this.profileform = this.formBuilder.group({
   
    name : [],
    email : [],
    role: [],
    points : []
  });

  this.userService.UserId(userId).subscribe(
    data =>{// console.log(data);
    this.profileform.patchValue(data);
  });
}
 
// profile(){
//     let id = localStorage.getItem("User_id");
//     this.userService.UserId(id).subscribe(
//       data=>{
//        console.log(data);
//       }
//     );
//   }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  }
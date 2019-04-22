import { Component, OnInit } from '@angular/core';
import {UserServiceService} from '../Services/user-service.service';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  
  constructor(private formBuilder: FormBuilder, private router: Router, private userService: UserServiceService) { }

  registerForm: FormGroup;
  submitted = false;

  ngOnInit() {
    
    this.registerForm = this.formBuilder.group({
      _id: [],
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }
  onSubmit() {
  this.submitted = true;
  
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/login']);
        }),
        err => console.log(err);
    }
    
  }
get f(){
  return this.registerForm.controls;
}

}

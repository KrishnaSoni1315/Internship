import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductServiceService } from '../Services/product-service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})

export class ProductCreateComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private productService: ProductServiceService) { }

  addForm: FormGroup;
  submitted = false;

  ngOnInit() {
    
    this.addForm = this.formBuilder.group({
      _id: [],
      product: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  onSubmit() {
  this.submitted = true;
  
    if (this.addForm.valid) {
      this.productService.create(this.addForm.value).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['/product_display']);
        }),
        err => console.log(err);
    }
    
  }
get f(){
  return this.addForm.controls;
}

logout(){
  localStorage.clear();
  this.router.navigate(['/login']);
}
}

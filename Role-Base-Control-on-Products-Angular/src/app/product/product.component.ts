import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import {BuyerServiceService} from '../Services/buyer-service.service'
import { ProductModel } from '../productDetails';
import { Router } from "@angular/router";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  item : ProductModel;
  form : FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private router: Router,private buyerService : BuyerServiceService) { }

  ngOnInit() {
    let productId = localStorage.getItem("productId");
    if(!productId){
      alert("something wrong");
      this.router.navigate(['/product_buy']);
      return;
    }

    this.form = this.formBuilder.group({
      _id : [],
      product : [],
      desc : [],
      price : [],
      quantity: []
    });

    this.buyerService.productId(productId).subscribe(
      data=>{
          console.log(data.quantity);
          this.form.patchValue(data);
      });
  }

  onSubmit(){
    let productId = localStorage.getItem("productId");
    this.submitted = true;

      this.buyerService.buy(productId).subscribe(
        data=>{
          console.log(data);
          this.router.navigate(['/product_buy']);
          localStorage.removeItem("productId");
        }),
        err=> console.log(err);  
    
  }
  
  
  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

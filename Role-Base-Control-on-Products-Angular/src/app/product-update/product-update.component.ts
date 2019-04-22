import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import { ProductServiceService } from '../Services/product-service.service';
import { ProductModel } from '../productDetails';
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {

  product : ProductModel;
  editForm : FormGroup;
  submitted =false;
  
  constructor(private formBuilder: FormBuilder, private productService : ProductServiceService, private  router: Router) { }

  ngOnInit() {
    let productId = localStorage.getItem("productId");
    if(!productId){
      alert("Sent Something wrong!");
      this.router.navigate(['/product_display']);
      return;
    }

    this.editForm = this.formBuilder.group({
      _id: [],
      product: ['', Validators.required],
      desc: ['', Validators.required],
      price: ['', Validators.required],
      quantity: ['', Validators.required]
    });

    this.productService.getById(productId)
    .subscribe(data=>{
      console.log(data);
    
      let val = {desc: data.desc,
            price: data.price,
            product: data.product,
            quantity: data.quantity,
            _id: data._id}

      this.editForm.setValue(val);

    });
  }
 
 get f() { return this.editForm.controls; }

 onSubmit(){
   this.submitted = true;
   
   if(this.editForm.valid){
     this.productService.update(this.editForm.value)
     .subscribe( data => {
       console.log(data);
       this.router.navigate(['/product_display']);
     }),
     err => console.log(err);
   }
 }

 logout(){
  localStorage.clear();
  this.router.navigate(['/login']);
}

}

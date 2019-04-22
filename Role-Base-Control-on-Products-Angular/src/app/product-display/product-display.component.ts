import { Component, OnInit } from '@angular/core';
import { ProductServiceService } from '../Services/product-service.service';
import {UserServiceService} from '../Services/user-service.service';
import { Router } from "@angular/router";
import { ProductModel } from '../productDetails';

@Component({
  selector: 'app-product-display',
  templateUrl: './product-display.component.html',
  styleUrls: ['./product-display.component.css']
})

export class ProductDisplayComponent implements OnInit {

  products : ProductModel[];
  
  constructor(private productService : ProductServiceService, private userService : UserServiceService,private  router: Router) { }
  
  ngOnInit() {
     localStorage.removeItem("productId");
     this.getAllProduct();
    }

    getAllProduct(): void{
      this.productService.read().subscribe(
        data=>{
          
          this.products = data;
        });
    };

    addProduct(): void {
      this.router.navigate(['/product_create'],{ skipLocationChange: true });
    }

    deleteProduct(product : ProductModel){
        this.productService.delete(product._id).subscribe(
          data=>{
            console.log(data);
            this.getAllProduct();
          });
    };

    updateProduct(product : ProductModel){
      localStorage.removeItem("productId");
      localStorage.setItem("productId", product._id);
      this.router.navigate(['/product_update'],{ skipLocationChange: true });
    }

    userProfile(){
          this.router.navigate(['/profile']);
    }

    logout(){
      localStorage.clear();
      this.router.navigate(['/login']);
    }
  }


import { Component, OnInit } from '@angular/core';
import {BuyerServiceService} from '../Services/buyer-service.service'
import { ProductModel } from '../productDetails';
import { Router } from "@angular/router";

@Component({
  selector: 'app-product-buy',
  templateUrl: './product-buy.component.html',
  styleUrls: ['./product-buy.component.css']
})

export class ProductBuyComponent implements OnInit {

  products : ProductModel[];
  
  constructor(private router: Router,private buyerService : BuyerServiceService) { }

  ngOnInit() {
    localStorage.removeItem("productId");
    this.displayProduct();
  }

  displayProduct(): void{
    this.buyerService.list().subscribe(
      data=>{
        this.products = data;
      });
  };

  productDetails(product : ProductModel){
    localStorage.setItem("productId", product._id);
    this.router.navigate(['/product'],{ skipLocationChange: true });
  }
  
  userProfile(){
    this.router.navigate(['/profile']);
}

  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}

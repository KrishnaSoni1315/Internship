import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';

import{UserServiceService} from './Services/user-service.service';
import {AuthServiceService} from './Services/auth-service.service';
import {ProductServiceService} from './Services/product-service.service';
import {BuyerServiceService} from './Services/buyer-service.service';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDisplayComponent } from './product-display/product-display.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductBuyComponent } from './product-buy/product-buy.component';

import { ProductComponent } from './product/product.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ProductCreateComponent,
    ProductDisplayComponent,
    ProductUpdateComponent,
    ProductBuyComponent,
    ProductComponent,
    ProfileComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    UserServiceService,
    AuthServiceService,
    ProductServiceService,
    BuyerServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }

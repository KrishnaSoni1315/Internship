import { NgModule } from '@angular/core';
import { Routes, RouterModule ,CanActivate} from '@angular/router';
import { AuthGuardService as AuthGuard } from './Services/auth-guard.service';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDisplayComponent }from './product-display/product-display.component';
import { ProductUpdateComponent} from './product-update/product-update.component'
import {ProductBuyComponent} from './product-buy/product-buy.component';
import {ProductComponent} from './product/product.component';
import { ProfileComponent} from './profile/profile.component';

const routes: Routes = [

  { path: '',
    canActivateChild: [AuthGuard],
    children:[
        {
          path : 'register' , 
          component : RegisterComponent
        },
        {
          path : 'login', 
          component: LoginComponent
        },
        {
          path : 'profile', 
          component: ProfileComponent
        },
        {
          path : 'product_buy', 
          component : ProductBuyComponent,
          data: {allowedRoles : ['buyer']
          }
        },
        {
          path : 'product', 
          component : ProductComponent,
          data: {allowedRoles : ['buyer']
          }
        }, 
        {
          path : 'product_create', 
          component : ProductCreateComponent,
          data: {allowedRoles : ['seller']
          }
        },
        {
          path : 'product_display', 
          component : ProductDisplayComponent,
          data: {allowedRoles : ['seller']
          }
        },
        {
          path : 'product_update', 
          component : ProductUpdateComponent,
          data: {allowedRoles : ['seller']
          }
        },
        {
          path: '**',
          redirectTo:'/profile' 
        }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

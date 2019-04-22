import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild ,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {AuthServiceService} from './auth-service.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class AuthGuardService  implements CanActivate, CanActivateChild{

  constructor(public authorizationService : AuthServiceService , public router: Router ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);


    if (!isAuthorized) {
      this.router.navigate(['/login']);
}
  return isAuthorized;
}
  
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const allowedRoles = next.data.allowedRoles;
    const isAuthorized = this.authorizationService.isAuthorized(allowedRoles);

    if (!isAuthorized) {
      // if not authorized, show access denied message
      this.router.navigate(['/login']);
    }
    return isAuthorized;
  
  }

}






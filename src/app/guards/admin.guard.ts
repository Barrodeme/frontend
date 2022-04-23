import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { KeycloakService } from '../services/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private kcService: KeycloakService){
    }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let isAdmin:any = this.kcService.kc.hasRealmRole('admin')
      if (isAdmin) {
        return true
      }else{
        this.isAccessAllowed(next)
      }
  }


  public async isAccessAllowed(
    _route: ActivatedRouteSnapshot,
  ) {
    // Force the user to log in if currently unauthenticated.
      this.router.navigate(['/'])
    }
}

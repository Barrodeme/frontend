import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, APP_INITIALIZER, DoBootstrap, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './mescomposants/footer/footer.component';
import { ToolbarComponent } from './mescomposants/toolbar/toolbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateAuteurComponent } from './mescomposants/auteur/create-auteur/create-auteur.component';
import { EditAuteurComponent } from './mescomposants/auteur/edit-auteur/edit-auteur.component';
import { ShowAuteurComponent } from './mescomposants/auteur/show-auteur/show-auteur.component';
import { ListAuteurComponent } from './mescomposants/auteur/list-auteur/list-auteur.component';
import { CreateLivreComponent } from './mescomposants/livre/create-livre/create-livre.component';
import { EditLivreComponent } from './mescomposants/livre/edit-livre/edit-livre.component';
import { ShowLivreComponent } from './mescomposants/livre/show-livre/show-livre.component';
import { ListLivreComponent } from './mescomposants/livre/list-livre/list-livre.component';
import { AcceuilComponent } from './mescomposants/acceuil/acceuil.component';
import { KeycloakService } from './services/keycloak.service';
import { JwtInterceptors } from './interceptors/jwt-interceptor';

//appel de la fonction au demarrage de l'application pour initialiser les parametrages keycloak
// function initializeKeycloak(keycloak: KeycloakService) {
//   return () =>
//     keycloak.init()
// }
const keycloakSecurityService = new KeycloakService()

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ToolbarComponent,
    CreateAuteurComponent,
    EditAuteurComponent,
    ShowAuteurComponent,
    ListAuteurComponent,
    CreateLivreComponent,
    EditLivreComponent,
    ShowLivreComponent,
    ListLivreComponent,
    AcceuilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,// pour eettre des requetes http ou https
    ReactiveFormsModule,// module formulaire
    FormsModule,// module formulaire
  ],
  providers: [
    //Procedure d'initialisation au lancement de l'application
      // {
      //   provide: APP_INITIALIZER,//indique au framework le debut d'unue initialisation
      //   useFactory: initializeKeycloak,//fonction appelee au moment du lancement ci dessus export function ...
      //   multi: true,
      //   deps: [KeycloakService]
      // },
      { provide: KeycloakService, useValue: keycloakSecurityService },
      //permettra d'injecter les entete authorixzation et token pour chaque requete
      { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptors, multi: true }


  ],
  entryComponents:[AppComponent],
  //bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap {

  ngDoBootstrap(appRef: ApplicationRef): void {
    keycloakSecurityService.init()
    .then( response => {
      console.log("keycloakSecurityService sucess...");
      appRef.bootstrap(AppComponent)
    }).catch((err)=>{
      console.log("keycloakSecurityService error ",err);

    })
  }


}

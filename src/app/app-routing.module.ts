import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { AcceuilComponent } from './mescomposants/acceuil/acceuil.component';
import { CreateAuteurComponent } from './mescomposants/auteur/create-auteur/create-auteur.component';
import { EditAuteurComponent } from './mescomposants/auteur/edit-auteur/edit-auteur.component';
import { ListAuteurComponent } from './mescomposants/auteur/list-auteur/list-auteur.component';
import { ShowAuteurComponent } from './mescomposants/auteur/show-auteur/show-auteur.component';
import { CreateLivreComponent } from './mescomposants/livre/create-livre/create-livre.component';
import { EditLivreComponent } from './mescomposants/livre/edit-livre/edit-livre.component';
import { ListLivreComponent } from './mescomposants/livre/list-livre/list-livre.component';
import { ShowLivreComponent } from './mescomposants/livre/show-livre/show-livre.component';


const routes: Routes = [
  {path: '', component: AcceuilComponent},
  //pour les auteurs
  { path: 'list-auteurs', component: ListAuteurComponent, canActivate: [AuthGuard] },
  { path: 'create-auteur', component: CreateAuteurComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: 'edit-auteur/:auteur', component: EditAuteurComponent, canActivate: [AuthGuard,AdminGuard] },// route avec parametre id de l'auteur
  { path: 'show-auteur/:auteur', component: ShowAuteurComponent , canActivate: [AuthGuard]},
//pour les livres
{ path: 'list-livre', component: ListLivreComponent, canActivate: [AuthGuard] },
{ path: 'create-livre', component: CreateLivreComponent, canActivate: [AuthGuard,AdminGuard] },
{ path: 'edit-livre/:livre/:auteur', component: EditLivreComponent, canActivate: [AuthGuard,AdminGuard] },// route avec parametre id du livre
{ path: 'show-livre/:livre/:auteur', component: ShowLivreComponent , canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

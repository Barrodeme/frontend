import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Livre } from 'src/app/model/Livre';
import { AuteurService } from 'src/app/services/auteur.service';
import { LivreService } from 'src/app/services/livre.service';

@Component({
  selector: 'app-create-livre',
  templateUrl: './create-livre.component.html',
  styleUrls: ['./create-livre.component.css']
})
export class CreateLivreComponent implements OnInit {
  form ! : FormGroup; //pour controler la validation du formulaire

  livre: Livre = new Livre();// Livre model

  public listAuteurs:any =[];//permet de recuperer la liste des auteurs

  constructor(
    private livreService: LivreService,
    private fb: FormBuilder,// permet de gerer les differents elements d'un formulaire
    private auteurService: AuteurService,// declaration de l'objet AuteurService
    private router: Router) { }

  ngOnInit(): void {
    this.getListAuteur();// appel du service getList dans AuteurService
    this.createForm()// permet de charger les regles de gestion du formulaire
  }

  //creation du formulaire
  createForm(){
    this.form = this.fb.group({
      titre:['',Validators.required],// les regles de validation de ce champ
      nbpages:['',Validators.required],// les regles de validation de ce champ
      description:['',Validators.required],// les regles de validation de ce champ
      // chargons la liste des auteurs par defaut
      auteur_id:[this.listAuteurs,Validators.required],// les regles de validation de ce champ
    });
  }

  getListAuteur() {
    this.auteurService.getListAuteur().subscribe(
      (data: any) => { this.listAuteurs = (data)}
    )
  }
  goToLivreList(){
    this.router.navigate(['/list-livre']);
  }

  sendForm(){
    this.livre.titre = this.form.value.titre
    this.livre.nbpages = this.form.value.nbpages
    this.livre.description = this.form.value.description
    this.livre.auteur_id = this.form.value.auteur_id

    this.save(this.livre, this.livre.auteur_id);

  }
  save(livre: Livre, auteur_id: bigint){
    this.livreService.createLivre(this.livre,auteur_id).subscribe( data =>{
      console.log(data);

      this.goToLivreList()
    });
  }
}

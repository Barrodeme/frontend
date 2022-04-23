import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auteur } from 'src/app/model/auteur';
import { AuteurService } from 'src/app/services/auteur.service';

@Component({
  selector: 'app-create-auteur',
  templateUrl: './create-auteur.component.html',
  styleUrls: ['./create-auteur.component.css']
})
export class CreateAuteurComponent implements OnInit {
  form ! : FormGroup; //pour controler la validation du formulaire

  auteur: Auteur = new Auteur();// auteur model

  constructor(private auteurService: AuteurService,
    private fb: FormBuilder,// permet de gerer les differents elements d'un formulaire
    private router: Router) { }

  ngOnInit(): void {
    this.createForm()// permet de charger les regles de gestion du formulaire
  }

  //creation du formulaire
  createForm(){
    this.form = this.fb.group({
      name:['auteur1',Validators.required],// les regles de validation de ce champ
      maisonedition:['barrodev',Validators.required],// les regles de validation de ce champ
    });
  }

  goToAuteurList(){
    this.router.navigate(['/list-auteurs']);
  }

  sendForm(){
    this.auteur.name = this.form.value.name
    this.auteur.maisonedition = this.form.value.maisonedition
    this.save(this.auteur);
  }
  save(auteur: Auteur){
    this.auteurService.createAuteur(this.auteur).subscribe( data =>{
      this.goToAuteurList()
    });
  }
}

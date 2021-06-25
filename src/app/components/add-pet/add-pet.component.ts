import { Component, OnInit } from '@angular/core';

import { Pet } from 'src/app/models/pet.model';
import { PetService } from 'src/app/services/pet.service';


@Component({
  selector: 'app-add-pet',
  templateUrl: './add-pet.component.html',
  styleUrls: ['./add-pet.component.css']
})
export class AddPetComponent implements OnInit {

  pet: Pet = {
    name: '',
    age: 0,
    exact_age: false
  };
  submitted = false;

  constructor(private petService: PetService) { }

  ngOnInit(): void {
  }

  savePet(): void {
    const data = {
      name: this.pet.name,
      age: this.pet.age,
      exact_age: this.pet.exact_age
    };

    this.petService.create(data)
    .subscribe(
      response => {
        console.log(response);
        this.submitted = true;
      },
      error => {
        console.log(error);
      });
  }

  newPet(): void {
    this.submitted = false;
    this.pet = {
      name: '',
      age: 0,
      exact_age: false
    };
  }
}

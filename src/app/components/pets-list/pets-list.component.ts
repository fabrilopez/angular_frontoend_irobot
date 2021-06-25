import { Component, OnInit } from '@angular/core';

import { Pet } from 'src/app/models/pet.model';
import { AuthService } from 'src/app/services/auth.service';
import { PetService } from 'src/app/services/pet.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.css']
})
export class PetsListComponent implements OnInit {

  pets?: Pet[];
  currentPet: Pet = {};
  currentIndex = -1;
  name = '';
  age = 1;

  constructor(private petService: PetService, private authService: AuthService) { }

  ngOnInit(): void {
    this.retrievePets();
  }

  retrievePets(): void {
    this.petService.getAll()
    .subscribe(
      data => {
        this.pets = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  refreshList(): void {
    this.retrievePets();
    this.currentPet = {};
    this.currentIndex = -1;
  }

  setActivePet(pet: Pet, index: number): void {
    this.currentPet = pet;
    this.currentIndex = index;
  }

  removeAllPets(): void {
    if(this.authService.isAuthenticated()){
      this.petService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.refreshList();
        },
      error => {
        console.log(error)
      });
    }
    else {
      Swal.fire('Forbiden!', 'Only for loged users', 'error');
    }
  }

  searchName(): void {
    this.currentPet = {};
    this.currentIndex = -1;

    this.petService.findByName(this.name)
    .subscribe(
      data => {
        this.pets = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  searchAge(): void {
    this.currentPet = {};
    this.currentIndex = -1;

    this.petService.findByAge(this.age)
    .subscribe(
      data => {
        this.pets = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PetsListComponent } from './components/pets-list/pets-list.component';
import { PetDetailsComponent } from './components/pet-details/pet-details.component';
import { AddPetComponent } from './components/add-pet/add-pet.component';
import { LoginComponent  } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';


const routes: Routes = [
  { path: '', redirectTo: 'pets', pathMatch: 'full' },
  { path: 'pets', component: PetsListComponent },
  { path: 'pets/:id', component: PetDetailsComponent },
  { path: 'add', component: AddPetComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

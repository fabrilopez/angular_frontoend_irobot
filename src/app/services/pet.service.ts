import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pet } from '../models/pet.model';

const baseUrl = 'http://localhost:8080/api/pets';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Pet[]> {
    return this.http.get<Pet[]>(baseUrl);
  }

  get(id: any): Observable<Pet> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl+'/delete');
  }

  findByName(name: any): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${baseUrl}?name=${name}`);
  }

  findByAge(age: number): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${baseUrl}?age=${age}`);
  }

}

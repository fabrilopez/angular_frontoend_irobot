import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { User } from '../../models/user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title: string = 'Please Sign In!';
 
  myform: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private router: Router) { }  

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      let usuario = this.authService.user;
      Swal.fire('Login', `User ${usuario.username} already authenticated!`, 'info');
      this.router.navigate(['/pets']);
    }
    this.initializeForm();
  }  

  initializeForm() {
    this.myform.setValue({
        username: '',
        password: ''
    })
  }

  get f() {
    return this.myform.controls;
  }

  onSubmit() {
    this.authService.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(
      data => {
        console.log(data);
        this.authService.saveUser(data);
        this.router.navigate(['/pets']);      
        let usuario = this.authService.user;
        Swal.fire('Login', `Wellcome ${usuario.username}`, 'success');                
      }, error => {
        if (error.status == 400){
          Swal.fire('Error login!', 'Error with credentials', 'error');
        }
      }
    )
  }

  



}


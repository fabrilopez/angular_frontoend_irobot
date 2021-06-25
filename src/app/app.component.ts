import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
    
  constructor(public authService: AuthService, private router: Router) { 
    
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      let usuario = this.authService.user;      
    }
  }

  logout() {
    let usuario = this.authService.user;
    Swal.fire('Logout!', `Goodbye ${usuario.username}`, 'success');      
    this.authService.logout();
    this.router.navigate(['/pets']);
  }  
  
}

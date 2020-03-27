import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService  } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.styl']
})
export class LoginComponent implements OnInit {

      form: FormGroup;
      returnUrl: string;
      
      constructor( private route: ActivatedRoute, private router: Router, private authService: AuthService) {
           // redirect to home if already logged in
          if (this.authService.currentUserValue) { 
              this.router.navigate(['/']);
          }
      }
  
      ngOnInit(){
          this.authService.logout();
          this.returnUrl = this.route.snapshot.queryParams[''] || 'home';

          this.form = new FormGroup({
            email: new FormControl(),
            password: new FormControl()
          });
      }

      login(){
        this.authService.login(this.form.value.email, this.form.value.password)
                .pipe(first())
                .subscribe( () => this.router.navigate([this.returnUrl])), 
                error => console.log(error);
      }

      logout(){
          localStorage.removeItem('currentUser');
      }

      addNewClient(){
        this.router.navigate(['/addClient']);
      }
}
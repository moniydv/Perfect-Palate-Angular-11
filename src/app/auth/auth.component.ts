import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoggedIn: boolean = false;
  loading: boolean = false;
  error: boolean = false;
  errorMessage: string;
  registered = false;
  submitted = false;
  isTextFieldType: boolean;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    /*if(this.router.url === '/signup') {
      this.isLoginMode = false;
    } else {
      this.isLoginMode = true;
    }*/
  }
  
  switchMode(): void {
    this.isLoginMode = !this.isLoginMode;

    /*if(this.isLoginMode) {
      this.router.navigate(['../login'], { relativeTo: this.route });
    } else {
      this.router.navigate(['../signup'], { relativeTo: this.route });
    }*/
  }

  onSubmit(form: NgForm){

    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (form.invalid) {
      return;
    }

    if(this.isLoginMode){
      //login
      //signup
      this.authService.login(form.value.email, form.value.password)
      .pipe(first())
      .subscribe(
        response => {
          this.error = false;
          this.isLoggedIn = true;
          this.router.navigate(['../recipes'], { relativeTo: this.route });
        },
        error => {
          this.errorMessage = this.handleError(error.error.error.message);
          this.error = true;
          this.loading = false;
        }
      )
    }else{
      //signup
      this.authService.signup(form.value.email, form.value.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.error = false;
          this.registered = true;
          this.isLoginMode = true ; //redirect to login mode
          //this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: error => {
          this.errorMessage = this.handleError(error.error.error.message);
          this.error = true;
          this.loading = false;
        }
      });
    }
  }

  handleError(error) {
    let msg = 'Error Occured';
    switch(error) {
      case 'EMAIL_NOT_FOUND':
        msg = 'Invalid email or password';
        break;
      case 'INVALID_PASSWORD':
        msg = 'Invalid email or password';
        break;
      case 'EMAIL_EXISTS':
        msg = "Email already exists";
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        msg = "We have blocked all requests from this device due to unusual activity. Try again later.";
        break;
    }
    
    return msg;
  }

  togglePasswordFieldType(){
    this.isTextFieldType = !this.isTextFieldType;
  }
  
}
